'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Target,
  Trophy,
  Flame,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Brain,
  Sparkles,
  Play,
  Award,
  Calendar,
  BarChart3,
  Coins,
  GraduationCap,
  Medal,
  Crown,
  Users,
  ChevronRight,
} from 'lucide-react';
import { CURRICULUM_DATA, getRecommendedContent, getTotalConceptCount } from '@/lib/curriculum-data';

// 업적 목록
const achievements = [
  { id: 1, name: '첫 걸음', description: '첫 문제 풀기', icon: '🎯', unlocked: true },
  { id: 2, name: '연속 학습', description: '3일 연속 학습', icon: '🔥', unlocked: true },
  { id: 3, name: '문제 해결사', description: '10문제 정답', icon: '⭐', unlocked: false },
  { id: 4, name: '수학 마스터', description: '100문제 정답', icon: '👑', unlocked: false },
];

// 일일 미션
const dailyMissions = [
  { id: 1, title: '문제 5개 풀기', current: 2, target: 5, xp: 30, completed: false },
  { id: 2, title: '10분 학습하기', current: 5, target: 10, xp: 20, completed: false },
  { id: 3, title: '개념 1개 완료', current: 0, target: 1, xp: 50, completed: false },
];

// 난이도 색상
const difficultyColors: Record<string, { bg: string; text: string; gradient: string }> = {
  '기초': { bg: 'bg-green-100', text: 'text-green-700', gradient: 'from-green-500 to-emerald-500' },
  '초급': { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-cyan-500' },
  '중급': { bg: 'bg-yellow-100', text: 'text-yellow-700', gradient: 'from-yellow-500 to-orange-500' },
  '고급': { bg: 'bg-orange-100', text: 'text-orange-700', gradient: 'from-orange-500 to-red-500' },
  '심화': { bg: 'bg-red-100', text: 'text-red-700', gradient: 'from-red-500 to-pink-500' },
  '최상': { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-indigo-500' },
};

export default function DashboardPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // 사용자 학년에 맞는 학교급 결정
  const userSchoolType = useMemo(() => {
    if (profile?.schoolType) return profile.schoolType;
    if (profile?.gradeLevel) {
      if (profile.gradeLevel <= 6) return 'elementary';
      if (profile.gradeLevel <= 9) return 'middle';
      return 'high';
    }
    return 'elementary';
  }, [profile?.schoolType, profile?.gradeLevel]);

  // 사용자 학년 (학교급 내 학년)
  const userGrade = useMemo(() => {
    if (!profile?.gradeLevel) return 1;
    if (profile.gradeLevel <= 6) return profile.gradeLevel;
    if (profile.gradeLevel <= 9) return profile.gradeLevel - 6;
    return profile.gradeLevel - 9;
  }, [profile?.gradeLevel]);

  // 학년에 맞는 추천 콘텐츠
  const recommendedConcepts = useMemo(() => {
    return getRecommendedContent(userSchoolType, userGrade, 4);
  }, [userSchoolType, userGrade]);

  // 전체 개념 수
  const totalConcepts = useMemo(() => {
    return getTotalConceptCount(userSchoolType, userGrade);
  }, [userSchoolType, userGrade]);

  // 학교급 정보
  const schoolInfo = CURRICULUM_DATA[userSchoolType];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('좋은 아침이에요');
    else if (hour < 18) setGreeting('좋은 오후예요');
    else setGreeting('좋은 저녁이에요');

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // 역할별 대시보드 렌더링
  if (profile?.role === 'parent') {
    return <ParentDashboard />;
  }

  if (profile?.role === 'teacher') {
    return <TeacherDashboard />;
  }

  if (profile?.role === 'admin') {
    return <AdminDashboard />;
  }

  const level = profile?.currentLevel || 1;
  const totalXP = profile?.totalXP || 0;
  const xpForNextLevel = level * 100;
  const xpProgress = (totalXP % 100);

  // 학생 대시보드
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 상단 환영 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl"
        >
          {/* 배경 장식 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"
            ></motion.div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="text-3xl">👋</span>
                <span className="text-white/80 text-lg">{greeting}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-extrabold mb-3"
              >
                {profile?.name || '학생'}님!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-lg max-w-md"
              >
                오늘도 즐거운 수학 여행을 시작해볼까요?<br />
                목표를 달성하고 보상을 받아가세요! 🎁
              </motion.p>

              {/* 빠른 시작 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-6"
              >
                <Button
                  onClick={() => router.push('/dashboard/learn')}
                  className="bg-white text-purple-700 hover:bg-white/90 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="w-5 h-5 mr-2" />
                  학습 시작
                </Button>
                <Button
                  onClick={() => router.push('/dashboard/practice')}
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white/10 font-bold px-6 py-3 rounded-xl"
                >
                  <Target className="w-5 h-5 mr-2" />
                  연습 문제
                </Button>
              </motion.div>
            </div>

            {/* 우측 스탯 카드 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* 레벨 */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-yellow-900" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">레벨</p>
                    <p className="text-2xl font-bold">{level}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>XP</span>
                    <span>{totalXP} / {xpForNextLevel}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* 연속 학습 */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">연속 학습</p>
                    <p className="text-2xl font-bold">{profile?.streak || 0}일</p>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-3">
                  {profile?.longestStreak || 0}일 최고 기록 🏆
                </p>
              </div>

              {/* 코인 */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center">
                    <Coins className="w-6 h-6 text-amber-900" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">코인</p>
                    <p className="text-2xl font-bold">{profile?.coins || 0}</p>
                  </div>
                </div>
              </div>

              {/* 총 XP */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-400 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">총 XP</p>
                    <p className="text-2xl font-bold">{totalXP}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 일일 미션 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">오늘의 미션</h2>
                <p className="text-sm text-slate-500">미션을 완료하고 보상을 받으세요!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>남은 시간: {23 - currentTime.getHours()}시간</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative p-5 rounded-2xl border-2 transition-all ${
                  mission.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-slate-50 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">
                    {mission.completed ? '✅' : index === 0 ? '📝' : index === 1 ? '⏱️' : '📚'}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    +{mission.xp} XP
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{mission.title}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">진행률</span>
                    <span className="font-medium text-slate-700">
                      {mission.current}/{mission.target}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(mission.current / mission.target) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        mission.completed
                          ? 'bg-green-500'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 추천 학습 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${schoolInfo?.color || 'from-blue-500 to-indigo-600'} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {schoolInfo?.label || '초등학교'} {userGrade}학년 맞춤 학습
                  </h2>
                  <p className="text-sm text-slate-500">
                    {totalConcepts}개의 개념 중 AI가 추천하는 콘텐츠
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                onClick={() => router.push('/dashboard/learn')}
              >
                전체 보기
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedConcepts.length > 0 ? recommendedConcepts.map((concept, index) => {
                const colors = difficultyColors[concept.difficulty] || difficultyColors['초급'];
                return (
                  <motion.div
                    key={concept.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => router.push(`/dashboard/learn/${concept.id}`)}
                    className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                        📘
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                            {concept.difficulty}
                          </span>
                          <span className="text-xs text-slate-400">{concept.duration}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {concept.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-1">{concept.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-1 text-amber-600 font-medium text-sm">
                        <Zap className="w-4 h-4" />
                        +{concept.xp} XP
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        시작하기
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* 단원 정보 */}
                    <div className="absolute top-3 right-3">
                      <span className="text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full">
                        {concept.unitName}
                      </span>
                    </div>
                  </motion.div>
                );
              }) : (
                // 데이터가 없을 경우 기본 콘텐츠
                <div className="col-span-2 text-center py-8 text-slate-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>학습 콘텐츠를 준비 중입니다.</p>
                  <p className="text-sm">곧 {schoolInfo?.label} {userGrade}학년 맞춤 콘텐츠가 제공됩니다!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* 사이드바 - 업적 & 랭킹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* 업적 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-200">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">업적</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-slate-700"
                  onClick={() => router.push('/dashboard/achievements')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100'
                        : 'bg-slate-50 border border-slate-100 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${
                        achievement.unlocked ? 'text-slate-800' : 'text-slate-500'
                      }`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-slate-400">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 주간 랭킹 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                    <Medal className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">주간 랭킹</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-slate-700"
                  onClick={() => router.push('/dashboard/leaderboard')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { rank: 1, name: '수학천재', xp: 1250, medal: '🥇' },
                  { rank: 2, name: '열공학생', xp: 980, medal: '🥈' },
                  { rank: 3, name: '노력왕', xp: 820, medal: '🥉' },
                ].map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="text-xl">{user.medal}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.xp} XP</p>
                    </div>
                  </motion.div>
                ))}

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                    <span className="text-lg font-bold text-indigo-600">#{profile?.currentLevel || 1}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-indigo-700">나의 순위</p>
                      <p className="text-xs text-indigo-500">{totalXP} XP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 빠른 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            {
              title: '개념 학습',
              description: '새로운 개념 배우기',
              icon: BookOpen,
              color: 'from-blue-500 to-indigo-600',
              href: '/dashboard/learn'
            },
            {
              title: '연습 문제',
              description: '실력 다지기',
              icon: Target,
              color: 'from-green-500 to-emerald-600',
              href: '/dashboard/practice'
            },
            {
              title: '실력 진단',
              description: '나의 수준 확인',
              icon: Brain,
              color: 'from-purple-500 to-pink-600',
              href: '/dashboard/diagnosis'
            },
            {
              title: '리더보드',
              description: '친구들과 경쟁',
              icon: BarChart3,
              color: 'from-orange-500 to-red-600',
              href: '/dashboard/leaderboard'
            },
          ].map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(action.href)}
              className="cursor-pointer group"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${action.color} p-6 text-white shadow-lg hover:shadow-xl transition-all`}>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="font-bold text-lg">{action.title}</h3>
                <p className="text-white/80 text-sm">{action.description}</p>
                <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// 학부모 대시보드
function ParentDashboard() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">👨‍👩‍👧</span>
              <span className="text-white/80 text-lg">학부모님, 환영합니다!</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-3">
              {profile?.name || '학부모'}님
            </h1>
            <p className="text-white/80 text-lg">
              자녀의 학습 현황을 확인하고 관리해보세요.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">자녀 관리</h3>
            <p className="text-slate-500 mb-4">자녀를 등록하고 학습 현황을 모니터링하세요.</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">자녀 등록하기</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">학습 리포트</h3>
            <p className="text-slate-500 mb-4">자녀의 학습 진도와 성취도를 확인하세요.</p>
            <Button variant="outline" className="w-full">리포트 보기</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">학습 일정</h3>
            <p className="text-slate-500 mb-4">자녀의 학습 일정을 관리하세요.</p>
            <Button variant="outline" className="w-full">일정 보기</Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 선생님 대시보드
function TeacherDashboard() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">👨‍🏫</span>
              <span className="text-white/80 text-lg">선생님, 환영합니다!</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-3">
              {profile?.name || '선생님'}
            </h1>
            <p className="text-white/80 text-lg">
              학생들의 학습 현황을 관리하고 효과적인 수업을 진행하세요.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: '학생 관리', desc: '학생 등록 및 관리', icon: Users, color: 'from-blue-500 to-indigo-600' },
            { title: '클래스 관리', desc: '클래스 생성 및 배정', icon: GraduationCap, color: 'from-green-500 to-emerald-600' },
            { title: '학습 리포트', desc: '학습 현황 분석', icon: BarChart3, color: 'from-purple-500 to-pink-600' },
            { title: '문제 출제', desc: '맞춤 문제 만들기', icon: Target, color: 'from-orange-500 to-red-600' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 관리자 대시보드
function AdminDashboard() {
  const { profile } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">👑</span>
                <span className="text-white/80 text-lg">관리자님, 환영합니다!</span>
              </div>
              <h1 className="text-4xl font-extrabold mb-3">
                {profile?.name || '관리자'}
              </h1>
              <p className="text-white/80 text-lg">
                셈오름 플랫폼 전체를 관리하세요.
              </p>
            </div>
            <Button
              onClick={() => router.push('/admin')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3"
            >
              관리자 패널 이동
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: '사용자 관리', desc: '모든 사용자 관리', icon: Users, color: 'from-blue-500 to-indigo-600', href: '/admin/users' },
            { title: '학생 관리', desc: '학생 계정 관리', icon: GraduationCap, color: 'from-green-500 to-emerald-600', href: '/admin/students' },
            { title: '선생님 관리', desc: '선생님 계정 관리', icon: Award, color: 'from-purple-500 to-pink-600', href: '/admin/teachers' },
            { title: '시스템 설정', desc: '플랫폼 설정', icon: Target, color: 'from-orange-500 to-red-600', href: '/admin/settings' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(item.href)}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
