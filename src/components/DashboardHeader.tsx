import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export const DashboardHeader = ({
  user,
  onAction,
}: {
  user;
  onAction: () => void;
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
    <div>
      <h1 className="text-3xl font-serif font-medium text-slate-900">
        Tableau de bord
      </h1>
      <p className="text-muted-foreground font-light">
        Bienvenue dans votre espace, {user?.prenom}.
      </p>
    </div>
    <Button onClick={onAction} className="bg-slate-900 text-white rounded-none">
      <Plus className="mr-2 h-4 w-4" /> Nouvelle Commande
    </Button>
  </div>
);
