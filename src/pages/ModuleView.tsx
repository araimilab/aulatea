import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, Clock, CheckCircle2, PlayCircle, FileText, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { LessonCard } from '@/components/LessonCard';
import { ModuleProgress } from '@/components/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { COURSE_CONTENT } from '@/data/courseContent';
import { getLessonPath, ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * @file src/pages/ModuleView.tsx
 * @description Vista detallada de un módulo del taller TEA.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

export default function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { isLessonCompleted, progress } = useProgress();

  // Encontrar el módulo actual en los datos del curso
  const module = useMemo(() => {
    return COURSE_CONTENT.find((m) => m.id === moduleId);
  }, [moduleId]);

  // Calcular progreso específico del módulo
  const moduleStats = useMemo(() => {
    if (!module) return { completed: 0, total: 0, percentage: 0 };
    const total = module.lessons.length;
    const completed = module.lessons.filter((l) => isLessonCompleted(l.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [module, isLessonCompleted]);

  if (!module) {
    return ( 
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Módulo no encontrado</h2>
          <p className="text-muted-foreground mb-8">Lo sentimos, el módulo que buscas no existe o ha sido movido.</p>
          <Link
            to={ROUTE_PATHS.HOME}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-transform hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Navegación Superior */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(ROUTE_PATHS.HOME)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver al panel principal</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal: Contenido y Lecciones */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cabecera del Módulo */}
            <motion.section
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 shadow-sm"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${module.color.replace('/10', '/20').replace('/20', '/30')}`}>
                    Módulo {module.id.split('-')[1]}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{module.lessons.reduce((acc, curr) => acc + parseInt(curr.duration), 0)} min total</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {module.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {module.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{module.lessons.length} Lecciones</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-4 h-4 text-chart-2" />
                    <span className="text-sm font-medium">{moduleStats.completed} Completadas</span>
                  </div>
                </div>
              </div>

              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </motion.section>

            {/* Lista de Lecciones */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Contenido del Módulo</h2>
                <span className="text-sm font-mono text-muted-foreground">
                  {moduleStats.percentage}% completado
                </span>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {module.lessons.map((lesson, index) => (
                  <motion.div key={lesson.id} variants={staggerItem}>
                    <LessonCard
                      lesson={lesson}
                      isCompleted={isLessonCompleted(lesson.id)}
                      onClick={() => navigate(getLessonPath(lesson.id))}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </div>

          {/* Columna Lateral: Info Extra y Progreso */}
          <div className="space-y-6">
            {/* Tarjeta de Progreso de Módulo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Tu Avance
              </h3>
              <ModuleProgress
                progress={moduleStats.completed}
                total={moduleStats.total}
                className="mb-4"
              />
              <p className="text-xs text-muted-foreground text-center italic">
                {moduleStats.percentage === 100 
                  ? "¡Módulo completado con éxito!" 
                  : `Te faltan ${moduleStats.total - moduleStats.completed} lecciones para terminar.`}
              </p>
            </motion.div>

            {/* Imagen Inspiracional */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-md group"
            >
              <img
                src={IMAGES.SENSORY_LEARNING_4}
                alt="Aprendizaje Sensorial"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-medium">
                  "Entender el filtro sensorial es el primer paso para la conexión."
                </p>
              </div>
            </motion.div>

            {/* Objetivos del Módulo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6"
            >
              <h3 className="text-base font-bold text-secondary-foreground mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Objetivos de Aprendizaje
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-secondary-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span>Comprender la base fenomenológica aplicada al TEA.</span>
                </li>
                <li className="flex gap-3 text-sm text-secondary-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span>Identificar patrones sensoriales únicos en el entorno familiar.</span>
                </li>
                <li className="flex gap-3 text-sm text-secondary-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span>Desarrollar herramientas de ajuste ambiental.</span>
                </li>
              </ul>
            </motion.div>

            {/* Próximo Paso (CTA dinámico) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/5 border border-primary/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-primary uppercase">Siguiente Reto</h3>
                <img 
                  src={IMAGES.PROGRESS_JOURNEY_2} 
                  alt="Camino" 
                  className="w-8 h-8 rounded-full object-cover opacity-60"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Continúa tu viaje hacia el entendimiento profundo. Cada lección es una pieza del rompecabezas.
              </p>
              <button
                onClick={() => {
                  const nextLesson = module.lessons.find(l => !isLessonCompleted(l.id)) || module.lessons[0];
                  navigate(getLessonPath(nextLesson.id));
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              >
                {moduleStats.percentage === 0 ? 'Empezar Módulo' : 'Continuar Aprendizaje'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
