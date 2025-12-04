'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  ChevronRight,
  Lock,
  CheckCircle2,
  Star,
  Sparkles,
  Trophy,
  Zap,
  Clock,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Brain,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
} from 'lucide-react';

// 한국 수학 교육과정 개념 (초등~고등) - 확장된 버전
const CURRICULUM = {
  elementary: {
    label: '초등학교',
    icon: '📚',
    color: 'from-green-500 to-emerald-600',
    grades: [
      {
        grade: 1,
        concepts: [
          { id: 'elem-1-1', name: '9까지의 수', description: '1부터 9까지 수 세기와 읽기', xp: 30, duration: '10분', difficulty: '기초' },
          { id: 'elem-1-2', name: '덧셈과 뺄셈', description: '한 자리 수의 덧셈과 뺄셈', xp: 40, duration: '15분', difficulty: '기초' },
          { id: 'elem-1-3', name: '비교하기', description: '길이, 무게, 넓이 비교', xp: 30, duration: '10분', difficulty: '기초' },
          { id: 'elem-1-4', name: '50까지의 수', description: '50까지의 수 세기와 순서', xp: 35, duration: '12분', difficulty: '기초' },
        ],
      },
      {
        grade: 2,
        concepts: [
          { id: 'elem-2-1', name: '세 자리 수', description: '100부터 999까지의 수', xp: 40, duration: '15분', difficulty: '기초' },
          { id: 'elem-2-2', name: '덧셈과 뺄셈', description: '받아올림과 받아내림', xp: 50, duration: '20분', difficulty: '초급' },
          { id: 'elem-2-3', name: '곱셈구구', description: '2~9단 곱셈구구', xp: 60, duration: '25분', difficulty: '초급' },
          { id: 'elem-2-4', name: '길이 재기', description: 'cm, m 단위 사용하기', xp: 35, duration: '12분', difficulty: '기초' },
        ],
      },
      {
        grade: 3,
        concepts: [
          { id: 'elem-3-1', name: '나눗셈', description: '나눗셈의 개념과 계산', xp: 55, duration: '20분', difficulty: '초급' },
          { id: 'elem-3-2', name: '분수', description: '분수의 개념과 크기 비교', xp: 60, duration: '22분', difficulty: '초급' },
          { id: 'elem-3-3', name: '곱셈', description: '두 자리 수의 곱셈', xp: 50, duration: '18분', difficulty: '초급' },
          { id: 'elem-3-4', name: '들이와 무게', description: 'L, mL, kg, g 단위', xp: 40, duration: '15분', difficulty: '기초' },
        ],
      },
      {
        grade: 4,
        concepts: [
          { id: 'elem-4-1', name: '큰 수', description: '억, 조 단위의 큰 수', xp: 45, duration: '15분', difficulty: '초급' },
          { id: 'elem-4-2', name: '분수의 덧셈과 뺄셈', description: '같은 분모의 분수 계산', xp: 65, duration: '25분', difficulty: '중급' },
          { id: 'elem-4-3', name: '소수', description: '소수의 개념과 계산', xp: 60, duration: '22분', difficulty: '중급' },
          { id: 'elem-4-4', name: '삼각형과 사각형', description: '도형의 성질과 분류', xp: 50, duration: '18분', difficulty: '초급' },
        ],
      },
      {
        grade: 5,
        concepts: [
          { id: 'elem-5-1', name: '약수와 배수', description: '약수, 배수, 공약수, 공배수', xp: 70, duration: '28분', difficulty: '중급' },
          { id: 'elem-5-2', name: '분수의 곱셈', description: '분수와 자연수, 분수끼리의 곱셈', xp: 75, duration: '30분', difficulty: '중급' },
          { id: 'elem-5-3', name: '소수의 곱셈', description: '소수의 곱셈과 나눗셈', xp: 70, duration: '28분', difficulty: '중급' },
          { id: 'elem-5-4', name: '넓이와 부피', description: '직육면체의 겉넓이와 부피', xp: 65, duration: '25분', difficulty: '중급' },
        ],
      },
      {
        grade: 6,
        concepts: [
          { id: 'elem-6-1', name: '분수의 나눗셈', description: '분수÷자연수, 분수÷분수', xp: 80, duration: '32분', difficulty: '중급' },
          { id: 'elem-6-2', name: '비와 비율', description: '비, 비율, 백분율', xp: 75, duration: '30분', difficulty: '중급' },
          { id: 'elem-6-3', name: '원의 넓이', description: '원주율과 원의 넓이', xp: 70, duration: '28분', difficulty: '중급' },
          { id: 'elem-6-4', name: '비례식', description: '비례식과 비례배분', xp: 80, duration: '32분', difficulty: '고급' },
        ],
      },
    ],
  },
  middle: {
    label: '중학교',
    icon: '📖',
    color: 'from-blue-500 to-indigo-600',
    grades: [
      {
        grade: 1,
        concepts: [
          { id: 'mid-1-1', name: '정수와 유리수', description: '음수의 개념과 사칙연산', xp: 85, duration: '35분', difficulty: '중급' },
          { id: 'mid-1-2', name: '문자와 식', description: '변수, 다항식, 일차식', xp: 90, duration: '38분', difficulty: '중급' },
          { id: 'mid-1-3', name: '일차방정식', description: '방정식의 풀이와 활용', xp: 95, duration: '40분', difficulty: '고급' },
          { id: 'mid-1-4', name: '함수', description: '함수의 개념과 그래프', xp: 90, duration: '38분', difficulty: '고급' },
        ],
      },
      {
        grade: 2,
        concepts: [
          { id: 'mid-2-1', name: '유리수와 순환소수', description: '순환소수와 분수 변환', xp: 85, duration: '35분', difficulty: '중급' },
          { id: 'mid-2-2', name: '식의 계산', description: '다항식의 사칙연산', xp: 90, duration: '38분', difficulty: '고급' },
          { id: 'mid-2-3', name: '연립방정식', description: '이원일차연립방정식', xp: 100, duration: '42분', difficulty: '고급' },
          { id: 'mid-2-4', name: '일차함수', description: '일차함수의 그래프와 활용', xp: 95, duration: '40분', difficulty: '고급' },
        ],
      },
      {
        grade: 3,
        concepts: [
          { id: 'mid-3-1', name: '제곱근과 실수', description: '제곱근, 무리수, 실수', xp: 100, duration: '42분', difficulty: '고급' },
          { id: 'mid-3-2', name: '인수분해', description: '다항식의 인수분해', xp: 105, duration: '45분', difficulty: '고급' },
          { id: 'mid-3-3', name: '이차방정식', description: '이차방정식의 풀이', xp: 110, duration: '48분', difficulty: '심화' },
          { id: 'mid-3-4', name: '이차함수', description: '이차함수와 그래프', xp: 110, duration: '48분', difficulty: '심화' },
        ],
      },
    ],
  },
  high: {
    label: '고등학교',
    icon: '🎓',
    color: 'from-purple-500 to-pink-600',
    grades: [
      {
        grade: 1,
        concepts: [
          { id: 'high-1-1', name: '다항식', description: '다항식의 연산과 나눗셈', xp: 100, duration: '42분', difficulty: '고급' },
          { id: 'high-1-2', name: '방정식과 부등식', description: '복잡한 방정식과 부등식', xp: 110, duration: '48분', difficulty: '심화' },
          { id: 'high-1-3', name: '도형의 방정식', description: '직선과 원의 방정식', xp: 115, duration: '50분', difficulty: '심화' },
          { id: 'high-1-4', name: '집합과 명제', description: '집합, 명제, 증명', xp: 105, duration: '45분', difficulty: '고급' },
        ],
      },
      {
        grade: 2,
        concepts: [
          { id: 'high-2-1', name: '함수', description: '여러 가지 함수', xp: 110, duration: '48분', difficulty: '심화' },
          { id: 'high-2-2', name: '수열', description: '등차수열, 등비수열', xp: 115, duration: '50분', difficulty: '심화' },
          { id: 'high-2-3', name: '지수와 로그', description: '지수함수와 로그함수', xp: 120, duration: '52분', difficulty: '심화' },
          { id: 'high-2-4', name: '삼각함수', description: '삼각함수와 그래프', xp: 120, duration: '52분', difficulty: '심화' },
        ],
      },
      {
        grade: 3,
        concepts: [
          { id: 'high-3-1', name: '수열의 극한', description: '수열의 극한과 급수', xp: 125, duration: '55분', difficulty: '최상' },
          { id: 'high-3-2', name: '미분', description: '미분의 개념과 활용', xp: 130, duration: '58분', difficulty: '최상' },
          { id: 'high-3-3', name: '적분', description: '적분의 개념과 활용', xp: 130, duration: '58분', difficulty: '최상' },
          { id: 'high-3-4', name: '확률과 통계', description: '확률분포와 통계', xp: 120, duration: '52분', difficulty: '심화' },
        ],
      },
    ],
  },
};

// 오늘의 추천 학습
const todayRecommendations = [
  { id: 'elem-2-3', reason: '구구단을 마스터하면 곱셈이 쉬워져요!', priority: 1 },
  { id: 'elem-3-1', reason: '나눗셈은 곱셈의 역연산이에요', priority: 2 },
  { id: 'elem-3-2', reason: '분수의 기초를 다져보세요', priority: 3 },
];

// 난이도 색상
const difficultyColors: Record<string, string> = {
  '기초': 'bg-green-100 text-green-700',
  '초급': 'bg-blue-100 text-blue-700',
  '중급': 'bg-yellow-100 text-yellow-700',
  '고급': 'bg-orange-100 text-orange-700',
  '심화': 'bg-red-100 text-red-700',
  '최상': 'bg-purple-100 text-purple-700',
};

export default function LearnPage() {
  const { profile, user } = useAuth();
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<'elementary' | 'middle' | 'high'>('elementary');
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // 사용자 학년에 맞는 기본 선택
  useEffect(() => {
    if (profile?.schoolType) {
      setSelectedSchool(profile.schoolType);
    } else if (profile?.gradeLevel) {
      if (profile.gradeLevel <= 6) {
        setSelectedSchool('elementary');
        setExpandedGrade(profile.gradeLevel);
      } else if (profile.gradeLevel <= 9) {
        setSelectedSchool('middle');
        setExpandedGrade(profile.gradeLevel - 6);
      } else {
        setSelectedSchool('high');
        setExpandedGrade(profile.gradeLevel - 9);
      }
    }
  }, [profile]);

  const curriculum = CURRICULUM[selectedSchool];

  // 전체 개념 플랫 리스트 (검색용)
  const allConcepts = Object.values(CURRICULUM).flatMap(school =>
    school.grades.flatMap(grade =>
      grade.concepts.map(c => ({ ...c, school: school.label, grade: grade.grade }))
    )
  );

  // 검색 필터링
  const filteredConcepts = searchTerm
    ? allConcepts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  // 학습 통계
  const totalConcepts = curriculum.grades.reduce((acc, g) => acc + g.concepts.length, 0);
  const completedConcepts = curriculum.grades.reduce((acc, g) =>
    acc + g.concepts.filter(c => (progressData[c.id] || 0) >= 80).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800">개념 학습</h1>
                <p className="text-slate-500">체계적으로 수학 개념을 학습해보세요</p>
              </div>
            </div>
          </div>

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="개념 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full lg:w-80 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            />
          </div>
        </motion.div>

        {/* 검색 결과 */}
        <AnimatePresence>
          {filteredConcepts && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <h3 className="font-bold text-slate-800 mb-4">
                검색 결과: {filteredConcepts.length}개
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.slice(0, 9).map((concept) => (
                  <motion.div
                    key={concept.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push(`/dashboard/learn/${concept.id}`)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[concept.difficulty]}`}>
                        {concept.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">{concept.school} {concept.grade}학년</span>
                    </div>
                    <h4 className="font-bold text-slate-800">{concept.name}</h4>
                    <p className="text-sm text-slate-500 mt-1">{concept.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 오늘의 추천 학습 */}
        {!filteredConcepts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">오늘의 추천 학습</h2>
                <p className="text-white/80 text-sm">AI가 추천하는 맞춤 학습 콘텐츠</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {todayRecommendations.map((rec, index) => {
                const concept = allConcepts.find(c => c.id === rec.id);
                if (!concept) return null;

                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push(`/dashboard/learn/${concept.id}`)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 cursor-pointer hover:bg-white/25 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-300 text-sm font-bold">
                        <Zap className="w-4 h-4" />
                        +{concept.xp} XP
                      </div>
                    </div>
                    <h3 className="font-bold mb-1">{concept.name}</h3>
                    <p className="text-white/70 text-sm mb-2">{rec.reason}</p>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      {concept.duration}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 학교급 선택 탭 */}
        {!filteredConcepts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {Object.entries(CURRICULUM).map(([key, value]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedSchool(key as 'elementary' | 'middle' | 'high');
                  setExpandedGrade(null);
                }}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  selectedSchool === key
                    ? `bg-gradient-to-r ${value.color} text-white shadow-lg`
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl">{value.icon}</span>
                <div className="text-left">
                  <div>{value.label}</div>
                  <div className={`text-xs ${selectedSchool === key ? 'text-white/80' : 'text-slate-400'}`}>
                    {value.grades.length}개 학년
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* 학습 진행률 */}
        {!filteredConcepts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${curriculum.color} rounded-xl flex items-center justify-center`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{curriculum.label} 학습 진행률</h3>
                  <p className="text-sm text-slate-500">{completedConcepts}/{totalConcepts} 개념 완료</p>
                </div>
              </div>
              <div className="text-3xl font-extrabold text-indigo-600">
                {totalConcepts > 0 ? Math.round((completedConcepts / totalConcepts) * 100) : 0}%
              </div>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalConcepts > 0 ? (completedConcepts / totalConcepts) * 100 : 0}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${curriculum.color} rounded-full`}
              />
            </div>
          </motion.div>
        )}

        {/* 학년별 개념 아코디언 */}
        {!filteredConcepts && (
          <div className="space-y-4">
            {curriculum.grades.map((gradeData, gradeIndex) => {
              const isExpanded = expandedGrade === gradeData.grade;
              const gradeProgress = gradeData.concepts.filter(c => (progressData[c.id] || 0) >= 80).length;

              return (
                <motion.div
                  key={gradeData.grade}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + gradeIndex * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
                >
                  {/* 학년 헤더 */}
                  <motion.div
                    onClick={() => setExpandedGrade(isExpanded ? null : gradeData.grade)}
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${curriculum.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {gradeData.grade}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{gradeData.grade}학년</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-slate-500">
                            {gradeData.concepts.length}개 개념
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            {gradeProgress}/{gradeData.concepts.length} 완료
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block w-32">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${curriculum.color}`}
                            style={{ width: `${(gradeProgress / gradeData.concepts.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* 개념 목록 */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-100"
                      >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {gradeData.concepts.map((concept, conceptIndex) => {
                            const mastery = progressData[concept.id] || 0;
                            const isCompleted = mastery >= 80;

                            return (
                              <motion.div
                                key={concept.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: conceptIndex * 0.05 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                onClick={() => router.push(`/dashboard/learn/${concept.id}`)}
                                className={`group relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                  isCompleted
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
                                    : 'bg-gradient-to-br from-slate-50 to-white border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                                }`}
                              >
                                {/* 완료 배지 */}
                                {isCompleted && (
                                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                  </div>
                                )}

                                <div className="flex items-start gap-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                                    isCompleted ? 'bg-green-100' : 'bg-indigo-100'
                                  }`}>
                                    {isCompleted ? '✅' : '📘'}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[concept.difficulty]}`}>
                                        {concept.difficulty}
                                      </span>
                                      <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {concept.duration}
                                      </span>
                                    </div>
                                    <h4 className={`font-bold ${isCompleted ? 'text-green-700' : 'text-slate-800'} group-hover:text-indigo-600 transition-colors`}>
                                      {concept.name}
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-1">{concept.description}</p>
                                  </div>
                                </div>

                                {/* 진행률 & XP */}
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                  <div className="flex-1 mr-4">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-slate-500">이해도</span>
                                      <span className="font-medium text-slate-700">{mastery}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${
                                          isCompleted
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                            : 'bg-gradient-to-r from-indigo-400 to-purple-500'
                                        }`}
                                        style={{ width: `${mastery}%` }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                                    <Zap className="w-4 h-4" />
                                    +{concept.xp} XP
                                  </div>
                                </div>

                                {/* 시작 버튼 */}
                                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="flex items-center gap-1 text-indigo-600 font-medium text-sm">
                                    {isCompleted ? '복습하기' : '시작하기'}
                                    <ArrowRight className="w-4 h-4" />
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}
