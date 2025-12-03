'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Bell,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Globe,
  Shield,
  HelpCircle,
  MessageSquare,
  FileText,
} from 'lucide-react';

export default function SettingsPage() {
  useAuth();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">설정</h1>
        <p className="text-gray-600">
          앱 환경을 설정하세요
        </p>
      </motion.div>

      {/* 알림 설정 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              알림
            </CardTitle>
            <CardDescription>
              알림 및 리마인더 설정을 관리합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <Label>푸시 알림</Label>
                  <p className="text-sm text-gray-500">학습 리마인더 및 업데이트 알림</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-gray-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <Label>효과음</Label>
                  <p className="text-sm text-gray-500">정답/오답 효과음</p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 화면 설정 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {darkMode ? (
                <Moon className="w-5 h-5 text-purple-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-600" />
              )}
              화면
            </CardTitle>
            <CardDescription>
              화면 테마 및 표시 설정
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <div>
                  <Label>다크 모드</Label>
                  <p className="text-sm text-gray-500">어두운 화면 테마 사용</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 언어 설정 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              언어
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇰🇷</span>
                <span className="font-medium">한국어</span>
              </div>
              <span className="text-sm text-blue-600">사용 중</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 개인정보 및 보안 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              개인정보 및 보안
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-3" />
              개인정보 처리방침
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-3" />
              이용약관
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-3" />
              데이터 내보내기
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 도움말 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              도움말
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-3" />
              자주 묻는 질문
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-3" />
              문의하기
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 앱 정보 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <h3 className="font-bold text-lg">MathQuest</h3>
            <p className="text-sm text-gray-500">버전 1.0.0</p>
            <p className="text-xs text-gray-400 mt-2">
              AI 기반 맞춤형 수학 학습 플랫폼
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
