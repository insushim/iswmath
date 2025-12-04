'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Target,
  CheckCircle2,
  XCircle,
  Zap,
  HelpCircle,
  RefreshCw,
  Flame,
  Brain,
  Trophy,
  Clock,
  ArrowRight,
  Sparkles,
  Star,
  Award,
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';

// AI 문제 생성을 시뮬레이션
function generateProblem(conceptId: string, difficulty: number): {
  question: string;
  answer: string;
  hint: string;
  concept: string;
  explanation?: string;
} {
  const problems: Record<string, Array<{ q: string; a: string; h: string; e?: string }>> = {
    addition: [
      { q: '3 + 5 = ?', a: '8', h: '3에서 5만큼 더 세어보세요.', e: '3 다음 숫자를 5번 세면: 4, 5, 6, 7, 8' },
      { q: '7 + 4 = ?', a: '11', h: '7에서 4만큼 더하면?', e: '7 + 3 = 10, 10 + 1 = 11' },
      { q: '15 + 8 = ?', a: '23', h: '15 + 5 + 3으로 나눠보세요.', e: '15 + 5 = 20, 20 + 3 = 23' },
      { q: '24 + 17 = ?', a: '41', h: '24 + 16 + 1로 계산해보세요.', e: '24 + 17 = 24 + 16 + 1 = 40 + 1 = 41' },
      { q: '156 + 89 = ?', a: '245', h: '156 + 90 - 1로 계산하면 쉬워요.', e: '156 + 90 = 246, 246 - 1 = 245' },
    ],
    subtraction: [
      { q: '9 - 4 = ?', a: '5', h: '9에서 4만큼 빼세요.', e: '9에서 4를 빼면 5가 남아요' },
      { q: '15 - 7 = ?', a: '8', h: '15에서 5를 빼고, 2를 더 빼세요.', e: '15 - 5 = 10, 10 - 2 = 8' },
      { q: '32 - 18 = ?', a: '14', h: '32 - 20 + 2로 계산해보세요.', e: '32 - 20 = 12, 12 + 2 = 14' },
      { q: '100 - 47 = ?', a: '53', h: '100 - 50 + 3으로 계산하면?', e: '100 - 50 = 50, 50 + 3 = 53' },
      { q: '234 - 89 = ?', a: '145', h: '234 - 90 + 1로 계산해보세요.', e: '234 - 90 = 144, 144 + 1 = 145' },
    ],
    multiplication: [
      { q: '3 × 4 = ?', a: '12', h: '3을 4번 더하면?', e: '3 + 3 + 3 + 3 = 12' },
      { q: '7 × 6 = ?', a: '42', h: '7 × 6 = 7 × 5 + 7', e: '7 × 5 = 35, 35 + 7 = 42' },
      { q: '12 × 5 = ?', a: '60', h: '12 × 10 ÷ 2', e: '12 × 10 = 120, 120 ÷ 2 = 60' },
      { q: '15 × 8 = ?', a: '120', h: '15 × 8 = 15 × 10 - 15 × 2', e: '15 × 10 = 150, 15 × 2 = 30, 150 - 30 = 120' },
      { q: '23 × 7 = ?', a: '161', h: '20 × 7 + 3 × 7', e: '20 × 7 = 140, 3 × 7 = 21, 140 + 21 = 161' },
    ],
    division: [
      { q: '12 ÷ 3 = ?', a: '4', h: '12를 3으로 나누면 몇 묶음?', e: '12개를 3개씩 묶으면 4묶음' },
      { q: '24 ÷ 6 = ?', a: '4', h: '6 × ? = 24', e: '6 × 4 = 24이므로 답은 4' },
      { q: '45 ÷ 9 = ?', a: '5', h: '9 × 5 = ?', e: '9 × 5 = 45이므로 답은 5' },
      { q: '72 ÷ 8 = ?', a: '9', h: '8 × 9 = ?', e: '8 × 9 = 72이므로 답은 9' },
      { q: '144 ÷ 12 = ?', a: '12', h: '12 × 12 = ?', e: '12 × 12 = 144이므로 답은 12' },
    ],
    fraction: [
      { q: '1/2 + 1/2 = ?', a: '1', h: '반쪽 둘을 합하면?', e: '1/2 + 1/2 = 2/2 = 1' },
      { q: '3/4 - 1/4 = ?', a: '1/2', h: '같은 분모끼리 빼세요.', e: '3/4 - 1/4 = 2/4 = 1/2' },
      { q: '2/5 + 1/5 = ?', a: '3/5', h: '분자끼리 더하세요.', e: '(2+1)/5 = 3/5' },
      { q: '1/3 + 1/6 = ?', a: '1/2', h: '1/3 = 2/6이에요.', e: '2/6 + 1/6 = 3/6 = 1/2' },
      { q: '3/4 × 2/3 = ?', a: '1/2', h: '분자끼리, 분모끼리 곱하세요.', e: '(3×2)/(4×3) = 6/12 = 1/2' },
    ],
    integer: [
      { q: '(-3) + 5 = ?', a: '2', h: '수직선에서 -3에서 5칸 오른쪽으로!', e: '-3에서 오른쪽으로 5칸 가면 2' },
      { q: '(-4) × (-2) = ?', a: '8', h: '음수 × 음수 = 양수', e: '(-) × (-) = (+), 4 × 2 = 8' },
      { q: '(-15) + (-8) = ?', a: '-23', h: '음수끼리 더하면 절댓값을 더하고 음수로!', e: '15 + 8 = 23, 부호는 음수' },
      { q: '(-6) × 7 = ?', a: '-42', h: '음수 × 양수 = 음수', e: '(-) × (+) = (-), 6 × 7 = 42' },
      { q: '(-24) ÷ (-6) = ?', a: '4', h: '음수 ÷ 음수 = 양수', e: '(-) ÷ (-) = (+), 24 ÷ 6 = 4' },
    ],
    equation: [
      { q: 'x + 5 = 12 일 때, x = ?', a: '7', h: '양변에서 5를 빼세요.', e: 'x = 12 - 5 = 7' },
      { q: '3x = 15 일 때, x = ?', a: '5', h: '양변을 3으로 나누세요.', e: 'x = 15 ÷ 3 = 5' },
      { q: '2x + 3 = 11 일 때, x = ?', a: '4', h: '먼저 3을 빼고, 2로 나누세요.', e: '2x = 8, x = 4' },
      { q: 'x/4 = 8 일 때, x = ?', a: '32', h: '양변에 4를 곱하세요.', e: 'x = 8 × 4 = 32' },
      { q: '5x - 7 = 18 일 때, x = ?', a: '5', h: '7을 더하고, 5로 나누세요.', e: '5x = 25, x = 5' },
    ],
  };

  const concepts = Object.keys(problems);
  const selectedConcept = conceptId || concepts[Math.floor(Math.random() * concepts.length)];
  const conceptProblems = problems[selectedConcept] || problems.addition;

  const index = Math.min(difficulty - 1, conceptProblems.length - 1);
  const problem = conceptProblems[Math.max(0, index)];

  return {
    question: problem.q,
    answer: problem.a,
    hint: problem.h,
    concept: selectedConcept,
    explanation: problem.e,
  };
}

const CONCEPT_DATA: Record<string, { name: string; icon: string; color: string }> = {
  addition: { name: '덧셈', icon: '➕', color: 'from-blue-500 to-cyan-500' },
  subtraction: { name: '뺄셈', icon: '➖', color: 'from-purple-500 to-pink-500' },
  multiplication: { name: '곱셈', icon: '✖️', color: 'from-orange-500 to-red-500' },
  division: { name: '나눗셈', icon: '➗', color: 'from-green-500 to-emerald-500' },
  fraction: { name: '분수', icon: '🔢', color: 'from-indigo-500 to-violet-500' },
  integer: { name: '정수', icon: '🔢', color: 'from-teal-500 to-cyan-500' },
  equation: { name: '방정식', icon: '📐', color: 'from-rose-500 to-pink-500' },
};

export default function PracticePage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [selectedConcept, setSelectedConcept] = useState<string>('');
  const [currentProblem, setCurrentProblem] = useState<{
    question: string;
    answer: string;
    hint: string;
    concept: string;
    explanation?: string;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [startTime, setStartTime] = useState<number>(0);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && !showResult) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, showResult, startTime]);

  const generateNewProblem = useCallback(() => {
    const problem = generateProblem(selectedConcept, difficulty);
    setCurrentProblem(problem);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [selectedConcept, difficulty]);

  useEffect(() => {
    if (isStarted && !currentProblem) {
      generateNewProblem();
    }
  }, [isStarted, currentProblem, generateNewProblem]);

  const handleStart = (concept: string = '') => {
    setSelectedConcept(concept);
    setIsStarted(true);
    setStreak(0);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setEarnedXP(0);
    setDifficulty(1);
    setBestStreak(0);

    const problem = generateProblem(concept, 1);
    setCurrentProblem(problem);
    setStartTime(Date.now());
  };

  const handleSubmit = async () => {
    if (!currentProblem || !user) return;

    const correct = userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();

    setIsCorrect(correct);
    setShowResult(true);
    setTotalAttempts(totalAttempts + 1);

    let xpGained = 0;

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalCorrect(totalCorrect + 1);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      xpGained = 10 + (difficulty * 2);
      if (elapsedTime < 10) xpGained += 5;
      if (showHint) xpGained = Math.max(5, xpGained - 5);
      if (newStreak >= 5) xpGained += 5;
      if (newStreak >= 10) xpGained += 10;

      setEarnedXP(earnedXP + xpGained);

      if (newStreak % 3 === 0 && difficulty < 5) {
        setDifficulty(difficulty + 1);
      }
    } else {
      setStreak(0);
      if (difficulty > 1) {
        setDifficulty(difficulty - 1);
      }
    }
  };

  const handleNext = () => {
    generateNewProblem();
  };

  const handleEnd = () => {
    setIsStarted(false);
    setCurrentProblem(null);
  };

  // 시작 화면
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800">연습 문제</h1>
              <p className="text-slate-500">실력을 키우는 맞춤형 문제 풀이</p>
            </div>
          </motion.div>

          {/* 종합 연습 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.01, y: -4 }}
            onClick={() => handleStart('')}
            className="relative overflow-hidden cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Brain className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">종합 연습</h2>
                  <p className="text-white/80">다양한 유형의 문제를 랜덤으로 풀어보세요</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-yellow-300">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">XP 보너스</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-300">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">스트릭 모드</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-white/80 font-medium">시작하기</span>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 영역별 연습 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">영역별 연습</h2>
                <p className="text-sm text-slate-500">원하는 영역을 집중적으로 연습하세요</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(CONCEPT_DATA).map(([key, data], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStart(key)}
                  className="cursor-pointer group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:border-indigo-200 transition-all">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {data.icon}
                    </div>
                    <h3 className="font-bold text-slate-800 text-center group-hover:text-indigo-600 transition-colors">
                      {data.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-2 text-slate-400 group-hover:text-indigo-500 transition-colors">
                      <span className="text-sm">연습하기</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 학습 팁 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-2">학습 팁</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• 연속으로 정답을 맞추면 <strong>스트릭 보너스 XP</strong>를 받아요!</li>
                  <li>• 3문제 연속 정답 시 <strong>난이도가 자동으로 상승</strong>해요</li>
                  <li>• 10초 안에 풀면 <strong>빠른 풀이 보너스</strong>를 받아요</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 연습 진행 화면
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 상태 바 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* 스트릭 */}
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  streak > 0 ? 'bg-orange-100' : 'bg-slate-100'
                }`}>
                  <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">스트릭</p>
                  <p className="font-bold text-slate-800">{streak}</p>
                </div>
              </div>

              {/* 정답률 */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">정답</p>
                  <p className="font-bold text-slate-800">{totalCorrect}/{totalAttempts}</p>
                </div>
              </div>

              {/* XP */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">획득 XP</p>
                  <p className="font-bold text-amber-600">+{earnedXP}</p>
                </div>
              </div>
            </div>

            {/* 난이도 & 타이머 */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <p className="text-xs text-slate-500 mb-1">난이도</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div
                      key={d}
                      className={`w-2 h-5 rounded-sm transition-all ${
                        d <= difficulty ? 'bg-indigo-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-mono font-bold text-slate-700">
                  {Math.floor(elapsedTime / 60).toString().padStart(2, '0')}:
                  {(elapsedTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 문제 카드 */}
        {currentProblem && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProblem.question}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
            >
              {/* 개념 헤더 */}
              <div className={`bg-gradient-to-r ${CONCEPT_DATA[currentProblem.concept]?.color || 'from-blue-500 to-indigo-600'} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                      {CONCEPT_DATA[currentProblem.concept]?.icon || '📘'}
                    </div>
                    <span className="text-white font-bold">
                      {CONCEPT_DATA[currentProblem.concept]?.name || currentProblem.concept}
                    </span>
                  </div>
                  {streak >= 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full"
                    >
                      <Flame className="w-4 h-4 text-orange-300" />
                      <span className="text-white text-sm font-medium">{streak}연속!</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="p-8">
                {/* 문제 */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 mb-8">
                  <p className="text-3xl font-bold text-center text-slate-800">
                    {currentProblem.question}
                  </p>
                </div>

                {!showResult ? (
                  <>
                    {/* 답 입력 */}
                    <div className="space-y-4">
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="정답을 입력하세요"
                        className="text-2xl text-center h-16 rounded-xl border-2 border-slate-200 focus:border-indigo-500"
                        onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                        autoFocus
                      />

                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💡</span>
                            <p className="text-amber-700 font-medium">
                              {currentProblem.hint}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-3 mt-8">
                      {!showHint && (
                        <Button
                          variant="outline"
                          onClick={() => setShowHint(true)}
                          className="flex-1 h-14 text-lg rounded-xl border-2"
                        >
                          <HelpCircle className="w-5 h-5 mr-2" />
                          힌트
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmit}
                        disabled={!userAnswer}
                        className="flex-1 h-14 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl"
                      >
                        정답 확인
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </>
                ) : (
                  /* 결과 */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div
                      className={`p-8 rounded-2xl ${
                        isCorrect
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                          : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-4">
                        {isCorrect ? (
                          <>
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', damping: 10 }}
                              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle2 className="w-12 h-12 text-white" />
                            </motion.div>
                            <span className="text-3xl font-extrabold text-green-700">정답! 🎉</span>
                            <div className="flex items-center gap-2 text-green-600 font-bold">
                              <Zap className="w-5 h-5" />
                              <span>+{10 + (difficulty * 2) + (elapsedTime < 10 ? 5 : 0) - (showHint ? 5 : 0)} XP</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center"
                            >
                              <XCircle className="w-12 h-12 text-white" />
                            </motion.div>
                            <span className="text-3xl font-extrabold text-red-700">아쉬워요!</span>
                            <div className="bg-white/50 px-4 py-2 rounded-xl">
                              <p className="text-red-600">
                                정답: <strong className="text-2xl">{currentProblem.answer}</strong>
                              </p>
                            </div>
                          </>
                        )}

                        {/* 풀이 설명 */}
                        {currentProblem.explanation && (
                          <div className={`w-full p-4 rounded-xl mt-2 ${
                            isCorrect ? 'bg-white/50' : 'bg-white/50'
                          }`}>
                            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              <strong>풀이:</strong> {currentProblem.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={handleEnd}
                        className="flex-1 h-14 text-lg rounded-xl border-2"
                      >
                        <Pause className="w-5 h-5 mr-2" />
                        종료
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 h-14 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl"
                      >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        다음 문제
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 진행 통계 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-slate-800">학습 통계</span>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Trophy className="w-4 h-4" />
              최고 스트릭: {bestStreak}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <p className="text-2xl font-bold text-indigo-600">{totalAttempts}</p>
              <p className="text-xs text-slate-500">풀이 문제</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">
                {totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0}%
              </p>
              <p className="text-xs text-slate-500">정답률</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">+{earnedXP}</p>
              <p className="text-xs text-slate-500">획득 XP</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
