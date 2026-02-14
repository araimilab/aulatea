import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ClipboardList, BrainCircuit, Target, Send } from 'lucide-react';
import { Activity } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ActivityProps {
  activity: Activity;
  onComplete: (results: any) => void;
}

export function ReflectionActivity({ activity, onComplete }: ActivityProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => onComplete(answers), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {activity.questions?.map((question, index) => (
        <div key={index} className="space-y-2">
          <Label className="text-base font-medium text-foreground/90">
            {question}
          </Label>
          <Textarea
            placeholder="Escribe tu reflexión aquí..."
            className="min-h-[120px] bg-background/50 focus:bg-background transition-colors"
            value={answers[index] || ''}
            onChange={(e) => handleInputChange(index.toString(), e.target.value)}
            required
          />
        </div>
      ))}
      <div className="pt-4 flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitted} 
          className="bg-primary hover:bg-primary/90 text-white gap-2 transition-all"
        >
          {isSubmitted ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
          {isSubmitted ? 'Enviado' : 'Enviar reflexión'}
        </Button>
      </div>
    </form>
  );
}

export function ObservationTemplate({ activity, onComplete }: ActivityProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => onComplete(formData), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {activity.templateFields?.map((field, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {field}
            </Label>
            <Input
              placeholder={`Ingresa datos de ${field.toLowerCase()}`}
              className="bg-background/50 focus:bg-background transition-colors"
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <div className="pt-4 flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitted} 
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2"
        >
          {isSubmitted ? <CheckCircle2 className="w-4 h-4" /> : <ClipboardList className="w-4 h-4" />}
          {isSubmitted ? 'Guardado' : 'Guardar observaciones'}
        </Button>
      </div>
    </form>
  );
}

export function ActivityComponent({ activity, onComplete }: ActivityProps) {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'reflection': return <BrainCircuit className="w-6 h-6 text-primary" />;
      case 'observation': return <ClipboardList className="w-6 h-6 text-secondary-foreground" />;
      case 'action-plan': return <Target className="w-6 h-6 text-chart-2" />;
      default: return <CheckCircle2 className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getHeaderStyle = () => {
    switch (activity.type) {
      case 'reflection': return 'bg-primary/5 border-primary/10';
      case 'observation': return 'bg-secondary/10 border-secondary/20';
      case 'action-plan': return 'bg-chart-2/5 border-chart-2/10';
      default: return 'bg-muted border-border';
    }
  };

  const renderForm = () => {
    if (activity.type === 'reflection') {
      return <ReflectionActivity activity={activity} onComplete={onComplete} />;
    }
    if (activity.type === 'observation' || activity.type === 'action-plan') {
      return <ObservationTemplate activity={activity} onComplete={onComplete} />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden border-none shadow-xl bg-card">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={activity.type === 'observation' ? IMAGES.SENSORY_LEARNING_6 : IMAGES.AUTISM_FAMILY_6}
            alt="Contexto de actividad"
            className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className={cn("p-3 rounded-xl shadow-lg", getHeaderStyle())}>
              {getActivityIcon()}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Actividad Interactiva
              </span>
              <h2 className="text-2xl font-bold text-card-foreground">{activity.title}</h2>
            </div>
          </div>
        </div>

        <CardHeader className="pt-8">
          <CardDescription className="text-lg leading-relaxed text-muted-foreground">
            {activity.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-10 px-8">
          {renderForm()}
        </CardContent>

        <CardFooter className="bg-muted/30 border-t py-4 px-8">
          <p className="text-xs text-muted-foreground flex items-center gap-2 italic">
            Sus respuestas son privadas y sirven para su propio crecimiento personal durante el taller.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
