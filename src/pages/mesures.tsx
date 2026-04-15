import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { getUserIdFromToken } from "@/lib/auth-utils";
import { Mesure } from "@/models/mesure";
import {
  Plus,
  Ruler,
  ChevronRight,
  Scale,
  User,
  Trash2,
  Edit3,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Mesures = () => {
  const [mesures, setMesures] = useState<Mesure[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMesure = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const userId = getUserIdFromToken(token);
        const response = await api.get(`/mesure/${userId}/all`);

        if (response.status === 200) {
          setMesures(response.data);
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

    fetchMesure();
  }, [toast]);

  const supprimerMessure = async (mesureId: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce profil de mesures ?"))
      return;
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const userId = getUserIdFromToken(token);
      const response = await api.delete(`/mesure/${mesureId}/${userId}`);

      if (response.status === 200) {
        setMesures(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description:
          error.response?.data?.message || "Impossible de supprimer la mesure.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-bold uppercase tracking-tighter text-muted-foreground animate-pulse">
          Chargement de vos profils...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      {/* HEADER PROFESSIONNEL */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            Mes Mensurations
          </h1>
          <p className="text-muted-foreground font-medium italic">
            Gérez vos différents profils de mesures pour vos confections.
          </p>
        </div>
        <Link to="/addMesure">
          <Button className="rounded-2xl h-14 px-8 bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform gap-2 font-bold uppercase italic">
            <Plus className="h-5 w-5" />
            Ajouter un profil
          </Button>
        </Link>
      </header>

      {/* GRILLE DES MESURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mesures.length > 0 ? (
          mesures.map((m) => (
            <Card
              key={m.id}
              className="group border-none shadow-xl bg-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-[2rem] overflow-hidden"
            >
              <CardHeader className="pb-2 border-b bg-muted/20">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <Badge
                    variant="outline"
                    className="uppercase text-[10px] font-black tracking-widest border-primary/20 bg-primary/5 text-primary"
                  >
                    {m.status || "Actif"}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-black uppercase tracking-tight pt-4">
                  {m.label}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* RÉSUMÉ PHYSIQUE */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-muted-foreground">
                      Taille
                    </span>
                    <span className="font-bold text-lg">
                      {m.taille}{" "}
                      <small className="text-[10px] font-medium uppercase">
                        cm
                      </small>
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-muted-foreground">
                      Poids
                    </span>
                    <span className="font-bold text-lg">
                      {m.poids}{" "}
                      <small className="text-[10px] font-medium uppercase">
                        kg
                      </small>
                    </span>
                  </div>
                </div>

                <Separator className="bg-muted/50" />

                {/* DÉTAILS TECHNIQUES (GRID) */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Poitrine
                    </span>
                    <span className="font-black">{m.poitrine}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Épaule
                    </span>
                    <span className="font-black">{m.epaule}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Hanche
                    </span>
                    <span className="font-black">{m.hanche}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Cou
                    </span>
                    <span className="font-black">{m.cou}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-xl font-bold uppercase text-[10px] gap-2"
                  >
                    <Edit3 className="h-3 w-3" /> Éditer
                  </Button>
                  <Button
                    onClick={() => supprimerMessure(m.id)}
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive/5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full h-64 border-4 border-dashed rounded-[3rem] border-muted/30 flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <Ruler className="h-12 w-12 opacity-20" />
            <p className="font-black uppercase tracking-tighter italic">
              Aucun profil enregistré
            </p>
            <Link to="/mesure/nouveau">
              <Button
                variant="link"
                className="font-bold text-primary italic underline"
              >
                Créer ma première mesure
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* BANNIÈRE DE SÉCURITÉ */}
      <footer className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="bg-white/10 p-4 rounded-2xl">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h4 className="font-black uppercase tracking-tighter text-xl">
              Précision Artisanale
            </h4>
            <p className="text-xs text-white/60 font-medium">
              Vos données sont utilisées exclusivement pour garantir un tombé
              parfait de vos vêtements.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 px-6 py-3 rounded-full">
          Confidentialité garantie par MODOL'K
        </div>
      </footer>
    </div>
  );
};

export default Mesures;
