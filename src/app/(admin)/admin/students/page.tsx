'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Search,
  TrendingUp,
  Trophy,
  Target,
  Flame,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface Student {
  id: string;
  name: string;
  email: string;
  gradeLevel?: number;
  schoolType?: string;
  totalXP: number;
  currentLevel: number;
  coins: number;
  streak: number;
  createdAt: Date | null;
  lastActiveAt: Date | null;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'student'));
        const snapshot = await getDocs(q);

        const studentList: Student[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          studentList.push({
            id: doc.id,
            name: data.name || '이름 없음',
            email: data.email || '',
            gradeLevel: data.gradeLevel,
            schoolType: data.schoolType,
            totalXP: data.totalXP || 0,
            currentLevel: data.currentLevel || 1,
            coins: data.coins || 0,
            streak: data.streak || 0,
            createdAt: data.createdAt?.toDate?.() || null,
            lastActiveAt: data.lastActiveAt?.toDate?.() || null,
          });
        });

        setStudents(studentList);
      } catch (error) {
        console.error('학생 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const getGradeLabel = (student: Student) => {
    if (!student.gradeLevel) return '-';
    const schoolLabels: Record<string, string> = {
      elementary: '초등학교',
      middle: '중학교',
      high: '고등학교',
    };
    const school = student.schoolType ? schoolLabels[student.schoolType] || '' : '';
    const grade = student.schoolType === 'elementary'
      ? student.gradeLevel
      : student.schoolType === 'middle'
      ? student.gradeLevel - 6
      : student.gradeLevel - 9;
    return `${school} ${grade}학년`;
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 통계 계산
  const totalXP = students.reduce((sum, s) => sum + (s.totalXP || 0), 0);
  const avgLevel = students.length > 0
    ? (students.reduce((sum, s) => sum + (s.currentLevel || 1), 0) / students.length).toFixed(1)
    : 0;
  const activeStudents = students.filter(s => {
    if (!s.lastActiveAt) return false;
    const lastActive = new Date(s.lastActiveAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return lastActive > weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <GraduationCap className="text-blue-400" />
          학생 관리
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          전체 {students.length}명의 학생
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <GraduationCap size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">전체 학생</p>
              <p className="text-xl font-bold text-white">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <TrendingUp size={20} className="text-teal-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">평균 레벨</p>
              <p className="text-xl font-bold text-white">Lv.{avgLevel}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Trophy size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">총 획득 XP</p>
              <p className="text-xl font-bold text-white">{totalXP.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Target size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">주간 활동</p>
              <p className="text-xl font-bold text-white">{activeStudents}명</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="학생 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400">
            학생이 없습니다.
          </div>
        ) : (
          filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {student.name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{student.name}</p>
                    <p className="text-slate-400 text-sm">{getGradeLabel(student)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    Lv.{student.currentLevel || 1}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <Trophy size={16} className="text-yellow-400 mx-auto mb-1" />
                  <p className="text-white font-medium text-sm">{(student.totalXP || 0).toLocaleString()}</p>
                  <p className="text-slate-500 text-xs">XP</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <Flame size={16} className="text-orange-400 mx-auto mb-1" />
                  <p className="text-white font-medium text-sm">{student.streak || 0}일</p>
                  <p className="text-slate-500 text-xs">연속</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <Target size={16} className="text-teal-400 mx-auto mb-1" />
                  <p className="text-white font-medium text-sm">{student.coins || 0}</p>
                  <p className="text-slate-500 text-xs">코인</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
