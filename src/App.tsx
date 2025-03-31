import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Foundations from "./pages/Foundations";
import Practices from "./pages/Practices";
import Auth from "./pages/Auth";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import Journal from "./pages/Journal";
import VerifyEmail from "./pages/verify-email";
import dynamic from 'next/dynamic';

// Initialize the query client for React Query
const queryClient = new QueryClient();

const DynamicComponentWithNoSSR = dynamic(() => import('./components/BrowserOnlyComponent'), { ssr: false });

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/foundations" element={<Foundations />} />
            <Route path="/practices" element={<Practices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DynamicComponentWithNoSSR />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
