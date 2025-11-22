/**
 * Intelligence formulas for NeuroCram modules
 * All formulas return normalized scores (0-100)
 */

import { normalizeDifficulty, normalizeConfidence, normalizeFrom01 } from './normalization.js';
import { getDaysRemaining } from './dateUtils.js';

/**
 * Calculate Urgency Score for CramHeatMap
 * @param {Object} exam - Exam object
 * @param {string} exam.examDate - Exam date
 * @param {number} exam.difficulty - Difficulty 1-5
 * @param {number} exam.confidence - Confidence 1-5
 * @param {string} exam.priorityGoal - "Pass" | "High grade" | "Improve"
 * @param {string} exam.subject - Subject name
 * @param {Array} mandatoryTopics - Array of mandatory topic names
 * @returns {number} Urgency score 0-100
 */
export const calculateUrgencyScore = (exam, mandatoryTopics = []) => {
  const { examDate, difficulty, confidence, priorityGoal, subject } = exam;
  
  // 1. Normalize difficulty and confidence
  const difficultyNorm = normalizeDifficulty(difficulty);
  const confidenceNorm = normalizeConfidence(confidence); // Low confidence = high urgency
  
  // 2. Time factor
  const daysRemaining = getDaysRemaining(examDate);
  let timeFactor;
  if (daysRemaining <= 1) {
    timeFactor = 1;
  } else if (daysRemaining <= 7) {
    timeFactor = 7 / daysRemaining;
  } else {
    timeFactor = 0.5;
  }
  timeFactor = Math.min(1, timeFactor); // Cap at 1
  
  // 3. Priority weight
  const priorityWeights = {
    'Pass': 1,
    'High grade': 1.3,
    'Improve': 1.5
  };
  const priorityWeight = priorityWeights[priorityGoal] || 1;
  
  // 4. Mandatory topic bonus
  const mandatoryBonus = mandatoryTopics.includes(subject) ? 0.1 : 0;
  
  // 5. Combine into Urgency Score
  const urgencyScore = (
    difficultyNorm * 0.4 + 
    confidenceNorm * 0.4 + 
    timeFactor * 0.2
  ) * priorityWeight + mandatoryBonus;
  
  // Normalize to 0-100
  return Math.max(0, Math.min(100, normalizeFrom01(urgencyScore)));
};

/**
 * Calculate Stress Level Score for StressForecast
 * @param {Object} exam - Exam object
 * @param {Object} studentProfile - Student profile object
 * @param {Array} majorCommitments - Array of commitment strings
 * @returns {number} Stress score 0-100
 */
export const calculateStressScore = (exam, studentProfile, majorCommitments = []) => {
  const { difficulty, confidence } = exam;
  const { studyHoursPerDay, stressLevel } = studentProfile;
  
  // 1. Base stress from difficulty vs confidence
  const baseStress = difficulty - confidence;
  
  // 2. Workload multiplier
  const workloadFactor = Math.min(1, studyHoursPerDay / 8);
  
  // 3. Commitments factor
  const commitmentFactor = Math.min(1, 0.1 * majorCommitments.length);
  
  // 4. Self-reported stress
  const selfStressMultipliers = {
    'Low': 0.5,
    'Medium': 1,
    'High': 1.2
  };
  const selfStress = selfStressMultipliers[stressLevel] || 1;
  
  // 5. Combine into Stress Score
  // Normalize baseStress to 0-1 range first (difficulty 1-5, confidence 1-5, so range is -4 to 4)
  const normalizedBaseStress = (baseStress + 4) / 8; // Shift to 0-1 range
  
  const stressScore = (
    normalizedBaseStress * 0.4 + 
    workloadFactor * 0.3 + 
    commitmentFactor * 0.2
  ) * selfStress;
  
  // Normalize to 0-100
  return Math.max(0, Math.min(100, normalizeFrom01(stressScore)));
};

/**
 * Calculate daily stress forecast (optimized)
 * @param {Array} exams - Array of exam objects
 * @param {Object} studentProfile - Student profile
 * @param {Array} majorCommitments - Major commitments
 * @param {number} daysAhead - Number of days to forecast
 * @returns {Array} Array of { date, stressScore } objects
 */
export const calculateStressForecast = (exams, studentProfile, majorCommitments = [], daysAhead = 30) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Pre-calculate stress scores and days remaining for all exams
  const examData = exams.map(exam => {
    const examDate = new Date(exam.examDate);
    examDate.setHours(0, 0, 0, 0);
    const daysRemaining = getDaysRemaining(exam.examDate);
    const baseStress = calculateStressScore(exam, studentProfile, majorCommitments);
    
    return {
      exam,
      examDate,
      daysRemaining,
      baseStress,
      isUpcoming: examDate >= today
    };
  }).filter(data => data.isUpcoming); // Only upcoming exams

  if (examData.length === 0) {
    // No upcoming exams, return zero stress
    const forecast = [];
    for (let i = 0; i < daysAhead; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      forecast.push({
        date: date.toISOString().split('T')[0],
        stressScore: 0
      });
    }
    return forecast;
  }

  // Sort by days remaining for faster lookup
  examData.sort((a, b) => a.daysRemaining - b.daysRemaining);
  
  const forecast = [];
  const todayTime = today.getTime();
  
  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateTime = date.getTime();
    const dateString = date.toISOString().split('T')[0];
    
    // Find closest upcoming exam
    let closestExam = null;
    let minDaysToExam = Infinity;
    
    for (const data of examData) {
      if (data.examDate.getTime() >= dateTime) {
        const daysToExam = Math.ceil((data.examDate.getTime() - dateTime) / (1000 * 60 * 60 * 24));
        if (daysToExam < minDaysToExam) {
          minDaysToExam = daysToExam;
          closestExam = data;
        }
      }
    }
    
    let stressScore = 0;
    if (closestExam) {
      // Stress increases as exam approaches
      const proximityMultiplier = closestExam.daysRemaining <= 7 
        ? (8 - closestExam.daysRemaining) / 7 
        : 0.3;
      stressScore = closestExam.baseStress * proximityMultiplier;
    }
    
    forecast.push({
      date: dateString,
      stressScore: Math.max(0, Math.min(100, stressScore))
    });
  }
  
  return forecast;
};

/**
 * Calculate Brain Energy Score for BrainEnergyGauge
 * @param {Object} studentProfile - Student profile object
 * @param {number} stressScore - Current stress score (0-100)
 * @returns {number} Energy score 0-100
 */
export const calculateEnergyScore = (studentProfile, stressScore) => {
  const { averageSleepHours, studyHoursPerDay } = studentProfile;
  
  // 1. Sleep factor
  const sleepFactor = Math.min(1, averageSleepHours / 8);
  
  // 2. Workload factor (high study hours → risk of energy depletion)
  const workloadFactor = Math.max(0, 1 - (studyHoursPerDay / 12));
  
  // 3. Stress impact
  const stressImpact = 1 - (stressScore / 100);
  
  // 4. Combine factors
  const energyScore = (
    sleepFactor * 0.5 + 
    workloadFactor * 0.3 + 
    stressImpact * 0.2
  );
  
  // Normalize to 0-100
  return Math.max(0, Math.min(100, normalizeFrom01(energyScore)));
};

/**
 * Calculate Productivity Score for ProductivityZones
 * @param {string} preferredStudyWindow - "Morning" | "Afternoon" | "Night"
 * @param {number} energyScore - Energy score from BrainEnergyGauge
 * @param {number} studyHoursPerDay - Study hours per day
 * @param {number} daysRemaining - Days remaining until exam
 * @returns {number} Productivity score 0-100
 */
export const calculateProductivityScore = (preferredStudyWindow, energyScore, studyHoursPerDay, daysRemaining) => {
  // 1. Assign baseline productivity for window
  const baseScores = {
    'Morning': 0.8,
    'Afternoon': 0.7,
    'Night': 0.6
  };
  const baseScore = baseScores[preferredStudyWindow] || 0.7;
  
  // 2. Multiply by energy factor
  let productivityScore = baseScore * (energyScore / 100);
  
  // 3. Optional scaling for daysRemaining
  if (daysRemaining > 0) {
    productivityScore = productivityScore * (1 + (7 / (daysRemaining + 1)) * 0.1);
  }
  
  // Normalize to 0-100 and cap at 100
  return Math.max(0, Math.min(100, normalizeFrom01(productivityScore)));
};

/**
 * Calculate productivity by time of day
 * @param {string} preferredStudyWindow - Preferred window
 * @param {number} energyScore - Energy score
 * @param {number} studyHoursPerDay - Study hours
 * @param {number} daysRemaining - Days remaining
 * @returns {Object} Productivity scores for different time zones
 */
export const calculateProductivityZones = (preferredStudyWindow, energyScore, studyHoursPerDay, daysRemaining) => {
  const baseProductivity = calculateProductivityScore(preferredStudyWindow, energyScore, studyHoursPerDay, daysRemaining);
  
  // Adjust productivity for different time zones based on preference
  const zones = {
    'Morning': {
      '6-9': baseProductivity * 1.2,
      '9-12': baseProductivity * 1.0,
      '12-15': baseProductivity * 0.8,
      '15-18': baseProductivity * 0.7,
      '18-21': baseProductivity * 0.6,
      '21-24': baseProductivity * 0.5
    },
    'Afternoon': {
      '6-9': baseProductivity * 0.6,
      '9-12': baseProductivity * 0.8,
      '12-15': baseProductivity * 1.2,
      '15-18': baseProductivity * 1.0,
      '18-21': baseProductivity * 0.8,
      '21-24': baseProductivity * 0.6
    },
    'Night': {
      '6-9': baseProductivity * 0.5,
      '9-12': baseProductivity * 0.6,
      '12-15': baseProductivity * 0.7,
      '15-18': baseProductivity * 0.8,
      '18-21': baseProductivity * 1.0,
      '21-24': baseProductivity * 1.2
    }
  };
  
  const zoneData = zones[preferredStudyWindow] || zones['Afternoon'];
  
  // Normalize all values to 0-100
  const normalizedZones = {};
  for (const [time, score] of Object.entries(zoneData)) {
    normalizedZones[time] = Math.max(0, Math.min(100, score));
  }
  
  return normalizedZones;
};

