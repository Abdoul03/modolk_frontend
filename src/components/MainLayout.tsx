import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar"; // Ton menu créé précédemment
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">MODOL’K</h2>
        </header>
        <div className="p-4">
          {/* Outlet affichera le contenu de tes routes (Home, Mesure, etc.) */}
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
