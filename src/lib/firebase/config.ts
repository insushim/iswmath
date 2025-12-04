// src/lib/firebase/config.ts
// Firebase 클라이언트 설정

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase 설정 - 직접 하드코딩 (환경변수 문제 방지)
const firebaseConfig = {
  apiKey: "AIzaSyDMxv9b5oOHfHoG6oha05RPd30lToP0vUE",
  authDomain: "iswmath-de46f.firebaseapp.com",
  projectId: "iswmath-de46f",
  storageBucket: "iswmath-de46f.firebasestorage.app",
  messagingSenderId: "558027510586",
  appId: "1:558027510586:web:4adfe0a110973d4be03603",
};

// Firebase 앱 초기화 함수 - 클라이언트에서만 실행
function getFirebaseApp(): FirebaseApp | null {
  // 서버 사이드에서는 초기화하지 않음
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // 싱글톤 패턴
    if (getApps().length === 0) {
      return initializeApp(firebaseConfig);
    }
    return getApp();
  } catch (error) {
    console.error('Firebase 초기화 오류:', error);
    return null;
  }
}

// Firebase 앱 (클라이언트에서만 유효)
const app = getFirebaseApp();

// Firebase 서비스 - null 체크 필요
export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;
export default app;
