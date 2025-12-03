// src/lib/firebase/auth.ts
// Firebase 인증 관련 함수들

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// 사용자 역할 타입
export type UserRole = 'student' | 'teacher' | 'parent';

// 학교 유형
export type SchoolType = 'elementary' | 'middle' | 'high';

// 사용자 프로필 인터페이스
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  gradeLevel?: number;
  schoolType?: SchoolType;
  createdAt: Date;
  updatedAt: Date;
  // 게이미피케이션 데이터
  totalXP: number;
  currentLevel: number;
  coins: number;
  streak: number;
  longestStreak: number;
  lastActiveAt: Date;
  currentMathLevel: number;
}

// 이메일/비밀번호로 회원가입
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: UserRole,
  gradeLevel?: number,
  schoolType?: SchoolType
): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 프로필 업데이트
    await updateProfile(user, { displayName: name });

    // Firestore에 사용자 데이터 저장
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      role: role,
      gradeLevel: gradeLevel || null,
      schoolType: schoolType || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // 초기 게이미피케이션 데이터
      totalXP: 0,
      currentLevel: 1,
      coins: 0,
      streak: 0,
      longestStreak: 0,
      lastActiveAt: serverTimestamp(),
      currentMathLevel: gradeLevel || 1,
    });

    return user;
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
}

// 이메일/비밀번호로 로그인
export async function signIn(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // 마지막 활동 시간 업데이트
    await setDoc(
      doc(db, 'users', userCredential.user.uid),
      { lastActiveAt: serverTimestamp(), updatedAt: serverTimestamp() },
      { merge: true }
    );

    return userCredential.user;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
}

// Google 로그인
export async function signInWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // 신규 사용자인지 확인
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      // 신규 사용자 - 기본 프로필 생성 (역할 선택 필요)
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '사용자',
        role: 'student', // 기본값, 나중에 변경 필요
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        totalXP: 0,
        currentLevel: 1,
        coins: 0,
        streak: 0,
        longestStreak: 0,
        lastActiveAt: serverTimestamp(),
        currentMathLevel: 1,
        needsProfileSetup: true, // 프로필 설정 필요 플래그
      });
    } else {
      // 기존 사용자 - 활동 시간 업데이트
      await setDoc(
        doc(db, 'users', user.uid),
        { lastActiveAt: serverTimestamp(), updatedAt: serverTimestamp() },
        { merge: true }
      );
    }

    return user;
  } catch (error) {
    console.error('Google 로그인 오류:', error);
    throw error;
  }
}

// 로그아웃
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('로그아웃 오류:', error);
    throw error;
  }
}

// 비밀번호 재설정 이메일 전송
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('비밀번호 재설정 오류:', error);
    throw error;
  }
}

// 사용자 프로필 가져오기
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('프로필 조회 오류:', error);
    throw error;
  }
}

// 사용자 프로필 업데이트
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  try {
    await setDoc(
      doc(db, 'users', uid),
      { ...data, updatedAt: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    throw error;
  }
}

// 인증 상태 변경 리스너
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// 현재 사용자 가져오기
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
