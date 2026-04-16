import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Scissors,
  Users,
  ShoppingBag,
  Ruler,
  Settings,
  LogOut,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: ShoppingBag, label: "Commandes", path: "/admin/commandes" },
  { icon: Scissors, label: "Modèles", path: "/admin/modeles" },
  { icon: Palette, label: "Tissus", path: "/admin/tissus" },
  { icon: Users, label: "Clients", path: "/admin/users" },
  { icon: Settings, label: "Paramètres", path: "/admin/settings" },
];

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-slate-950 text-white flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      {/* LOGO SECTION */}
      <div className="p-8">
        <h2 className="text-2xl font-black tracking-tighter italic text-primary">
          MODOL'K{" "}
          <span className="text-[10px] not-italic font-medium text-slate-500 uppercase tracking-[0.2em] block">
            Admin Panel
          </span>
        </h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-primary",
                  )}
                />
                <span className="font-bold uppercase tracking-widest text-[11px]">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / LOGOUT */}
      <div className="p-4 mt-auto border-t border-white/5">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-xl px-4 py-6"
          onClick={() => handleLogout()}
        >
          <LogOut className="h-5 w-5" />
          <span className="font-bold uppercase tracking-widest text-[11px]">
            Quitter
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
