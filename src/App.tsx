import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppDetail from "./pages/AppDetail";
import MovementChallenge from "./pages/MovementChallenge";
import Onboarding from "./pages/Onboarding";
import OnboardingStep2 from "./pages/OnboardingStep2";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import RoutineDetail from "./pages/RoutineDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/onboarding-2" element={<OnboardingStep2 />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Index />} />
          <Route path="/app/:appId" element={<AppDetail />} />
          <Route path="/challenge" element={<MovementChallenge />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/routine/:appId" element={<RoutineDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
