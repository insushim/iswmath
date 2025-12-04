import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// GET: 관리자 대시보드 통계
export async function GET() {
  try {
    const db = adminDb();
    const usersRef = db.collection('users');

    // 역할별 사용자 수 조회
    const [totalCount, studentCount, teacherCount, parentCount] = await Promise.all([
      usersRef.count().get(),
      usersRef.where('role', '==', 'student').count().get(),
      usersRef.where('role', '==', 'teacher').count().get(),
      usersRef.where('role', '==', 'parent').count().get(),
    ]);

    // 최근 7일 내 가입자 수
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsersCount = await usersRef
      .where('createdAt', '>=', sevenDaysAgo)
      .count()
      .get();

    // 오늘 활동한 사용자 수
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeUsersCount = await usersRef
      .where('lastActiveAt', '>=', today)
      .count()
      .get();

    // 최근 가입한 사용자 5명
    const recentUsersSnapshot = await usersRef
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();

    const recentUsers = recentUsersSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      role: doc.data().role,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({
      stats: {
        totalUsers: totalCount.data().count,
        students: studentCount.data().count,
        teachers: teacherCount.data().count,
        parents: parentCount.data().count,
        newUsersThisWeek: recentUsersCount.data().count,
        activeToday: activeUsersCount.data().count,
      },
      recentUsers,
    });
  } catch (error) {
    console.error('통계 조회 오류:', error);
    return NextResponse.json(
      { error: '통계를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
