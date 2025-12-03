// src/lib/firebase/firestore.ts
// Firestore 데이터베이스 작업 함수들

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config';

// ==================== 학생 관련 ====================

// 학생 진도 저장/업데이트
export async function saveProgress(
  userId: string,
  conceptId: string,
  data: {
    mastery: number;
    totalAttempts: number;
    correctAttempts: number;
    currentDifficulty: number;
    consecutiveCorrect: number;
    consecutiveWrong: number;
  }
) {
  const progressRef = doc(db, 'users', userId, 'progress', conceptId);
  await setDoc(
    progressRef,
    {
      ...data,
      conceptId,
      lastStudiedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// 학생 진도 가져오기
export async function getProgress(userId: string, conceptId: string) {
  const progressRef = doc(db, 'users', userId, 'progress', conceptId);
  const progressDoc = await getDoc(progressRef);
  return progressDoc.exists() ? progressDoc.data() : null;
}

// 모든 진도 가져오기
export async function getAllProgress(userId: string) {
  const progressRef = collection(db, 'users', userId, 'progress');
  const progressDocs = await getDocs(progressRef);
  return progressDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ==================== 문제 시도 기록 ====================

// 문제 시도 저장
export async function saveProblemAttempt(
  userId: string,
  attemptData: {
    problemId: string;
    conceptId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSeconds: number;
    hintsUsed: number;
    xpEarned: number;
    difficulty: number;
  }
) {
  const attemptRef = doc(collection(db, 'users', userId, 'attempts'));
  await setDoc(attemptRef, {
    ...attemptData,
    createdAt: serverTimestamp(),
  });
  return attemptRef.id;
}

// 최근 시도 기록 가져오기
export async function getRecentAttempts(userId: string, limitCount: number = 10) {
  const attemptsRef = collection(db, 'users', userId, 'attempts');
  const q = query(attemptsRef, orderBy('createdAt', 'desc'), limit(limitCount));
  const attemptDocs = await getDocs(q);
  return attemptDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ==================== 게이미피케이션 ====================

// XP 추가
export async function addXP(userId: string, amount: number) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    totalXP: increment(amount),
    updatedAt: serverTimestamp(),
  });
}

// 코인 추가
export async function addCoins(userId: string, amount: number) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    coins: increment(amount),
    updatedAt: serverTimestamp(),
  });
}

// 레벨 업데이트
export async function updateLevel(userId: string, newLevel: number) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    currentLevel: newLevel,
    updatedAt: serverTimestamp(),
  });
}

// 스트릭 업데이트
export async function updateStreak(
  userId: string,
  newStreak: number,
  isNewRecord: boolean
) {
  const userRef = doc(db, 'users', userId);
  const updateData: DocumentData = {
    streak: newStreak,
    lastActiveAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (isNewRecord) {
    updateData.longestStreak = newStreak;
  }

  await updateDoc(userRef, updateData);
}

// 업적 해금
export async function unlockAchievement(
  userId: string,
  achievementCode: string,
  achievementData: {
    name: string;
    description: string;
    rarity: string;
    xpReward: number;
    coinReward?: number;
  }
) {
  const achievementRef = doc(db, 'users', userId, 'achievements', achievementCode);
  await setDoc(achievementRef, {
    ...achievementData,
    code: achievementCode,
    unlockedAt: serverTimestamp(),
  });
}

// 해금된 업적 가져오기
export async function getUnlockedAchievements(userId: string) {
  const achievementsRef = collection(db, 'users', userId, 'achievements');
  const achievementDocs = await getDocs(achievementsRef);
  return achievementDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ==================== 일일 목표 ====================

// 오늘의 목표 가져오기/생성
export async function getTodayGoal(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateStr = today.toISOString().split('T')[0];

  const goalRef = doc(db, 'users', userId, 'dailyGoals', dateStr);
  const goalDoc = await getDoc(goalRef);

  if (goalDoc.exists()) {
    return goalDoc.data();
  }

  // 새로운 일일 목표 생성
  const newGoal = {
    date: dateStr,
    targetProblems: 10,
    targetMinutes: 30,
    targetXP: 100,
    completedProblems: 0,
    completedMinutes: 0,
    earnedXP: 0,
    isCompleted: false,
    createdAt: serverTimestamp(),
  };

  await setDoc(goalRef, newGoal);
  return newGoal;
}

// 일일 목표 업데이트
export async function updateDailyGoal(
  userId: string,
  updates: {
    completedProblems?: number;
    completedMinutes?: number;
    earnedXP?: number;
  }
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateStr = today.toISOString().split('T')[0];

  const goalRef = doc(db, 'users', userId, 'dailyGoals', dateStr);

  const incrementUpdates: DocumentData = {};
  if (updates.completedProblems) {
    incrementUpdates.completedProblems = increment(updates.completedProblems);
  }
  if (updates.completedMinutes) {
    incrementUpdates.completedMinutes = increment(updates.completedMinutes);
  }
  if (updates.earnedXP) {
    incrementUpdates.earnedXP = increment(updates.earnedXP);
  }

  await updateDoc(goalRef, {
    ...incrementUpdates,
    updatedAt: serverTimestamp(),
  });
}

// ==================== 개념/교육과정 ====================

// 모든 개념 가져오기
export async function getAllConcepts() {
  const conceptsRef = collection(db, 'concepts');
  const conceptDocs = await getDocs(conceptsRef);
  return conceptDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// 학년별 개념 가져오기
export async function getConceptsByGrade(gradeLevel: number) {
  const conceptsRef = collection(db, 'concepts');
  const q = query(
    conceptsRef,
    where('gradeLevel', '==', gradeLevel),
    orderBy('orderIndex')
  );
  const conceptDocs = await getDocs(q);
  return conceptDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// 특정 개념 가져오기
export async function getConcept(conceptId: string) {
  const conceptRef = doc(db, 'concepts', conceptId);
  const conceptDoc = await getDoc(conceptRef);
  return conceptDoc.exists() ? { id: conceptDoc.id, ...conceptDoc.data() } : null;
}

// ==================== 리더보드 ====================

// 리더보드 가져오기
export async function getLeaderboard(limitCount: number = 10) {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('role', '==', 'student'),
    orderBy('totalXP', 'desc'),
    limit(limitCount)
  );
  const userDocs = await getDocs(q);
  return userDocs.docs.map((doc, index) => ({
    rank: index + 1,
    id: doc.id,
    ...doc.data(),
  }));
}

// 사용자 랭킹 가져오기
export async function getUserRank(userId: string) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) return null;

  const userXP = userDoc.data().totalXP || 0;

  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('role', '==', 'student'),
    where('totalXP', '>', userXP)
  );
  const higherRankedDocs = await getDocs(q);

  return higherRankedDocs.size + 1;
}
