// src/lib/constants/gamification.ts

export const LEVEL_CONFIG = {
  // 레벨업에 필요한 총 XP (누적)
  levelThresholds: [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    450,    // Level 4
    700,    // Level 5
    1000,   // Level 6
    1400,   // Level 7
    1900,   // Level 8
    2500,   // Level 9
    3200,   // Level 10
    4000,   // Level 11
    5000,   // Level 12
    6200,   // Level 13
    7600,   // Level 14
    9200,   // Level 15
    11000,  // Level 16
    13000,  // Level 17
    15200,  // Level 18
    17600,  // Level 19
    20200,  // Level 20
    23000,  // Level 21
    26000,  // Level 22
    29200,  // Level 23
    32600,  // Level 24
    36200,  // Level 25
    40000,  // Level 26
    44000,  // Level 27
    48200,  // Level 28
    52600,  // Level 29
    57200,  // Level 30
    62000,  // Level 31
    67000,  // Level 32
    72200,  // Level 33
    77600,  // Level 34
    83200,  // Level 35
    89000,  // Level 36
    95000,  // Level 37
    101200, // Level 38
    107600, // Level 39
    114200, // Level 40
    121000, // Level 41
    128000, // Level 42
    135200, // Level 43
    142600, // Level 44
    150200, // Level 45
    158000, // Level 46
    166000, // Level 47
    174200, // Level 48
    182600, // Level 49
    191200, // Level 50
  ],

  maxLevel: 100,

  // 레벨별 칭호
  titles: {
    1: '수학 초보',
    5: '수학 탐험가',
    10: '수학 여행자',
    15: '수학 모험가',
    20: '수학 전사',
    25: '수학 용사',
    30: '수학 기사',
    35: '수학 영웅',
    40: '수학 마법사',
    45: '수학 대마법사',
    50: '수학 현자',
    55: '수학 대현자',
    60: '수학 대가',
    65: '수학 마스터',
    70: '수학 전설',
    75: '수학 신화',
    80: '수학 반신',
    85: '수학 신',
    90: '수학의 신',
    95: '수학 창조자',
    100: '수학 우주의 지배자',
  } as Record<number, string>,
};

export const XP_REWARDS = {
  // 문제 풀이 기본 XP
  problemSolved: {
    base: 10,
    difficultyMultiplier: 1.5, // 난이도 1당 곱해지는 값
    firstTryBonus: 5,
    speedBonus: {
      fast: 3,    // 예상 시간의 50% 이내
      medium: 1,  // 예상 시간의 75% 이내
    },
  },

  // 연속 정답 보너스
  streakBonus: {
    3: 5,
    5: 10,
    7: 15,
    10: 25,
    15: 40,
    20: 60,
    25: 80,
    30: 100,
  } as Record<number, number>,

  // 개념 마스터리
  conceptMastered: 50,

  // 일일 목표 달성
  dailyGoalCompleted: 30,

  // 퀘스트 완료
  questCompleted: {
    daily: 20,
    weekly: 100,
    special: 200,
  },

  // 업적 달성
  achievementUnlocked: {
    COMMON: 10,
    UNCOMMON: 25,
    RARE: 50,
    EPIC: 100,
    LEGENDARY: 250,
  },
};

export const COIN_REWARDS = {
  problemSolved: 1,
  conceptMastered: 10,
  dailyGoalCompleted: 5,
  streakMilestone: {
    7: 20,
    14: 50,
    30: 100,
    60: 200,
    100: 500,
  } as Record<number, number>,
};

// 상점 아이템
export const SHOP_ITEMS = {
  avatarItems: [
    { id: 'hat_wizard', name: '마법사 모자', price: 50, category: 'hat' },
    { id: 'hat_crown', name: '왕관', price: 100, category: 'hat' },
    { id: 'hat_cap', name: '야구 모자', price: 30, category: 'hat' },
    { id: 'glasses_nerd', name: '수학자 안경', price: 30, category: 'accessory' },
    { id: 'glasses_cool', name: '선글라스', price: 40, category: 'accessory' },
    { id: 'pet_owl', name: '부엉이 펫', price: 200, category: 'pet' },
    { id: 'pet_cat', name: '고양이 펫', price: 150, category: 'pet' },
    { id: 'bg_space', name: '우주 배경', price: 80, category: 'background' },
    { id: 'bg_forest', name: '숲속 배경', price: 60, category: 'background' },
  ],
  themes: [
    { id: 'theme_space', name: '우주 테마', price: 100 },
    { id: 'theme_forest', name: '숲속 테마', price: 100 },
    { id: 'theme_ocean', name: '바다 테마', price: 100 },
    { id: 'theme_candy', name: '캔디 테마', price: 120 },
    { id: 'theme_ninja', name: '닌자 테마', price: 150 },
  ],
  powerUps: [
    { id: 'hint_free', name: '무료 힌트', price: 10, type: 'consumable' },
    { id: 'xp_double', name: 'XP 2배 (30분)', price: 25, type: 'consumable' },
    { id: 'streak_protect', name: '스트릭 보호', price: 50, type: 'consumable' },
    { id: 'skip_problem', name: '문제 스킵권', price: 15, type: 'consumable' },
  ],
};

// 일일 목표 기본값
export const DAILY_GOAL_DEFAULTS = {
  targetProblems: 10,
  targetMinutes: 30,
  targetXP: 100,
};

// 스트릭 보상 메시지
export const STREAK_MESSAGES = {
  3: '3일 연속! 좋은 시작이에요!',
  7: '일주일 연속! 대단해요!',
  14: '2주 연속! 습관이 되어가고 있어요!',
  30: '한 달 연속! 놀라운 끈기예요!',
  60: '두 달 연속! 진정한 학습자!',
  100: '100일 연속! 전설이 되었어요!',
  365: '1년 연속! 수학의 신!',
} as Record<number, string>;
