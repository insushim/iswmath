// src/types/gamification.ts

export type AchievementCategory =
  | 'LEARNING'
  | 'STREAK'
  | 'MASTERY'
  | 'SPEED'
  | 'ACCURACY'
  | 'SOCIAL'
  | 'SPECIAL';

export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  category: AchievementCategory;
  condition: AchievementCondition;
  xpReward: number;
  coinReward: number;
  badgeImage?: string;
  rarity: Rarity;
}

export interface AchievementCondition {
  type: string;
  count?: number;
  threshold?: number;
  ratio?: number;
  time?: string;
}

export interface StudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  achievement: Achievement;
  unlockedAt: Date;
}

export interface UnlockedAchievement {
  code: string;
  name: string;
  description: string;
  rarity: string;
  xpReward: number;
  coinReward?: number;
}

export type QuestType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';

export interface Quest {
  id: string;
  name: string;
  description: string;
  type: QuestType;
  condition: QuestCondition;
  xpReward: number;
  coinReward: number;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface QuestCondition {
  type: string;
  target: number;
  conceptId?: string;
}

export interface QuestProgress {
  questId: string;
  quest: Quest;
  progress: number;
  target: number;
  isCompleted: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'avatar' | 'theme' | 'powerup';
  type?: string;
  imageUrl?: string;
  isOwned?: boolean;
}

export interface Leaderboard {
  type: 'daily' | 'weekly' | 'monthly' | 'allTime';
  entries: LeaderboardEntry[];
  userRank?: number;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  score: number;
  level: number;
  schoolType?: string;
  gradeLevel?: number;
}

export interface GamificationStats {
  totalXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  levelProgress: number;
  title: string;
  coins: number;
  streak: number;
  longestStreak: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  rank?: number;
}

export interface RewardNotification {
  type: 'xp' | 'coins' | 'achievement' | 'levelUp' | 'streak';
  amount?: number;
  achievement?: UnlockedAchievement;
  newLevel?: number;
  newTitle?: string;
  streakDays?: number;
  message: string;
}
