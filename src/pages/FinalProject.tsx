import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ShieldCheck, 
  Users, 
  Download, 
  ArrowRight, 
  Heart, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ActivityComponent } from '@/components/ActivityComponent';
import { ACTIVITIES, ANNEXES } from '@/data/courseContent';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * @file src/pages/FinalProject.tsx
 * @description Página del proyecto final integrador 'Plan de Calidad de Vida Familiar'.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

export default function FinalProject() {
  const { saveActivity, completeLesson, progress } = useProgress();
  
  // Buscamos la actividad específica del proyecto final
  const finalActivity = ACTIVITIES.find(a => a.id === 'act-final-project') || ACTIVITIES[ACTIVITIES.length - 1];

  const handleProjectSubmit = (results: any) => {
    saveActivity('les-final', results);
    completeLesson('les-final');
    // Aquí se podría integrar un toast de éxito
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-primary/5 p-8 md:p-12"
        >
          <div className="relative z-10 md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Culminación del Taller</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Plan de Calidad de Vida Familiar
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Este proyecto es la síntesis de todo tu viaje fenomenológico. Aquí transformarás la comprensión profunda en acciones concretas para el bienestar de tu familia.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full hidden md:block">
            <img 
              src={IMAGES.PROGRESS_JOURNEY_5} 
              alt="Progreso y Bienestar" 
              className="w-full h-full object-cover opacity-20 mask-gradient-to-l"
              style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}
            />
          </div>
        </motion.section>

        {/* Guía de Implementación */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-semibold">Pasos para un Plan Efectivo</h2>
          </div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={staggerItem}>
              <Card className="h-full border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-chart-2" />
                    Ajustes Ambientales
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Identifica los 3 cambios sensoriales más urgentes en casa basándote en tu Mapa Sensorial.
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="h-full border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-destructive" />
                    Auto-cuidado Real
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Define una ventana de tiempo innegociable para tu descanso. Un cuidador regulado es la mejor herramienta.
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="h-full border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Red de Sostén
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Nombra a las personas o instituciones que forman tu ecosistema de apoyo y cómo delegarás tareas.
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Área del Proyecto - Interactiva */}
        <section className="bg-white dark:bg-card rounded-3xl p-6 md:p-10 border border-border shadow-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Completa tu Hoja de Ruta</h2>
            <p className="text-muted-foreground">
              Tómate el tiempo necesario para reflexionar sobre cada campo. Este documento será tu guía diaria.
            </p>
          </div>

          <ActivityComponent 
            activity={finalActivity} 
            onComplete={handleProjectSubmit} 
          />

          {progress.activitySubmissions['les-final'] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 rounded-2xl bg-secondary/30 border border-secondary flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">¡Plan Guardado con Éxito!</h3>
                  <p className="text-sm text-muted-foreground">Puedes descargar tu plan en formato PDF para tenerlo siempre a mano.</p>
                </div>
              </div>
              <Button className="bg-secondary-foreground text-secondary hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Descargar Plan PDF
              </Button>
            </motion.div>
          )}
        </section>

        {/* Recursos de Apoyo */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Download className="w-5 h-5" />
              Anexos y Plantillas
            </h3>
            <div className="space-y-3">
              {ANNEXES.map((annex) => (
                <a 
                  key={annex.id} 
                  href={annex.link} 
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{annex.title}</p>
                    <p className="text-xs text-muted-foreground">{annex.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden relative min-h-[300px]">
            <img 
              src={IMAGES.AUTISM_FAMILY_1} 
              alt="Familia Unida" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <p className="text-white/90 italic text-lg leading-relaxed mb-2">
                "No se trata de arreglar a la persona, sino de ajustar el mundo para que su luz pueda brillar."
              </p>
              <p className="text-white/60 text-sm">— Reflexión del Taller</p>
            </div>
          </div>
        </section>

        {/* Cierre del Curso */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4 py-12"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Gracias por tu Compromiso</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Has completado el viaje fenomenológico. Recuerda que la comprensión es un músculo que se entrena cada día en el encuentro con el otro.
          </p>
          <div className="pt-6">
            <Button variant="outline" className="rounded-full px-8">
              Regresar al Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
