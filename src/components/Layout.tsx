import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  PlayCircle,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTE_PATHS, COURSE_DATA } from '@/lib/index';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * @file src/components/Layout.tsx
 * @description Layout principal del aula virtual TEA.
 * Ofrece una experiencia de navegación inmersiva y centrada en el contenido.
 */
export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { overallProgressPercentage, completedCount, totalLessons } = useProgress();
  const location = useLocation();

  const navItems = [
    {
      name: 'Inicio',
      path: ROUTE_PATHS.HOME,
      icon: Home,
    },
    {
      name: 'Clase Magistral',
      path: ROUTE_PATHS.MASTER_CLASS,
      icon: PlayCircle,
    },
    {
      name: 'Proyecto Final',
      path: ROUTE_PATHS.FINAL_PROJECT,
      icon: Award,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">
            {COURSE_DATA.title}
          </h1>
          <p className="text-xs text-muted-foreground font-medium">Aula Virtual</p>
        </div>
      </div>

      <Separator className="bg-sidebar-border opacity-50" />

      {/* Navigation Links */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-1.5">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">
            Contenido Principal
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon size={20} className="shrink-0" />
              <span className="font-medium">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-10 space-y-1.5">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">
            Información
          </p>
          <div className="p-3 bg-accent/30 rounded-xl border border-border/50 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Progreso General</span>
              <span className="text-primary">{overallProgressPercentage}%</span>
            </div>
            <Progress value={overallProgressPercentage} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground text-center">
              {completedCount} de {totalLessons} lecciones completadas
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Footer Section */}
      <div className="p-4 mt-auto">
        <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
            FA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Familia Aprendiz</p>
            <p className="text-[10px] text-muted-foreground truncate">Estudiante</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <LogOut size={14} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-border sticky top-0 h-screen shrink-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full h-16 border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-foreground line-clamp-1">
                {navItems.find(i => i.path === location.pathname)?.name || "Aprendizaje en curso"}
              </h2>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <BarChart3 size={10} />
                <span>Panel de Control</span>
                <span className="opacity-50">•</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Tu Avance</span>
              <span className="text-sm font-mono font-medium">{overallProgressPercentage}%</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card hover:bg-accent transition-colors cursor-pointer">
              <Settings size={18} className="text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl w-full p-4 md:p-8 lg:p-12 animate-in fade-in duration-500">
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-auto py-8 px-4 md:px-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>© 2026 {COURSE_DATA.title} - Taller Fenomenológico TEA</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-primary transition-colors">Soporte</a>
                <a href="#" className="hover:text-primary transition-colors">Guía de Uso</a>
                <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
