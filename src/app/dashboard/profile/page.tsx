'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Star,
  Flame,
  Zap,
  Trophy,
  Target,
  Edit2,
  Save,
  X,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await updateProfile({ name: name.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSchoolTypeLabel = (schoolType?: string) => {
    switch (schoolType) {
      case 'elementary':
        return '초등학교';
      case 'middle':
        return '중학교';
      case 'high':
        return '고등학교';
      default:
        return '';
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'student':
        return '학생';
      case 'parent':
        return '학부모';
      case 'teacher':
        return '선생님';
      default:
        return '';
    }
  };

  const formatDate = (timestamp: { seconds: number } | string | Date | null | undefined) => {
    if (!timestamp) return '-';
    let date: Date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'object' && 'seconds' in timestamp) {
      date = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      return '-';
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 프로필 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {profile?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div className="text-center sm:text-left pb-4">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-48"
                      placeholder="이름 입력"
                    />
                    <Button size="icon" onClick={handleSave} disabled={loading}>
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setName(profile?.name || '');
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{profile?.name || '사용자'}</h1>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <p className="text-gray-500">{getRoleLabel(profile?.role)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 학생 통계 */}
      {profile?.role === 'student' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">{profile?.totalXP || 0}</p>
              <p className="text-sm text-gray-500">총 XP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">Lv.{profile?.currentLevel || 1}</p>
              <p className="text-sm text-gray-500">레벨</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">{profile?.streak || 0}</p>
              <p className="text-sm text-gray-500">연속 학습</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{profile?.coins || 0}</p>
              <p className="text-sm text-gray-500">코인</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 기본 정보 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              기본 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">이메일</p>
                <p className="font-medium">{user?.email || '-'}</p>
              </div>
            </div>

            {profile?.role === 'student' && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">학년</p>
                  <p className="font-medium">
                    {getSchoolTypeLabel(profile?.schoolType)}{' '}
                    {profile?.gradeLevel
                      ? profile.schoolType === 'elementary'
                        ? profile.gradeLevel
                        : profile.schoolType === 'middle'
                        ? profile.gradeLevel - 6
                        : profile.gradeLevel - 9
                      : '-'}
                    학년
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">가입일</p>
                <p className="font-medium">{formatDate(profile?.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 학습 목표 (학생만) */}
      {profile?.role === 'student' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                학습 기록
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {profile?.longestStreak || profile?.streak || 0}
                  </p>
                  <p className="text-sm text-gray-500">최장 연속 학습</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {profile?.currentLevel || 1}
                  </p>
                  <p className="text-sm text-gray-500">현재 레벨</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 계정 관리 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>계정 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              비밀번호 변경
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              계정 삭제
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
