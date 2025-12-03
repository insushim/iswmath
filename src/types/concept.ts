// src/types/concept.ts

export interface Subject {
  id: string;
  name: string;
  description?: string;
  domains: Domain[];
}

export interface Domain {
  id: string;
  subjectId: string;
  name: string;
  gradeStart: number;
  gradeEnd: number;
  concepts: Concept[];
}

export interface Concept {
  id: string;
  domainId: string;
  name: string;
  description: string;
  gradeLevel: number;
  semester: 1 | 2;
  orderIndex: number;
  difficultyBase: number;
  estimatedTime: number; // minutes
  keywords: string[];
  commonMistakes: string[];
}

export interface ConceptWithRelations extends Concept {
  domain: Domain;
  prerequisites: ConceptPrerequisite[];
  dependents: ConceptPrerequisite[];
}

export interface ConceptPrerequisite {
  id: string;
  conceptId: string;
  prerequisiteId: string;
  importance: number; // 0.0-1.0
  prerequisite?: Concept;
  concept?: Concept;
}

export interface ConceptNode {
  id: string;
  name: string;
  mastery: number; // 0-1
  isLocked: boolean;
  isCurrent: boolean;
  gradeLevel: number;
}

export interface ConceptLink {
  source: string;
  target: string;
  importance: number;
}

export interface ConceptTree {
  nodes: ConceptNode[];
  links: ConceptLink[];
}

export interface Lesson {
  id: string;
  conceptId: string;
  title: string;
  content: LessonContent;
  orderIndex: number;
  type: LessonType;
  hasVideo: boolean;
  hasInteractive: boolean;
  hasManipulative: boolean;
}

export type LessonType =
  | 'INTRODUCTION'
  | 'EXPLANATION'
  | 'EXAMPLE'
  | 'PRACTICE'
  | 'APPLICATION'
  | 'SUMMARY';

export interface LessonContent {
  sections: LessonSection[];
  videoUrl?: string;
  interactiveId?: string;
}

export interface LessonSection {
  title: string;
  content: string;
  type: 'text' | 'math' | 'image' | 'video' | 'interactive';
  data?: unknown;
}
