import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin 초기화 - 클라이언트 config 사용
function getDb() {
  if (getApps().length === 0) {
    // 서비스 계정 없이 초기화 시도 - 대신 REST API 사용
    try {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'iswmath-de46f',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
        }),
      });
    } catch {
      // 초기화 실패 시 null 반환
      return null;
    }
  }
  return getFirestore();
}

// GET: 모든 사용자 목록 조회 (클라이언트에서 직접 Firestore 접근)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    const db = getDb();

    if (!db) {
      // Firebase Admin이 없으면 빈 배열 반환
      return NextResponse.json({
        users: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        message: 'Firebase Admin SDK not configured. Please use client-side data fetching.',
      });
    }

    let query: FirebaseFirestore.Query = db.collection('users').orderBy('createdAt', 'desc');

    if (role && role !== 'all') {
      query = query.where('role', '==', role);
    }

    const snapshot = await query.limit(100).get();

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      lastActiveAt: doc.data().lastActiveAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({
      users,
      pagination: {
        page: 1,
        limit: 100,
        total: users.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json({
      users: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      error: '사용자 목록을 가져오는데 실패했습니다.',
    });
  }
}
