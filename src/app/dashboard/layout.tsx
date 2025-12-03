'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

import {
  Home,
  BookOpen,
  Trophy,
  Target,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  BarChart3,
  GraduationCap,
  Flame,
  TrendingUp,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // 역할별 네비게이션 메뉴
  const studentNav = [
    { href: '/dashboard', icon: Home, label: '홈' },
    { href: '/dashboard/learn', icon: BookOpen, label: '학습하기' },
    { href: '/dashboard/practice', icon: Target, label: '연습문제' },
    { href: '/dashboard/achievements', icon: Trophy, label: '업적' },
    { href: '/dashboard/leaderboard', icon: BarChart3, label: '리더보드' },
    { href: '/dashboard/profile', icon: User, label: '프로필' },
  ];

  const parentNav = [
    { href: '/dashboard', icon: Home, label: '홈' },
    { href: '/dashboard/children', icon: Users, label: '자녀 관리' },
    { href: '/dashboard/reports', icon: BarChart3, label: '학습 리포트' },
    { href: '/dashboard/profile', icon: User, label: '프로필' },
  ];

  const teacherNav = [
    { href: '/dashboard', icon: Home, label: '홈' },
    { href: '/dashboard/students', icon: GraduationCap, label: '학생 관리' },
    { href: '/dashboard/classes', icon: Users, label: '클래스' },
    { href: '/dashboard/reports', icon: BarChart3, label: '리포트' },
    { href: '/dashboard/profile', icon: User, label: '프로필' },
  ];

  const getNavItems = () => {
    switch (profile?.role) {
      case 'parent':
        return parentNav;
      case 'teacher':
        return teacherNav;
      default:
        return studentNav;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 로고 */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                셈오름
              </span>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 사용자 정보 */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {profile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">
                  {profile?.name || '사용자'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {profile?.role === 'student' && '학생'}
                  {profile?.role === 'parent' && '학부모'}
                  {profile?.role === 'teacher' && '선생님'}
                </p>
              </div>
            </div>
            {profile?.role === 'student' && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">
                  {profile?.streak || 0}일 연속 학습
                </span>
              </div>
            )}
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 하단 메뉴 */}
          <div className="p-4 border-t space-y-1">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">설정</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">로그아웃</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className="lg:ml-64">
        {/* 모바일 헤더 */}
        <header className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">셈오름</span>
            </Link>
            <div className="w-10" /> {/* 균형을 위한 빈 공간 */}
          </div>
        </header>

        {/* 페이지 콘텐츠 */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
