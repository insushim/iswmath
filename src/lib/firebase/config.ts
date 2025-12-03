// src/lib/firebase/config.ts
// Firebase 클라이언트 설정 - 환경변수에서 안전하게 로드

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase 설정 - 환경변수에서 로드 (NEXT_PUBLIC_ 접두사로 클라이언트에서 사용 가능)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 앱 초기화 함수 - 클라이언트에서만 실행
function getFirebaseApp(): FirebaseApp | null {
  // 서버 사이드에서는 초기화하지 않음
  if (typeof window === 'undefined') {
    return null;
  }

  // API 키가 없으면 초기화하지 않음
  if (!firebaseConfig.apiKey) {
    console.warn('Firebase API key not found');
    return null;
  }

  // 싱글톤 패턴
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

// Firebase 앱 (클라이언트에서만 유효)
const app = getFirebaseApp();

// Firebase 서비스 - null 체크 필요
export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;
export default app;
