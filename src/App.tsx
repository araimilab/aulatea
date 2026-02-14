import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";

// Page Imports
import Home from "@/pages/Home";
import MasterClass from "@/pages/MasterClass";
import ModuleView from "@/pages/ModuleView";
import LessonView from "@/pages/LessonView";
import FinalProject from "@/pages/FinalProject";

/**
 * @file src/App.tsx
 * @description Componente raíz de la plataforma educativa "Vivir su Mundo".
 * Configura el enrutamiento, proveedores de estado global y notificaciones.
 * © 2026 Vivir su Mundo - Aula Virtual TEA.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" expand={false} richColors />
        <HashRouter>
          <Routes>
            {/* Dashboard / Home */}
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />

            {/* Clase Magistral Introductoria */}
            <Route path={ROUTE_PATHS.MASTER_CLASS} element={<MasterClass />} />

            {/* Vista de Módulo Específico */}
            <Route path={ROUTE_PATHS.MODULE} element={<ModuleView />} />

            {/* Vista de Lección Individual con Contenido y Actividades */}
            <Route path={ROUTE_PATHS.LESSON} element={<LessonView />} />

            {/* Proyecto Final Integrador */}
            <Route path={ROUTE_PATHS.FINAL_PROJECT} element={<FinalProject />} />

            {/* Catch-all route redireccionando al Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
