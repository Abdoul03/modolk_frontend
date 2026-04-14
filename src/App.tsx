import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/register.tsx";
import Home from "./pages/Home.tsx";
import { MeasurementForm } from "./pages/MeasurementForm.tsx";
import MainLayout from "./components/MainLayout.tsx";
import Catalog from "./pages/Catalog.tsx";
import Commandes from "./pages/Commandes.tsx";
import Profil from "./pages/profil.tsx";
import Customisation from "./pages/Customisation.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/mesure" element={<MeasurementForm />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/custom/:id" element={<Customisation />} />
            <Route path="/orders" element={<Commandes />} />
            <Route path="/profile" element={<Profil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
