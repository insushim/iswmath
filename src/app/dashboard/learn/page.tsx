'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  TrendingUp,
  Search,
  ChevronDown,
  Target,
  Star,
} from 'lucide-react';
import { CURRICULUM_DATA, getRecommendedContent } from '@/lib/curriculum-data';

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
  const { profile } = useAuth();
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<'elementary' | 'middle' | 'high'>('elementary');
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [progressData] = useState<Record<string, number>>({});

  // 사용자 학년에 맞는 기본 선택
  useEffect(() => {
    if (profile?.schoolType) {
      setSelectedSchool(profile.schoolType as 'elementary' | 'middle' | 'high');
    }
    if (profile?.gradeLevel) {
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

  const curriculum = CURRICULUM_DATA[selectedSchool];

  // 사용자 학년 (학교급 내)
  const userGrade = useMemo(() => {
    if (!profile?.gradeLevel) return 1;
    if (profile.gradeLevel <= 6) return profile.gradeLevel;
    if (profile.gradeLevel <= 9) return profile.gradeLevel - 6;
    return profile.gradeLevel - 9;
  }, [profile?.gradeLevel]);

  // 오늘의 추천 학습
  const todayRecommendations = useMemo(() => {
    return getRecommendedContent(selectedSchool, userGrade, 3);
  }, [selectedSchool, userGrade]);

  // 전체 개념 플랫 리스트 (검색용)
  const allConcepts = useMemo(() => {
    const concepts: Array<{
      id: string;
      name: string;
      description: string;
      difficulty: string;
      xp: number;
      duration: string;
      school: string;
      grade: number;
      unitName: string;
    }> = [];

    Object.entries(CURRICULUM_DATA).forEach(([_schoolKey, school]) => {
      school.grades.forEach(gradeData => {
        gradeData.units.forEach(unit => {
          unit.concepts.forEach(concept => {
            concepts.push({
              ...concept,
              school: school.label,
              grade: gradeData.grade,
              unitName: unit.name,
            });
          });
        });
      });
    });

    return concepts;
  }, []);

  // 검색 필터링
  const filteredConcepts = searchTerm
    ? allConcepts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  // 학습 통계
  const totalConcepts = curriculum.grades.reduce((acc, g) =>
    acc + g.units.reduce((uAcc, u) => uAcc + u.concepts.length, 0), 0
  );
  const completedConcepts = 0; // 실제로는 Firestore에서 가져와야 함

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
              <div className={`w-12 h-12 bg-gradient-to-br ${curriculum.color} rounded-2xl flex items-center justify-center shadow-lg`}>
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
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{concept.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 오늘의 추천 학습 */}
        {!filteredConcepts && todayRecommendations.length > 0 && (
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
              {todayRecommendations.map((concept, index) => (
                <motion.div
                  key={concept.id}
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
                  <p className="text-white/70 text-sm mb-2 line-clamp-1">{concept.description}</p>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Clock className="w-3 h-3" />
                    {concept.duration}
                  </div>
                </motion.div>
              ))}
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
            {Object.entries(CURRICULUM_DATA).map(([key, value]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedSchool(key as 'elementary' | 'middle' | 'high');
                  setExpandedGrade(null);
                  setExpandedUnit(null);
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

        {/* 학년별 단원 및 개념 */}
        {!filteredConcepts && (
          <div className="space-y-4">
            {curriculum.grades.map((gradeData, gradeIndex) => {
              const isGradeExpanded = expandedGrade === gradeData.grade;
              const hasUnits = gradeData.units && gradeData.units.length > 0;
              const totalGradeConcepts = hasUnits
                ? gradeData.units.reduce((acc, u) => acc + u.concepts.length, 0)
                : 0;

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
                    onClick={() => setExpandedGrade(isGradeExpanded ? null : gradeData.grade)}
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
                            {hasUnits ? `${gradeData.units.length}개 단원` : '준비 중'}
                          </span>
                          <span className="text-sm text-slate-500">
                            {totalGradeConcepts}개 개념
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {hasUnits && (
                        <div className="hidden sm:flex items-center gap-2">
                          <Target className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-500">0/{totalGradeConcepts} 완료</span>
                        </div>
                      )}
                      <motion.div
                        animate={{ rotate: isGradeExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-6 h-6 text-slate-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* 단원 목록 */}
                  <AnimatePresence>
                    {isGradeExpanded && hasUnits && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-100"
                      >
                        <div className="p-6 space-y-4">
                          {gradeData.units.map((unit, unitIndex) => {
                            const isUnitExpanded = expandedUnit === unit.id;

                            return (
                              <div key={unit.id} className="border border-slate-200 rounded-xl overflow-hidden">
                                {/* 단원 헤더 */}
                                <div
                                  onClick={() => setExpandedUnit(isUnitExpanded ? null : unit.id)}
                                  className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm">
                                      {unitIndex + 1}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-800">{unit.name}</h4>
                                      <p className="text-sm text-slate-500">{unit.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-500">{unit.concepts.length}개 개념</span>
                                    <motion.div
                                      animate={{ rotate: isUnitExpanded ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown className="w-5 h-5 text-slate-400" />
                                    </motion.div>
                                  </div>
                                </div>

                                {/* 개념 목록 */}
                                <AnimatePresence>
                                  {isUnitExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="bg-white"
                                    >
                                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {unit.concepts.map((concept, conceptIndex) => {
                                          const mastery = progressData[concept.id] || 0;
                                          const isCompleted = mastery >= 80;

                                          return (
                                            <motion.div
                                              key={concept.id}
                                              initial={{ opacity: 0, y: 10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: conceptIndex * 0.03 }}
                                              whileHover={{ scale: 1.01, y: -2 }}
                                              onClick={() => router.push(`/dashboard/learn/${concept.id}`)}
                                              className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                isCompleted
                                                  ? 'bg-green-50 border-green-200 hover:border-green-300'
                                                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                                              }`}
                                            >
                                              {isCompleted && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                                </div>
                                              )}

                                              <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                                                  isCompleted ? 'bg-green-100' : 'bg-indigo-100'
                                                }`}>
                                                  {isCompleted ? '✅' : '📘'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[concept.difficulty]}`}>
                                                      {concept.difficulty}
                                                    </span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                      <Clock className="w-3 h-3" />
                                                      {concept.duration}
                                                    </span>
                                                  </div>
                                                  <h5 className={`font-bold text-sm ${isCompleted ? 'text-green-700' : 'text-slate-800'} group-hover:text-indigo-600 transition-colors`}>
                                                    {concept.name}
                                                  </h5>
                                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{concept.description}</p>
                                                </div>
                                              </div>

                                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                                                <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                                                  <Zap className="w-3 h-3" />
                                                  +{concept.xp} XP
                                                </div>
                                                <div className="flex items-center gap-1 text-indigo-600 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                  {isCompleted ? '복습하기' : '시작하기'}
                                                  <ArrowRight className="w-3 h-3" />
                                                </div>
                                              </div>
                                            </motion.div>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 단원이 없는 경우 */}
                  <AnimatePresence>
                    {isGradeExpanded && !hasUnits && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-100"
                      >
                        <div className="p-8 text-center text-slate-500">
                          <Star className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                          <p className="font-medium">콘텐츠 준비 중입니다</p>
                          <p className="text-sm mt-1">곧 {gradeData.grade}학년 학습 콘텐츠가 추가됩니다!</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
