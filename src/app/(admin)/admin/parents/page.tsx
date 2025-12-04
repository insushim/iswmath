'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface Parent {
  id: string;
  name: string;
  email: string;
  createdAt: Date | null;
  lastActiveAt: Date | null;
}

export default function AdminParentsPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchParents() {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'parent'));
        const snapshot = await getDocs(q);

        const parentList: Parent[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          parentList.push({
            id: doc.id,
            name: data.name || '이름 없음',
            email: data.email || '',
            createdAt: data.createdAt?.toDate?.() || null,
            lastActiveAt: data.lastActiveAt?.toDate?.() || null,
          });
        });

        setParents(parentList);
      } catch (error) {
        console.error('학부모 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchParents();
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('ko-KR');
  };

  const filteredParents = parents.filter(parent =>
    parent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Users className="text-orange-400" />
          학부모 관리
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          전체 {parents.length}명의 학부모
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="학부모 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredParents.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400">
            학부모가 없습니다.
          </div>
        ) : (
          filteredParents.map((parent, index) => (
            <motion.div
              key={parent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-orange-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {parent.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-lg">{parent.name}</p>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                    학부모
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={14} />
                  <span className="truncate">{parent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} />
                  <span>가입일: {formatDate(parent.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
