import { motion } from 'framer-motion';
import { calculateProgressPercentage } from '@/lib/index';
import { cn } from '@/lib/utils';

interface ProgressProps {
  progress: number;
  total: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Barra de progreso general para el aula virtual.
 * Utiliza animaciones de resorte para una sensación táctil y fluida.
 */
export function ProgressBar({ 
  progress, 
  total, 
  className, 
  showLabel = true, 
  size = 'md' 
}: ProgressProps) {
  const percentage = calculateProgressPercentage(progress, total);
  const isCompleted = percentage === 100;

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-5'
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between items-end mb-1">
          <span className="text-sm font-medium text-muted-foreground">
            Progreso del Curso
          </span>
          <span className="text-sm font-bold font-mono text-primary">
            {percentage}%
          </span>
        </div>
      )}
      
      <div className={cn(
        "relative w-full overflow-hidden rounded-full bg-muted/50 border border-border/40",
        heightClasses[size]
      )}>
        <motion.div
          className={cn(
            "h-full rounded-full transition-colors duration-500",
            isCompleted ? "bg-chart-2 shadow-[0_0_12px_rgba(var(--chart-2),0.3)]" : "bg-primary"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
        
        {/* Reflejo sutil para dar profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
      
      {showLabel && (
        <p className="text-xs text-muted-foreground text-right">
          {progress} de {total} lecciones completadas
        </p>
      )}
    </div>
  );
}

/**
 * Versión compacta de la barra de progreso diseñada para vistas de módulos o tarjetas.
 */
export function ModuleProgress({ 
  progress, 
  total, 
  className 
}: Omit<ProgressProps, 'showLabel' | 'size'>) {
  const percentage = calculateProgressPercentage(progress, total);
  const isCompleted = percentage === 100;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isCompleted ? "bg-chart-2" : "bg-primary/80"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        />
      </div>
      <span className={cn(
        "text-[10px] font-bold font-mono min-w-[32px] text-right",
        isCompleted ? "text-chart-2" : "text-muted-foreground"
      )}>
        {percentage}%
      </span>
    </div>
  );
}
