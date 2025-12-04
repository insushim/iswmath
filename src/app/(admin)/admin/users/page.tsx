'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  gradeLevel?: number;
  schoolType?: string;
  totalXP: number;
  currentLevel: number;
  coins: number;
  createdAt: string;
  lastActiveAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        role: roleFilter,
      });
      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error('사용자 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id }),
      });
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('사용자 삭제 실패:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateUser = async (data: Partial<User>) => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id, data }),
      });
      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('사용자 수정 실패:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
            <GraduationCap size={12} /> 학생
          </span>
        );
      case 'teacher':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
            <BookOpen size={12} /> 선생님
          </span>
        );
      case 'parent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
            <Users size={12} /> 학부모
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
            <Shield size={12} /> 관리자
          </span>
        );
      default:
        return <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded-full">{role}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getGradeLabel = (user: User) => {
    if (!user.gradeLevel) return '-';
    const schoolLabels: Record<string, string> = {
      elementary: '초',
      middle: '중',
      high: '고',
    };
    const school = user.schoolType ? schoolLabels[user.schoolType] || '' : '';
    const grade = user.schoolType === 'elementary'
      ? user.gradeLevel
      : user.schoolType === 'middle'
      ? user.gradeLevel - 6
      : user.gradeLevel - 9;
    return `${school}${grade}학년`;
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">사용자 관리</h1>
          <p className="text-slate-400 text-sm mt-1">
            전체 {pagination.total}명의 사용자
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="이름 또는 이메일로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">전체</option>
            <option value="student">학생</option>
            <option value="teacher">선생님</option>
            <option value="parent">학부모</option>
            <option value="admin">관리자</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left text-slate-300 font-medium px-6 py-4">사용자</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">역할</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">학년</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">레벨</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">XP</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">가입일</th>
                <th className="text-left text-slate-300 font-medium px-6 py-4">최근 활동</th>
                <th className="text-right text-slate-300 font-medium px-6 py-4">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    사용자가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">
                            {user.name?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate">{user.name}</p>
                          <p className="text-slate-400 text-sm truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4 text-slate-300">{getGradeLabel(user)}</td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">Lv.{user.currentLevel || 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-teal-400 font-medium">{(user.totalXP || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{formatDate(user.lastActiveAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          disabled={user.role === 'admin'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              {pagination.total}명 중 {(pagination.page - 1) * pagination.limit + 1} -{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-slate-300 px-4">
                {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">사용자 수정</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleUpdateUser({
                    name: formData.get('name') as string,
                    role: formData.get('role') as string,
                    totalXP: parseInt(formData.get('totalXP') as string) || 0,
                    currentLevel: parseInt(formData.get('currentLevel') as string) || 1,
                    coins: parseInt(formData.get('coins') as string) || 0,
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">이름</label>
                  <Input
                    name="name"
                    defaultValue={selectedUser.name}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">역할</label>
                  <select
                    name="role"
                    defaultValue={selectedUser.role}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2"
                  >
                    <option value="student">학생</option>
                    <option value="teacher">선생님</option>
                    <option value="parent">학부모</option>
                    <option value="admin">관리자</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">XP</label>
                    <Input
                      name="totalXP"
                      type="number"
                      defaultValue={selectedUser.totalXP}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">레벨</label>
                    <Input
                      name="currentLevel"
                      type="number"
                      defaultValue={selectedUser.currentLevel}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">코인</label>
                    <Input
                      name="coins"
                      type="number"
                      defaultValue={selectedUser.coins}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {actionLoading ? '저장 중...' : '저장'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">사용자 삭제</h2>
                <p className="text-slate-400 mb-6">
                  <span className="text-white font-medium">{selectedUser.name}</span>님을 정말 삭제하시겠습니까?
                  <br />
                  이 작업은 되돌릴 수 없습니다.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleDeleteUser}
                    disabled={actionLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {actionLoading ? '삭제 중...' : '삭제'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
