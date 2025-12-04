'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  UserPlus,
  Key,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  const [adminForm, setAdminForm] = useState({
    email: '',
    password: '',
    name: '',
    secretKey: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminForm),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
        setAdminForm({ email: '', password: '', name: '', secretKey: '' });
      } else {
        setResult({ success: false, message: data.error });
      }
    } catch {
      setResult({ success: false, message: '관리자 생성에 실패했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Settings className="text-slate-400" />
          플랫폼 설정
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          시스템 설정 및 관리자 계정을 관리합니다.
        </p>
      </div>

      {/* Create Admin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-500/20 rounded-xl">
            <Shield size={24} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">관리자 계정 생성</h2>
            <p className="text-slate-400 text-sm">새로운 슈퍼 관리자 계정을 생성합니다.</p>
          </div>
        </div>

        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">이름</Label>
              <div className="relative mt-1">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  placeholder="관리자 이름"
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-300">이메일</Label>
              <Input
                type="email"
                value={adminForm.email}
                onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                placeholder="admin@example.com"
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">비밀번호</Label>
              <Input
                type="password"
                value={adminForm.password}
                onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                placeholder="6자 이상"
                className="mt-1 bg-slate-700 border-slate-600 text-white"
                required
                minLength={6}
              />
            </div>
            <div>
              <Label className="text-slate-300">관리자 비밀키</Label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={adminForm.secretKey}
                  onChange={(e) => setAdminForm({ ...adminForm, secretKey: e.target.value })}
                  placeholder="관리자 비밀키 입력"
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`flex items-center gap-2 p-4 rounded-xl ${
                result.success
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {result.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {result.message}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? '생성 중...' : '관리자 계정 생성'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-slate-700/50 rounded-xl">
          <p className="text-slate-400 text-sm">
            <strong className="text-slate-300">참고:</strong> 관리자 비밀키는 환경변수 <code className="bg-slate-600 px-1 rounded">ADMIN_SECRET_KEY</code>에 설정되어 있습니다.
            기본값: <code className="bg-slate-600 px-1 rounded">semoreum-super-admin-2024</code>
          </p>
        </div>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
      >
        <h2 className="text-xl font-bold text-white mb-4">시스템 정보</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm">버전</p>
            <p className="text-white font-bold">1.0.0</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm">환경</p>
            <p className="text-white font-bold">Production</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Firebase</p>
            <p className="text-green-400 font-bold">Connected</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Gemini AI</p>
            <p className="text-green-400 font-bold">Active</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
