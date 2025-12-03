'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getAllProgress } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  ChevronRight,
  Lock,
  CheckCircle2,
  Star,
  Sparkles,
} from 'lucide-react';

// 한국 수학 교육과정 개념 (초등~고등)
const CURRICULUM = {
  elementary: {
    label: '초등학교',
    grades: [
      {
        grade: 1,
        concepts: [
          { id: 'elem-1-1', name: '9까지의 수', description: '1부터 9까지 수 세기와 읽기' },
          { id: 'elem-1-2', name: '덧셈과 뺄셈', description: '한 자리 수의 덧셈과 뺄셈' },
          { id: 'elem-1-3', name: '비교하기', description: '길이, 무게, 넓이 비교' },
          { id: 'elem-1-4', name: '50까지의 수', description: '50까지의 수 세기와 순서' },
        ],
      },
      {
        grade: 2,
        concepts: [
          { id: 'elem-2-1', name: '세 자리 수', description: '100부터 999까지의 수' },
          { id: 'elem-2-2', name: '덧셈과 뺄셈', description: '받아올림과 받아내림' },
          { id: 'elem-2-3', name: '곱셈구구', description: '2~9단 곱셈구구' },
          { id: 'elem-2-4', name: '길이 재기', description: 'cm, m 단위 사용하기' },
        ],
      },
      {
        grade: 3,
        concepts: [
          { id: 'elem-3-1', name: '나눗셈', description: '나눗셈의 개념과 계산' },
          { id: 'elem-3-2', name: '분수', description: '분수의 개념과 크기 비교' },
          { id: 'elem-3-3', name: '곱셈', description: '두 자리 수의 곱셈' },
          { id: 'elem-3-4', name: '들이와 무게', description: 'L, mL, kg, g 단위' },
        ],
      },
      {
        grade: 4,
        concepts: [
          { id: 'elem-4-1', name: '큰 수', description: '억, 조 단위의 큰 수' },
          { id: 'elem-4-2', name: '분수의 덧셈과 뺄셈', description: '같은 분모의 분수 계산' },
          { id: 'elem-4-3', name: '소수', description: '소수의 개념과 계산' },
          { id: 'elem-4-4', name: '삼각형과 사각형', description: '도형의 성질과 분류' },
        ],
      },
      {
        grade: 5,
        concepts: [
          { id: 'elem-5-1', name: '약수와 배수', description: '약수, 배수, 공약수, 공배수' },
          { id: 'elem-5-2', name: '분수의 곱셈', description: '분수와 자연수, 분수끼리의 곱셈' },
          { id: 'elem-5-3', name: '소수의 곱셈', description: '소수의 곱셈과 나눗셈' },
          { id: 'elem-5-4', name: '넓이와 부피', description: '직육면체의 겉넓이와 부피' },
        ],
      },
      {
        grade: 6,
        concepts: [
          { id: 'elem-6-1', name: '분수의 나눗셈', description: '분수÷자연수, 분수÷분수' },
          { id: 'elem-6-2', name: '비와 비율', description: '비, 비율, 백분율' },
          { id: 'elem-6-3', name: '원의 넓이', description: '원주율과 원의 넓이' },
          { id: 'elem-6-4', name: '비례식', description: '비례식과 비례배분' },
        ],
      },
    ],
  },
  middle: {
    label: '중학교',
    grades: [
      {
        grade: 1,
        concepts: [
          { id: 'mid-1-1', name: '정수와 유리수', description: '음수의 개념과 사칙연산' },
          { id: 'mid-1-2', name: '문자와 식', description: '변수, 다항식, 일차식' },
          { id: 'mid-1-3', name: '일차방정식', description: '방정식의 풀이와 활용' },
          { id: 'mid-1-4', name: '함수', description: '함수의 개념과 그래프' },
        ],
      },
      {
        grade: 2,
        concepts: [
          { id: 'mid-2-1', name: '유리수와 순환소수', description: '순환소수와 분수 변환' },
          { id: 'mid-2-2', name: '식의 계산', description: '다항식의 사칙연산' },
          { id: 'mid-2-3', name: '연립방정식', description: '이원일차연립방정식' },
          { id: 'mid-2-4', name: '일차함수', description: '일차함수의 그래프와 활용' },
        ],
      },
      {
        grade: 3,
        concepts: [
          { id: 'mid-3-1', name: '제곱근과 실수', description: '제곱근, 무리수, 실수' },
          { id: 'mid-3-2', name: '인수분해', description: '다항식의 인수분해' },
          { id: 'mid-3-3', name: '이차방정식', description: '이차방정식의 풀이' },
          { id: 'mid-3-4', name: '이차함수', description: '이차함수와 그래프' },
        ],
      },
    ],
  },
  high: {
    label: '고등학교',
    grades: [
      {
        grade: 1,
        concepts: [
          { id: 'high-1-1', name: '다항식', description: '다항식의 연산과 나눗셈' },
          { id: 'high-1-2', name: '방정식과 부등식', description: '복잡한 방정식과 부등식' },
          { id: 'high-1-3', name: '도형의 방정식', description: '직선과 원의 방정식' },
          { id: 'high-1-4', name: '집합과 명제', description: '집합, 명제, 증명' },
        ],
      },
      {
        grade: 2,
        concepts: [
          { id: 'high-2-1', name: '함수', description: '여러 가지 함수' },
          { id: 'high-2-2', name: '수열', description: '등차수열, 등비수열' },
          { id: 'high-2-3', name: '지수와 로그', description: '지수함수와 로그함수' },
          { id: 'high-2-4', name: '삼각함수', description: '삼각함수와 그래프' },
        ],
      },
      {
        grade: 3,
        concepts: [
          { id: 'high-3-1', name: '수열의 극한', description: '수열의 극한과 급수' },
          { id: 'high-3-2', name: '미분', description: '미분의 개념과 활용' },
          { id: 'high-3-3', name: '적분', description: '적분의 개념과 활용' },
          { id: 'high-3-4', name: '확률과 통계', description: '확률분포와 통계' },
        ],
      },
    ],
  },
};

interface ProgressData {
  id: string;
  mastery: number;
}

export default function LearnPage() {
  const { profile, user } = useAuth();
  const [selectedSchool, setSelectedSchool] = useState<'elementary' | 'middle' | 'high'>('elementary');
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      if (!user) return;
      try {
        const progress = await getAllProgress(user.uid) as ProgressData[];
        const progressMap: Record<string, number> = {};
        progress.forEach((p) => {
          progressMap[p.id] = p.mastery || 0;
        });
        setProgressData(progressMap);
      } catch (error) {
        console.error('진도 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProgress();
  }, [user]);

  // 사용자 학년에 맞는 기본 선택
  useEffect(() => {
    if (profile?.schoolType) {
      setSelectedSchool(profile.schoolType);
    } else if (profile?.gradeLevel) {
      if (profile.gradeLevel <= 6) setSelectedSchool('elementary');
      else if (profile.gradeLevel <= 9) setSelectedSchool('middle');
      else setSelectedSchool('high');
    }
  }, [profile]);

  const curriculum = CURRICULUM[selectedSchool];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">개념 학습</h1>
        <p className="text-gray-600">
          체계적으로 수학 개념을 학습해보세요
        </p>
      </motion.div>

      {/* 학교급 선택 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        {Object.entries(CURRICULUM).map(([key, value]) => (
          <Button
            key={key}
            variant={selectedSchool === key ? 'default' : 'outline'}
            onClick={() => setSelectedSchool(key as 'elementary' | 'middle' | 'high')}
            className={selectedSchool === key ? 'bg-blue-600' : ''}
          >
            {value.label}
          </Button>
        ))}
      </motion.div>

      {/* 학년별 개념 */}
      <div className="space-y-6">
        {curriculum.grades.map((gradeData, gradeIndex) => (
          <motion.div
            key={gradeData.grade}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + gradeIndex * 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  {gradeData.grade}학년
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gradeData.concepts.map((concept, conceptIndex) => {
                    const mastery = progressData[concept.id] || 0;
                    const isCompleted = mastery >= 80;
                    const isLocked = false; // 추후 선행 개념 체크 로직 추가 가능

                    return (
                      <motion.div
                        key={concept.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + conceptIndex * 0.05 }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                          isLocked
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : isCompleted
                            ? 'border-green-200 bg-green-50'
                            : 'border-blue-200 bg-white hover:border-blue-400'
                        }`}
                        onClick={() => {
                          if (!isLocked) {
                            window.location.href = `/dashboard/learn/${concept.id}`;
                          }
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isLocked ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Sparkles className="w-5 h-5 text-blue-500" />
                            )}
                            <h3 className="font-semibold">{concept.name}</h3>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {concept.description}
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">이해도</span>
                            <span className="font-medium">{mastery}%</span>
                          </div>
                          <Progress value={mastery} className="h-2" />
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1 mt-2 text-green-600">
                            <Star className="w-4 h-4 fill-green-600" />
                            <span className="text-xs font-medium">완료!</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
