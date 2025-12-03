'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { saveProblemAttempt, addXP, updateDailyGoal } from '@/lib/firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  CheckCircle2,
  XCircle,
  Zap,
  HelpCircle,
  RefreshCw,
  Flame,
  Brain,
} from 'lucide-react';

// AI 문제 생성을 시뮬레이션 (실제로는 Gemini API 사용)
function generateProblem(conceptId: string, difficulty: number): {
  question: string;
  answer: string;
  hint: string;
  concept: string;
} {
  const problems: Record<string, Array<{ q: string; a: string; h: string }>> = {
    addition: [
      { q: '3 + 5 = ?', a: '8', h: '3에서 5만큼 더 세어보세요.' },
      { q: '7 + 4 = ?', a: '11', h: '7에서 4만큼 더하면?' },
      { q: '15 + 8 = ?', a: '23', h: '15 + 5 + 3으로 나눠보세요.' },
      { q: '24 + 17 = ?', a: '41', h: '24 + 16 + 1로 계산해보세요.' },
      { q: '156 + 89 = ?', a: '245', h: '156 + 90 - 1로 계산하면 쉬워요.' },
    ],
    subtraction: [
      { q: '9 - 4 = ?', a: '5', h: '9에서 4만큼 빼세요.' },
      { q: '15 - 7 = ?', a: '8', h: '15에서 5를 빼고, 2를 더 빼세요.' },
      { q: '32 - 18 = ?', a: '14', h: '32 - 20 + 2로 계산해보세요.' },
      { q: '100 - 47 = ?', a: '53', h: '100 - 50 + 3으로 계산하면?' },
      { q: '234 - 89 = ?', a: '145', h: '234 - 90 + 1로 계산해보세요.' },
    ],
    multiplication: [
      { q: '3 × 4 = ?', a: '12', h: '3을 4번 더하면?' },
      { q: '7 × 6 = ?', a: '42', h: '7 × 6 = 7 × 5 + 7' },
      { q: '12 × 5 = ?', a: '60', h: '12 × 10 ÷ 2' },
      { q: '15 × 8 = ?', a: '120', h: '15 × 8 = 15 × 10 - 15 × 2' },
      { q: '23 × 7 = ?', a: '161', h: '20 × 7 + 3 × 7' },
    ],
    division: [
      { q: '12 ÷ 3 = ?', a: '4', h: '12를 3으로 나누면 몇 묶음?' },
      { q: '24 ÷ 6 = ?', a: '4', h: '6 × ? = 24' },
      { q: '45 ÷ 9 = ?', a: '5', h: '9 × 5 = ?' },
      { q: '72 ÷ 8 = ?', a: '9', h: '8 × 9 = ?' },
      { q: '144 ÷ 12 = ?', a: '12', h: '12 × 12 = ?' },
    ],
    fraction: [
      { q: '1/2 + 1/2 = ?', a: '1', h: '반쪽 둘을 합하면?' },
      { q: '3/4 - 1/4 = ?', a: '1/2', h: '같은 분모끼리 빼세요.' },
      { q: '2/5 + 1/5 = ?', a: '3/5', h: '분자끼리 더하세요.' },
      { q: '1/3 + 1/6 = ?', a: '1/2', h: '1/3 = 2/6이에요.' },
      { q: '3/4 × 2/3 = ?', a: '1/2', h: '분자끼리, 분모끼리 곱하세요.' },
    ],
    integer: [
      { q: '(-3) + 5 = ?', a: '2', h: '수직선에서 -3에서 5칸 오른쪽으로!' },
      { q: '(-4) × (-2) = ?', a: '8', h: '음수 × 음수 = 양수' },
      { q: '(-15) + (-8) = ?', a: '-23', h: '음수끼리 더하면 절댓값을 더하고 음수로!' },
      { q: '(-6) × 7 = ?', a: '-42', h: '음수 × 양수 = 음수' },
      { q: '(-24) ÷ (-6) = ?', a: '4', h: '음수 ÷ 음수 = 양수' },
    ],
    equation: [
      { q: 'x + 5 = 12 일 때, x = ?', a: '7', h: '양변에서 5를 빼세요.' },
      { q: '3x = 15 일 때, x = ?', a: '5', h: '양변을 3으로 나누세요.' },
      { q: '2x + 3 = 11 일 때, x = ?', a: '4', h: '먼저 3을 빼고, 2로 나누세요.' },
      { q: 'x/4 = 8 일 때, x = ?', a: '32', h: '양변에 4를 곱하세요.' },
      { q: '5x - 7 = 18 일 때, x = ?', a: '5', h: '7을 더하고, 5로 나누세요.' },
    ],
  };

  const concepts = Object.keys(problems);
  const selectedConcept = conceptId || concepts[Math.floor(Math.random() * concepts.length)];
  const conceptProblems = problems[selectedConcept] || problems.addition;

  // 난이도에 따라 문제 선택 (0-4 인덱스)
  const index = Math.min(difficulty - 1, conceptProblems.length - 1);
  const problem = conceptProblems[Math.max(0, index)];

  return {
    question: problem.q,
    answer: problem.a,
    hint: problem.h,
    concept: selectedConcept,
  };
}

const CONCEPT_NAMES: Record<string, string> = {
  addition: '덧셈',
  subtraction: '뺄셈',
  multiplication: '곱셈',
  division: '나눗셈',
  fraction: '분수',
  integer: '정수',
  equation: '방정식',
};

export default function PracticePage() {
  const { user } = useAuth();
  const [selectedConcept, setSelectedConcept] = useState<string>('');
  const [currentProblem, setCurrentProblem] = useState<{
    question: string;
    answer: string;
    hint: string;
    concept: string;
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

  const generateNewProblem = useCallback(() => {
    const problem = generateProblem(selectedConcept, difficulty);
    setCurrentProblem(problem);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setStartTime(Date.now());
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

    const problem = generateProblem(concept, 1);
    setCurrentProblem(problem);
    setStartTime(Date.now());
  };

  const handleSubmit = async () => {
    if (!currentProblem || !user) return;

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const correct = userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();

    setIsCorrect(correct);
    setShowResult(true);
    setTotalAttempts(totalAttempts + 1);

    let xpGained = 0;

    if (correct) {
      setStreak(streak + 1);
      setTotalCorrect(totalCorrect + 1);

      // XP 계산: 기본 10 + 난이도 보너스 + 빠른 풀이 보너스 - 힌트 페널티
      xpGained = 10 + (difficulty * 2);
      if (timeSpent < 10) xpGained += 5; // 빠른 풀이 보너스
      if (showHint) xpGained = Math.max(5, xpGained - 5); // 힌트 사용 시 감점

      // 스트릭 보너스
      if (streak >= 5) xpGained += 5;
      if (streak >= 10) xpGained += 10;

      setEarnedXP(earnedXP + xpGained);

      // 난이도 조정 (3문제 연속 정답 시 난이도 상승)
      if ((streak + 1) % 3 === 0 && difficulty < 5) {
        setDifficulty(difficulty + 1);
      }

      // 데이터 저장
      try {
        await Promise.all([
          saveProblemAttempt(user.uid, {
            problemId: `practice-${Date.now()}`,
            conceptId: currentProblem.concept,
            userAnswer,
            isCorrect: true,
            timeSeconds: timeSpent,
            hintsUsed: showHint ? 1 : 0,
            xpEarned: xpGained,
            difficulty,
          }),
          addXP(user.uid, xpGained),
          updateDailyGoal(user.uid, { completedProblems: 1, earnedXP: xpGained }),
        ]);
      } catch (error) {
        console.error('저장 오류:', error);
      }
    } else {
      setStreak(0);
      // 난이도 감소 (틀리면 난이도 하락)
      if (difficulty > 1) {
        setDifficulty(difficulty - 1);
      }

      // 오답 기록
      try {
        await saveProblemAttempt(user.uid, {
          problemId: `practice-${Date.now()}`,
          conceptId: currentProblem.concept,
          userAnswer,
          isCorrect: false,
          timeSeconds: timeSpent,
          hintsUsed: showHint ? 1 : 0,
          xpEarned: 0,
          difficulty,
        });
      } catch (error) {
        console.error('저장 오류:', error);
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
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-2">연습 문제</h1>
          <p className="text-gray-600">
            원하는 영역을 선택하거나, 종합 연습을 시작하세요!
          </p>
        </motion.div>

        {/* 종합 연습 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="cursor-pointer hover:shadow-lg transition-all border-2 border-blue-200 hover:border-blue-400"
            onClick={() => handleStart('')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">종합 연습</h3>
                  <p className="text-gray-500">다양한 유형의 문제를 랜덤으로 풀어보세요</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 영역별 연습 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-3">영역별 연습</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(CONCEPT_NAMES).map(([key, name], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
                  onClick={() => handleStart(key)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium">{name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // 연습 진행 화면
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 상태 바 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className="font-bold">{streak}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>{totalCorrect}/{totalAttempts}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">+{earnedXP}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">난이도</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className={`w-2 h-4 rounded-sm ${
                  d <= difficulty ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
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
          >
            <Card className="border-2">
              <CardContent className="p-6">
                {/* 개념 태그 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                    {CONCEPT_NAMES[currentProblem.concept] || currentProblem.concept}
                  </span>
                  {streak >= 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 text-orange-500"
                    >
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">{streak}연속!</span>
                    </motion.div>
                  )}
                </div>

                {/* 문제 */}
                <div className="p-6 bg-gray-50 rounded-xl mb-6">
                  <p className="text-2xl font-medium text-center">
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
                        className="text-xl text-center h-14"
                        onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                        autoFocus
                      />

                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                        >
                          <p className="text-yellow-700 text-sm text-center">
                            💡 {currentProblem.hint}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-2 mt-6">
                      {!showHint && (
                        <Button
                          variant="outline"
                          onClick={() => setShowHint(true)}
                          className="flex-1"
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          힌트
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmit}
                        disabled={!userAnswer}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
                      >
                        확인
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
                      className={`p-6 rounded-xl ${
                        isCorrect
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-red-50 border-2 border-red-200'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {isCorrect ? (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', damping: 10 }}
                            >
                              <CheckCircle2 className="w-16 h-16 text-green-500" />
                            </motion.div>
                            <span className="text-2xl font-bold text-green-700">정답! 🎉</span>
                            <span className="text-green-600">+{earnedXP - (totalCorrect > 1 ? earnedXP - 10 : 0)} XP</span>
                          </>
                        ) : (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <XCircle className="w-16 h-16 text-red-500" />
                            </motion.div>
                            <span className="text-2xl font-bold text-red-700">아쉬워요!</span>
                            <p className="text-red-600">
                              정답은 <strong className="text-xl">{currentProblem.answer}</strong>입니다.
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={handleEnd}
                        className="flex-1"
                      >
                        종료
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        다음 문제
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      {/* 진행 통계 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">정답률</span>
              <span className="font-medium">
                {totalAttempts > 0
                  ? Math.round((totalCorrect / totalAttempts) * 100)
                  : 0}
                %
              </span>
            </div>
            <Progress
              value={totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
