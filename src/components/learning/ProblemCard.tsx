'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MathRenderer } from './MathRenderer';
import { Timer } from '@/components/common/Timer';
import { useTimer } from '@/hooks/useTimer';
import { Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProblemCardProps {
  problem: {
    id: string;
    content: string;
    type: string;
    options?: string[];
    difficulty: number;
    estimatedTimeSeconds: number;
    conceptName: string;
  };
  onSubmit: (answer: string) => Promise<{
    isCorrect: boolean;
    feedback: string;
    correctAnswer: string;
    xpEarned: number;
  }>;
  onNext: () => void;
  onHint: (level: number) => Promise<string>;
  streakCount: number;
}

export function ProblemCard({
  problem,
  onSubmit,
  onNext,
  onHint,
  streakCount,
}: ProblemCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{
    isCorrect: boolean;
    feedback: string;
    correctAnswer: string;
    xpEarned: number;
  } | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { seconds, pause } = useTimer({
    initialSeconds: 0,
    autoStart: true,
  });

  // 정답 제출
  const handleSubmit = async () => {
    if (!selectedAnswer || isSubmitted) return;

    setIsLoading(true);
    pause();

    try {
      const submitResult = await onSubmit(selectedAnswer);
      setResult(submitResult);
      setIsSubmitted(true);

      if (submitResult.isCorrect) {
        // 정답 축하 애니메이션
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 힌트 요청
  const handleHint = async () => {
    if (hintLevel >= 3) return;

    const newLevel = hintLevel + 1;
    setHintLevel(newLevel);

    try {
      const hint = await onHint(newLevel);
      setCurrentHint(hint);
    } catch (error) {
      console.error('Hint error:', error);
    }
  };

  // 난이도 색상
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'bg-green-500';
    if (difficulty <= 5) return 'bg-yellow-500';
    if (difficulty <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* 헤더 */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {problem.conceptName}
              </Badge>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(problem.difficulty)}`} />
                <span className="text-sm">난이도 {problem.difficulty.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {streakCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-orange-500 px-2 py-1 rounded-full"
                >
                  <span className="text-lg">🔥</span>
                  <span className="font-bold">{streakCount}</span>
                </motion.div>
              )}
              <Timer seconds={seconds} className="text-lg font-mono text-white" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* 문제 내용 */}
          <div className="text-lg leading-relaxed">
            <MathRenderer content={problem.content} />
          </div>

          {/* 선택지 (객관식인 경우) */}
          {problem.options && (
            <div className="space-y-3">
              {problem.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
                  onClick={() => !isSubmitted && setSelectedAnswer(option)}
                  disabled={isSubmitted}
                  className={`
                    w-full p-4 rounded-xl border-2 text-left transition-all
                    ${
                      isSubmitted
                        ? option === result?.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                          : selectedAnswer === option
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-gray-200 opacity-50'
                        : selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <MathRenderer content={option} inline />
                    {isSubmitted && option === result?.correctAnswer && (
                      <CheckCircle className="ml-auto text-green-500" />
                    )}
                    {isSubmitted && selectedAnswer === option && !result?.isCorrect && (
                      <XCircle className="ml-auto text-red-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* 힌트 영역 */}
          <AnimatePresence>
            {currentHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      힌트 {hintLevel}
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                      {currentHint}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 결과 피드백 */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  rounded-xl p-6
                  ${
                    result.isCorrect
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {result.isCorrect ? (
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                  ) : (
                    <XCircle className="w-12 h-12" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">
                      {result.isCorrect ? '정답입니다!' : '아쉬워요'}
                    </h3>
                    <p className="opacity-90">{result.feedback}</p>
                    {result.xpEarned > 0 && (
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2 text-lg font-bold"
                      >
                        +{result.xpEarned} XP
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            {!isSubmitted ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleHint}
                  disabled={hintLevel >= 3 || isLoading}
                  className="flex-1"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  힌트 ({3 - hintLevel}회 남음)
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer || isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? '채점 중...' : '정답 확인'}
                </Button>
              </>
            ) : (
              <Button
                onClick={onNext}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                다음 문제
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
