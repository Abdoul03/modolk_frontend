import {
  LayoutDashboard,
  ShoppingBag,
  Ruler,
  CreditCard,
  User,
  LogOut,
  Scissors,
  UserIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import logoImage from "@/assets/modolk-logo.png";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const clientMenuItems = [
  { title: "Tableau de bord", icon: LayoutDashboard, url: "/home" },
  { title: "Catalogue Modèles", icon: Scissors, url: "/catalog" },
  { title: "Mes Commandes", icon: ShoppingBag, url: "/orders" },
  { title: "Mes Mesures", icon: Ruler, url: "/mesure" },
  { title: "Profile", icon: UserIcon, url: "/profile" },
];

export function AppSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex items-center justify-center py-4">
        {/* <h1 className="text-xl font-bold text-primary">MODOL’K</h1> */}
        <div className="flex items-center gap-5">
          {/* Le logo reste toujours visible avec une taille fixe */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg text-primary-foreground">
            {/* <Scissors className="h-5 w-5" /> */}
            <a
              href="#"
              className="flex flex-col items-center gap-1 flex-shrink-0 group"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                src={logoImage}
                alt="MODOL'K"
                className="h-12 md:h-16 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          </div>

          {/* Le nom MODOL’K se cache quand la sidebar est réduite */}
          <span className="truncate font-bold text-xl group-data-[state=collapsed]:hidden">
            MODOL’K
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {/* {clientMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))} */}
            {clientMenuItems.map((item) => {
              // Vérification de la page active
              const isActive = location.pathname === item.url;

              return (
                <SidebarMenuItem key={item.title} className="relative">
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    // Applique le style actif de shadcn
                    isActive={isActive}
                    className={
                      isActive ? "bg-primary/10 text-primary font-semibold" : ""
                    }
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="group-data-[state=collapsed]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>

                  {/* Petit indicateur visuel (barre verticale) sur le côté si actif */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary 
                 group-data-[state=collapsed]:w-1.5 group-data-[state=collapsed]:h-6"
                    />
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-destructive"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
