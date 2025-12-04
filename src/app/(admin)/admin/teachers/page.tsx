'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Mail, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Teacher {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastActiveAt: string;
}

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users?role=teacher&limit=100');
      const data = await response.json();
      setTeachers(data.users);
    } catch (error) {
      console.error('선생님 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-purple-400" />
          선생님 관리
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          전체 {teachers.length}명의 선생님
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="선생님 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400">
            선생님이 없습니다.
          </div>
        ) : (
          filteredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {teacher.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-lg">{teacher.name}</p>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                    선생님
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={14} />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} />
                  <span>가입일: {formatDate(teacher.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
