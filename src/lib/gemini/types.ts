// src/lib/gemini/types.ts

export interface GeneratedProblem {
  problem: {
    content: string;
    type: string;
    options: string[] | null;
    correctAnswer: string | number;
    difficulty: number;
    estimatedTimeSeconds: number;
    tags: string[];
  };
  solution: {
    steps: Array<{
      step: number;
      description: string;
      math?: string;
    }>;
    finalAnswer: string;
    keyInsight: string;
  };
  hints: Array<{
    level: number;
    content: string;
  }>;
  commonMistakes: Array<{
    mistake: string;
    reason: string;
    correction: string;
  }>;
}

export interface DiagnosticAnalysis {
  estimatedLevel: number;
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  prerequisitesNeeded: Array<{
    conceptId: string;
    name: string;
    reason: string;
  }>;
  recommendedStartConcept: string;
  detailedAnalysis: string;
}

export interface EvaluationResult {
  isCorrect: boolean;
  partialCredit: number;
  errorType: string | null;
  errorDetail: string | null;
  feedback: {
    encouraging: string;
    corrective: string | null;
    nextStep: string;
  };
  conceptMasteryImpact: number;
  suggestedReview: string[] | null;
}

export interface NextRecommendation {
  recommendation: 'CONTINUE' | 'LEVEL_UP' | 'LEVEL_DOWN' | 'PREREQUISITE' | 'MASTERED';
  nextDifficulty: number;
  nextConceptId: string | null;
  reason: string;
  encouragement: string;
}

export interface PrerequisiteCheck {
  readyToLearn: boolean;
  missingPrerequisites: Array<{
    conceptId: string;
    conceptName: string;
    currentMastery: number;
    requiredMastery: number;
    estimatedCatchUpTime: number;
  }>;
  recommendedOrder: string[];
  alternativePath?: string;
}

export interface LearningPathRecommendation {
  path: Array<{
    week: number;
    concepts: string[];
    goals: string[];
    estimatedHours: number;
    milestone: string;
  }>;
  totalEstimatedWeeks: number;
  keyMilestones: string[];
  motivationalTips: string[];
}

export interface HintResponse {
  hint: string;
  relatedConcept?: string;
  visualAid?: string;
  encouragement: string;
}

export interface ConceptExplanation {
  introduction: string;
  mainExplanation: {
    sections: Array<{
      title: string;
      content: string;
      example: string;
      visualDescription?: string;
    }>;
  };
  realLifeApplications: string[];
  summary: string;
  checkQuestions: Array<{
    question: string;
    answer: string;
  }>;
  commonConfusions: string[];
  nextSteps: string;
}
