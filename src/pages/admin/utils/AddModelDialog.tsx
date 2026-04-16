import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";

const AddModelDialog = ({ onModelAdded }: { onModelAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // États pour les données à fetcher
  const [categories, setCategories] = useState([]);
  const [tissus, setTissus] = useState([]);

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prixBase: "",
    nombreDeMetre: "",
    categorieId: "",
    tissusId: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 1. Fetch des catégories et tissus au montage
  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, tissuRes] = await Promise.all([
          api.get("/categorie"),
          api.get("/tissus"),
        ]);
        setCategories(catRes.data);
        setTissus(tissuRes.data);
      } catch (error) {
        console.error("Erreur de chargement des options", error);
      }
    };
    if (open) loadData();
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("description", formData.description);
    data.append("prixBase", formData.prixBase);
    data.append("nombreDeMetre", formData.nombreDeMetre);
    data.append("categorieId", formData.categorieId);
    data.append("tissusId", formData.tissusId);
    if (selectedFile) data.append("files", selectedFile); // Champ 'files' requis

    try {
      await api.post("/design", data); //
      toast({ title: "Succès", description: "Modèle créé !" });
      setOpen(false);
      onModelAdded();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Vérifiez les champs.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-slate-900 hover:bg-slate-800 px-6 font-bold uppercase text-xs tracking-widest h-12">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un modèle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] rounded-[2rem] border-none p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900">
            Nouveau Design
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="grid grid-cols-2 gap-4">
            {/* SÉLECTEUR DE CATÉGORIE */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Catégorie
              </Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, categorieId: val })
                }
              >
                <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50 font-bold text-xs uppercase">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-xl">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id.toString()}
                      className="font-bold uppercase text-[10px]"
                    >
                      {cat.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SÉLECTEUR DE TISSU */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Tissu suggéré
              </Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, tissusId: val })
                }
              >
                <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50 font-bold text-xs uppercase">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-xl">
                  {tissus.map((tissu) => (
                    <SelectItem
                      key={tissu.id}
                      value={tissu.id.toString()}
                      className="font-bold uppercase text-[10px]"
                    >
                      {tissu.type} ({tissu.couleur})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Nom
              </Label>
              <Input
                required
                className="rounded-xl border-slate-100 bg-slate-50 font-bold"
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Prix (F)
              </Label>
              <Input
                required
                type="number"
                className="rounded-xl border-slate-100 bg-slate-50 font-bold"
                value={formData.prixBase}
                onChange={(e) =>
                  setFormData({ ...formData, prixBase: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
              Description
            </Label>
            <Textarea
              required
              className="rounded-xl border-slate-100 bg-slate-50 italic text-xs min-h-[60px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase ml-1 text-slate-400">
                Mètres requis
              </Label>
              <Input
                required
                type="number"
                className="rounded-xl border-slate-100 bg-slate-50 font-bold"
                value={formData.nombreDeMetre}
                onChange={(e) =>
                  setFormData({ ...formData, nombreDeMetre: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <Input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-10 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:bg-slate-50 transition-all"
              >
                <Upload className="h-4 w-4 text-slate-400" />
              </label>
            </div>
          </div>

          {preview && (
            <div className="h-32 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={preview}
                alt="Prévisualisation"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Button
            disabled={loading}
            type="submit"
            className="w-full rounded-2xl bg-slate-900 py-6 font-black uppercase text-[11px] tracking-[0.2em]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Créer le modèle"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModelDialog;
