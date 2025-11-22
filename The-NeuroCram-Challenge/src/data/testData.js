/**
 * Test data for NeuroCram application
 * Use this data to quickly test the intelligence modules
 */

export const testPlanData = {
  exams: [
    {
      id: 'exam-1',
      subject: 'Mathematics',
      examDate: '2025-04-15',
      difficulty: 4,
      confidence: 2,
      questionTypes: ['MCQ', 'Theory'],
      priorityGoal: 'High grade'
    },
    {
      id: 'exam-2',
      subject: 'Physics',
      examDate: '2025-04-20',
      difficulty: 5,
      confidence: 3,
      questionTypes: ['MCQ', 'Numerical'],
      priorityGoal: 'Pass'
    },
    {
      id: 'exam-3',
      subject: 'Chemistry',
      examDate: '2025-04-18',
      difficulty: 3,
      confidence: 4,
      questionTypes: ['MCQ'],
      priorityGoal: 'Improve'
    },
    {
      id: 'exam-4',
      subject: 'Biology',
      examDate: '2025-04-25',
      difficulty: 3,
      confidence: 3,
      questionTypes: ['Theory', 'MCQ'],
      priorityGoal: 'High grade'
    }
  ],
  studentProfile: {
    studyHoursPerDay: 6,
    preferredStudyWindow: 'Night',
    stressLevel: 'Medium',
    averageSleepHours: 7.5,
    pastScore: 72
  },
  constraints: {
    unavailableDays: ['2025-04-12', '2025-04-19'],
    majorCommitments: ['Work shift', 'Family event'],
    mandatoryTopics: ['Calculus', 'Organic Chemistry'],
    skipTopics: ['Trigonometry']
  }
};

/**
 * Admin user credentials
 */
export const ADMIN_CREDENTIALS = {
  email: 'admin@neurocram.com',
  password: 'adminpass'
};

/**
 * Check if email is admin
 */
export const isAdminUser = (email) => {
  return email === ADMIN_CREDENTIALS.email;
};

