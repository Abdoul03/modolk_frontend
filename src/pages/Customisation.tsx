import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Ruler, Info } from "lucide-react";
import { Tissu } from "@/models/tissu";
import { CustomOption } from "@/models/CustomOption";
import { Model } from "@/models/model";
import { Mesure } from "@/models/mesure";
import { getUserIdFromToken } from "@/lib/auth-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { SelectContent } from "@radix-ui/react-select";

const Customisation = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const [model, setModel] = useState<Model | null>(
    location.state?.modelData || null,
  );
  const [tissu, setTissu] = useState<Tissu | null>(null);
  const [options, setOptions] = useState<CustomOption[]>([]);
  const [mesures, setMesures] = useState<Mesure[]>([]);
  const [selectedMesureId, setSelectedMesureId] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<CustomOption[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("access_token");
      const userId = getUserIdFromToken(token);
      try {
        setLoading(true);
        let currentModel = model;

        // 1. Fetch Model si pas de state
        if (!currentModel && id) {
          const res = await api.get(`/design/${id}`);
          currentModel = res.data;
          setModel(currentModel);
        }

        if (currentModel) {
          // 2. Fetch Tissu et Options en parallèle
          const [tissuRes, optionsRes, mesureRes] = await Promise.all([
            api.get(`/tissus/${currentModel.tissusId}`),
            api.get(`/custum-option/${currentModel.id}`),
            api.get(`/mesure/${userId}/all`),
          ]);
          setTissu(tissuRes.data);
          setOptions(optionsRes.data);
          setMesures(mesureRes.data);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur de chargement",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, model, toast]);

  const toggleOption = (option: CustomOption) => {
    setSelectedOptions((prev) =>
      prev.find((o) => o.id === option.id)
        ? prev.filter((o) => o.id !== option.id)
        : [...prev, option],
    );
  };

  const totalPrice =
    (model?.prixBase || 0) +
    selectedOptions.reduce((acc, opt) => acc + opt.prixAjout, 0);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center font-medium">
        Chargement du studio...
      </div>
    );
  if (!model)
    return <div className="text-center p-20">Modèle introuvable.</div>;

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* COLONNE GAUCHE : VISUEL */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted shadow-2xl">
            <img
              src={`${API_URL}${model.medias?.[0]?.imageUrl}`}
              alt={model.nom}
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            />
            <Badge className="absolute top-6 left-6 bg-white/90 text-black border-none px-4 py-2 text-lg">
              {model.categorie?.nom}
            </Badge>
          </div>

          <Card className="border-none shadow-sm bg-secondary/30">
            <CardContent className="p-6 flex items-start gap-4">
              <Info className="h-5 w-5 mt-1 text-primary" />
              <div>
                <p className="text-sm font-medium">Note du tailleur</p>
                <p className="text-sm text-muted-foreground">
                  Ce modèle nécessite environ {model.nombreDeMetre}m de tissu.
                  Les finitions sont réalisées à la main dans nos ateliers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLONNE DROITE : CONFIGURATION */}
        <div className="lg:col-span-5 space-y-8">
          <section>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              {model.nom}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              {model.description}
            </p>
          </section>

          <Separator />

          {/* SECTION MESURE */}

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                Profil de mesures
              </h3>
              <Link to={"/mesure"}>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-primary"
                >
                  + Nouvelle mesure
                </Button>
              </Link>
            </div>

            <Select
              onValueChange={setSelectedMesureId}
              value={selectedMesureId}
            >
              <SelectTrigger className="w-full h-14 rounded-2xl border-muted-foreground/20 bg-card shadow-sm">
                <div className="flex items-center gap-3">
                  <Ruler className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Sélectionnez vos mesures" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {mesures.length > 0 ? (
                  mesures.map((m) => (
                    <SelectItem key={m.id} value={m.id.toString()}>
                      {m.label}
                    </SelectItem>
                  ))
                ) : (
                  <p className="p-2 text-sm text-muted-foreground text-center">
                    Aucune mesure enregistrée.
                  </p>
                )}
              </SelectContent>
            </Select>

            {selectedMesureId && (
              <p className="text-[10px] text-muted-foreground ml-2 animate-in fade-in">
                ✓ Cette commande sera confectionnée selon le profil :{" "}
                <strong>
                  {
                    mesures.find((m) => m.id.toString() === selectedMesureId)
                      ?.label
                  }
                </strong>
              </p>
            )}
          </section>

          <Separator />

          {/* SECTION TISSU */}
          {tissu && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                  Tissu sélectionné
                </h3>
                <Badge variant="outline">{tissu.type}</Badge>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl border bg-card shadow-sm">
                <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`${API_URL}${tissu.medias?.[0]?.imageUrl}`}
                    className="object-cover h-full w-full"
                    alt="Tissu"
                  />
                </div>
                <div>
                  <p className="font-bold">{tissu.couleur}</p>
                  <p className="text-xs text-muted-foreground">
                    {tissu.texture}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* SECTION OPTIONS DE CUSTOMISATION */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
              Personnalisation
            </h3>
            <div className="grid gap-3">
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedOptions.find((o) => o.id === option.id)
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          !!selectedOptions.find((o) => o.id === option.id)
                        }
                      />
                      <div>
                        <Label className="font-semibold cursor-pointer">
                          {option.nom}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {option.type}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">
                      +{option.prixAjout.toLocaleString()} F
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Aucune option supplémentaire pour ce modèle.
                </p>
              )}
            </div>
          </section>

          <Separator />

          {/* PRIX ET ACTION */}
          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Prix total estimé
                </p>
                <p className="text-4xl font-black text-primary">
                  {totalPrice.toLocaleString()}{" "}
                  <span className="text-xl">FCFA</span>
                </p>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Ruler className="h-4 w-4" /> Guide des tailles
              </Button>
            </div>

            <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 gap-3">
              <ShoppingCart className="h-5 w-5" /> Confirmer la commande
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Paiement sécurisé • Livraison sur mesure sous 10 jours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customisation;
