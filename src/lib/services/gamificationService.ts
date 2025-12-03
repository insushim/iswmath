// src/lib/services/gamificationService.ts

import prisma from '@/lib/db/prisma';
import { LEVEL_CONFIG, XP_REWARDS, COIN_REWARDS } from '@/lib/constants/gamification';
import { ACHIEVEMENTS, Achievement } from '@/lib/constants/achievements';

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

export interface AchievementContext {
  consecutiveCorrect?: number;
  problemsSolvedToday?: number;
  timeOfDay?: 'EARLY_MORNING' | 'MIDNIGHT' | 'WEEKEND' | 'NORMAL';
  wasComeback?: boolean;
  totalProblemsCorrect?: number;
  totalProblems?: number;
  solveTimeRatio?: number; // actualTime / expectedTime
}

export class GamificationService {
  // XP 추가 및 레벨업 처리
  static async addXP(studentId: string, xpAmount: number): Promise<XPResult> {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) throw new Error('Student not found');

    const newTotalXP = student.totalXP + xpAmount;
    let newLevel = student.currentLevel;
    let leveledUp = false;

    // 레벨업 체크
    while (
      newLevel < LEVEL_CONFIG.maxLevel &&
      newLevel < LEVEL_CONFIG.levelThresholds.length &&
      newTotalXP >= LEVEL_CONFIG.levelThresholds[newLevel]
    ) {
      newLevel++;
      leveledUp = true;
    }

    // 업데이트
    await prisma.student.update({
      where: { id: studentId },
      data: {
        totalXP: newTotalXP,
        currentLevel: newLevel,
      },
    });

    // 새 칭호 확인
    const newTitle = leveledUp ? this.getTitleForLevel(newLevel) : undefined;

    return { newTotalXP, newLevel, leveledUp, newTitle };
  }

  // 코인 추가
  static async addCoins(studentId: string, coinAmount: number): Promise<number> {
    const result = await prisma.student.update({
      where: { id: studentId },
      data: {
        coins: { increment: coinAmount },
      },
    });
    return result.coins;
  }

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

  // 연속 학습일 업데이트
  static async updateStreak(studentId: string): Promise<{
    newStreak: number;
    isNewRecord: boolean;
    streakBroken: boolean;
  }> {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) throw new Error('Student not found');

    const lastActive = new Date(student.lastActiveAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let newStreak = student.streak;
    let streakBroken = false;

    // 오늘 이미 활동한 경우
    if (this.isSameDay(lastActive, today)) {
      return {
        newStreak: student.streak,
        isNewRecord: false,
        streakBroken: false,
      };
    }

    // 어제 활동했으면 스트릭 증가, 그 전이면 리셋
    if (this.isSameDay(lastActive, yesterday)) {
      newStreak = student.streak + 1;
    } else {
      streakBroken = student.streak > 0;
      newStreak = 1;
    }

    const isNewRecord = newStreak > student.longestStreak;

    await prisma.student.update({
      where: { id: studentId },
      data: {
        streak: newStreak,
        longestStreak: isNewRecord ? newStreak : student.longestStreak,
        lastActiveAt: today,
      },
    });

    // 스트릭 마일스톤 코인 보상
    const coinMilestones = Object.keys(COIN_REWARDS.streakMilestone).map(Number);
    if (coinMilestones.includes(newStreak)) {
      await this.addCoins(studentId, COIN_REWARDS.streakMilestone[newStreak]);
    }

    return { newStreak, isNewRecord, streakBroken };
  }

  // 업적 체크 및 해금
  static async checkAndUnlockAchievements(
    studentId: string,
    context: AchievementContext
  ): Promise<UnlockedAchievement[]> {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        achievements: {
          include: { achievement: true },
        },
        progress: true,
        problemAttempts: {
          orderBy: { createdAt: 'desc' },
          take: 100,
        },
      },
    });

    if (!student) throw new Error('Student not found');

    const unlockedCodes = new Set(student.achievements.map((a) => a.achievement.code));
    const newlyUnlocked: UnlockedAchievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
      // 이미 해금된 업적은 스킵
      if (unlockedCodes.has(achievement.code)) continue;

      // 조건 체크
      if (this.checkAchievementCondition(achievement, student, context)) {
        // 업적 DB에서 찾기 또는 생성
        let dbAchievement = await prisma.achievement.findUnique({
          where: { code: achievement.code },
        });

        if (!dbAchievement) {
          dbAchievement = await prisma.achievement.create({
            data: {
              code: achievement.code,
              name: achievement.name,
              description: achievement.description,
              category: achievement.category,
              condition: JSON.parse(JSON.stringify(achievement.condition)),
              xpReward: achievement.xpReward,
              coinReward: achievement.coinReward || 0,
              rarity: achievement.rarity,
            },
          });
        }

        // 업적 해금
        await prisma.studentAchievement.create({
          data: {
            studentId,
            achievementId: dbAchievement.id,
          },
        });

        // 보상 지급
        await this.addXP(studentId, achievement.xpReward);
        if (achievement.coinReward) {
          await this.addCoins(studentId, achievement.coinReward);
        }

        newlyUnlocked.push({
          code: achievement.code,
          name: achievement.name,
          description: achievement.description,
          rarity: achievement.rarity,
          xpReward: achievement.xpReward,
          coinReward: achievement.coinReward,
        });
      }
    }

    return newlyUnlocked;
  }

  // 일일 목표 업데이트
  static async updateDailyGoal(
    studentId: string,
    problemsSolved: number = 1,
    minutesSpent: number = 0,
    xpEarned: number = 0
  ): Promise<{
    completed: boolean;
    progress: {
      problems: number;
      minutes: number;
      xp: number;
    };
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyGoal = await prisma.dailyGoal.upsert({
      where: {
        studentId_date: {
          studentId,
          date: today,
        },
      },
      update: {
        completedProblems: { increment: problemsSolved },
        completedMinutes: { increment: minutesSpent },
        earnedXP: { increment: xpEarned },
      },
      create: {
        studentId,
        date: today,
        completedProblems: problemsSolved,
        completedMinutes: minutesSpent,
        earnedXP: xpEarned,
      },
    });

    const completed =
      dailyGoal.completedProblems >= dailyGoal.targetProblems &&
      dailyGoal.completedMinutes >= dailyGoal.targetMinutes &&
      dailyGoal.earnedXP >= dailyGoal.targetXP;

    // 목표 완료 시 보상
    if (completed && !dailyGoal.isCompleted) {
      await prisma.dailyGoal.update({
        where: { id: dailyGoal.id },
        data: { isCompleted: true },
      });
      await this.addXP(studentId, XP_REWARDS.dailyGoalCompleted);
      await this.addCoins(studentId, COIN_REWARDS.dailyGoalCompleted);
    }

    return {
      completed,
      progress: {
        problems: dailyGoal.completedProblems,
        minutes: dailyGoal.completedMinutes,
        xp: dailyGoal.earnedXP,
      },
    };
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

  // 날짜 비교 헬퍼
  private static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // 업적 조건 체크
  private static checkAchievementCondition(
    achievement: Achievement,
    student: {
      totalXP: number;
      currentLevel: number;
      streak: number;
      progress: Array<{ status: string; mastery: number }>;
      problemAttempts: Array<{ isCorrect: boolean; createdAt: Date }>;
    },
    context: AchievementContext
  ): boolean {
    const { condition } = achievement;

    switch (condition.type) {
      case 'PROBLEMS_SOLVED': {
        const correctCount = student.problemAttempts.filter((a) => a.isCorrect).length;
        return correctCount >= (condition.count || 0);
      }

      case 'STREAK_DAYS':
        return student.streak >= (condition.count || 0);

      case 'CONCEPTS_MASTERED': {
        const masteredCount = student.progress.filter((p) => p.status === 'MASTERED').length;
        return masteredCount >= (condition.count || 0);
      }

      case 'CONSECUTIVE_CORRECT':
        return (context.consecutiveCorrect || 0) >= (condition.count || 0);

      case 'OVERALL_ACCURACY': {
        const total = context.totalProblems || student.problemAttempts.length;
        const correct = context.totalProblemsCorrect ||
          student.problemAttempts.filter((a) => a.isCorrect).length;

        // 최소 문제 수 요구사항 체크
        const minProblems = condition.threshold === 0.99 ? 200 :
                          condition.threshold === 0.95 ? 100 : 50;

        return total >= minProblems && correct / total >= (condition.threshold || 0);
      }

      case 'SPEED_SOLVE':
        return (context.solveTimeRatio || 1) <= (condition.ratio || 0.5);

      case 'DAILY_PROBLEMS':
        return (context.problemsSolvedToday || 0) >= (condition.count || 0);

      case 'TIME_BASED':
        return context.timeOfDay === condition.time;

      case 'COMEBACK':
        return context.wasComeback === true;

      case 'TOTAL_XP':
        return student.totalXP >= (condition.count || 0);

      case 'LEVEL_REACHED':
        return student.currentLevel >= (condition.count || 0);

      default:
        return false;
    }
  }
}
