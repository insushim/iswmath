'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { saveProgress, saveProblemAttempt, addXP, updateDailyGoal } from '@/lib/firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Star,
  Zap,
  HelpCircle,
} from 'lucide-react';

// 개념 데이터 (실제로는 DB나 API에서 가져옴)
const CONCEPT_DATA: Record<string, {
  name: string;
  description: string;
  explanation: string[];
  examples: { question: string; answer: string; solution: string }[];
  practice: { question: string; answer: string; hint: string }[];
}> = {
  'elem-1-1': {
    name: '9까지의 수',
    description: '1부터 9까지 수 세기와 읽기',
    explanation: [
      '수는 물건의 개수를 나타내요.',
      '1, 2, 3, 4, 5, 6, 7, 8, 9를 알아봐요.',
      '각 수를 읽어볼까요? 일, 이, 삼, 사, 오, 육, 칠, 팔, 구',
    ],
    examples: [
      { question: '사과가 3개 있어요. 이것을 숫자로 쓰면?', answer: '3', solution: '사과가 세 개이므로 3이에요.' },
      { question: '⭐⭐⭐⭐⭐ 별이 몇 개인가요?', answer: '5', solution: '별을 하나씩 세어보면 1, 2, 3, 4, 5로 5개예요.' },
    ],
    practice: [
      { question: '🍎🍎🍎🍎 사과가 몇 개인가요?', answer: '4', hint: '사과를 하나씩 세어보세요!' },
      { question: '7 다음에 오는 수는 무엇인가요?', answer: '8', hint: '1, 2, 3, 4, 5, 6, 7, ...' },
      { question: '5보다 1 작은 수는 무엇인가요?', answer: '4', hint: '5에서 하나를 빼면?' },
    ],
  },
  'elem-1-2': {
    name: '덧셈과 뺄셈',
    description: '한 자리 수의 덧셈과 뺄셈',
    explanation: [
      '덧셈(+)은 두 수를 합하는 거예요.',
      '뺄셈(-)은 큰 수에서 작은 수를 빼는 거예요.',
      '예: 2 + 3 = 5 (2와 3을 합하면 5)',
      '예: 5 - 2 = 3 (5에서 2를 빼면 3)',
    ],
    examples: [
      { question: '3 + 2 = ?', answer: '5', solution: '3개와 2개를 합하면 5개예요.' },
      { question: '7 - 4 = ?', answer: '3', solution: '7개에서 4개를 빼면 3개가 남아요.' },
    ],
    practice: [
      { question: '4 + 5 = ?', answer: '9', hint: '4에서 5만큼 더 세어보세요!' },
      { question: '8 - 3 = ?', answer: '5', hint: '8에서 3만큼 빼세요.' },
      { question: '2 + 6 = ?', answer: '8', hint: '2와 6을 합해보세요.' },
    ],
  },
  'mid-1-1': {
    name: '정수와 유리수',
    description: '음수의 개념과 사칙연산',
    explanation: [
      '정수는 ..., -3, -2, -1, 0, 1, 2, 3, ... 을 말해요.',
      '양수는 0보다 큰 수, 음수는 0보다 작은 수예요.',
      '유리수는 분수로 나타낼 수 있는 수예요.',
      '음수끼리 곱하면 양수가 돼요: (-2) × (-3) = 6',
    ],
    examples: [
      { question: '(-5) + 3 = ?', answer: '-2', solution: '-5에서 오른쪽으로 3칸 이동하면 -2예요.' },
      { question: '(-4) × (-2) = ?', answer: '8', solution: '음수 × 음수 = 양수이므로 4 × 2 = 8이에요.' },
    ],
    practice: [
      { question: '(-3) + (-4) = ?', answer: '-7', hint: '음수끼리 더하면 절댓값을 더하고 음수로!' },
      { question: '(-6) × 2 = ?', answer: '-12', hint: '양수와 음수의 곱은 음수예요.' },
      { question: '(-8) ÷ (-2) = ?', answer: '4', hint: '음수 ÷ 음수 = 양수!' },
    ],
  },
  'high-2-2': {
    name: '수열',
    description: '등차수열, 등비수열',
    explanation: [
      '수열은 일정한 규칙에 따라 나열된 수의 열이에요.',
      '등차수열: 이웃하는 두 항의 차가 일정 (예: 2, 5, 8, 11, ...)',
      '등비수열: 이웃하는 두 항의 비가 일정 (예: 2, 6, 18, 54, ...)',
      '등차수열의 일반항: aₙ = a₁ + (n-1)d',
      '등비수열의 일반항: aₙ = a₁ × rⁿ⁻¹',
    ],
    examples: [
      { question: '등차수열 3, 7, 11, 15, ...의 10번째 항은?', answer: '39', solution: 'a₁=3, d=4이므로 a₁₀ = 3 + 9×4 = 39' },
      { question: '등비수열 2, 6, 18, ...의 5번째 항은?', answer: '162', solution: 'a₁=2, r=3이므로 a₅ = 2 × 3⁴ = 162' },
    ],
    practice: [
      { question: '등차수열 1, 4, 7, 10, ...의 공차는?', answer: '3', hint: '이웃한 두 항의 차를 구해보세요.' },
      { question: '등비수열 4, 12, 36, ...의 공비는?', answer: '3', hint: '이웃한 두 항의 비를 구해보세요.' },
      { question: '등차수열 5, 8, 11, ...의 7번째 항은?', answer: '23', hint: 'aₙ = a₁ + (n-1)d 공식을 사용하세요.' },
    ],
  },
};

// 기본 개념 데이터 (DB에 없는 경우)
const DEFAULT_CONCEPT = {
  name: '학습 내용',
  description: '이 개념을 학습합니다',
  explanation: ['이 개념에 대한 설명이 준비 중입니다.'],
  examples: [
    { question: '예제 문제입니다.', answer: '정답', solution: '풀이 방법입니다.' },
  ],
  practice: [
    { question: '연습 문제입니다.', answer: '정답', hint: '힌트입니다.' },
  ],
};

type LearningStep = 'explanation' | 'examples' | 'practice' | 'complete';

export default function ConceptLearnPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const conceptId = params.conceptId as string;

  const [step, setStep] = useState<LearningStep>('explanation');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [loading, setLoading] = useState(false);

  const concept = CONCEPT_DATA[conceptId] || DEFAULT_CONCEPT;

  const handleNextExplanation = () => {
    if (currentIndex < concept.explanation.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('examples');
      setCurrentIndex(0);
    }
  };

  const handleNextExample = () => {
    if (currentIndex < concept.examples.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('practice');
      setCurrentIndex(0);
    }
  };

  const handleSubmitAnswer = async () => {
    const currentPractice = concept.practice[currentIndex];
    const correct = userAnswer.trim() === currentPractice.answer;

    setIsCorrect(correct);
    setShowResult(true);
    setTotalAttempts(totalAttempts + 1);

    if (correct) {
      setCorrectCount(correctCount + 1);
      const xp = showHint ? 5 : 10;
      setEarnedXP(earnedXP + xp);

      // 데이터 저장
      if (user) {
        try {
          await Promise.all([
            saveProblemAttempt(user.uid, {
              problemId: `${conceptId}-practice-${currentIndex}`,
              conceptId,
              userAnswer,
              isCorrect: true,
              timeSeconds: 0,
              hintsUsed: showHint ? 1 : 0,
              xpEarned: xp,
              difficulty: 1,
            }),
            addXP(user.uid, xp),
            updateDailyGoal(user.uid, { completedProblems: 1, earnedXP: xp }),
          ]);
        } catch (error) {
          console.error('저장 오류:', error);
        }
      }
    }
  };

  const handleNextPractice = async () => {
    setShowResult(false);
    setUserAnswer('');
    setShowHint(false);

    if (currentIndex < concept.practice.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 학습 완료
      setStep('complete');

      // 진도 저장
      if (user) {
        setLoading(true);
        try {
          const mastery = Math.round((correctCount / concept.practice.length) * 100);
          await saveProgress(user.uid, conceptId, {
            mastery,
            totalAttempts,
            correctAttempts: correctCount,
            currentDifficulty: 1,
            consecutiveCorrect: correctCount,
            consecutiveWrong: totalAttempts - correctCount,
          });
        } catch (error) {
          console.error('진도 저장 오류:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const progressPercent = () => {
    const total = concept.explanation.length + concept.examples.length + concept.practice.length;
    let current = currentIndex + 1;
    if (step === 'examples') current += concept.explanation.length;
    if (step === 'practice') current += concept.explanation.length + concept.examples.length;
    if (step === 'complete') return 100;
    return Math.round((current / total) * 100);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{concept.name}</h1>
          <p className="text-sm text-gray-500">{concept.description}</p>
        </div>
      </div>

      {/* 진행 바 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {step === 'explanation' && '개념 설명'}
            {step === 'examples' && '예제 풀이'}
            {step === 'practice' && '연습 문제'}
            {step === 'complete' && '학습 완료!'}
          </span>
          <span className="font-medium">{progressPercent()}%</span>
        </div>
        <Progress value={progressPercent()} className="h-2" />
      </div>

      {/* 개념 설명 */}
      <AnimatePresence mode="wait">
        {step === 'explanation' && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">개념 설명 {currentIndex + 1}/{concept.explanation.length}</span>
                </div>
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg leading-relaxed mb-6"
                >
                  {concept.explanation[currentIndex]}
                </motion.p>
                <Button onClick={handleNextExplanation} className="w-full">
                  {currentIndex < concept.explanation.length - 1 ? '다음' : '예제 보기'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 예제 */}
        {step === 'examples' && (
          <motion.div
            key="examples"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4 text-green-600">
                  <Lightbulb className="w-5 h-5" />
                  <span className="font-semibold">예제 {currentIndex + 1}/{concept.examples.length}</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{concept.examples[currentIndex].question}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-green-700 font-medium">
                      정답: {concept.examples[currentIndex].answer}
                    </p>
                    <p className="text-green-600 mt-2">
                      {concept.examples[currentIndex].solution}
                    </p>
                  </div>
                </div>
                <Button onClick={handleNextExample} className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  {currentIndex < concept.examples.length - 1 ? '다음 예제' : '연습 문제 풀기'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 연습 문제 */}
        {step === 'practice' && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">연습 {currentIndex + 1}/{concept.practice.length}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">+{earnedXP} XP</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <p className="font-medium text-lg">{concept.practice[currentIndex].question}</p>
                </div>

                {!showResult ? (
                  <>
                    <div className="space-y-4">
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="정답을 입력하세요"
                        className="text-lg"
                        onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleSubmitAnswer()}
                      />

                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                        >
                          <p className="text-yellow-700 text-sm">
                            💡 힌트: {concept.practice[currentIndex].hint}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {!showHint && (
                        <Button
                          variant="outline"
                          onClick={() => setShowHint(true)}
                          className="flex-1"
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          힌트 보기
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!userAnswer}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        정답 확인
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div
                      className={`p-4 rounded-lg ${
                        isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <span className="text-green-700 font-semibold">정답입니다! 🎉</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-red-500" />
                            <span className="text-red-700 font-semibold">아쉬워요!</span>
                          </>
                        )}
                      </div>
                      {!isCorrect && (
                        <p className="text-red-600">
                          정답은 <strong>{concept.practice[currentIndex].answer}</strong>입니다.
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleNextPractice}
                      className="w-full mt-4"
                    >
                      {currentIndex < concept.practice.length - 1 ? '다음 문제' : '학습 완료하기'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 완료 */}
        {step === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Star className="w-12 h-12 text-white fill-white" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
                <p className="text-gray-600 mb-6">
                  {concept.name} 개념을 학습했습니다.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-3xl font-bold text-green-600">
                      {correctCount}/{concept.practice.length}
                    </p>
                    <p className="text-sm text-gray-500">정답</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-3xl font-bold text-yellow-600">
                      +{earnedXP}
                    </p>
                    <p className="text-sm text-gray-500">획득 XP</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => router.push('/dashboard/learn')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    disabled={loading}
                  >
                    다른 개념 학습하기
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard/practice')}
                    className="w-full"
                    disabled={loading}
                  >
                    연습 문제 더 풀기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
