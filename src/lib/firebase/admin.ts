// src/lib/firebase/admin.ts
// Firebase Admin SDK - 서버사이드 전용 (API Routes에서만 사용)

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App;

// Firebase Admin 초기화
function getAdminApp() {
  if (getApps().length === 0) {
    // 환경변수에서 서비스 계정 정보 로드
    // 프로덕션에서는 서비스 계정 JSON을 환경변수로 설정해야 함
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    adminApp = getApps()[0];
  }
  return adminApp;
}

// 서버사이드 Firebase 서비스
export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());
