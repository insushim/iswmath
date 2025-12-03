// src/stores/gamificationStore.ts

import { create } from 'zustand';
import type { UnlockedAchievement, RewardNotification } from '@/types';

interface GamificationState {
  // Current stats
  totalXP: number;
  currentLevel: number;
  coins: number;
  streak: number;
  longestStreak: number;

  // Notifications queue
  notifications: RewardNotification[];
  pendingAchievements: UnlockedAchievement[];

  // Actions
  setStats: (stats: {
    totalXP: number;
    currentLevel: number;
    coins: number;
    streak: number;
    longestStreak: number;
  }) => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  updateStreak: (newStreak: number, isNewRecord: boolean) => void;
  levelUp: (newLevel: number, newTitle?: string) => void;
  unlockAchievement: (achievement: UnlockedAchievement) => void;
  addNotification: (notification: RewardNotification) => void;
  dismissNotification: () => void;
  dismissAchievement: () => void;
  clearAllNotifications: () => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  totalXP: 0,
  currentLevel: 1,
  coins: 0,
  streak: 0,
  longestStreak: 0,
  notifications: [],
  pendingAchievements: [],

  setStats: (stats) => set(stats),

  addXP: (amount) =>
    set((state) => {
      const newXP = state.totalXP + amount;
      return {
        totalXP: newXP,
        notifications: [
          ...state.notifications,
          {
            type: 'xp',
            amount,
            message: `+${amount} XP 획득!`,
          },
        ],
      };
    }),

  addCoins: (amount) =>
    set((state) => ({
      coins: state.coins + amount,
      notifications: [
        ...state.notifications,
        {
          type: 'coins',
          amount,
          message: `+${amount} 코인 획득!`,
        },
      ],
    })),

  updateStreak: (newStreak, isNewRecord) =>
    set((state) => ({
      streak: newStreak,
      longestStreak: isNewRecord ? newStreak : state.longestStreak,
      notifications: isNewRecord
        ? [
            ...state.notifications,
            {
              type: 'streak',
              streakDays: newStreak,
              message: `${newStreak}일 연속 학습! 신기록!`,
            },
          ]
        : state.notifications,
    })),

  levelUp: (newLevel, newTitle) =>
    set((state) => ({
      currentLevel: newLevel,
      notifications: [
        ...state.notifications,
        {
          type: 'levelUp',
          newLevel,
          newTitle,
          message: newTitle
            ? `레벨 ${newLevel} 달성! "${newTitle}" 칭호 획득!`
            : `레벨 ${newLevel} 달성!`,
        },
      ],
    })),

  unlockAchievement: (achievement) =>
    set((state) => ({
      pendingAchievements: [...state.pendingAchievements, achievement],
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  dismissNotification: () =>
    set((state) => ({
      notifications: state.notifications.slice(1),
    })),

  dismissAchievement: () =>
    set((state) => ({
      pendingAchievements: state.pendingAchievements.slice(1),
    })),

  clearAllNotifications: () =>
    set({
      notifications: [],
      pendingAchievements: [],
    }),
}));
