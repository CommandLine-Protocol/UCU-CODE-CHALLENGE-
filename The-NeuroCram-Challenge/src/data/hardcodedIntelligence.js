/**
 * Hardcoded intelligence data for instant display (admin/testing)
 * This skips all calculations for immediate module rendering
 */

export const hardcodedIntelligenceData = {
  exams: [
    {
      id: 'exam-1',
      subject: 'Mathematics',
      examDate: '2025-04-15',
      difficulty: 4,
      confidence: 2,
      questionTypes: ['MCQ', 'Theory'],
      priorityGoal: 'High grade',
      urgencyScore: 85,
      daysRemaining: 15
    },
    {
      id: 'exam-2',
      subject: 'Physics',
      examDate: '2025-04-20',
      difficulty: 5,
      confidence: 3,
      questionTypes: ['MCQ', 'Numerical'],
      priorityGoal: 'Pass',
      urgencyScore: 78,
      daysRemaining: 20
    },
    {
      id: 'exam-3',
      subject: 'Chemistry',
      examDate: '2025-04-18',
      difficulty: 3,
      confidence: 4,
      questionTypes: ['MCQ'],
      priorityGoal: 'Improve',
      urgencyScore: 65,
      daysRemaining: 18
    },
    {
      id: 'exam-4',
      subject: 'Biology',
      examDate: '2025-04-25',
      difficulty: 3,
      confidence: 3,
      questionTypes: ['Theory', 'MCQ'],
      priorityGoal: 'High grade',
      urgencyScore: 58,
      daysRemaining: 25
    }
  ],
  overview: {
    totalExams: 4,
    daysRemaining: 15,
    maxDaysRemaining: 25,
    totalStudyHours: 600,
    projectedPerformance: 68
  },
  cramHeatMap: {
    exams: [
      {
        id: 'exam-1',
        subject: 'Mathematics',
        examDate: '2025-04-15',
        difficulty: 4,
        confidence: 2,
        questionTypes: ['MCQ', 'Theory'],
        priorityGoal: 'High grade',
        urgencyScore: 85,
        daysRemaining: 15
      },
      {
        id: 'exam-2',
        subject: 'Physics',
        examDate: '2025-04-20',
        difficulty: 5,
        confidence: 3,
        questionTypes: ['MCQ', 'Numerical'],
        priorityGoal: 'Pass',
        urgencyScore: 78,
        daysRemaining: 20
      },
      {
        id: 'exam-3',
        subject: 'Chemistry',
        examDate: '2025-04-18',
        difficulty: 3,
        confidence: 4,
        questionTypes: ['MCQ'],
        priorityGoal: 'Improve',
        urgencyScore: 65,
        daysRemaining: 18
      },
      {
        id: 'exam-4',
        subject: 'Biology',
        examDate: '2025-04-25',
        difficulty: 3,
        confidence: 3,
        questionTypes: ['Theory', 'MCQ'],
        priorityGoal: 'High grade',
        urgencyScore: 58,
        daysRemaining: 25
      }
    ]
  },
  brainEnergy: {
    energyScore: 72,
    burnoutRisk: 'Low'
  },
  stressForecast: {
    currentStress: 45,
    forecast: [
      { date: '2025-04-01', stressScore: 30 },
      { date: '2025-04-02', stressScore: 32 },
      { date: '2025-04-03', stressScore: 35 },
      { date: '2025-04-04', stressScore: 38 },
      { date: '2025-04-05', stressScore: 40 },
      { date: '2025-04-06', stressScore: 42 },
      { date: '2025-04-07', stressScore: 43 },
      { date: '2025-04-08', stressScore: 44 },
      { date: '2025-04-09', stressScore: 45 },
      { date: '2025-04-10', stressScore: 46 },
      { date: '2025-04-11', stressScore: 48 },
      { date: '2025-04-12', stressScore: 50 },
      { date: '2025-04-13', stressScore: 52 },
      { date: '2025-04-14', stressScore: 55 },
      { date: '2025-04-15', stressScore: 60 },
      { date: '2025-04-16', stressScore: 58 },
      { date: '2025-04-17', stressScore: 56 },
      { date: '2025-04-18', stressScore: 62 },
      { date: '2025-04-19', stressScore: 60 },
      { date: '2025-04-20', stressScore: 65 },
      { date: '2025-04-21', stressScore: 63 },
      { date: '2025-04-22', stressScore: 61 },
      { date: '2025-04-23', stressScore: 59 },
      { date: '2025-04-24', stressScore: 57 },
      { date: '2025-04-25', stressScore: 70 },
      { date: '2025-04-26', stressScore: 55 },
      { date: '2025-04-27', stressScore: 50 },
      { date: '2025-04-28', stressScore: 45 },
      { date: '2025-04-29', stressScore: 40 },
      { date: '2025-04-30', stressScore: 35 }
    ],
    peakStressDay: {
      date: '2025-04-25',
      stressScore: 70
    }
  },
  productivityZones: {
    zones: {
      '6-9': 45,
      '9-12': 55,
      '12-15': 60,
      '15-18': 65,
      '18-21': 85,
      '21-24': 90
    },
    bestWindow: {
      time: '21-24',
      score: 90
    }
  }
};

