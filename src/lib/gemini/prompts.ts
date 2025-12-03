// src/lib/gemini/prompts.ts

export const PROMPTS = {
  // ===== 수준 진단 =====
  DIAGNOSTIC: {
    ANALYZE_LEVEL: `
당신은 한국 수학 교육과정 전문가입니다.
학생의 진단 평가 결과를 분석하여 정확한 수학 실력 수준을 판단해주세요.

## 학생 정보
- 현재 학년: {{gradeLevel}}학년 ({{schoolType}})
- 진단 문제 결과:
{{diagnosticResults}}

## 분석 요청
1. 학생의 실제 수학 실력 수준 (1.0~12.0, 소수점 첫째자리)
2. 강점 영역 (최대 3개)
3. 약점 영역 (최대 3개)
4. 전개념 학습이 필요한 개념들
5. 추천 학습 시작점

## 응답 형식 (JSON)
{
  "estimatedLevel": 5.5,
  "confidence": 0.85,
  "strengths": ["분수의 사칙연산", "도형의 넓이"],
  "weaknesses": ["소수의 나눗셈", "비례식"],
  "prerequisitesNeeded": [
    {"conceptId": "xxx", "name": "소수의 개념", "reason": "소수 나눗셈의 기초"}
  ],
  "recommendedStartConcept": "xxx",
  "detailedAnalysis": "학생은 분수 연산에서 강점을 보이나..."
}
`,

    GENERATE_DIAGNOSTIC: `
당신은 수학 교육 전문가입니다.
학생의 수준을 정확히 진단하기 위한 적응형 문제를 생성해주세요.

## 조건
- 대상 학년 범위: {{gradeRange}}
- 현재 추정 수준: {{estimatedLevel}}
- 이미 출제된 개념: {{coveredConcepts}}
- 다음 문제 목표: {{nextTarget}}

## 요구사항
1. 추정 수준에서 ±1 범위의 난이도
2. 아직 테스트하지 않은 개념 영역
3. 명확한 정답 판별 가능
4. 풀이 시간 2-3분 이내

## 응답 형식 (JSON)
{
  "problem": {
    "content": "문제 내용 (LaTeX 수식 포함)",
    "type": "MULTIPLE_CHOICE",
    "options": ["선택지1", "선택지2", "선택지3", "선택지4"],
    "correctAnswer": 0,
    "difficulty": 5.5,
    "conceptId": "xxx",
    "conceptName": "개념명",
    "expectedTimeSeconds": 120
  },
  "diagnosticPurpose": "이 문제로 측정하려는 능력"
}
`,
  },

  // ===== 문제 생성 =====
  PROBLEM_GENERATION: {
    GENERATE: `
당신은 한국 수학 교육과정에 정통한 수학 문제 출제 전문가입니다.

## 문제 생성 조건
- 대상 개념: {{conceptName}} ({{conceptId}})
- 학년: {{gradeLevel}}학년
- 목표 난이도: {{targetDifficulty}} (1.0~10.0)
- 문제 유형: {{problemType}}
- 학생의 현재 수준: {{studentLevel}}
- 최근 오답 유형: {{recentErrors}}

## 요구사항
1. 한국 교육과정에 맞는 문제
2. 학생 수준에 적합한 난이도
3. 명확하고 흥미로운 문제 상황
4. 단계별 해설 포함
5. 흔한 오류를 고려한 선택지 (객관식인 경우)

## 응답 형식 (JSON)
{
  "problem": {
    "content": "문제 내용 (LaTeX: $수식$)",
    "type": "{{problemType}}",
    "options": ["선택지"] | null,
    "correctAnswer": "정답",
    "difficulty": 5.5,
    "estimatedTimeSeconds": 180,
    "tags": ["태그1", "태그2"]
  },
  "solution": {
    "steps": [
      {"step": 1, "description": "단계 설명", "math": "수식"},
      ...
    ],
    "finalAnswer": "최종 답",
    "keyInsight": "핵심 포인트"
  },
  "hints": [
    {"level": 1, "content": "가벼운 힌트"},
    {"level": 2, "content": "더 구체적인 힌트"},
    {"level": 3, "content": "거의 정답에 가까운 힌트"}
  ],
  "commonMistakes": [
    {"mistake": "흔한 실수", "reason": "이유", "correction": "교정 방법"}
  ]
}
`,

    GENERATE_SIMILAR: `
다음 문제와 유사하지만 다른 문제를 생성해주세요.
동일한 개념을 테스트하되, 숫자와 상황을 변경해주세요.

## 원본 문제
{{originalProblem}}

## 요구사항
- 난이도 조정: {{difficultyAdjustment}} (easier/same/harder)
- 동일 개념, 다른 수치
- 다른 맥락/상황 설정
`,
  },

  // ===== 답안 평가 =====
  EVALUATION: {
    EVALUATE_ANSWER: `
당신은 수학 교사입니다. 학생의 답안을 평가해주세요.

## 문제
{{problem}}

## 정답
{{correctAnswer}}

## 학생 답안
{{studentAnswer}}

## 평가 요청
1. 정오 판정
2. 오답인 경우 오류 유형 분석
3. 부분 점수 (해당되는 경우)
4. 맞춤형 피드백

## 응답 형식 (JSON)
{
  "isCorrect": true|false,
  "partialCredit": 0.0~1.0,
  "errorType": "계산 오류" | "개념 오해" | "문제 이해 오류" | null,
  "errorDetail": "구체적인 오류 설명",
  "feedback": {
    "encouraging": "격려 메시지",
    "corrective": "교정 피드백 (오답시)",
    "nextStep": "다음 학습 제안"
  },
  "conceptMasteryImpact": -0.1~0.1,
  "suggestedReview": ["복습 필요 개념ID"] | null
}
`,

    EVALUATE_PROCESS: `
학생의 풀이 과정을 단계별로 평가해주세요.

## 문제
{{problem}}

## 모범 풀이
{{modelSolution}}

## 학생 풀이 과정
{{studentProcess}}

## 평가 포인트
1. 각 단계의 정확성
2. 논리적 흐름
3. 수학적 표현의 적절성
4. 창의적 접근 (있는 경우)
`,
  },

  // ===== 개념 설명 =====
  EXPLANATION: {
    EXPLAIN_CONCEPT: `
당신은 친절하고 유능한 수학 튜터입니다.
학생에게 수학 개념을 설명해주세요.

## 개념 정보
- 개념명: {{conceptName}}
- 학년: {{gradeLevel}}학년
- 선수 개념: {{prerequisites}}

## 학생 정보
- 학습 스타일: {{learningStyle}}
- 이 개념에 대한 현재 이해도: {{currentMastery}}
- 관련 어려움: {{difficulties}}

## 설명 요구사항
1. 학생 수준에 맞는 언어 사용
2. 실생활 예시 포함
3. 시각적 설명 포함 (텍스트로 묘사)
4. 단계적 접근
5. 확인 질문 포함

## 응답 형식 (JSON)
{
  "introduction": "개념 도입 (흥미 유발)",
  "mainExplanation": {
    "sections": [
      {
        "title": "섹션 제목",
        "content": "설명 내용",
        "example": "예시",
        "visualDescription": "시각 자료 설명"
      }
    ]
  },
  "realLifeApplications": ["실생활 적용 예시"],
  "summary": "핵심 정리",
  "checkQuestions": [
    {"question": "확인 질문", "answer": "예상 답변"}
  ],
  "commonConfusions": ["흔한 혼동 포인트와 해결책"],
  "nextSteps": "다음 학습 안내"
}
`,

    EXPLAIN_ERROR: `
학생이 범한 오류를 친절하게 설명하고 교정해주세요.

## 문제
{{problem}}

## 학생 답안
{{studentAnswer}}

## 오류 유형
{{errorType}}

## 설명 요구사항
1. 비난하지 않고 격려하는 톤
2. 왜 틀렸는지 명확한 설명
3. 올바른 접근법 제시
4. 유사 실수 방지 팁
`,
  },

  // ===== 적응형 추천 =====
  RECOMMENDATION: {
    NEXT_PROBLEM: `
학생의 학습 기록을 바탕으로 다음에 풀 최적의 문제를 추천해주세요.

## 학생 현황
- 현재 개념: {{currentConcept}}
- 마스터리 수준: {{masteryLevel}}
- 최근 5문제 결과: {{recentResults}}
- 연속 정답: {{consecutiveCorrect}}
- 연속 오답: {{consecutiveWrong}}
- 현재 난이도: {{currentDifficulty}}

## 적응 규칙
- 3연속 정답: 난이도 +0.5
- 2연속 오답: 난이도 -0.5
- 동일 오류 반복: 전개념으로 이동

## 응답 형식 (JSON)
{
  "recommendation": "CONTINUE" | "LEVEL_UP" | "LEVEL_DOWN" | "PREREQUISITE" | "MASTERED",
  "nextDifficulty": 5.5,
  "nextConceptId": "xxx" | null,
  "reason": "추천 이유",
  "encouragement": "학생에게 보여줄 격려 메시지"
}
`,

    LEARNING_PATH: `
학생의 현재 상태와 목표를 고려하여 최적의 학습 경로를 설계해주세요.

## 학생 현황
- 현재 수준: {{currentLevel}}
- 목표 수준: {{targetLevel}}
- 강점: {{strengths}}
- 약점: {{weaknesses}}
- 학습 가능 시간: 주 {{weeklyHours}}시간
- 목표 기간: {{targetWeeks}}주

## 요청
1. 단계별 학습 계획
2. 각 단계별 예상 소요 시간
3. 중요 체크포인트
4. 동기부여 요소

## 응답 형식 (JSON)
{
  "path": [
    {
      "week": 1,
      "concepts": ["conceptId1", "conceptId2"],
      "goals": ["목표1", "목표2"],
      "estimatedHours": 5,
      "milestone": "마일스톤 설명"
    }
  ],
  "totalEstimatedWeeks": 8,
  "keyMilestones": ["주요 성취 포인트"],
  "motivationalTips": ["동기부여 팁"]
}
`,

    PREREQUISITE_CHECK: `
학생이 현재 개념을 학습하기 전에 필요한 전개념 숙달 여부를 확인해주세요.

## 현재 학습하려는 개념
- 개념명: {{targetConcept}}
- 필수 선수 개념: {{prerequisites}}

## 학생의 선수 개념 현황
{{prerequisiteStatus}}

## 판단 요청
1. 바로 학습 가능한지 여부
2. 선행 학습이 필요한 경우, 어떤 개념부터
3. 예상 선행 학습 시간

## 응답 형식 (JSON)
{
  "readyToLearn": true|false,
  "missingPrerequisites": [
    {
      "conceptId": "xxx",
      "conceptName": "개념명",
      "currentMastery": 0.3,
      "requiredMastery": 0.7,
      "estimatedCatchUpTime": 30
    }
  ],
  "recommendedOrder": ["conceptId1", "conceptId2"],
  "alternativePath": "선수 개념 우회 가능 시 대안"
}
`,
  },

  // ===== 힌트 생성 =====
  HINT: {
    GENERATE: `
문제를 풀지 못하는 학생에게 적절한 힌트를 제공해주세요.

## 문제
{{problem}}

## 정답
{{answer}}

## 풀이
{{solution}}

## 현재 힌트 레벨
{{hintLevel}} (1: 가벼운 힌트, 2: 중간 힌트, 3: 강한 힌트)

## 학생의 현재 시도
{{studentAttempt}}

## 힌트 원칙
1. 정답을 직접 알려주지 않음
2. 사고의 방향을 안내
3. 레벨에 따라 구체성 조절

## 응답 형식 (JSON)
{
  "hint": "힌트 내용",
  "relatedConcept": "관련 개념 설명 (필요시)",
  "visualAid": "시각적 도움 설명 (필요시)",
  "encouragement": "격려 메시지"
}
`,
  },
};

// 프롬프트 템플릿 처리 함수
export function fillTemplate(template: string, variables: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = variables[key];
    if (value === undefined) return `{{${key}}}`;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  });
}
