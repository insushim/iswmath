// src/lib/services/gamificationService.ts
// Firebase Firestore 기반 게이미피케이션 서비스

import { LEVEL_CONFIG, XP_REWARDS, COIN_REWARDS } from '@/lib/constants/gamification';

export interface XPResult {
  newTotalXP: number;
  newLevel: number;
  leveledUp: boolean;
  newTitle?: string;
}

export interface ProblemReward {
  xp: number;
  coins: number;
  streakBonus: number;
}

export interface UnlockedAchievement {
  code: string;
  name: string;
  description: string;
  rarity: string;
  xpReward: number;
  coinReward?: number;
}

export class GamificationService {
  // 문제 풀이에 대한 보상 계산
  static calculateProblemReward(params: {
    isCorrect: boolean;
    difficulty: number;
    isFirstTry: boolean;
    timeSeconds: number;
    expectedTimeSeconds: number;
    currentStreak: number;
  }): ProblemReward {
    if (!params.isCorrect) {
      return { xp: 0, coins: 0, streakBonus: 0 };
    }

    let xp = XP_REWARDS.problemSolved.base;

    // 난이도 보너스
    xp += Math.floor(params.difficulty * XP_REWARDS.problemSolved.difficultyMultiplier);

    // 첫 시도 보너스
    if (params.isFirstTry) {
      xp += XP_REWARDS.problemSolved.firstTryBonus;
    }

    // 속도 보너스
    const timeRatio = params.timeSeconds / params.expectedTimeSeconds;
    if (timeRatio < 0.5) {
      xp += XP_REWARDS.problemSolved.speedBonus.fast;
    } else if (timeRatio < 0.75) {
      xp += XP_REWARDS.problemSolved.speedBonus.medium;
    }

    // 스트릭 보너스
    let streakBonus = 0;
    const streakMilestones = Object.keys(XP_REWARDS.streakBonus)
      .map(Number)
      .sort((a, b) => b - a);

    for (const milestone of streakMilestones) {
      if (params.currentStreak >= milestone) {
        streakBonus = XP_REWARDS.streakBonus[milestone];
        break;
      }
    }

    const coins = COIN_REWARDS.problemSolved;

    return { xp: xp + streakBonus, coins, streakBonus };
  }

  // 레벨에 따른 칭호 가져오기
  static getTitleForLevel(level: number): string | undefined {
    const titleLevels = Object.keys(LEVEL_CONFIG.titles)
      .map(Number)
      .sort((a, b) => b - a);

    for (const titleLevel of titleLevels) {
      if (level >= titleLevel) {
        return LEVEL_CONFIG.titles[titleLevel];
      }
    }
    return undefined;
  }

  // 다음 레벨까지 필요한 XP
  static getXPToNextLevel(currentXP: number, currentLevel: number): number {
    if (currentLevel >= LEVEL_CONFIG.maxLevel) return 0;
    if (currentLevel >= LEVEL_CONFIG.levelThresholds.length) return 0;
    return LEVEL_CONFIG.levelThresholds[currentLevel] - currentXP;
  }

  // 현재 레벨 진행률
  static getLevelProgress(currentXP: number, currentLevel: number): number {
    if (currentLevel >= LEVEL_CONFIG.maxLevel) return 100;
    if (currentLevel >= LEVEL_CONFIG.levelThresholds.length) return 100;

    const currentThreshold = LEVEL_CONFIG.levelThresholds[currentLevel - 1] || 0;
    const nextThreshold = LEVEL_CONFIG.levelThresholds[currentLevel];
    const xpInLevel = currentXP - currentThreshold;
    const xpNeeded = nextThreshold - currentThreshold;

    return Math.min((xpInLevel / xpNeeded) * 100, 100);
  }

  // XP로 레벨 계산
  static calculateLevel(totalXP: number): number {
    let level = 1;
    while (
      level < LEVEL_CONFIG.maxLevel &&
      level < LEVEL_CONFIG.levelThresholds.length &&
      totalXP >= LEVEL_CONFIG.levelThresholds[level]
    ) {
      level++;
    }
    return level;
  }

  // 레벨업 체크
  static checkLevelUp(oldXP: number, newXP: number): { leveledUp: boolean; newLevel: number; newTitle?: string } {
    const oldLevel = this.calculateLevel(oldXP);
    const newLevel = this.calculateLevel(newXP);
    const leveledUp = newLevel > oldLevel;
    const newTitle = leveledUp ? this.getTitleForLevel(newLevel) : undefined;

    return { leveledUp, newLevel, newTitle };
  }
}
