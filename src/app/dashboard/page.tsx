'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getTodayGoal, getRecentAttempts, getAllProgress } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Target,
  Trophy,
  Flame,
  Zap,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Brain,
  Sparkles,
} from 'lucide-react';

interface DailyGoal {
  targetProblems: number;
  targetMinutes: number;
  targetXP: number;
  completedProblems: number;
  completedMinutes: number;
  earnedXP: number;
  isCompleted: boolean;
}

interface RecentAttempt {
  id: string;
  conceptId: string;
  isCorrect: boolean;
  xpEarned: number;
  createdAt: { seconds: number };
}

export default function DashboardPage() {
  const { profile, user } = useAuth();
  const router = useRouter();
  const [dailyGoal, setDailyGoal] = useState<DailyGoal | null>(null);
  const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([]);
  const [progressCount, setProgressCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;

      try {
        // 학생인 경우에만 학습 데이터 로드
        if (profile?.role === 'student') {
          const [goal, attempts, progress] = await Promise.all([
            getTodayGoal(user.uid),
            getRecentAttempts(user.uid, 5),
            getAllProgress(user.uid),
          ]);

          setDailyGoal(goal as DailyGoal);
          setRecentAttempts(attempts as RecentAttempt[]);
          setProgressCount(progress.length);
        }
      } catch (error) {
        console.error('대시보드 데이터 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user, profile]);

  // 역할별 대시보드 렌더링
  if (profile?.role === 'parent') {
    return <ParentDashboard />;
  }

  if (profile?.role === 'teacher') {
    return <TeacherDashboard />;
  }

  // 학생 대시보드
  return (
    <div className="space-y-6">
      {/* 환영 메시지 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              안녕하세요, {profile?.name || '학생'}님!
            </h1>
            <p className="text-blue-100">
              오늘도 수학 실력을 키워볼까요?
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-yellow-300">
              <Flame className="w-6 h-6" />
              <span className="text-2xl font-bold">{profile?.streak || 0}</span>
            </div>
            <p className="text-sm text-blue-100">일 연속</p>
          </div>
        </div>

        {/* 레벨 & XP */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Lv. {profile?.currentLevel || 1}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>XP</span>
              <span>{profile?.totalXP || 0} / {((profile?.currentLevel || 1) * 100)}</span>
            </div>
            <Progress
              value={((profile?.totalXP || 0) % 100)}
              className="h-2 bg-blue-400"
            />
          </div>
        </div>
      </motion.div>

      {/* 일일 목표 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              오늘의 목표
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 문제 풀기 */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      문제 풀기
                    </span>
                    <span>
                      {dailyGoal?.completedProblems || 0} / {dailyGoal?.targetProblems || 10}
                    </span>
                  </div>
                  <Progress
                    value={
                      ((dailyGoal?.completedProblems || 0) /
                        (dailyGoal?.targetProblems || 10)) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                {/* 학습 시간 */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      학습 시간
                    </span>
                    <span>
                      {dailyGoal?.completedMinutes || 0}분 / {dailyGoal?.targetMinutes || 30}분
                    </span>
                  </div>
                  <Progress
                    value={
                      ((dailyGoal?.completedMinutes || 0) /
                        (dailyGoal?.targetMinutes || 30)) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                {/* XP */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      경험치 획득
                    </span>
                    <span>
                      {dailyGoal?.earnedXP || 0} / {dailyGoal?.targetXP || 100} XP
                    </span>
                  </div>
                  <Progress
                    value={
                      ((dailyGoal?.earnedXP || 0) / (dailyGoal?.targetXP || 100)) * 100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* 빠른 시작 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* 학습 시작 */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">개념 학습</h3>
                <p className="text-sm text-gray-500">새로운 개념을 배워보세요</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/dashboard/learn')}
            >
              학습 시작하기
            </Button>
          </CardContent>
        </Card>

        {/* 연습 문제 */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">연습 문제</h3>
                <p className="text-sm text-gray-500">배운 내용을 연습해보세요</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <Button
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => router.push('/dashboard/practice')}
            >
              연습 시작하기
            </Button>
          </CardContent>
        </Card>

        {/* 진단 테스트 */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">실력 진단</h3>
                <p className="text-sm text-gray-500">나의 수준을 확인해보세요</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <Button
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/dashboard/diagnosis')}
            >
              진단 시작하기
            </Button>
          </CardContent>
        </Card>

        {/* 업적 */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">업적</h3>
                <p className="text-sm text-gray-500">내 업적을 확인하세요</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <Button
              className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700"
              onClick={() => router.push('/dashboard/achievements')}
            >
              업적 보기
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 통계 및 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 학습 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                학습 통계
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600">
                    {profile?.totalXP || 0}
                  </p>
                  <p className="text-sm text-gray-500">총 경험치</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">
                    {progressCount}
                  </p>
                  <p className="text-sm text-gray-500">학습한 개념</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <p className="text-3xl font-bold text-orange-600">
                    {profile?.streak || 0}
                  </p>
                  <p className="text-sm text-gray-500">연속 학습</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600">
                    {profile?.coins || 0}
                  </p>
                  <p className="text-sm text-gray-500">보유 코인</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 최근 활동 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                최근 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentAttempts.length > 0 ? (
                <div className="space-y-3">
                  {recentAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          attempt.isCorrect
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {attempt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <X className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {attempt.isCorrect ? '정답!' : '오답'}
                        </p>
                        <p className="text-xs text-gray-500">
                          +{attempt.xpEarned} XP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>아직 학습 기록이 없어요</p>
                  <p className="text-sm">첫 문제를 풀어보세요!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// 학부모 대시보드
function ParentDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          안녕하세요, {profile?.name || '학부모'}님!
        </h1>
        <p className="text-green-100">
          자녀의 학습 현황을 확인해보세요.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>자녀 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              자녀를 등록하고 학습 현황을 모니터링하세요.
            </p>
            <Button className="w-full">자녀 등록하기</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>학습 리포트</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              자녀의 학습 진도와 성취도를 확인하세요.
            </p>
            <Button variant="outline" className="w-full">
              리포트 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 선생님 대시보드
function TeacherDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          안녕하세요, {profile?.name || '선생님'}!
        </h1>
        <p className="text-indigo-100">
          학생들의 학습 현황을 관리해보세요.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>학생 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              학생들을 등록하고 관리하세요.
            </p>
            <Button className="w-full">학생 관리</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>클래스 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              클래스를 만들고 학생을 배정하세요.
            </p>
            <Button variant="outline" className="w-full">
              클래스 관리
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>학습 리포트</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              학생들의 학습 현황을 분석하세요.
            </p>
            <Button variant="outline" className="w-full">
              리포트 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// X 아이콘이 import되지 않았으므로 추가
function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
