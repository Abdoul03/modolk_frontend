import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";

const AddTissueDialog = ({ onTissueAdded }: { onTissueAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    type: "", // Ex: Coton
    couleur: "", // Ex: Bleu
    texture: "", // Ex: Robuste, épaisse
    prixParMetre: "",
    stock: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("type", formData.type);
    data.append("couleur", formData.couleur);
    data.append("texture", formData.texture);
    data.append("prixParMetre", formData.prixParMetre);
    data.append("stock", formData.stock);
    if (file) data.append("files", file);

    try {
      await api.post("/tissus", data);
      toast({
        title: "Tissu ajouté",
        description: "Le nouveau tissu est disponible dans le stock.",
      });
      setOpen(false);
      onTissueAdded();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la création du tissu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-slate-900 px-6 font-bold uppercase text-[10px] tracking-widest h-12">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un tissu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8 border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            Nouveau Tissu
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1">
                Type
              </Label>
              <Input
                placeholder="Coton, Lin..."
                className="rounded-xl bg-slate-50 border-none"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1">
                Couleur
              </Label>
              <Input
                placeholder="Bleu, Indigo..."
                className="rounded-xl bg-slate-50 border-none"
                onChange={(e) =>
                  setFormData({ ...formData, couleur: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1">
              Texture
            </Label>
            <Input
              placeholder="Légère, épaisse, douce..."
              className="rounded-xl bg-slate-50 border-none"
              onChange={(e) =>
                setFormData({ ...formData, texture: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1">
                Prix/m (F)
              </Label>
              <Input
                type="number"
                className="rounded-xl bg-slate-50 border-none"
                onChange={(e) =>
                  setFormData({ ...formData, prixParMetre: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1">
                Stock (m)
              </Label>
              <Input
                type="number"
                className="rounded-xl bg-slate-50 border-none"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1">
              Photo du tissu
            </Label>
            <div className="relative h-24 w-full border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="text-center">
                <ImageIcon className="h-6 w-6 text-slate-300 mx-auto" />
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  {file ? file.name : "Choisir une image"}
                </span>
              </div>
            </div>
          </div>
          <Button
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 py-6 font-black uppercase text-[10px] tracking-widest"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Enregistrer le tissu"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTissueDialog;
