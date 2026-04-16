import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tissu } from "@/models/tissu";
import api from "@/integrations/api";

interface EditTissueDialogProps {
  tissue: Tissu;
  open: boolean;
  setOpen: (open: boolean) => void;
  onTissueUpdated: () => void;
}

const EditTissueDialog = ({
  tissue,
  open,
  setOpen,
  onTissueUpdated,
}: EditTissueDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  // Initialisation de l'état avec les données du tissu existant
  const [formData, setFormData] = useState({
    type: "",
    couleur: "",
    texture: "",
    prixParMetre: "",
    stock: "",
  });

  // Mettre à jour l'état quand le tissu change
  useEffect(() => {
    if (tissue) {
      setFormData({
        type: tissue.type || "",
        couleur: tissue.couleur || "",
        texture: tissue.texture || "",
        prixParMetre: tissue.prixParMetre?.toString() || "",
        stock: tissue.stock?.toString() || "",
      });
      setFile(null); // Reset du fichier à chaque ouverture
    }
  }, [tissue, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Utilisation de FormData car NestJS/Spring attend form-data si un fichier est présent
    const data = new FormData();
    data.append("type", formData.type);
    data.append("couleur", formData.couleur);
    data.append("texture", formData.texture);
    data.append("prixParMetre", formData.prixParMetre);
    data.append("stock", formData.stock);
    if (file) {
      data.append("files", file); // Champ 'files' requis pour l'upload d'image
    }

    try {
      // Requête PATCH vers l'endpoint de modification
      await api.patch(`/tissus/${tissue.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Tissu mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
      setOpen(false);
      onTissueUpdated();
    } catch (error) {
      console.error("Erreur de mise à jour du tissu:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le tissu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8 border-none bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter text-slate-900 flex items-center gap-2">
            <Edit className="h-5 w-5 text-slate-700" /> Modifier :{" "}
            {tissue?.type}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Type
              </Label>
              <Input
                value={formData.type}
                placeholder="Coton, Lin..."
                className="rounded-xl bg-slate-50 border-none font-bold text-slate-900"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Couleur
              </Label>
              <Input
                value={formData.couleur}
                placeholder="Bleu, Indigo..."
                className="rounded-xl bg-slate-50 border-none font-bold text-slate-900"
                onChange={(e) =>
                  setFormData({ ...formData, couleur: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
              Texture
            </Label>
            <Input
              value={formData.texture}
              placeholder="Légère, épaisse, douce..."
              className="rounded-xl bg-slate-50 border-none font-medium italic text-slate-600"
              onChange={(e) =>
                setFormData({ ...formData, texture: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Prix/m (F)
              </Label>
              <Input
                value={formData.prixParMetre}
                type="number"
                className="rounded-xl bg-slate-50 border-none font-black text-slate-900"
                onChange={(e) =>
                  setFormData({ ...formData, prixParMetre: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Stock (m)
              </Label>
              <Input
                value={formData.stock}
                type="number"
                className="rounded-xl bg-slate-50 border-none font-black text-slate-900"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
              Photo du tissu (optionnel)
            </Label>
            <div className="relative h-24 w-full border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer group">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="text-center">
                <ImageIcon className="h-6 w-6 text-slate-300 mx-auto group-hover:text-slate-400 transition-colors" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                  {file
                    ? file.name
                    : tissue?.medias?.[0]?.imageUrl
                    ? "Changer l'image"
                    : "Choisir une image"}
                </span>
                {tissue?.medias?.[0]?.imageUrl && !file && (
                  <span className="text-[8px] text-slate-300 italic block">
                    (Image actuelle conservée)
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 py-6 font-black uppercase text-[10px] tracking-[0.2em] h-14 mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Enregistrer les modifications"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTissueDialog;
