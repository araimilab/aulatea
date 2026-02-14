/**
 * @file src/lib/index.ts
 * @description Constantes de rutas, tipos de datos e interfaces para el aula virtual TEA.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

export const ROUTE_PATHS = {
  HOME: '/',
  MASTER_CLASS: '/master-class',
  MODULE: '/modulo/:moduleId',
  LESSON: '/leccion/:lessonId',
  FINAL_PROJECT: '/proyecto-final',
} as const;

export type LessonType = 'video' | 'reading' | 'activity' | 'reflection';

export interface Activity {
  id: string;
  type: 'reflection' | 'observation' | 'quiz' | 'action-plan';
  title: string;
  description: string;
  questions?: string[];
  templateFields?: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  type: LessonType;
  content: string;
  activity?: Activity;
  nextLessonId?: string;
  prevLessonId?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  iconName: string;
  color: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  lastAccessedLessonId: string | null;
  activitySubmissions: Record<string, any>;
  startedAt: string;
  isCourseCompleted: boolean;
}

export interface CourseMetadata {
  title: string;
  subtitle: string;
  author: string;
  description: string;
  totalModules: number;
  totalLessons: number;
  estimatedTime: string;
  year: number;
}

export const COURSE_DATA: CourseMetadata = {
  title: "Vivir su Mundo",
  subtitle: "Un Viaje Fenomenológico al TEA",
  author: "Equipo de Apoyo TEA",
  description: "Un taller diseñado para padres y cuidadores, basado en la fenomenología para comprender la experiencia subjetiva del niño con TEA.",
  totalModules: 4,
  totalLessons: 8,
  estimatedTime: "12 horas",
  year: 2026,
};

/**
 * Utilidad para calcular el porcentaje de progreso
 */
export function calculateProgressPercentage(completedCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
}

/**
 * Formateador de rutas dinámicas
 */
export const getModulePath = (moduleId: string) => ROUTE_PATHS.MODULE.replace(':moduleId', moduleId);
export const getLessonPath = (lessonId: string) => ROUTE_PATHS.LESSON.replace(':lessonId', lessonId);
