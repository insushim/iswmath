import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';

// POST: 관리자 계정 생성 (최초 1회만 사용)
export async function POST(request: NextRequest) {
  try {
    const { email, password, name, secretKey } = await request.json();

    // 비밀키 검증 (환경변수로 설정)
    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'semoreum-admin-2024';

    if (secretKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: '유효하지 않은 비밀키입니다.' },
        { status: 403 }
      );
    }

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '이메일, 비밀번호, 이름이 필요합니다.' },
        { status: 400 }
      );
    }

    const auth = adminAuth();
    const db = adminDb();

    // Firebase Auth에서 사용자 생성
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Firestore에 관리자 프로필 저장
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      name: name,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      totalXP: 0,
      currentLevel: 99,
      coins: 0,
      streak: 0,
      longestStreak: 0,
      lastActiveAt: new Date(),
      currentMathLevel: 12,
    });

    return NextResponse.json({
      success: true,
      message: '관리자 계정이 생성되었습니다.',
      uid: userRecord.uid,
    });
  } catch (error: unknown) {
    console.error('관리자 생성 오류:', error);
    const firebaseError = error as { code?: string; message?: string };

    if (firebaseError.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '관리자 계정 생성에 실패했습니다.', details: firebaseError.message },
      { status: 500 }
    );
  }
}
