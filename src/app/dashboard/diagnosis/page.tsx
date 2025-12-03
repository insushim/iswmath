'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { saveProgress, addXP, updateDailyGoal } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Target,
  BarChart3,
  Sparkles,
  Trophy,
} from 'lucide-react';

// 진단 테스트 문제 (학년별)
const DIAGNOSTIC_PROBLEMS: Record<string, Array<{
  id: string;
  question: string;
  answer: string;
  concept: string;
  difficulty: number;
}>> = {
  elementary: [
    { id: 'diag-e1', question: '7 + 5 = ?', answer: '12', concept: '덧셈', difficulty: 1 },
    { id: 'diag-e2', question: '15 - 8 = ?', answer: '7', concept: '뺄셈', difficulty: 1 },
    { id: 'diag-e3', question: '6 × 7 = ?', answer: '42', concept: '곱셈', difficulty: 2 },
    { id: 'diag-e4', question: '48 ÷ 6 = ?', answer: '8', concept: '나눗셈', difficulty: 2 },
    { id: 'diag-e5', question: '1/4 + 2/4 = ?', answer: '3/4', concept: '분수', difficulty: 3 },
    { id: 'diag-e6', question: '0.5 + 0.3 = ?', answer: '0.8', concept: '소수', difficulty: 3 },
    { id: 'diag-e7', question: '24의 약수의 개수는?', answer: '8', concept: '약수와 배수', difficulty: 4 },
    { id: 'diag-e8', question: '3/5 × 10 = ?', answer: '6', concept: '분수의 곱셈', difficulty: 4 },
    { id: 'diag-e9', question: '2 : 3 = 8 : ?', answer: '12', concept: '비례식', difficulty: 5 },
    { id: 'diag-e10', question: '원의 지름이 10cm일 때, 원주는 약 몇 cm? (π=3.14)', answer: '31.4', concept: '원', difficulty: 5 },
  ],
  middle: [
    { id: 'diag-m1', question: '(-3) + (-5) = ?', answer: '-8', concept: '정수의 덧셈', difficulty: 1 },
    { id: 'diag-m2', question: '(-4) × 6 = ?', answer: '-24', concept: '정수의 곱셈', difficulty: 1 },
    { id: 'diag-m3', question: '2x + 3 = 11 일 때, x = ?', answer: '4', concept: '일차방정식', difficulty: 2 },
    { id: 'diag-m4', question: '0.333... 을 분수로 나타내면?', answer: '1/3', concept: '순환소수', difficulty: 2 },
    { id: 'diag-m5', question: '(x+2)(x+3)을 전개하면?', answer: 'x²+5x+6', concept: '다항식', difficulty: 3 },
    { id: 'diag-m6', question: 'x + y = 5, x - y = 1 일 때, x = ?', answer: '3', concept: '연립방정식', difficulty: 3 },
    { id: 'diag-m7', question: '√18 을 간단히 하면?', answer: '3√2', concept: '제곱근', difficulty: 4 },
    { id: 'diag-m8', question: 'x² - 5x + 6 을 인수분해하면?', answer: '(x-2)(x-3)', concept: '인수분해', difficulty: 4 },
    { id: 'diag-m9', question: 'x² - 4x + 3 = 0 의 해를 구하면? (작은 값)', answer: '1', concept: '이차방정식', difficulty: 5 },
    { id: 'diag-m10', question: 'y = x² - 4x + 3 의 꼭짓점의 x좌표는?', answer: '2', concept: '이차함수', difficulty: 5 },
  ],
  high: [
    { id: 'diag-h1', question: 'x² - 4 를 인수분해하면?', answer: '(x+2)(x-2)', concept: '다항식', difficulty: 1 },
    { id: 'diag-h2', question: '|2x - 3| = 5 일 때, x의 값 중 큰 값은?', answer: '4', concept: '절댓값', difficulty: 2 },
    { id: 'diag-h3', question: '두 점 (1,2), (4,6) 사이의 거리는?', answer: '5', concept: '좌표평면', difficulty: 2 },
    { id: 'diag-h4', question: 'log₂8 = ?', answer: '3', concept: '로그', difficulty: 3 },
    { id: 'diag-h5', question: '등차수열 2, 5, 8, 11, ... 의 제10항은?', answer: '29', concept: '수열', difficulty: 3 },
    { id: 'diag-h6', question: 'sin30° = ?', answer: '0.5', concept: '삼각함수', difficulty: 4 },
    { id: 'diag-h7', question: 'lim(n→∞) (3n+1)/(n+2) = ?', answer: '3', concept: '극한', difficulty: 4 },
    { id: 'diag-h8', question: 'f(x) = x³ 일 때, f\'(2) = ?', answer: '12', concept: '미분', difficulty: 5 },
    { id: 'diag-h9', question: '∫x² dx = ? (적분상수 C 제외)', answer: 'x³/3', concept: '적분', difficulty: 5 },
    { id: 'diag-h10', question: '5C2 = ?', answer: '10', concept: '조합', difficulty: 3 },
  ],
};

type DiagnosticStep = 'intro' | 'test' | 'analyzing' | 'result';

interface Result {
  conceptScores: Record<string, { correct: number; total: number }>;
  totalCorrect: number;
  totalQuestions: number;
  recommendedLevel: string;
  strengths: string[];
  weaknesses: string[];
}

export default function DiagnosisPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<DiagnosticStep>('intro');
  const [problems, setProblems] = useState<typeof DIAGNOSTIC_PROBLEMS.elementary>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<Array<{ answer: string; isCorrect: boolean }>>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'elementary' | 'middle' | 'high'>('elementary');

  useEffect(() => {
    // 사용자 학년에 맞게 기본 레벨 설정
    if (profile?.gradeLevel) {
      if (profile.gradeLevel <= 6) setSelectedLevel('elementary');
      else if (profile.gradeLevel <= 9) setSelectedLevel('middle');
      else setSelectedLevel('high');
    }
  }, [profile]);

  const startDiagnosis = () => {
    setProblems(DIAGNOSTIC_PROBLEMS[selectedLevel]);
    setCurrentIndex(0);
    setAnswers([]);
    setStep('test');
  };

  const handleSubmitAnswer = () => {
    const currentProblem = problems[currentIndex];
    const isCorrect = userAnswer.trim().toLowerCase().replace(/\s/g, '') ===
      currentProblem.answer.toLowerCase().replace(/\s/g, '');

    setAnswers([...answers, { answer: userAnswer, isCorrect }]);
    setUserAnswer('');

    if (currentIndex < problems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 진단 완료 - 분석 시작
      analyzeResults([...answers, { answer: userAnswer, isCorrect }]);
    }
  };

  const analyzeResults = async (allAnswers: Array<{ answer: string; isCorrect: boolean }>) => {
    setStep('analyzing');

    // 결과 분석
    const conceptScores: Record<string, { correct: number; total: number }> = {};
    let totalCorrect = 0;

    problems.forEach((problem, index) => {
      const concept = problem.concept;
      if (!conceptScores[concept]) {
        conceptScores[concept] = { correct: 0, total: 0 };
      }
      conceptScores[concept].total++;

      if (allAnswers[index]?.isCorrect) {
        conceptScores[concept].correct++;
        totalCorrect++;
      }
    });

    // 강점과 약점 분석
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(conceptScores).forEach(([concept, score]) => {
      const rate = score.correct / score.total;
      if (rate >= 0.7) strengths.push(concept);
      else if (rate < 0.5) weaknesses.push(concept);
    });

    // 추천 레벨 결정
    const accuracy = totalCorrect / problems.length;
    let recommendedLevel = '';
    if (accuracy >= 0.8) recommendedLevel = '현재 레벨보다 높은 단계에 도전해보세요!';
    else if (accuracy >= 0.5) recommendedLevel = '현재 레벨이 적절합니다.';
    else recommendedLevel = '기초부터 차근차근 학습해보세요.';

    const analysisResult: Result = {
      conceptScores,
      totalCorrect,
      totalQuestions: problems.length,
      recommendedLevel,
      strengths,
      weaknesses,
    };

    setResult(analysisResult);

    // XP 지급 및 데이터 저장
    if (user) {
      try {
        const xpEarned = 50 + totalCorrect * 5;
        await Promise.all([
          addXP(user.uid, xpEarned),
          updateDailyGoal(user.uid, { completedProblems: problems.length, earnedXP: xpEarned }),
          ...weaknesses.map((concept) =>
            saveProgress(user.uid, `diagnosis-${concept}`, {
              mastery: Math.round((conceptScores[concept].correct / conceptScores[concept].total) * 100),
              totalAttempts: conceptScores[concept].total,
              correctAttempts: conceptScores[concept].correct,
              currentDifficulty: 1,
              consecutiveCorrect: 0,
              consecutiveWrong: 0,
            })
          ),
        ]);
      } catch (error) {
        console.error('저장 오류:', error);
      }
    }

    // 분석 완료 후 결과 표시 (약간의 딜레이)
    setTimeout(() => setStep('result'), 2000);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.8) return 'text-green-600';
    if (accuracy >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* 소개 화면 */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="border-2 border-purple-200">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl">수준 진단 테스트</CardTitle>
                <CardDescription>
                  현재 실력을 파악하고 맞춤형 학습 계획을 세워보세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    진단 테스트는 약 10문제로 구성되어 있으며,
                    다양한 영역의 문제를 풀어 현재 수준을 파악합니다.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>소요 시간: 약 10분</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>문제 수: 10문제</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>테스트 완료 시 50 XP 기본 지급</span>
                    </li>
                  </ul>
                </div>

                {/* 레벨 선택 */}
                <div className="space-y-3">
                  <p className="font-medium">테스트 레벨 선택</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'elementary', label: '초등' },
                      { key: 'middle', label: '중등' },
                      { key: 'high', label: '고등' },
                    ].map((level) => (
                      <Button
                        key={level.key}
                        variant={selectedLevel === level.key ? 'default' : 'outline'}
                        onClick={() => setSelectedLevel(level.key as 'elementary' | 'middle' | 'high')}
                        className={selectedLevel === level.key ? 'bg-purple-600' : ''}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={startDiagnosis}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
                >
                  진단 시작하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 테스트 진행 화면 */}
        {step === 'test' && problems[currentIndex] && (
          <motion.div
            key="test"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            {/* 진행률 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  문제 {currentIndex + 1} / {problems.length}
                </span>
                <span className="font-medium">
                  {Math.round(((currentIndex) / problems.length) * 100)}%
                </span>
              </div>
              <Progress value={(currentIndex / problems.length) * 100} className="h-2" />
            </div>

            {/* 문제 */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                    {problems[currentIndex].concept}
                  </span>
                  <span className="text-sm text-gray-500">
                    난이도: {'★'.repeat(problems[currentIndex].difficulty)}
                  </span>
                </div>

                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 bg-gray-50 rounded-xl mb-6"
                >
                  <p className="text-2xl font-medium text-center">
                    {problems[currentIndex].question}
                  </p>
                </motion.div>

                <div className="space-y-4">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="정답을 입력하세요"
                    className="text-xl text-center h-14"
                    onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleSubmitAnswer()}
                    autoFocus
                  />
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer}
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700"
                  >
                    {currentIndex < problems.length - 1 ? '다음 문제' : '진단 완료'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 분석 중 화면 */}
        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <Card className="border-2">
              <CardContent className="p-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 mx-auto mb-6"
                >
                  <Brain className="w-20 h-20 text-purple-600" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">분석 중...</h2>
                <p className="text-gray-600">
                  결과를 분석하고 있습니다. 잠시만 기다려주세요.
                </p>
                <div className="mt-6">
                  <Loader2 className="w-8 h-8 mx-auto text-purple-600 animate-spin" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 결과 화면 */}
        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* 총점 */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">진단 완료!</h2>
                <p className={`text-4xl font-bold ${getAccuracyColor(result.totalCorrect / result.totalQuestions)}`}>
                  {result.totalCorrect} / {result.totalQuestions}
                </p>
                <p className="text-gray-600 mt-2">
                  정답률: {Math.round((result.totalCorrect / result.totalQuestions) * 100)}%
                </p>
              </CardContent>
            </Card>

            {/* 영역별 분석 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  영역별 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.conceptScores).map(([concept, score]) => {
                    const rate = score.correct / score.total;
                    return (
                      <div key={concept}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{concept}</span>
                          <span className={getAccuracyColor(rate)}>
                            {score.correct}/{score.total}
                          </span>
                        </div>
                        <Progress
                          value={rate * 100}
                          className={`h-2 ${
                            rate >= 0.7
                              ? '[&>div]:bg-green-500'
                              : rate >= 0.5
                              ? '[&>div]:bg-yellow-500'
                              : '[&>div]:bg-red-500'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 강점과 약점 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.strengths.length > 0 && (
                <Card className="border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-green-600">
                      <Sparkles className="w-5 h-5" />
                      강점
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {result.strengths.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.weaknesses.length > 0 && (
                <Card className="border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                      <Target className="w-5 h-5" />
                      보완 필요
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {result.weaknesses.map((w) => (
                        <li key={w} className="flex items-center gap-2 text-red-700">
                          <XCircle className="w-4 h-4" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 추천 */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-blue-800 font-medium">{result.recommendedLevel}</p>
              </CardContent>
            </Card>

            {/* 버튼 */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                대시보드로
              </Button>
              <Button
                onClick={() => router.push('/dashboard/learn')}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                학습 시작하기
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
