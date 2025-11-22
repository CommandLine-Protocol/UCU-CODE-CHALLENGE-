import { useMemo } from 'react';
import {
  calculateUrgencyScore,
  calculateStressScore,
  calculateStressForecast,
  calculateEnergyScore,
  calculateProductivityScore,
  calculateProductivityZones
} from '../utils/intelligenceFormulas.js';
import { getDaysRemaining } from '../utils/dateUtils.js';
import { sortByUrgency } from '../utils/sorting.js';

/**
 * Custom hook for computing intelligence module data
 * @param {Object} planData - Complete plan data (exams, studentProfile, constraints)
 * @returns {Object} Computed intelligence data for all modules
 */
export const useIntelligenceEngine = (planData) => {
  const intelligence = useMemo(() => {
    if (!planData || !planData.exams || planData.exams.length === 0) {
      return null;
    }

    const { exams, studentProfile, constraints } = planData;
    const mandatoryTopics = constraints?.mandatoryTopics || [];
    const majorCommitments = constraints?.majorCommitments || [];

    // Pre-calculate days remaining for all exams (cache to avoid recalculation)
    const examsWithDays = exams.map(exam => ({
      ...exam,
      daysRemaining: getDaysRemaining(exam.examDate)
    }));

    // Calculate urgency scores for all exams (single pass)
    const examsWithUrgency = examsWithDays.map(exam => ({
      ...exam,
      urgencyScore: calculateUrgencyScore(exam, mandatoryTopics)
    }));

    // Sort exams by urgency
    const sortedExams = sortByUrgency(examsWithUrgency);

    // Calculate stress scores (single pass)
    const stressScores = exams.map(exam => 
      calculateStressScore(exam, studentProfile, majorCommitments)
    );

    // Calculate average stress score (optimized)
    const avgStressScore = stressScores.length > 0
      ? stressScores.reduce((sum, score) => sum + score, 0) / stressScores.length
      : 0;

    // Calculate energy score (depends on stress)
    const energyScore = calculateEnergyScore(studentProfile, avgStressScore);

    // Calculate stress forecast (only if needed)
    const stressForecast = calculateStressForecast(
      exams,
      studentProfile,
      majorCommitments,
      30
    );

    // Find min/max days remaining (single pass)
    let minDaysRemaining = Infinity;
    let maxDaysRemaining = -Infinity;
    let totalStudyHours = 0;
    let totalConfidence = 0;
    let totalDifficulty = 0;

    examsWithDays.forEach(exam => {
      const days = exam.daysRemaining;
      if (days < minDaysRemaining) minDaysRemaining = days;
      if (days > maxDaysRemaining) maxDaysRemaining = days;
      totalStudyHours += studentProfile.studyHoursPerDay * days;
      totalConfidence += exam.confidence;
      totalDifficulty += exam.difficulty;
    });

    // Calculate productivity zones (only once)
    const productivityZones = calculateProductivityZones(
      studentProfile.preferredStudyWindow,
      energyScore,
      studentProfile.studyHoursPerDay,
      minDaysRemaining
    );

    // Projected performance
    const avgConfidence = totalConfidence / exams.length;
    const avgDifficulty = totalDifficulty / exams.length;
    const projectedPerformance = Math.max(0, Math.min(100, 
      ((avgConfidence / 5) * 100) - ((avgDifficulty - 3) * 10)
    ));

    // Find peak stress day (single pass)
    let peakStressDay = stressForecast[0] || { date: '', stressScore: 0 };
    stressForecast.forEach(day => {
      if (day.stressScore > peakStressDay.stressScore) {
        peakStressDay = day;
      }
    });

    // Find best productivity window (single pass)
    let bestWindow = { time: '', score: 0 };
    Object.entries(productivityZones).forEach(([time, score]) => {
      if (score > bestWindow.score) {
        bestWindow = { time, score };
      }
    });

    return {
      exams: sortedExams,
      overview: {
        totalExams: exams.length,
        daysRemaining: minDaysRemaining,
        maxDaysRemaining,
        totalStudyHours,
        projectedPerformance
      },
      cramHeatMap: {
        exams: sortedExams
      },
      brainEnergy: {
        energyScore,
        burnoutRisk: energyScore < 30 ? 'High' : energyScore < 60 ? 'Medium' : 'Low'
      },
      stressForecast: {
        currentStress: avgStressScore,
        forecast: stressForecast,
        peakStressDay
      },
      productivityZones: {
        zones: productivityZones,
        bestWindow
      }
    };
  }, [planData]);

  return intelligence;
};

