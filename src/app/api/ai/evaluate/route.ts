// src/app/api/ai/evaluate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredOutput } from '@/lib/gemini/client';
import { PROMPTS, fillTemplate } from '@/lib/gemini/prompts';
import type { EvaluationResult } from '@/lib/gemini/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problem, correctAnswer, studentAnswer } = body;

    // 유효성 검사
    if (!problem || correctAnswer === undefined || studentAnswer === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Gemini API로 답안 평가
    const prompt = fillTemplate(PROMPTS.EVALUATION.EVALUATE_ANSWER, {
      problem: typeof problem === 'string' ? problem : JSON.stringify(problem),
      correctAnswer: typeof correctAnswer === 'string' ? correctAnswer : JSON.stringify(correctAnswer),
      studentAnswer: typeof studentAnswer === 'string' ? studentAnswer : JSON.stringify(studentAnswer),
    });

    const result = await generateStructuredOutput<EvaluationResult>(
      prompt,
      {
        type: 'object',
        properties: {
          isCorrect: { type: 'boolean' },
          partialCredit: { type: 'number' },
          errorType: { type: 'string' },
          errorDetail: { type: 'string' },
          feedback: { type: 'object' },
          conceptMasteryImpact: { type: 'number' },
          suggestedReview: { type: 'array' },
        },
      },
      true // Flash 모델 사용 (빠른 응답)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate answer' },
      { status: 500 }
    );
  }
}
