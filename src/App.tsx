import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ExamSetupPage from "./pages/ExamSetupPage";
import Dashboard from "./pages/Dashboard";
import PomodoroPage from "./pages/PomodoroPage";
import TopicsPage from "./pages/TopicsPage";
import StreaksPage from "./pages/StreaksPage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setup" element={<ExamSetupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/streaks" element={<StreaksPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/schedule" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
