import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Heart, ArrowRight, Quote } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { NavigationControls } from '@/components/NavigationControls';
import { COURSE_CONTENT } from '@/data/courseContent';
import { getLessonPath } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * @file src/pages/MasterClass.tsx
 * @description Página de la clase magistral introductoria sobre fenomenología y TEA.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

const MasterClass: React.FC = () => {
  const navigate = useNavigate();

  // Buscamos la lección de la Clase Magistral (módulo 0)
  const masterClassModule = COURSE_CONTENT.find((m) => m.id === 'mod-0');
  const lesson = masterClassModule?.lessons[0];

  if (!lesson) return null;

  const handleNavigate = (lessonId: string) => {
    navigate(getLessonPath(lessonId));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-12 pb-24">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden aspect-[21/9] flex items-center justify-center text-white"
        >
          <img 
            src={IMAGES.PROGRESS_JOURNEY_3} 
            alt="Camino de aprendizaje" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
          />
          <div className="relative z-10 text-center space-y-4 px-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Clase Magistral de Apertura</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{lesson.title}</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Iniciando el viaje hacia la comprensión de la experiencia subjetiva en el espectro autista.
            </p>
          </div>
        </motion.section>

        {/* Nagel's Concept Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">¿Qué se siente ser un murciélago?</h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              <p>
                En 1974, el filósofo <strong>Thomas Nagel</strong> planteó una pregunta que cambiaría nuestra forma de entender la mente.
                Argumentaba que, aunque conociéramos cada detalle físico y biológico de un murciélago (cómo funciona su sonar,
                su anatomía, su cerebro), nunca podríamos saber qué <em>siente</em> el murciélago al ser un murciélago.
              </p>
              <p>
                Esta brecha entre el conocimiento objetivo (lo que vemos por fuera) y el conocimiento subjetivo (lo que se vive por dentro)
                es la esencia de la <strong>Fenomenología</strong>. En el TEA, solemos centrarnos en las conductas, pero el verdadero desafío
                es comprender el mundo desde el punto de vista del niño.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="border-none shadow-2xl overflow-hidden bg-muted">
              <CardContent className="p-0">
                <img 
                  src={IMAGES.SENSORY_LEARNING_9} 
                  alt="Experiencia sensorial"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="flex gap-4 items-start">
                    <Quote className="w-10 h-10 text-primary-foreground/40 shrink-0" />
                    <p className="text-white italic text-lg leading-relaxed">
                      "La experiencia subjetiva es irreductible a lo puramente físico."
                      <span className="block text-sm mt-2 font-semibold not-italic text-white/70">— Thomas Nagel</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Terminology Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Pilares del Taller</h3>
            <p className="text-muted-foreground">Conceptos que nos acompañarán durante todo el recorrido.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[ 
              {
                title: 'Qualia',
                desc: 'La cualidad pura de la experiencia, como el sabor de una naranja o la intensidad de una luz.',
                icon: Sparkles,
                color: 'bg-blue-500/10 text-blue-600'
              },
              {
                title: 'Fenomenología',
                desc: 'El estudio de cómo se nos aparece el mundo a través de nuestra propia conciencia.',
                icon: Brain,
                color: 'bg-green-500/10 text-green-600'
              },
              {
                title: 'Empatía Radical',
                desc: 'Ir más allá de ponerse en el lugar del otro; es intentar habitar su propia piel y sentidos.',
                icon: Heart,
                color: 'bg-rose-500/10 text-rose-600'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground p-10 rounded-3xl text-center space-y-6 shadow-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold">¿Estás listo para cruzar el puente?</h3>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Este no es solo un curso teórico. Es una invitación a desaprender lo que crees saber
            sobre el comportamiento y empezar a sentir lo que tu hijo siente.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full px-8 font-semibold hover:scale-105 transition-transform"
            onClick={() => handleNavigate(lesson.nextLessonId!)}
          >
            Empezar Módulo 1
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Navigation */}
        <div className="pt-8">
          <NavigationControls 
            currentLessonId={lesson.id} 
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MasterClass;
