import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Menu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { 
  ROUTE_PATHS, 
  getLessonPath, 
  COURSE_DATA 
} from '@/lib/index';
import { useProgress } from '@/hooks/useProgress';
import { COURSE_CONTENT } from '@/data/courseContent';

interface NavigationControlsProps {
  currentLessonId: string;
  onNavigate: (lessonId: string) => void;
}

/**
 * Componente de navegación táctil y accesible para desplazarse entre lecciones.
 * Incluye botones de retroceso, avance, marcado de completado y acceso al menú.
 */
export function NavigationControls({ currentLessonId, onNavigate }: NavigationControlsProps) {
  const { 
    isLessonCompleted, 
    completeLesson, 
    overallProgressPercentage 
  } = useProgress();
  
  const { toast } = useToast();

  // Buscamos la lección actual y sus adyacentes en la estructura de contenidos
  const navigationState = useMemo(() => {
    const allLessons = COURSE_CONTENT.flatMap(module => module.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    
    const current = allLessons[currentIndex];
    const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    return {
      current,
      prev,
      next,
      isLast: currentIndex === allLessons.length - 1,
      index: currentIndex + 1,
      total: allLessons.length
    };
  }, [currentLessonId]);

  const handleComplete = () => {
    if (!isLessonCompleted(currentLessonId)) {
      completeLesson(currentLessonId);
      toast({
        title: "¡Excelente progreso!",
        description: "Has completado esta lección con éxito.",
      });
    }
  };

  const handleNext = () => {
    if (navigationState.next) {
      onNavigate(navigationState.next.id);
    } else if (navigationState.isLast) {
      // Si es la última, redirigir al proyecto final
      window.location.href = ROUTE_PATHS.FINAL_PROJECT;
    }
  };

  const isCompleted = isLessonCompleted(currentLessonId);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border p-4 md:p-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        
        {/* Sección Izquierda: Anterior y Menú */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => window.location.href = ROUTE_PATHS.HOME}
            title="Ir al Dashboard"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            onClick={() => navigationState.prev && onNavigate(navigationState.prev.id)}
            disabled={!navigationState.prev}
            className="gap-2 rounded-full px-4 md:px-6"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
        </div>

        {/* Sección Central: Progreso y Estado de Lección */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Lección {navigationState.index} de {navigationState.total}
            </span>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-secondary p-0.5 rounded-full"
              >
                <CheckCircle className="h-3 w-3 text-secondary-foreground" />
              </motion.div>
            )}
          </div>
          <div className="hidden md:block w-32 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(navigationState.index / navigationState.total) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Sección Derecha: Completar y Siguiente */}
        <div className="flex items-center gap-2">
          {!isCompleted ? (
            <Button
              variant="secondary"
              onClick={handleComplete}
              className="gap-2 rounded-full hidden sm:flex"
            >
              <CheckCircle className="h-4 w-4" />
              Marcar completado
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-secondary/30 rounded-full text-secondary-foreground text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Completada
            </div>
          )}

          <Button
            variant="default"
            onClick={handleNext}
            className="gap-2 rounded-full px-6 shadow-lg hover:shadow-primary/20 transition-all"
          >
            <span className="hidden sm:inline">
              {navigationState.isLast ? 'Finalizar Curso' : 'Siguiente'}
            </span>
            {navigationState.isLast ? <ArrowRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile progress indicator bar (slim) */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-muted md:hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgressPercentage}%` }}
        />
      </div>
    </div>
  );
}
