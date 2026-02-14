import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  BookOpen, 
  Layers, 
  Lightbulb, 
  CheckCircle2, 
  Circle, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { Lesson, CourseModule, LessonType } from '@/lib/index';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { IMAGES } from '@/assets/images';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onClick: () => void;
}

/**
 * Mapeo de iconos por tipo de lección
 */
const LESSON_TYPE_ICONS: Record<LessonType, React.ReactNode> = {
  video: <PlayCircle className="w-5 h-5" />,
  reading: <BookOpen className="w-5 h-5" />,
  activity: <Layers className="w-5 h-5" />,
  reflection: <Lightbulb className="w-5 h-5" />,
};

/**
 * Mapeo de etiquetas por tipo de lección
 */
const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  video: 'Video',
  reading: 'Lectura',
  activity: 'Actividad',
  reflection: 'Reflexión',
};

/**
 * Componente de tarjeta para lecciones individuales
 */
export function LessonCard({ lesson, isCompleted, onClick }: LessonCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-300 border-l-4 overflow-hidden group",
          isCompleted 
            ? "border-l-chart-2 bg-secondary/10" 
            : "border-l-primary hover:border-l-accent bg-card"
        )}
        onClick={onClick}
      >
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
              isCompleted 
                ? "bg-chart-2/20 text-chart-2" 
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}>
              {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {LESSON_TYPE_ICONS[lesson.type]}
                </span>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-mono font-medium opacity-80">
                  {LESSON_TYPE_LABELS[lesson.type]}
                </Badge>
              </div>
              <h3 className={cn(
                "font-semibold text-lg leading-tight transition-colors",
                isCompleted ? "text-foreground/70" : "text-foreground"
              )}>
                {lesson.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {isCompleted ? 'Repasar' : 'Comenzar'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ModuleCardProps {
  module: CourseModule;
  progressPercentage: number;
  onClick: () => void;
}

/**
 * Componente de tarjeta para módulos completos
 */
export function ModuleCard({ module, progressPercentage, onClick }: ModuleCardProps) {
  // Seleccionamos una imagen basada en el módulo (simulado para el prototipo)
  const moduleImage = module.id === 'm1' ? IMAGES.SENSORY_LEARNING_4 : IMAGES.PROGRESS_JOURNEY_1;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Card 
        className="cursor-pointer h-full flex flex-col overflow-hidden group border-border hover:border-primary/50 transition-colors"
        onClick={onClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img 
            src={moduleImage} 
            alt={module.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-primary text-primary-foreground">
              Módulo {module.id.replace('m', '')}
            </Badge>
          </div>
        </div>

        <CardHeader className="flex-grow pb-2">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {module.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {module.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                Progreso del módulo
              </span>
              <span className="font-mono font-bold text-primary">
                {progressPercentage}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-muted">
               <div 
                className="h-full bg-chart-2 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
               />
            </Progress>
            <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
              <span>{module.lessons.length} Lecciones</span>
              <span className="flex items-center gap-1 group-hover:text-primary">
                Ver contenido <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
