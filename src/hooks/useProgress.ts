import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  UserProgress,
  COURSE_DATA,
  calculateProgressPercentage
} from '@/lib/index';

/**
 * @file src/hooks/useProgress.ts
 * @description Hook personalizado para gestionar el progreso del usuario en el Aula Virtual TEA.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

const STORAGE_KEY = 'tea_virtual_classroom_progress_v1';

const INITIAL_STATE: UserProgress = {
  completedLessonIds: [],
  lastAccessedLessonId: null,
  activitySubmissions: {},
  startedAt: new Date().toISOString(),
  isCourseCompleted: false,
};

/**
 * Hook useProgress
 * Proporciona persistencia local y lógica de seguimiento para el avance del curso.
 */
export function useProgress() {
  // Inicialización de estado desde localStorage con fallback al estado inicial
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === 'undefined') return INITIAL_STATE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (error) {
      console.error("Error al cargar el progreso:", error);
      return INITIAL_STATE;
    }
  });

  // Sincronización automática con localStorage ante cambios de estado
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error al guardar el progreso:", error);
    }
  }, [progress]);

  /**
   * Marca una lección como completada y evalúa si el curso se ha terminado.
   */
  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;

      const newCompletedIds = [...prev.completedLessonIds, lessonId];
      // Verificamos si se han completado todas las lecciones definidas en los metadatos
      const isCourseCompleted = newCompletedIds.length >= COURSE_DATA.totalLessons;

      return {
        ...prev,
        completedLessonIds: newCompletedIds,
        isCourseCompleted,
      };
    });
  }, []);

  /**
   * Registra los resultados o respuestas de una actividad específica de una lección.
   */
  const saveActivity = useCallback((lessonId: string, results: any) => {
    setProgress((prev) => ({
      ...prev,
      activitySubmissions: {
        ...prev.activitySubmissions,
        [lessonId]: results,
      },
    }));
  }, []);

  /**
   * Actualiza el ID de la última lección visitada para permitir reanudar el curso.
   */
  const updateLastAccessed = useCallback((lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastAccessedLessonId: lessonId,
    }));
  }, []);

  /**
   * Verifica si una lección específica ya ha sido marcada como completada.
   */
  const isLessonCompleted = useCallback((lessonId: string) => {
    return progress.completedLessonIds.includes(lessonId);
  }, [progress.completedLessonIds]);

  /**
   * Reinicia todo el progreso del curso (útil para nuevas iteraciones).
   */
  const resetProgress = useCallback(() => {
    if (window.confirm("¿Estás seguro de que deseas reiniciar todo tu progreso?")) {
      setProgress({
        ...INITIAL_STATE,
        startedAt: new Date().toISOString(),
      });
    }
  }, []);

  /**
   * Porcentaje de avance general del curso calculado en base a lecciones completadas.
   */
  const overallProgressPercentage = useMemo(() => {
    return calculateProgressPercentage(
      progress.completedLessonIds.length,
      COURSE_DATA.totalLessons
    );
  }, [progress.completedLessonIds]);

  return {
    progress,
    completeLesson,
    saveActivity,
    updateLastAccessed,
    isLessonCompleted,
    resetProgress,
    overallProgressPercentage,
    totalLessons: COURSE_DATA.totalLessons,
    completedCount: progress.completedLessonIds.length,
  };
}
