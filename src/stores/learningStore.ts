// src/stores/learningStore.ts

import { create } from 'zustand';
import type { Problem, Concept } from '@/types';

interface LearningState {
  // Current learning session
  currentConcept: Concept | null;
  currentProblem: Problem | null;
  problemQueue: Problem[];
  sessionStartTime: Date | null;

  // Progress tracking
  sessionProblems: number;
  sessionCorrect: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;

  // UI state
  isLoading: boolean;
  showHint: boolean;
  currentHintLevel: number;

  // Actions
  setCurrentConcept: (concept: Concept | null) => void;
  setCurrentProblem: (problem: Problem | null) => void;
  addToProblemQueue: (problems: Problem[]) => void;
  nextProblem: () => Problem | null;
  startSession: () => void;
  endSession: () => void;
  recordAttempt: (isCorrect: boolean) => void;
  setLoading: (loading: boolean) => void;
  showHintLevel: (level: number) => void;
  resetHints: () => void;
  reset: () => void;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  currentConcept: null,
  currentProblem: null,
  problemQueue: [],
  sessionStartTime: null,
  sessionProblems: 0,
  sessionCorrect: 0,
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  isLoading: false,
  showHint: false,
  currentHintLevel: 0,

  setCurrentConcept: (concept) => set({ currentConcept: concept }),

  setCurrentProblem: (problem) =>
    set({
      currentProblem: problem,
      showHint: false,
      currentHintLevel: 0,
    }),

  addToProblemQueue: (problems) =>
    set((state) => ({
      problemQueue: [...state.problemQueue, ...problems],
    })),

  nextProblem: () => {
    const state = get();
    if (state.problemQueue.length === 0) return null;

    const [next, ...rest] = state.problemQueue;
    set({
      currentProblem: next,
      problemQueue: rest,
      showHint: false,
      currentHintLevel: 0,
    });
    return next;
  },

  startSession: () =>
    set({
      sessionStartTime: new Date(),
      sessionProblems: 0,
      sessionCorrect: 0,
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
    }),

  endSession: () =>
    set({
      sessionStartTime: null,
      currentProblem: null,
      problemQueue: [],
    }),

  recordAttempt: (isCorrect) =>
    set((state) => ({
      sessionProblems: state.sessionProblems + 1,
      sessionCorrect: isCorrect
        ? state.sessionCorrect + 1
        : state.sessionCorrect,
      consecutiveCorrect: isCorrect ? state.consecutiveCorrect + 1 : 0,
      consecutiveWrong: isCorrect ? 0 : state.consecutiveWrong + 1,
    })),

  setLoading: (isLoading) => set({ isLoading }),

  showHintLevel: (level) =>
    set({
      showHint: true,
      currentHintLevel: level,
    }),

  resetHints: () =>
    set({
      showHint: false,
      currentHintLevel: 0,
    }),

  reset: () =>
    set({
      currentConcept: null,
      currentProblem: null,
      problemQueue: [],
      sessionStartTime: null,
      sessionProblems: 0,
      sessionCorrect: 0,
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      isLoading: false,
      showHint: false,
      currentHintLevel: 0,
    }),
}));
