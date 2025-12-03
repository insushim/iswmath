// src/types/problem.ts

export type ProblemType =
  | 'MULTIPLE_CHOICE'
  | 'SHORT_ANSWER'
  | 'FILL_BLANK'
  | 'TRUE_FALSE'
  | 'MATCHING'
  | 'ORDERING'
  | 'GRAPH_PLOT'
  | 'PROOF'
  | 'WORD_PROBLEM';

export interface ProblemContent {
  text: string;
  latex?: string;
  image?: string;
  audio?: string;
}

export interface ProblemOption {
  id: string;
  content: string;
  isCorrect?: boolean;
}

export interface SolutionStep {
  step: number;
  description: string;
  math?: string;
  explanation?: string;
}

export interface ProblemSolution {
  steps: SolutionStep[];
  finalAnswer: string;
  keyInsight?: string;
}

export interface ProblemHint {
  level: number; // 1-3
  content: string;
}

export interface Problem {
  id: string;
  conceptId: string;
  content: ProblemContent;
  type: ProblemType;
  difficulty: number; // 1.0-10.0
  options?: ProblemOption[];
  answer: string | number | string[];
  solution: ProblemSolution;
  hints: ProblemHint[];
  tags: string[];
  source?: string;
  isGenerated: boolean;
  avgAttempts: number;
  avgTimeSeconds: number;
  correctRate: number;
}

export interface ProblemAttempt {
  id: string;
  studentId: string;
  problemId: string;
  userAnswer: string | number | string[];
  isCorrect: boolean;
  timeSeconds: number;
  hintsUsed: number;
  aiEvaluation?: EvaluationResult;
  errorType?: string;
  xpEarned: number;
  createdAt: Date;
}

export interface EvaluationResult {
  isCorrect: boolean;
  partialCredit: number;
  errorType?: string;
  errorDetail?: string;
  feedback: {
    encouraging: string;
    corrective?: string;
    nextStep: string;
  };
  conceptMasteryImpact: number;
  suggestedReview?: string[];
}

export interface GeneratedProblemData {
  problem: {
    content: string;
    type: ProblemType;
    options?: string[];
    correctAnswer: string | number;
    difficulty: number;
    estimatedTimeSeconds: number;
    tags: string[];
  };
  solution: ProblemSolution;
  hints: ProblemHint[];
  commonMistakes: Array<{
    mistake: string;
    reason: string;
    correction: string;
  }>;
}
