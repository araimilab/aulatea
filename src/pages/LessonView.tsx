import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Clock
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { NavigationControls } from '@/components/NavigationControls';
import { ActivityComponent } from '@/components/ActivityComponent';
import { COURSE_CONTENT } from '@/data/courseContent';
import { useProgress } from '@/hooks/useProgress';
import { getLessonPath, Lesson } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

/**
 * @file src/pages/LessonView.tsx
 * @description Vista detallada de una lección individual del aula virtual TEA.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { 
    completeLesson, 
    saveActivity, 
    updateLastAccessed, 
    isLessonCompleted 
  } = useProgress();

  // Buscar la lección actual en toda la estructura del curso
  const lessonData = useMemo(() => {
    for (const module of COURSE_CONTENT) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return { lesson, module };
    }
    return null;
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) {
      updateLastAccessed(lessonId);
      window.scrollTo(0, 0);
    }
  }, [lessonId, updateLastAccessed]);

  if (!lessonData) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Lección no encontrada</h2>
          <p className="text-muted-foreground mb-8">Lo sentimos, el contenido que buscas no está disponible o ha sido movido.</p>
          <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
        </div>
      </Layout>
    );
  }

  const { lesson, module } = lessonData;
  const isCompleted = isLessonCompleted(lesson.id);

  const handleNavigate = (targetId: string) => {
    navigate(getLessonPath(targetId));
  };

  const handleActivityComplete = (results: any) => {
    saveActivity(lesson.id, results);
    completeLesson(lesson.id);
  };

  const handleMarkAsComplete = () => {
    completeLesson(lesson.id);
  };

  // Renderizador simple de contenido "markdown-lite"
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-primary">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2 text-muted-foreground">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') return <br key={index} />;
      return <p key={index} className="mb-4 text-lg leading-relaxed text-foreground/80">{line}</p>;
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Header de la Lección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/modulo/${module.id}`)}
              className="text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {module.title}
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Badge variant="outline" className="font-mono text-xs">
              {lesson.type.toUpperCase()}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {lesson.duration}
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1.5 text-secondary-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />
                    Completado
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Área de Imagen/Video Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg border border-border"
        >
          <img 
            src={lesson.type === 'video' ? IMAGES.AUTISM_FAMILY_10 : IMAGES.SENSORY_LEARNING_1}
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {lesson.type === 'video' ? (
              <Button size="lg" className="rounded-full w-20 h-20 bg-primary/90 hover:bg-primary">
                <PlayCircle className="w-10 h-10 text-white" />
              </Button>
            ) : (
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="font-semibold">Lectura de Clase</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Contenido Educativo */}
        <article className="prose prose-slate max-w-none mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent(lesson.content)}
            </motion.div>
          </AnimatePresence>
        </article>

        {/* Actividad de la Lección */}
        {lesson.activity && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-6 md:p-8 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Actividad Práctica</h2>
                  <p className="text-sm text-muted-foreground">Pon en práctica los conceptos de esta lección</p>
                </div>
              </div>
              <ActivityComponent 
                activity={lesson.activity} 
                onComplete={handleActivityComplete} 
              />
            </Card>
          </motion.div>
        )}

        {/* Botón de completar si no hay actividad */}
        {!lesson.activity && !isCompleted && (
          <div className="flex justify-center mb-16">
            <Button 
              size="lg" 
              onClick={handleMarkAsComplete}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2"
            >
              Marcar como lección terminada
              <CheckCircle2 className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Controles de Navegación */}
        <div className="pt-8 border-t border-border">
          <NavigationControls 
            currentLessonId={lesson.id} 
            onNavigate={handleNavigate} 
          />
        </div>

        {/* Footer Sugerencia Siguiente */}
        {!lesson.activity && lesson.nextLessonId && (
          <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-dashed border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Próximo paso</p>
              <h4 className="text-lg font-bold">Continuar con la siguiente lección</h4>
            </div>
            <Button 
              variant="outline" 
              onClick={() => handleNavigate(lesson.nextLessonId!)}
              className="gap-2"
            >
              Ir a la siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LessonView;