import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { getUserIdFromToken } from "@/lib/auth-utils";

// Types basés sur tes données Prisma/Backend
interface MeasurementData {
  label: string;
  poitrine: number | null;
  taille: number | null;
  poids: number | null;
  epaule: number | null;
  longueurBras: number | null;
  longueurJambe: number | null;
  cou: number | null;
  hanche: number | null;
  poignet: number | null;
  ventre: number | null;
}

// Clés d'identification pour l'interactivité
type MeasurementKey = keyof Omit<MeasurementData, "label" | "poids">;

export const MeasurementForm = () => {
  const [activeField, setActiveField] = useState<MeasurementKey | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MeasurementData>({
    label: "Mon Profil Principal",
    poitrine: 0,
    taille: 0,
    poids: 0,
    epaule: 0,
    longueurBras: 0,
    longueurJambe: 0,
    cou: 0,
    hanche: 0,
    poignet: 0,
    ventre: 0,
  });

  const handleFocus = (field: MeasurementKey) => setActiveField(field);

  const handleInputChange = (field: keyof MeasurementData, value: string) => {
    setFormData({
      ...formData,
      [field]: value === "" ? 0 : parseFloat(value),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const saveMeasurements = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const userId = getUserIdFromToken(token);
      if (userId) {
        const response = await api.post(`/mesure/${userId}`, formData);
        if (response.status === 201) {
          toast({
            title: "Mesures enregistrées",
            description: "Votre profil Modol'k a été mis à jour avec succès.",
          });
          setTimeout(() => navigate("/home"), 1500);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description:
          error.response?.data?.message || "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Petite aide contextuelle selon la mesure
  const getHelpText = (field: MeasurementKey | null) => {
    switch (field) {
      case "poitrine":
        return "Mesurez horizontalement au point le plus large du buste.";
      case "epaule":
        return "Mesurez de l'extrémité de l'os d'une épaule à l'autre, dans le dos.";
      case "taille":
        return "Mesurez autour de la partie la plus étroite de votre taille (au-dessus du nombril).";
      case "longueurBras":
        return "Mesurez de l'os de l'épaule jusqu'au poignet, bras légèrement plié.";
      case "cou":
        return "Mettez le ruban autour de la base du cou, là où se trouve le col de la chemise.";
      case "poignet":
        return "Mesurez le tour de votre poignet, juste après l'os.";
      default:
        return "Suivez l'indicateur visuel sur la silhouette pour cette mesure.";
    }
  };

  return (
    <Card className="max-w-6xl mx-auto border-none shadow-2xl bg-white overflow-hidden">
      <CardHeader className="text-center bg-slate-50 py-10 border-b">
        <CardTitle className="font-serif text-4xl font-light text-slate-950">
          Atelier Virtuel
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground max-w-xl mx-auto mt-2">
          Définissez vos mensurations avec précision grâce à notre guide visuel
          interactif.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-12 p-8 md:p-12 items-start">
        {/* PARTIE GAUCHE : L'Humain Interactif */}
        <div className="relative flex flex-col items-center bg-white p-6 rounded-xl border shadow-inner min-h-[550px]">
          <h4 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
            <Target className="h-4 w-4" /> Guide Visuel
          </h4>

          <img
            src="/silhouette.png" // Utilise ton image réelle ici
            alt="Guide visuel silhouette humaine Modol'k"
            className="absolute inset-0 w-full h-full object-contain object-top rounded-md"
          />

          {/* Silhouette Humaine Simplifiée (SVG détaillé pour l'exemple) */}

          {/* 2. SUPERPOSITION SVG INTERACTIVE (Calque invisible pour l'interaction) */}
          <svg
            viewBox="0 0 200 500"
            className="absolute inset-0 w-full h-full text-transparent" // Rend le SVG de base transparent
          >
            {/* --- TRACÉS EXISTANTS (Ajustés ou maintenus) --- */}

            {/* Tour de Cou (Maintenu) */}
            <ellipse
              cx="100"
              cy="58"
              rx="20"
              ry="8"
              stroke={activeField === "cou" ? "#A17652" : "none"}
              strokeWidth="5"
              fill="none"
              className={activeField === "cou" ? "animate-pulse" : ""}
            />

            {/* Épaule (Maintenu) */}
            <line
              x1="45"
              y1="98"
              x2="155"
              y2="98"
              stroke={activeField === "epaule" ? "#A17652" : "none"}
              strokeWidth="6"
              strokeLinecap="round"
              className={activeField === "epaule" ? "animate-pulse" : ""}
            />

            {/* Poitrine (Ajusté : Légèrement plus large pour un humain) */}
            <ellipse
              cx="100"
              cy="110"
              rx="68"
              ry="16"
              stroke={activeField === "poitrine" ? "#A17652" : "none"}
              strokeWidth="6"
              fill="none"
              className={activeField === "poitrine" ? "animate-pulse" : ""}
            />

            {/* Taille (Ajusté : Maintenu au point le plus étroit) */}
            <ellipse
              cx="100"
              cy="240"
              rx="58"
              ry="12"
              stroke={activeField === "taille" ? "#A17652" : "none"}
              strokeWidth="6"
              fill="none"
              className={activeField === "taille" ? "animate-pulse" : ""}
            />

            {/* --- ZONES CORRIGÉES (Remontées) --- */}

            {/* Ventre (Remonté significative : juste sous la poitrine, au niveau des abdos) */}
            <ellipse
              cx="100"
              cy="210"
              rx="62"
              ry="14"
              stroke={activeField === "ventre" ? "#A17652" : "none"}
              strokeWidth="5"
              strokeDasharray="6 6" // Pointillé pour le ventre (premium)
              fill="none"
              className={activeField === "ventre" ? "animate-pulse" : ""}
            />

            {/* Hanche (Remonté significative : Au niveau de l'os iliaque, pas du pubis) */}
            <ellipse
              cx="100"
              cy="280"
              rx="65"
              ry="16"
              stroke={activeField === "hanche" ? "#A17652" : "none"}
              strokeWidth="6"
              fill="none"
              className={activeField === "hanche" ? "animate-pulse" : ""}
            />

            {/* --- NOUVEAUX TRACÉS (Poignet et Jambe) --- */}

            {/* Longueur Bras (Inchangé pour référence) */}
            <path
              d="M45 98 L30 180 L38 275"
              stroke={activeField === "longueurBras" ? "#A17652" : "none"}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              className={activeField === "longueurBras" ? "animate-pulse" : ""}
            />

            {/* Tour de Poignet (AJOUT : petite ellipse à l'extrémité du bras) */}
            <ellipse
              cx="28"
              cy="235"
              rx="8"
              ry="4"
              stroke={activeField === "poignet" ? "#A17652" : "none"}
              strokeWidth="3"
              fill="none"
              className={activeField === "poignet" ? "animate-pulse" : ""}
            />

            {/* Longueur Jambe (AJOUT : Ligne partant de l'os de la hanche vers la cheville) */}
            <path
              d="M60 290 L55 480" // Part de l'iliaque (cx=60,cy=290) descend le long de la jambe
              stroke={activeField === "longueurJambe" ? "#A17652" : "none"}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              className={activeField === "longueurJambe" ? "animate-pulse" : ""}
            />
          </svg>

          {/* Aide textuelle dynamique */}
          {activeField && (
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900 text-white p-4 rounded-lg shadow-xl text-xs italic flex items-start gap-3 border border-slate-700">
              <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold uppercase tracking-wider text-amber-400">
                  Conseil d'expert : {activeField}
                </p>
                <p className="font-light leading-relaxed">
                  {getHelpText(activeField)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* PARTIE DROITE : Le Formulaire Détaillé */}
        <ScrollArea className="h-[600px] pr-5">
          <form onSubmit={saveMeasurements} className="space-y-8">
            {/* Label du Profil */}
            <div className="space-y-2 border-b pb-6">
              <Label
                htmlFor="label"
                className="text-sm font-medium text-slate-500 uppercase"
              >
                Nom de ce profil de mesures
              </Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="ex: Moi (Standard), Époux..."
                className="text-2xl font-serif bg-transparent border-none p-0 focus-visible:ring-0"
              />
            </div>

            {/* Données Corporelles Générales */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="poids">Poids (kg)</Label>
                <Input
                  id="poids"
                  type="number"
                  placeholder="ex: 75"
                  value={formData.poids}
                  onChange={(e) => handleInputChange("poids", e.target.value)}
                  className="focus-visible:ring-primary"
                />
              </div>
              {/* Le backend n'a pas de champ 'taille' (hauteur), je suppose que 'taille'=waist. J'ajoute Hauteur pour l'UX */}
              {/* <div className="space-y-2">
                <Label htmlFor="hauteur">
                  Hauteur (cm){" "}
                  <span className="text-xs text-muted-foreground">
                    (Optionnel)
                  </span>
                </Label>
                <Input id="hauteur" type="number" placeholder="ex: 180" value={formData.}/>
              </div> */}
            </div>

            {/* Grille de mesures précises (Tes Données) */}
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest pt-6 border-t">
              Mensurations Détaillées (cm)
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {/* Liste générée dynamiquement à partir de tes clés de données */}
              {(
                [
                  "cou",
                  "epaule",
                  "poitrine",
                  "taille",
                  "ventre",
                  "hanche",
                  "longueurBras",
                  "longueurJambe",
                  "poignet",
                ] as MeasurementKey[]
              ).map((key) => (
                <div key={key} className="space-y-2 group">
                  <Label
                    htmlFor={key}
                    className="group-hover:text-primary transition-colors flex items-center justify-between"
                  >
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                    {activeField === key && (
                      <Target className="h-3 w-3 text-primary animate-pulse" />
                    )}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    placeholder="ex: 0.0"
                    onFocus={() => handleFocus(key)}
                    value={formData[key as keyof MeasurementData] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="focus-visible:ring-primary h-11"
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-950 text-white rounded-none py-7 text-lg font-semibold tracking-wide mt-10 hover:bg-slate-800 transition-colors"
            >
              {loading
                ? "Enregistrement..."
                : "Valider et Enregistrer la mesure"}
            </Button>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
