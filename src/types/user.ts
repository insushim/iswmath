// src/types/user.ts

export type UserRole = 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN';
export type SchoolType = 'ELEMENTARY' | 'MIDDLE' | 'HIGH';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: AvatarData;
  createdAt: Date;
  updatedAt: Date;
}

export interface AvatarData {
  character: string;
  hat?: string;
  accessory?: string;
  pet?: string;
  background?: string;
  theme?: string;
}

export interface Student {
  id: string;
  userId: string;
  gradeLevel: number; // 1-12
  schoolType: SchoolType;
  currentMathLevel: number; // 0.0-12.0
  lastDiagnosticAt?: Date;
  totalXP: number;
  currentLevel: number;
  coins: number;
  streak: number;
  longestStreak: number;
  lastActiveAt: Date;
}

export interface StudentWithUser extends Student {
  user: User;
}

export interface Parent {
  id: string;
  userId: string;
  user: User;
  children: StudentWithUser[];
}

export interface Teacher {
  id: string;
  userId: string;
  user: User;
  school?: string;
}
