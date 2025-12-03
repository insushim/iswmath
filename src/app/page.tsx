'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Brain,
  Trophy,
  Sparkles,
  ChevronRight,
  BarChart3,
  Target,
  TrendingUp,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                <TrendingUp size={20} strokeWidth={3} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                셈오름
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">주요 기능</a>
              <a href="#process" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">학습 과정</a>
              <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">로그인</Link>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-teal-500/30" asChild>
                <Link href="/register">무료로 시작하기</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#features" className="block py-2 text-slate-600 font-medium">주요 기능</a>
              <a href="#process" className="block py-2 text-slate-600 font-medium">학습 과정</a>
              <Link href="/login" className="block py-2 text-slate-600 font-medium">로그인</Link>
              <Button className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg font-bold" asChild>
                <Link href="/register">무료로 시작하기</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-semibold text-sm mb-6 border border-teal-100">
                <Sparkles size={16} />
                <span>AI 기반 적응형 수학 학습 플랫폼</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6">
                AI가 만드는<br/>
                나만의 <span className="text-teal-600">수학 여정</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                초등학교 1학년부터 고등학교 3학년까지,<br className="hidden sm:block" />
                개인 맞춤형 AI 튜터 <b>셈오름</b>과 함께 수학의 즐거움을 발견하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:shadow-teal-500/30 flex items-center justify-center gap-2" asChild>
                  <Link href="/register">
                    무료로 시작하기 <ChevronRight size={20} />
                  </Link>
                </Button>
                <Button variant="outline" className="bg-white border-2 border-slate-200 hover:border-teal-200 hover:bg-teal-50 text-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Visual / Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full relative"
            >
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl opacity-50"></div>

              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                >
                   <div className="bg-orange-100 p-2 rounded-lg text-orange-600 font-bold">
                    + x / =
                   </div>
                   <div className="font-bold text-slate-800">25</div>
                </motion.div>

                <div className="space-y-6">
                  {/* Header of Card */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">현재 레벨</p>
                      <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        수학 전사 <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Lv. 5</span>
                      </h3>
                    </div>
                    <Trophy className="text-yellow-500 fill-yellow-500" size={32} />
                  </div>

                  {/* XP Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-slate-600">XP 획득량</span>
                      <span className="text-teal-600">3,450 / 4,000 XP</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[86%] bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                    </div>
                    <p className="text-xs text-slate-400 text-right">다음 레벨까지 550 XP 남았습니다!</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-slate-500 text-xs mb-1">연속 학습일</p>
                      <p className="text-xl font-bold text-slate-800">12일</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-slate-500 text-xs mb-1">해결한 문제</p>
                      <p className="text-xl font-bold text-slate-800">142개</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why SemOreum Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">왜 <span className="text-teal-600">셈오름</span>인가요?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              최첨단 AI 기술과 게이미피케이션이 만나 학습의 효율과 재미를 동시에 잡았습니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI 맞춤 학습',
                description: 'Gemini AI가 실시간으로 학습 수준을 분석하고 최적의 문제를 제공합니다.',
                hoverColor: 'hover:bg-teal-50 hover:border-teal-100',
                iconColor: 'text-teal-600',
              },
              {
                icon: Target,
                title: '전개념 학습',
                description: '모르는 개념이 있으면 필수 선수 개념부터 차근차근 학습합니다.',
                hoverColor: 'hover:bg-blue-50 hover:border-blue-100',
                iconColor: 'text-blue-600',
              },
              {
                icon: Trophy,
                title: '게이미피케이션',
                description: 'XP, 레벨, 업적 시스템으로 학습 동기를 꾸준히 유지합니다.',
                hoverColor: 'hover:bg-orange-50 hover:border-orange-100',
                iconColor: 'text-orange-600',
              },
              {
                icon: BarChart3,
                title: '상세 분석',
                description: '학습 현황, 취약점, 성장 그래프를 한눈에 대시보드로 확인하세요.',
                hoverColor: 'hover:bg-purple-50 hover:border-purple-100',
                iconColor: 'text-purple-600',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group p-8 rounded-3xl bg-slate-50 transition-colors duration-300 border border-slate-100 ${feature.hoverColor}`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} className={feature.iconColor} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">어떻게 시작하나요?</h2>
            <p className="text-slate-300 text-lg">3단계로 나만의 수학 학습 여정을 시작하세요.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-slate-700 via-teal-900 to-slate-700 z-0"></div>

            {[
              { step: 1, title: '수준 진단', description: 'AI가 출제하는 진단 평가로 현재 수학 실력을 정확히 파악합니다.', color: 'text-teal-400' },
              { step: 2, title: '맞춤 학습', description: '개인 수준에 맞는 문제와 개념 설명으로 효율적으로 학습합니다.', color: 'text-blue-400' },
              { step: 3, title: '성장 확인', description: '레벨업과 업적으로 성장을 느끼며 꾸준히 학습합니다.', color: 'text-purple-400' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 shadow-xl">
                  <span className={`text-4xl font-bold ${item.color}`}>{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">지금 바로 수학 여정을 시작하세요</h2>
          <p className="text-xl text-slate-600 mb-10">
            무료로 가입하고 AI 튜터 <b>셈오름</b>과 함께<br className="hidden sm:block"/>
            수학의 즐거움을 발견하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl shadow-teal-500/20 hover:shadow-2xl hover:shadow-teal-500/40 transition-all transform hover:-translate-y-1" asChild>
                <Link href="/register">무료로 시작하기</Link>
             </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-teal-600" /> 신용카드 정보가 필요하지 않습니다.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-600">
                <TrendingUp size={14} strokeWidth={3} />
              </div>
              <span className="text-lg font-bold text-slate-700">셈오름</span>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-right">
            &copy; 2024 셈오름. AI 기반 적응형 수학 학습 플랫폼.<br/>
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
