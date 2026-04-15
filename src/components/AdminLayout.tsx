import Sidebar from "@/pages/admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar fixe à gauche */}
      <Sidebar />

      {/* Contenu principal décalé de la largeur de la sidebar (w-64) */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
