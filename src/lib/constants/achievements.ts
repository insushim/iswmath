// src/lib/constants/achievements.ts

export type AchievementConditionType =
  | 'PROBLEMS_SOLVED'
  | 'STREAK_DAYS'
  | 'CONCEPTS_MASTERED'
  | 'CONSECUTIVE_CORRECT'
  | 'OVERALL_ACCURACY'
  | 'SPEED_SOLVE'
  | 'DAILY_PROBLEMS'
  | 'TIME_BASED'
  | 'COMEBACK'
  | 'GRADE_LEVEL_UP'
  | 'DOMAIN_COMPLETED'
  | 'TOTAL_XP'
  | 'LEVEL_REACHED';

export interface AchievementCondition {
  type: AchievementConditionType;
  count?: number;
  threshold?: number;
  ratio?: number;
  time?: 'EARLY_MORNING' | 'MIDNIGHT' | 'WEEKEND';
}

export interface Achievement {
  code: string;
  name: string;
  description: string;
  category: 'LEARNING' | 'STREAK' | 'MASTERY' | 'SPEED' | 'ACCURACY' | 'SOCIAL' | 'SPECIAL';
  condition: AchievementCondition;
  xpReward: number;
  coinReward?: number;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
}

export const ACHIEVEMENTS: Achievement[] = [
  // ===== 학습 관련 =====
  {
    code: 'FIRST_PROBLEM',
    name: '첫 발걸음',
    description: '첫 번째 문제를 풀었습니다!',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 1 },
    xpReward: 10,
    rarity: 'COMMON',
  },
  {
    code: 'PROBLEM_SOLVER_10',
    name: '문제 사냥꾼',
    description: '10개의 문제를 풀었습니다',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 10 },
    xpReward: 20,
    rarity: 'COMMON',
  },
  {
    code: 'PROBLEM_SOLVER_50',
    name: '문제 탐험가',
    description: '50개의 문제를 풀었습니다',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 50 },
    xpReward: 35,
    rarity: 'COMMON',
  },
  {
    code: 'PROBLEM_SOLVER_100',
    name: '문제 정복자',
    description: '100개의 문제를 풀었습니다',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 100 },
    xpReward: 50,
    rarity: 'UNCOMMON',
  },
  {
    code: 'PROBLEM_SOLVER_500',
    name: '문제 전문가',
    description: '500개의 문제를 풀었습니다',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 500 },
    xpReward: 100,
    rarity: 'RARE',
  },
  {
    code: 'PROBLEM_SOLVER_1000',
    name: '문제 마스터',
    description: '1000개의 문제를 풀었습니다',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 1000 },
    xpReward: 200,
    rarity: 'EPIC',
  },
  {
    code: 'PROBLEM_SOLVER_5000',
    name: '문제의 신',
    description: '5000개의 문제를 풀었습니다',
    category: 'LEARNING',
    condition: { type: 'PROBLEMS_SOLVED', count: 5000 },
    xpReward: 500,
    rarity: 'LEGENDARY',
  },

  // ===== 연속 학습 =====
  {
    code: 'STREAK_3',
    name: '시작이 반',
    description: '3일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 3 },
    xpReward: 20,
    coinReward: 10,
    rarity: 'COMMON',
  },
  {
    code: 'STREAK_7',
    name: '일주일의 약속',
    description: '7일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 7 },
    xpReward: 50,
    coinReward: 20,
    rarity: 'UNCOMMON',
  },
  {
    code: 'STREAK_14',
    name: '2주의 끈기',
    description: '14일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 14 },
    xpReward: 80,
    coinReward: 50,
    rarity: 'UNCOMMON',
  },
  {
    code: 'STREAK_30',
    name: '한 달의 습관',
    description: '30일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 30 },
    xpReward: 150,
    coinReward: 100,
    rarity: 'RARE',
  },
  {
    code: 'STREAK_60',
    name: '두 달의 의지',
    description: '60일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 60 },
    xpReward: 250,
    coinReward: 200,
    rarity: 'EPIC',
  },
  {
    code: 'STREAK_100',
    name: '불굴의 의지',
    description: '100일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 100 },
    xpReward: 500,
    coinReward: 500,
    rarity: 'LEGENDARY',
  },
  {
    code: 'STREAK_365',
    name: '1년의 기적',
    description: '365일 연속 학습 달성!',
    category: 'STREAK',
    condition: { type: 'STREAK_DAYS', count: 365 },
    xpReward: 2000,
    coinReward: 2000,
    rarity: 'LEGENDARY',
  },

  // ===== 마스터리 =====
  {
    code: 'CONCEPT_MASTER_1',
    name: '개념 정복자',
    description: '첫 번째 개념 마스터!',
    category: 'MASTERY',
    condition: { type: 'CONCEPTS_MASTERED', count: 1 },
    xpReward: 30,
    rarity: 'COMMON',
  },
  {
    code: 'CONCEPT_MASTER_5',
    name: '개념 탐험가',
    description: '5개의 개념 마스터!',
    category: 'MASTERY',
    condition: { type: 'CONCEPTS_MASTERED', count: 5 },
    xpReward: 60,
    rarity: 'COMMON',
  },
  {
    code: 'CONCEPT_MASTER_10',
    name: '개념 수집가',
    description: '10개의 개념 마스터!',
    category: 'MASTERY',
    condition: { type: 'CONCEPTS_MASTERED', count: 10 },
    xpReward: 100,
    rarity: 'UNCOMMON',
  },
  {
    code: 'CONCEPT_MASTER_25',
    name: '개념 전문가',
    description: '25개의 개념 마스터!',
    category: 'MASTERY',
    condition: { type: 'CONCEPTS_MASTERED', count: 25 },
    xpReward: 200,
    rarity: 'RARE',
  },
  {
    code: 'CONCEPT_MASTER_50',
    name: '개념 대가',
    description: '50개의 개념 마스터!',
    category: 'MASTERY',
    condition: { type: 'CONCEPTS_MASTERED', count: 50 },
    xpReward: 400,
    rarity: 'EPIC',
  },
  {
    code: 'DOMAIN_MASTER',
    name: '영역 정복자',
    description: '하나의 수학 영역 완전 정복!',
    category: 'MASTERY',
    condition: { type: 'DOMAIN_COMPLETED', count: 1 },
    xpReward: 200,
    coinReward: 100,
    rarity: 'RARE',
  },

  // ===== 정확도 =====
  {
    code: 'PERFECT_5',
    name: '정확무쌍',
    description: '5문제 연속 정답!',
    category: 'ACCURACY',
    condition: { type: 'CONSECUTIVE_CORRECT', count: 5 },
    xpReward: 20,
    rarity: 'COMMON',
  },
  {
    code: 'PERFECT_10',
    name: '완벽주의자',
    description: '10문제 연속 정답!',
    category: 'ACCURACY',
    condition: { type: 'CONSECUTIVE_CORRECT', count: 10 },
    xpReward: 50,
    rarity: 'UNCOMMON',
  },
  {
    code: 'PERFECT_25',
    name: '무결점',
    description: '25문제 연속 정답!',
    category: 'ACCURACY',
    condition: { type: 'CONSECUTIVE_CORRECT', count: 25 },
    xpReward: 150,
    rarity: 'RARE',
  },
  {
    code: 'PERFECT_50',
    name: '완벽의 경지',
    description: '50문제 연속 정답!',
    category: 'ACCURACY',
    condition: { type: 'CONSECUTIVE_CORRECT', count: 50 },
    xpReward: 300,
    rarity: 'EPIC',
  },
  {
    code: 'ACCURACY_90',
    name: '숙련자',
    description: '전체 정답률 90% 이상 달성! (최소 50문제)',
    category: 'ACCURACY',
    condition: { type: 'OVERALL_ACCURACY', threshold: 0.9 },
    xpReward: 75,
    rarity: 'UNCOMMON',
  },
  {
    code: 'ACCURACY_95',
    name: '명사수',
    description: '전체 정답률 95% 이상 달성! (최소 100문제)',
    category: 'ACCURACY',
    condition: { type: 'OVERALL_ACCURACY', threshold: 0.95 },
    xpReward: 150,
    rarity: 'RARE',
  },
  {
    code: 'ACCURACY_99',
    name: '거의 신',
    description: '전체 정답률 99% 이상 달성! (최소 200문제)',
    category: 'ACCURACY',
    condition: { type: 'OVERALL_ACCURACY', threshold: 0.99 },
    xpReward: 400,
    rarity: 'LEGENDARY',
  },

  // ===== 속도 =====
  {
    code: 'SPEED_DEMON',
    name: '스피드 러너',
    description: '예상 시간의 절반 안에 정답!',
    category: 'SPEED',
    condition: { type: 'SPEED_SOLVE', ratio: 0.5 },
    xpReward: 20,
    rarity: 'UNCOMMON',
  },
  {
    code: 'LIGHTNING',
    name: '번개',
    description: '예상 시간의 25% 안에 정답!',
    category: 'SPEED',
    condition: { type: 'SPEED_SOLVE', ratio: 0.25 },
    xpReward: 50,
    rarity: 'RARE',
  },
  {
    code: 'DAILY_SPRINT',
    name: '오늘의 질주',
    description: '하루에 50문제 풀기!',
    category: 'SPEED',
    condition: { type: 'DAILY_PROBLEMS', count: 50 },
    xpReward: 75,
    rarity: 'UNCOMMON',
  },
  {
    code: 'DAILY_MARATHON',
    name: '마라토너',
    description: '하루에 100문제 풀기!',
    category: 'SPEED',
    condition: { type: 'DAILY_PROBLEMS', count: 100 },
    xpReward: 150,
    rarity: 'RARE',
  },

  // ===== 특별 =====
  {
    code: 'NIGHT_OWL',
    name: '밤의 학자',
    description: '자정 이후에 공부하기',
    category: 'SPECIAL',
    condition: { type: 'TIME_BASED', time: 'MIDNIGHT' },
    xpReward: 15,
    rarity: 'COMMON',
  },
  {
    code: 'EARLY_BIRD',
    name: '아침형 인간',
    description: '오전 6시 전에 공부 시작하기',
    category: 'SPECIAL',
    condition: { type: 'TIME_BASED', time: 'EARLY_MORNING' },
    xpReward: 15,
    rarity: 'COMMON',
  },
  {
    code: 'WEEKEND_WARRIOR',
    name: '주말 전사',
    description: '주말에 공부하기',
    category: 'SPECIAL',
    condition: { type: 'TIME_BASED', time: 'WEEKEND' },
    xpReward: 20,
    rarity: 'COMMON',
  },
  {
    code: 'COMEBACK',
    name: '불사조',
    description: '3문제 연속 오답 후 5문제 연속 정답!',
    category: 'SPECIAL',
    condition: { type: 'COMEBACK' },
    xpReward: 40,
    rarity: 'UNCOMMON',
  },
  {
    code: 'GRADE_UP',
    name: '레벨 업!',
    description: '다음 학년 수준에 도달!',
    category: 'SPECIAL',
    condition: { type: 'GRADE_LEVEL_UP' },
    xpReward: 100,
    coinReward: 50,
    rarity: 'RARE',
  },
  {
    code: 'XP_1000',
    name: '천의 경험',
    description: '총 1000 XP 획득!',
    category: 'SPECIAL',
    condition: { type: 'TOTAL_XP', count: 1000 },
    xpReward: 50,
    rarity: 'COMMON',
  },
  {
    code: 'XP_10000',
    name: '만의 경험',
    description: '총 10000 XP 획득!',
    category: 'SPECIAL',
    condition: { type: 'TOTAL_XP', count: 10000 },
    xpReward: 200,
    rarity: 'RARE',
  },
  {
    code: 'LEVEL_10',
    name: '두 자릿수',
    description: '레벨 10 달성!',
    category: 'SPECIAL',
    condition: { type: 'LEVEL_REACHED', count: 10 },
    xpReward: 50,
    rarity: 'UNCOMMON',
  },
  {
    code: 'LEVEL_25',
    name: '쿼터 센추리',
    description: '레벨 25 달성!',
    category: 'SPECIAL',
    condition: { type: 'LEVEL_REACHED', count: 25 },
    xpReward: 150,
    rarity: 'RARE',
  },
  {
    code: 'LEVEL_50',
    name: '반백',
    description: '레벨 50 달성!',
    category: 'SPECIAL',
    condition: { type: 'LEVEL_REACHED', count: 50 },
    xpReward: 400,
    rarity: 'EPIC',
  },
];

// 업적 코드로 업적 찾기
export function getAchievementByCode(code: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.code === code);
}

// 카테고리별 업적 필터링
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.category === category);
}

// 희귀도별 업적 필터링
export function getAchievementsByRarity(rarity: Achievement['rarity']): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.rarity === rarity);
}
