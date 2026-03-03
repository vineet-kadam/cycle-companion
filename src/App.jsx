/**
 * APP ROUTER CONFIGURATION
 * ========================
 * Main application component with routing setup.
 * All routes are defined here for easy backend integration reference.
 * 
 * Available Routes:
 * - / (Home): Dashboard with cycle tracker
 * - /calendar: Full calendar view
 * - /history: Cycle history and statistics
 * - /education: Educational articles and tips
 * - /pregnancy: Pregnancy tracking (optional feature)
 * 
 * Backend developers:
 * - Each route corresponds to a page component in src/pages/
 * - API endpoints are documented in each page component
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import Index from "./pages/Index";
import CalendarPage from "./pages/CalendarPage";
import HistoryPage from "./pages/HistoryPage";
import EducationPage from "./pages/EducationPage";
import PregnancyPage from "./pages/PregnancyPage";
import NotFound from "./pages/NotFound";

// React Query client for data fetching
// Backend: Use this for API calls with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus for fresh data
      refetchOnWindowFocus: false,
      // Retry failed requests
      retry: 1,
      // Stale time before refetching
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  }
});

const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notifications */}
      <Toaster />
      <Sonner position="top-center" />
      
      {/* Router configuration */}
      <BrowserRouter>
        <Routes>
          {/* Main dashboard - cycle tracker */}
          <Route path="/" element={<Index />} />
          
          {/* Full calendar view */}
          <Route path="/calendar" element={<CalendarPage />} />
          
          {/* Cycle history and statistics */}
          <Route path="/history" element={<HistoryPage />} />
          
          {/* Educational content */}
          <Route path="/education" element={<EducationPage />} />
          
          {/* Pregnancy tracking (optional) */}
          <Route path="/pregnancy" element={<PregnancyPage />} />
          
          {/* 404 fallback - keep this last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;