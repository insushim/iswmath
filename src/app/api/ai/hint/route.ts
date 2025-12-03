// src/app/api/ai/hint/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredOutput } from '@/lib/gemini/client';
import { PROMPTS, fillTemplate } from '@/lib/gemini/prompts';
import type { HintResponse } from '@/lib/gemini/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problem, answer, solution, hintLevel, studentAttempt = '' } = body;

    // 유효성 검사
    if (!problem || answer === undefined || !hintLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 힌트 레벨 검증 (1-3)
    if (hintLevel < 1 || hintLevel > 3) {
      return NextResponse.json(
        { error: 'Hint level must be between 1 and 3' },
        { status: 400 }
      );
    }

    // Gemini API로 힌트 생성
    const prompt = fillTemplate(PROMPTS.HINT.GENERATE, {
      problem: typeof problem === 'string' ? problem : JSON.stringify(problem),
      answer: typeof answer === 'string' ? answer : JSON.stringify(answer),
      solution: solution ? JSON.stringify(solution) : '제공되지 않음',
      hintLevel,
      studentAttempt: studentAttempt || '시도하지 않음',
    });

    const result = await generateStructuredOutput<HintResponse>(
      prompt,
      {
        type: 'object',
        properties: {
          hint: { type: 'string' },
          relatedConcept: { type: 'string' },
          visualAid: { type: 'string' },
          encouragement: { type: 'string' },
        },
      },
      true // Flash 모델 사용 (빠른 응답)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Hint generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate hint' },
      { status: 500 }
    );
  }
}
