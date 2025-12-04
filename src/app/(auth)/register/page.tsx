'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Target,
  Brain
} from 'lucide-react';
import { UserRole, SchoolType } from '@/lib/firebase/auth';

type Step = 'role' | 'info';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gradeLevel, setGradeLevel] = useState<number>(1);
  const [schoolType, setSchoolType] = useState<SchoolType>('elementary');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { signUp, signInWithGoogle, error, clearError } = useAuth();
  const router = useRouter();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setLocalError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(
        email,
        password,
        name,
        role,
        role === 'student' ? gradeLevel : undefined,
        role === 'student' ? schoolType : undefined
      );
      router.push('/dashboard');
    } catch {
      // 에러는 AuthContext에서 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    setIsLoading(true);

    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch {
      // 에러는 AuthContext에서 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      role: 'student' as UserRole,
      icon: GraduationCap,
      title: '학생',
      description: '수학을 배우고 싶어요',
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200 hover:border-teal-400',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      role: 'parent' as UserRole,
      icon: Users,
      title: '학부모',
      description: '자녀의 학습을 관리하고 싶어요',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200 hover:border-blue-400',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      role: 'teacher' as UserRole,
      icon: BookOpen,
      title: '선생님',
      description: '학생들을 가르치고 있어요',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200 hover:border-purple-400',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const gradeOptions = [
    { type: 'elementary' as SchoolType, grades: [1, 2, 3, 4, 5, 6], label: '초등학교', color: 'teal' },
    { type: 'middle' as SchoolType, grades: [1, 2, 3], label: '중학교', color: 'blue' },
    { type: 'high' as SchoolType, grades: [1, 2, 3], label: '고등학교', color: 'purple' },
  ];

  const features = [
    { icon: Brain, text: 'AI 맞춤 학습' },
    { icon: Target, text: '취약점 분석' },
    { icon: Trophy, text: '게이미피케이션' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
              <TrendingUp size={28} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-3xl font-bold text-white">셈오름</span>
          </Link>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal-300 font-semibold text-sm mb-6 backdrop-blur-sm border border-white/10">
              <Sparkles size={16} />
              <span>AI 기반 적응형 수학 학습</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
              수학 학습의<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                새로운 시작
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-md">
              AI가 분석하는 맞춤형 학습으로<br />
              수학의 즐거움을 발견하세요.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <feature.icon size={20} className="text-teal-400" />
                </div>
                <span className="text-slate-200 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-6"
          >
            {[
              { value: '10K+', label: '학습자' },
              { value: '50K+', label: '문제' },
              { value: '98%', label: '만족도' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-20 right-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">레벨 업!</div>
              <div className="text-slate-400 text-xs">수학 전사 Lv.5</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp size={24} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
              셈오름
            </span>
          </Link>

          {/* Back Button */}
          {step === 'role' ? (
            <Link
              href="/"
              className="inline-flex items-center text-slate-500 hover:text-slate-700 font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              홈으로 돌아가기
            </Link>
          ) : (
            <button
              onClick={() => setStep('role')}
              className="inline-flex items-center text-slate-500 hover:text-slate-700 font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              역할 다시 선택하기
            </button>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              {step === 'role' ? '회원가입' : '계정 만들기'}
            </h2>
            <p className="text-slate-500">
              {step === 'role'
                ? '어떤 역할로 시작하시겠어요?'
                : `${roleOptions.find(r => r.role === role)?.title}으로 가입합니다`}
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {(error || localError) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
              >
                {error || localError}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {/* Role Selection */}
                {roleOptions.map((option, index) => (
                  <motion.button
                    key={option.role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(option.role)}
                    className={`w-full p-5 rounded-2xl border-2 ${option.borderColor} bg-white transition-all text-left flex items-center gap-4 group shadow-sm hover:shadow-md`}
                  >
                    <div className={`w-14 h-14 rounded-xl ${option.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <option.icon size={28} className={option.iconColor} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg">{option.title}</h3>
                      <p className="text-slate-500 text-sm">{option.description}</p>
                    </div>
                    <ArrowRight size={20} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}

                {/* Divider */}
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-slate-50 px-4 text-slate-400 font-medium">또는</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold text-slate-700 transition-all"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google로 시작하기
                </Button>

                {/* Login Link */}
                <p className="text-center text-slate-500 mt-8">
                  이미 계정이 있으신가요?{' '}
                  <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">
                    로그인
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold">이름</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 py-6 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-semibold">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 py-6 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Grade Selection for Students */}
                {role === 'student' && (
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold">학년 선택</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {gradeOptions.map((school) => (
                        <div key={school.type} className="space-y-2">
                          <p className="text-xs text-slate-400 text-center font-medium">{school.label}</p>
                          <div className="space-y-1.5">
                            {school.grades.map((grade) => {
                              const actualGrade =
                                school.type === 'elementary'
                                  ? grade
                                  : school.type === 'middle'
                                  ? grade + 6
                                  : grade + 9;
                              const isSelected = gradeLevel === actualGrade && schoolType === school.type;
                              return (
                                <button
                                  key={actualGrade}
                                  type="button"
                                  onClick={() => {
                                    setSchoolType(school.type);
                                    setGradeLevel(actualGrade);
                                  }}
                                  className={`w-full py-2 text-sm rounded-lg border-2 transition-all font-medium ${
                                    isSelected
                                      ? school.color === 'teal'
                                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                                        : school.color === 'blue'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-purple-500 bg-purple-50 text-purple-700'
                                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                  }`}
                                >
                                  {grade}학년
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-semibold">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="6자 이상 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 py-6 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-semibold">비밀번호 확인</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-12 py-6 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all transform hover:-translate-y-0.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      가입 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      가입하기
                      <ArrowRight size={20} />
                    </div>
                  )}
                </Button>

                {/* Terms */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  가입하시면{' '}
                  <a href="#" className="text-teal-600 hover:underline">이용약관</a>
                  {' '}및{' '}
                  <a href="#" className="text-teal-600 hover:underline">개인정보처리방침</a>
                  에 동의하게 됩니다.
                </p>

                {/* Login Link */}
                <p className="text-center text-slate-500 mt-6">
                  이미 계정이 있으신가요?{' '}
                  <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">
                    로그인
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-200"
          >
            <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-500" />
                <span>무료 가입</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-500" />
                <span>카드 불필요</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-500" />
                <span>언제든 탈퇴</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
