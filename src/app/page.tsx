'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  GraduationCap,
  Brain,
  Trophy,
  Sparkles,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MathQuest
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                AI가 만드는 나만의 수학 여정
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                초등학교 1학년부터 고등학교 3학년까지,
                <br />
                개인 맞춤형 AI 튜터와 함께 수학의 즐거움을 발견하세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  asChild
                >
                  <Link href="/register">
                    무료로 시작하기
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-[400px] lg:h-[500px]">
                {/* Animated math elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-10 left-10 text-6xl"
                >
                  +
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  className="absolute top-20 right-20 text-5xl text-blue-500"
                >
                  x
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                  className="absolute bottom-20 left-20 text-4xl text-purple-500"
                >
                  /
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute bottom-40 right-10 text-5xl text-green-500"
                >
                  =
                </motion.div>

                {/* Center card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Card className="w-72 shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          25
                        </div>
                        <p className="text-sm text-gray-500 mb-2">현재 레벨</p>
                        <h3 className="font-bold text-lg mb-1">수학 전사</h3>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">3,450 / 4,000 XP</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              왜 <span className="text-blue-600">MathQuest</span>인가요?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              최첨단 AI 기술과 게이미피케이션이 만나 학습의 효율과 재미를 동시에 잡았습니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI 맞춤 학습',
                description: 'Gemini AI가 실시간으로 학습 수준을 분석하고 최적의 문제를 제공합니다.',
                color: 'blue',
              },
              {
                icon: Target,
                title: '전개념 학습',
                description: '모르는 개념이 있으면 필수 선수 개념부터 차근차근 학습합니다.',
                color: 'green',
              },
              {
                icon: Trophy,
                title: '게이미피케이션',
                description: 'XP, 레벨, 업적 시스템으로 학습 동기를 유지합니다.',
                color: 'yellow',
              },
              {
                icon: BarChart3,
                title: '상세 분석',
                description: '학습 현황, 취약점, 성장 그래프를 한눈에 확인하세요.',
                color: 'purple',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 bg-gray-50 dark:bg-gray-700">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${feature.color}-100 dark:bg-${feature.color}-900/30`}
                    >
                      <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">어떻게 시작하나요?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              3단계로 나만의 수학 학습 여정을 시작하세요.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: '수준 진단',
                description: 'AI가 출제하는 진단 평가로 현재 수학 실력을 정확히 파악합니다.',
                icon: Sparkles,
              },
              {
                step: 2,
                title: '맞춤 학습',
                description: '개인 수준에 맞는 문제와 개념 설명으로 효율적으로 학습합니다.',
                icon: GraduationCap,
              },
              {
                step: 3,
                title: '성장 확인',
                description: '레벨업과 업적으로 성장을 느끼며 꾸준히 학습합니다.',
                icon: Zap,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
                  )}
                </div>
                <item.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              지금 바로 수학 여정을 시작하세요
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              무료로 가입하고 AI 튜터와 함께 수학의 즐거움을 발견하세요.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              asChild
            >
              <Link href="/register">
                무료로 시작하기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; 2024 MathQuest. AI 기반 적응형 수학 학습 플랫폼.</p>
        </div>
      </footer>
    </div>
  );
}
