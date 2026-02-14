import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Eye, 
  MessageCircle, 
  Home as HomeIcon, 
  Users, 
  ArrowRight, 
  PlayCircle 
} from 'lucide-react';
import { 
  COURSE_DATA, 
  ROUTE_PATHS, 
  getModulePath, 
  CourseModule 
} from '@/lib/index';
import { Layout } from '@/components/Layout';
import { ProgressBar } from '@/components/ProgressBar';
import { ModuleCard } from '@/components/LessonCard';
import { useProgress } from '@/hooks/useProgress';
import { IMAGES } from '@/assets/images';

/**
 * @file src/pages/Home.tsx
 * @description Página principal del aula virtual TEA.
 * Ofrece una visión general del curso, progreso del usuario y acceso rápido a los contenidos.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

// Módulos estáticos para la vista del Dashboard (Sincronizados con el plan de estudios)
const MODULES: CourseModule[] = [
  {
    id: 'm1',
    title: 'Los Sentidos y la Percepción',
    description: 'Explora cómo se procesa la información sensorial en el TEA y su impacto en la vivencia diaria.',
    iconName: 'Eye',
    color: 'bg-blue-500/10 text-blue-600',
    lessons: [] // Referencia estructural
  },
  {
    id: 'm2',
    title: 'Comunicación y Empatía',
    description: 'Más allá de las palabras: comprendiendo el lenguaje gestual y la conexión emocional profunda.',
    iconName: 'MessageCircle',
    color: 'bg-green-500/10 text-green-600',
    lessons: []
  },
  {
    id: 'm3',
    title: 'Rutinas y Calidad de Vida',
    description: 'Estrategias prácticas para crear entornos predecibles que fomenten la autonomía y la calma.',
    iconName: 'Home',
    color: 'bg-amber-500/10 text-amber-600',
    lessons: []
  },
  {
    id: 'm4',
    title: 'Ecosistema Familiar',
    description: 'Construyendo un plan de calidad de vida familiar integral y sostenible a largo plazo.',
    iconName: 'Users',
    color: 'bg-purple-500/10 text-purple-600',
    lessons: []
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { 
    overallProgressPercentage, 
    completedCount, 
    totalLessons 
  } = useProgress();

  const handleStartCourse = () => {
    navigate(ROUTE_PATHS.MASTER_CLASS);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12 pb-16">
        {/* Hero Section / Bienvenida */}
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>Aula Virtual Activa</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {COURSE_DATA.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {COURSE_DATA.subtitle}. Un viaje hacia la comprensión de la experiencia subjetiva del autismo.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={handleStartCourse}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  <PlayCircle className="w-5 h-5" />
                  Empezar Clase Magistral
                </button>
                <a 
                  href="#modulos"
                  className="inline-flex items-center gap-2 bg-background border border-border px-6 py-3 rounded-xl font-semibold hover:bg-muted transition-all"
                >
                  Ver Módulos
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.VIRTUAL_CLASSROOM_2} 
                  alt="Aula Virtual"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-secondary-foreground font-bold">{overallProgressPercentage}%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Tu Progreso</p>
                    <p className="text-xs text-muted-foreground">{completedCount} de {totalLessons} lecciones</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enfoque Fenomenológico */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src={IMAGES.AUTISM_FAMILY_2} 
              alt="Conexión Familiar"
              className="rounded-3xl shadow-lg border border-border"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl font-bold">El Enfoque Fenomenológico</h2>
            <p className="text-muted-foreground">
              Inspirados en la obra de Thomas Nagel, nos preguntamos: <strong>¿Qué se siente ser?</strong> No buscamos solo explicar el autismo desde fuera, sino intentar comprender la riqueza de la experiencia subjetiva desde dentro.
            </p>
            <ul className="space-y-4">
              {[
                'Empatía radical basada en la subjetividad.',
                'Comprender el mundo sensorial del niño.',
                'Valorar la neurodivergencia como una forma de ser.',
                'Herramientas prácticas para el día a día.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
                  </div>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Resumen de Progreso General */}
        <section className="bg-card border border-border rounded-3xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold">Tu Ruta de Aprendizaje</h3>
              <p className="text-muted-foreground">
                Continúa donde lo dejaste para completar tu certificación familiar.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <ProgressBar 
                progress={completedCount} 
                total={totalLessons} 
                showLabel={true}
                size="lg"
              />
            </div>
          </div>
        </section>

        {/* Cuadrícula de Módulos */}
        <section id="modulos" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Módulos del Taller</h2>
            <div className="text-sm text-muted-foreground font-mono">
              {MODULES.length} ETAPAS
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {MODULES.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                progressPercentage={0} // En una implementación real se calcularía por módulo
                onClick={() => navigate(getModulePath(module.id))}
              />
            ))}
          </div>
        </section>

        {/* CTA Proyecto Final */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 lg:p-12">
          <div className="absolute inset-0 opacity-20">
            <img 
              src={IMAGES.MODERN_INTERFACE_4} 
              alt="Textura"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold">Proyecto Final Integrador</h2>
            <p className="text-slate-300">
              Al finalizar los 4 módulos, crearás tu propio <strong>Plan de Calidad de Vida Familiar</strong>, una hoja de ruta personalizada para aplicar todo lo aprendido en tu hogar.
            </p>
            <button 
              onClick={() => navigate(ROUTE_PATHS.FINAL_PROJECT)}
              className="group inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all"
            >
              Saber más sobre el proyecto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;