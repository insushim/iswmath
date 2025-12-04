import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// GET: 모든 사용자 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const db = adminDb();
    let query: FirebaseFirestore.Query = db.collection('users').orderBy('createdAt', 'desc');

    if (role && role !== 'all') {
      query = query.where('role', '==', role);
    }

    const snapshot = await query.limit(limit).offset((page - 1) * limit).get();

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      lastActiveAt: doc.data().lastActiveAt?.toDate?.()?.toISOString() || null,
    }));

    // 전체 사용자 수
    const countSnapshot = await db.collection('users').count().get();
    const total = countSnapshot.data().count;

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json(
      { error: '사용자 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 사용자 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const db = adminDb();
    await db.collection('users').doc(userId).delete();

    return NextResponse.json({ success: true, message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    return NextResponse.json(
      { error: '사용자 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH: 사용자 정보 수정
export async function PATCH(request: NextRequest) {
  try {
    const { userId, data } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 수정 가능한 필드만 허용
    const allowedFields = ['name', 'role', 'gradeLevel', 'schoolType', 'totalXP', 'currentLevel', 'coins'];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    updateData.updatedAt = new Date();

    const db = adminDb();
    await db.collection('users').doc(userId).update(updateData);

    return NextResponse.json({ success: true, message: '사용자 정보가 수정되었습니다.' });
  } catch (error) {
    console.error('사용자 수정 오류:', error);
    return NextResponse.json(
      { error: '사용자 정보 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}
