import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppDetail from "./pages/AppDetail";
import MovementChallenge from "./pages/MovementChallenge";
import Splash from "./pages/Splash";
import OnboardingStep2 from "./pages/OnboardingStep2";
import Auth from "./pages/Auth";

import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import UsageStats from "./pages/UsageStats";
import Community from "./pages/Community";
import ConnectedApps from "./pages/ConnectedApps";
import CompletionPreview from "./pages/CompletionPreview";
import ChallengeComplete from "./pages/ChallengeComplete";
import NotFound from "./pages/NotFound";
import GlobalBackground from "./components/GlobalBackground";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding-2" element={<OnboardingStep2 />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Index />} />
            <Route path="/app/:appId" element={<AppDetail />} />
            <Route path="/challenge" element={<MovementChallenge />} />
            <Route path="/explore" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/usage-stats" element={<UsageStats />} />
            <Route path="/community" element={<Community />} />
            <Route path="/connected-apps" element={<ConnectedApps />} />
            <Route path="/completion-preview" element={<CompletionPreview />} />
            <Route path="/challenge-complete" element={<ChallengeComplete />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
