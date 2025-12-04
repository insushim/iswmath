'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Shield,
  Mail,
  Lock,
  User,
  Key,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSetupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    secretKey: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const router = useRouter();

  // 비밀키 (이 키를 알아야만 관리자 생성 가능)
  const ADMIN_SECRET = 'semoreum-admin-2024';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // 비밀키 확인
    if (form.secretKey !== ADMIN_SECRET) {
      setResult({ success: false, message: '관리자 비밀키가 올바르지 않습니다.' });
      setLoading(false);
      return;
    }

    if (!auth || !db) {
      setResult({ success: false, message: 'Firebase가 초기화되지 않았습니다.' });
      setLoading(false);
      return;
    }

    try {
      // Firebase Auth에서 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // 프로필 업데이트
      await updateProfile(user, { displayName: form.name });

      // Firestore에 관리자 프로필 저장
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: form.email,
        name: form.name,
        role: 'admin', // 관리자 역할!
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        totalXP: 0,
        currentLevel: 99,
        coins: 99999,
        streak: 0,
        longestStreak: 0,
        lastActiveAt: serverTimestamp(),
        currentMathLevel: 12,
      });

      setResult({ success: true, message: '관리자 계정이 생성되었습니다! 로그인 페이지로 이동합니다...' });

      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };

      let errorMessage = '계정 생성에 실패했습니다.';
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = '이미 사용 중인 이메일입니다.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = '비밀번호가 너무 약합니다. 6자 이상 입력하세요.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 형식입니다.';
      }

      setResult({ success: false, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Shield size={28} className="text-white" />
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-white">셈오름</span>
            <span className="block text-xs text-red-400 font-medium">Admin Setup</span>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">관리자 계정 생성</h1>
            <p className="text-slate-400 text-sm">
              슈퍼 관리자 계정을 생성합니다.<br />
              비밀키가 필요합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-slate-300">이름</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="관리자 이름"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300">이메일</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300">비밀번호</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="6자 이상"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300">관리자 비밀키</Label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={form.secretKey}
                  onChange={(e) => setForm({ ...form, secretKey: e.target.value })}
                  placeholder="비밀키 입력"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                비밀키를 모르면 관리자에게 문의하세요.
              </p>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-xl ${
                  result.success
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {result.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span className="text-sm">{result.message}</span>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  생성 중...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  관리자 계정 생성
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm text-center">
            <strong className="text-slate-300">비밀키:</strong>{' '}
            <code className="bg-slate-700 px-2 py-1 rounded text-red-400">semoreum-admin-2024</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
