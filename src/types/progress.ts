// src/types/progress.ts

export type ProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'NEEDS_REVIEW' | 'MASTERED';

export interface Progress {
  id: string;
  studentId: string;
  conceptId: string;
  status: ProgressStatus;
  mastery: number; // 0.0-1.0
  totalAttempts: number;
  correctAttempts: number;
  totalTimeSeconds: number;
  currentDifficulty: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  lastStudiedAt?: Date;
  masteredAt?: Date;
}

export interface ProgressWithConcept extends Progress {
  concept: {
    id: string;
    name: string;
    gradeLevel: number;
  };
}

export interface LearningPath {
  id: string;
  studentId: string;
  name: string;
  description?: string;
  isActive: boolean;
  conceptSequence: string[];
  currentIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPathWithDetails extends LearningPath {
  concepts: Array<{
    id: string;
    name: string;
    progress?: Progress;
  }>;
  completionRate: number;
}

export interface DailyGoal {
  id: string;
  studentId: string;
  date: Date;
  targetProblems: number;
  targetMinutes: number;
  targetXP: number;
  completedProblems: number;
  completedMinutes: number;
  earnedXP: number;
  isCompleted: boolean;
}

export interface WeeklyStats {
  weekStart: Date;
  weekEnd: Date;
  totalProblems: number;
  correctProblems: number;
  totalMinutes: number;
  totalXP: number;
  conceptsLearned: number;
  conceptsMastered: number;
  streakMaintained: boolean;
  dailyGoalsCompleted: number;
}

export interface StudySession {
  id: string;
  studentId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  problemsSolved: number;
  xpEarned: number;
  conceptsStudied: string[];
}

export type RecommendationType =
  | 'CONTINUE'
  | 'LEVEL_UP'
  | 'LEVEL_DOWN'
  | 'PREREQUISITE'
  | 'MASTERED';

export interface NextRecommendation {
  type: RecommendationType;
  nextDifficulty: number;
  nextConceptId?: string;
  reason: string;
  encouragement: string;
}
