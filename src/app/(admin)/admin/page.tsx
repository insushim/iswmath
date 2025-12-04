'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  BookOpen,
  UserPlus,
  TrendingUp,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  students: number;
  teachers: number;
  parents: number;
  newUsersThisWeek: number;
  activeToday: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data.stats);
      setRecentUsers(data.recentUsers);
    } catch (error) {
      console.error('통계 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: '전체 사용자',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-teal-500/10',
      change: '+12%',
      positive: true,
    },
    {
      title: '학생',
      value: stats?.students || 0,
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-500/10',
      change: '+8%',
      positive: true,
    },
    {
      title: '선생님',
      value: stats?.teachers || 0,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      change: '+3%',
      positive: true,
    },
    {
      title: '학부모',
      value: stats?.parents || 0,
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      change: '+5%',
      positive: true,
    },
  ];

  const subStats = [
    {
      title: '이번 주 신규 가입',
      value: stats?.newUsersThisWeek || 0,
      icon: UserPlus,
      color: 'text-teal-400',
    },
    {
      title: '오늘 활동 사용자',
      value: stats?.activeToday || 0,
      icon: Activity,
      color: 'text-blue-400',
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">학생</span>;
      case 'teacher':
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">선생님</span>;
      case 'parent':
        return <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">학부모</span>;
      case 'admin':
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">관리자</span>;
      default:
        return <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded-full">{role}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">관리자 대시보드</h1>
        <p className="text-slate-400">셈오름 플랫폼의 전체 현황을 확인하세요.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Sub Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {subStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex items-center gap-4"
          >
            <div className="p-3 bg-slate-700 rounded-xl">
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-teal-400" />
            <h2 className="text-xl font-bold text-white">최근 가입 사용자</h2>
          </div>
          <a
            href="/admin/users"
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
          >
            전체 보기 <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="divide-y divide-slate-700">
          {recentUsers.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              아직 가입한 사용자가 없습니다.
            </div>
          ) : (
            recentUsers.map((user) => (
              <div key={user.id} className="p-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user.name?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-slate-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getRoleBadge(user.role)}
                    <span className="text-slate-500 text-sm">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <a
          href="/admin/users"
          className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 hover:from-teal-500 hover:to-teal-600 transition-all group"
        >
          <Users size={32} className="text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold text-lg">사용자 관리</h3>
          <p className="text-teal-100 text-sm mt-1">전체 사용자 목록 보기</p>
        </a>
        <a
          href="/admin/students"
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 hover:from-blue-500 hover:to-blue-600 transition-all group"
        >
          <GraduationCap size={32} className="text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold text-lg">학생 관리</h3>
          <p className="text-blue-100 text-sm mt-1">학생 학습 현황 관리</p>
        </a>
        <a
          href="/admin/settings"
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 hover:from-purple-500 hover:to-purple-600 transition-all group"
        >
          <TrendingUp size={32} className="text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold text-lg">플랫폼 설정</h3>
          <p className="text-purple-100 text-sm mt-1">시스템 설정 관리</p>
        </a>
      </motion.div>
    </div>
  );
}
