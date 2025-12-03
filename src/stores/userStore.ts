// src/stores/userStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Student, User } from '@/types';

interface UserState {
  user: User | null;
  student: Student | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setStudent: (student: Student | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  updateStudentStats: (stats: Partial<Student>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      student: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setStudent: (student) => set({ student }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      logout: () =>
        set({
          user: null,
          student: null,
          error: null,
        }),

      updateStudentStats: (stats) =>
        set((state) => ({
          student: state.student
            ? { ...state.student, ...stats }
            : null,
        })),
    }),
    {
      name: 'mathquest-user',
      partialize: (state) => ({
        user: state.user,
        student: state.student,
      }),
    }
  )
);
