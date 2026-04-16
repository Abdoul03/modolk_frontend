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
import { Settings2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  modelId: number;
  modelName: string;
}

const AddCustomOptionDialog = ({ modelId, modelName }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  enum TypeCostumisation {
    Col = "Col",
    Bouton = "Bouton",
    Broderie = "Broderie",
    Manche = "Manche",
  }

  const [formData, setFormData] = useState({
    type: "" as TypeCostumisation,
    nom: "",
    prixAjout: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Structure JSON basée sur tes tests Bruno
      await api.post("/custum-option", {
        ...formData,
        prixAjout: Number(formData.prixAjout),
        modelId: modelId,
      });

      toast({
        title: "Option ajoutée",
        description: `Nouvelle option pour ${modelName} enregistrée.`,
      });
      setOpen(false);
      setFormData({ type: "" as TypeCostumisation, nom: "", prixAjout: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter l'option.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 rounded-full border-slate-200 hover:bg-slate-100 transition-all"
        >
          <Settings2 className="h-4 w-4 text-slate-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] border-none p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            Customiser : {modelName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
              Type de customisation
            </Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, type: val as TypeCostumisation })
              }
              value={formData.type}
            >
              <SelectTrigger className="rounded-xl border-none bg-slate-50 font-bold text-xs uppercase">
                <SelectValue placeholder="Choisir le type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-2xl">
                {Object.values(TypeCostumisation).map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="font-bold uppercase text-[10px]"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1">
              Désignation
            </Label>
            <Input
              placeholder="Ex: Col ronds, Boutons en bois"
              className="rounded-xl bg-slate-50 border-none"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1">
              Prix additionnel (F)
            </Label>
            <Input
              type="number"
              placeholder="0"
              className="rounded-xl bg-slate-50 border-none font-bold"
              value={formData.prixAjout}
              onChange={(e) =>
                setFormData({ ...formData, prixAjout: e.target.value })
              }
              required
            />
          </div>

          <Button
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 py-6 font-black uppercase text-[10px] tracking-widest mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Ajouter au modèle"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomOptionDialog;
