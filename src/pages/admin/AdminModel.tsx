import React, { useState, useEffect } from "react";
import { Plus, Package, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/integrations/api";
import { useToast } from "@/components/ui/use-toast";
import AddModelDialog from "./utils/AddModelDialog";
import AddCustomOptionDialog from "./utils/AddCustomOptionDialog";

const AdminModel = () => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchModels = async () => {
    try {
      const response = await api.get("/design");
      setModels(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          error.response?.data?.message ||
          "Impossible de récupérer les models.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce modèle ?")) {
      try {
        await api.delete(`/design/${id}`);
        toast({
          title: "Supprimé",
          description: "Le modèle a été retiré du catalogue.",
        });
        setModels(models.filter((m) => m.id !== id));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de supprimer ce modèle.",
        });
      }
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header avec bouton d'ajout */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
            Catalogue Modèles
          </h1>
          <p className="text-slate-500 font-medium">
            Gérez vos créations et designs personnalisés.
          </p>
        </div>
        {/* Le bouton stylisé est maintenant géré ici sans encombrer la page principale */}
        <AddModelDialog onModelAdded={fetchModels} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64 italic text-slate-400">
          Chargement du catalogue...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <Card
              key={model.id}
              className="group overflow-hidden border-none shadow-sm rounded-[2rem] bg-white transition-all hover:shadow-md"
            >
              {/* Image du modèle */}
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    model.medias?.[0]?.imageUrl
                  }`}
                  alt={model.nom}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x600?text=Image+Indisponible";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm h-8 w-8"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-700" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-2xl border-none shadow-lg"
                    >
                      <DropdownMenuItem className="gap-2 font-bold uppercase text-[10px] cursor-pointer">
                        <Edit className="h-3 w-3" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(model.id)}
                        className="gap-2 font-bold uppercase text-[10px] text-red-600 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Badge className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md border-none text-[10px] font-black uppercase">
                  {model.categorie?.nom}
                </Badge>
              </div>

              {/* Infos du modèle */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-black uppercase text-lg leading-tight text-slate-900 line-clamp-1">
                    {model.nom}
                  </h3>
                  <AddCustomOptionDialog
                    modelId={model.id}
                    modelName={model.nom}
                  />
                  <span className="font-black text-primary whitespace-nowrap">
                    {model.prixBase.toLocaleString()} F
                  </span>
                </div>

                <p className="text-slate-500 text-xs font-medium line-clamp-2 italic">
                  "{model.description}"
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Package className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {model.nombreDeMetre} Mètres requis
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminModel;
