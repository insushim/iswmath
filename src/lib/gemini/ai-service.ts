// src/lib/gemini/ai-service.ts
// Gemini AI를 활용한 학습 서비스

import { generateStructuredOutput, generateText } from './client';
import { PROMPTS, fillTemplate } from './prompts';

// 문제 생성 결과 타입
interface GeneratedProblem {
  problem: {
    content: string;
    type: string;
    options: string[] | null;
    correctAnswer: string;
    difficulty: number;
    estimatedTimeSeconds: number;
    tags: string[];
  };
  solution: {
    steps: Array<{ step: number; description: string; math?: string }>;
    finalAnswer: string;
    keyInsight: string;
  };
  hints: Array<{ level: number; content: string }>;
  commonMistakes: Array<{ mistake: string; reason: string; correction: string }>;
}

// 개념 설명 결과 타입
interface ConceptExplanation {
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
  checkQuestions: Array<{ question: string; answer: string }>;
  commonConfusions: string[];
  nextSteps: string;
}

// AI 문제 생성
export async function generateProblem(
  conceptName: string,
  conceptId: string,
  gradeLevel: number,
  targetDifficulty: number,
  problemType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' = 'MULTIPLE_CHOICE',
  studentLevel?: number,
  recentErrors?: string[]
): Promise<GeneratedProblem> {
  const prompt = fillTemplate(PROMPTS.PROBLEM_GENERATION.GENERATE, {
    conceptName,
    conceptId,
    gradeLevel,
    targetDifficulty,
    problemType,
    studentLevel: studentLevel || targetDifficulty,
    recentErrors: recentErrors?.join(', ') || '없음',
  });

  const schema = {
    problem: {
      content: 'string',
      type: 'string',
      options: ['string'] as string[] | null,
      correctAnswer: 'string',
      difficulty: 0,
      estimatedTimeSeconds: 0,
      tags: ['string'],
    },
    solution: {
      steps: [{ step: 0, description: 'string', math: 'string' }],
      finalAnswer: 'string',
      keyInsight: 'string',
    },
    hints: [{ level: 0, content: 'string' }],
    commonMistakes: [{ mistake: 'string', reason: 'string', correction: 'string' }],
  };

  return generateStructuredOutput<GeneratedProblem>(prompt, schema, false);
}

// 개념 설명 생성
export async function explainConcept(
  conceptName: string,
  gradeLevel: number,
  prerequisites: string[],
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' = 'visual',
  currentMastery: number = 0,
  difficulties: string[] = []
): Promise<ConceptExplanation> {
  const prompt = fillTemplate(PROMPTS.EXPLANATION.EXPLAIN_CONCEPT, {
    conceptName,
    gradeLevel,
    prerequisites: prerequisites.join(', ') || '없음',
    learningStyle,
    currentMastery: `${currentMastery}%`,
    difficulties: difficulties.join(', ') || '없음',
  });

  const schema = {
    introduction: 'string',
    mainExplanation: {
      sections: [{
        title: 'string',
        content: 'string',
        example: 'string',
        visualDescription: 'string',
      }],
    },
    realLifeApplications: ['string'],
    summary: 'string',
    checkQuestions: [{ question: 'string', answer: 'string' }],
    commonConfusions: ['string'],
    nextSteps: 'string',
  };

  return generateStructuredOutput<ConceptExplanation>(prompt, schema, false);
}

// 답안 평가
export async function evaluateAnswer(
  problem: string,
  correctAnswer: string,
  studentAnswer: string
): Promise<{
  isCorrect: boolean;
  partialCredit: number;
  errorType: string | null;
  errorDetail: string | null;
  feedback: {
    encouraging: string;
    corrective: string | null;
    nextStep: string;
  };
}> {
  const prompt = fillTemplate(PROMPTS.EVALUATION.EVALUATE_ANSWER, {
    problem,
    correctAnswer,
    studentAnswer,
  });

  return generateStructuredOutput(prompt, {
    isCorrect: true,
    partialCredit: 0,
    errorType: 'string',
    errorDetail: 'string',
    feedback: {
      encouraging: 'string',
      corrective: 'string',
      nextStep: 'string',
    },
  }, true);
}

// 힌트 생성
export async function generateHint(
  problem: string,
  answer: string,
  solution: string,
  hintLevel: 1 | 2 | 3,
  studentAttempt?: string
): Promise<{
  hint: string;
  relatedConcept?: string;
  visualAid?: string;
  encouragement: string;
}> {
  const prompt = fillTemplate(PROMPTS.HINT.GENERATE, {
    problem,
    answer,
    solution,
    hintLevel,
    studentAttempt: studentAttempt || '아직 시도하지 않음',
  });

  return generateStructuredOutput(prompt, {
    hint: 'string',
    relatedConcept: 'string',
    visualAid: 'string',
    encouragement: 'string',
  }, true);
}

// 학습 경로 추천
export async function recommendLearningPath(
  currentLevel: number,
  targetLevel: number,
  strengths: string[],
  weaknesses: string[],
  weeklyHours: number,
  targetWeeks: number
): Promise<{
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
}> {
  const prompt = fillTemplate(PROMPTS.RECOMMENDATION.LEARNING_PATH, {
    currentLevel,
    targetLevel,
    strengths: strengths.join(', ') || '분석 중',
    weaknesses: weaknesses.join(', ') || '분석 중',
    weeklyHours,
    targetWeeks,
  });

  return generateStructuredOutput(prompt, {
    path: [{
      week: 0,
      concepts: ['string'],
      goals: ['string'],
      estimatedHours: 0,
      milestone: 'string',
    }],
    totalEstimatedWeeks: 0,
    keyMilestones: ['string'],
    motivationalTips: ['string'],
  }, false);
}

// 간단한 격려 메시지 생성
export async function generateEncouragement(
  studentName: string,
  streak: number,
  correctRate: number,
  recentAchievement?: string
): Promise<string> {
  const prompt = `
당신은 친절한 수학 튜터입니다. 학생에게 짧은 격려 메시지를 작성해주세요.

학생 이름: ${studentName}
연속 학습일: ${streak}일
최근 정답률: ${correctRate}%
${recentAchievement ? `최근 성취: ${recentAchievement}` : ''}

요구사항:
- 한국어로 작성
- 2-3문장으로 짧게
- 긍정적이고 따뜻한 톤
- 구체적인 성과 언급
`;

  return generateText(prompt, true);
}

// 진단 문제 생성
export async function generateDiagnosticProblem(
  gradeRange: string,
  estimatedLevel: number,
  coveredConcepts: string[],
  nextTarget: string
): Promise<{
  problem: {
    content: string;
    type: string;
    options: string[];
    correctAnswer: number;
    difficulty: number;
    conceptId: string;
    conceptName: string;
    expectedTimeSeconds: number;
  };
  diagnosticPurpose: string;
}> {
  const prompt = fillTemplate(PROMPTS.DIAGNOSTIC.GENERATE_DIAGNOSTIC, {
    gradeRange,
    estimatedLevel,
    coveredConcepts: coveredConcepts.join(', ') || '없음',
    nextTarget,
  });

  return generateStructuredOutput(prompt, {
    problem: {
      content: 'string',
      type: 'string',
      options: ['string'],
      correctAnswer: 0,
      difficulty: 0,
      conceptId: 'string',
      conceptName: 'string',
      expectedTimeSeconds: 0,
    },
    diagnosticPurpose: 'string',
  }, false);
}
