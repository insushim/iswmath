// src/app/api/ai/generate-problem/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredOutput } from '@/lib/gemini/client';
import { PROMPTS, fillTemplate } from '@/lib/gemini/prompts';
import type { GeneratedProblem } from '@/lib/gemini/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      conceptId,
      conceptName,
      gradeLevel,
      targetDifficulty,
      problemType = 'MULTIPLE_CHOICE',
      studentLevel,
      recentErrors = [],
    } = body;

    // 유효성 검사
    if (!conceptId || !conceptName || !gradeLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Gemini API로 문제 생성
    const prompt = fillTemplate(PROMPTS.PROBLEM_GENERATION.GENERATE, {
      conceptName,
      conceptId,
      gradeLevel,
      targetDifficulty: targetDifficulty || 5.0,
      problemType,
      studentLevel: studentLevel || gradeLevel,
      recentErrors,
    });

    const result = await generateStructuredOutput<GeneratedProblem>(prompt, {
      type: 'object',
      properties: {
        problem: { type: 'object' },
        solution: { type: 'object' },
        hints: { type: 'array' },
        commonMistakes: { type: 'array' },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Problem generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate problem' },
      { status: 500 }
    );
  }
}
