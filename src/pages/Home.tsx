import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Plus, Package, Heart, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getUserIdFromToken } from "@/lib/auth-utils";
import api from "@/integrations/api";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [user, setUser] = useState(null);
  const [commande, setCommande] = useState(null);
  const [mesure, setMesure] = useState(null);

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userId = getUserIdFromToken(token);

        if (userId) {
          const response = await api.get(`/users/${userId}`);

          if (response.status === 200) {
            setUser(response.data);
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Session interrompue",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchCommande = async () => {
      setLoading(true);
      try {
        const userId = getUserIdFromToken(token);

        if (userId) {
          const response = await api.get(`/commande/user/${userId}`);

          if (response.status === 200) {
            setCommande(response.data);
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Recupperation interrompue",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchMesure = async () => {
      setLoading(true);
      try {
        const userId = getUserIdFromToken(token);
        if (userId) {
          const response = await api.get(`/mesure/${userId}/all`);

          if (response.status === 200) {
            setMesure(response.data);
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Recupperation interrompue",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchCommande();
    fetchMesure();
  }, [toast]);

  // Aide au rendu : On récupère la commande la plus récente pour la carte "Active"
  const activeCommande = Array.isArray(commande) ? commande[0] : null;
  // On récupère le dernier profil de mesure
  const latestMesure = Array.isArray(mesure) ? mesure[mesure.length - 1] : null;

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Chargement de votre espace...
      </div>
    );

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500">
      {/* HEADER SECTION (Inclus dans ton wireframe comme zone de titre) */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bonjour, {user?.nom || ""}
          </h1>
          <p className="text-muted-foreground mt-1">
            C'est le moment idéal pour créer votre prochaine tenue.
          </p>
        </div>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link to="/catalog" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nouvelle Commande
          </Link>
        </Button>
      </div>

      {/* TOP SECTION: 3 CARDS IN A GRID (Match Figma Top Rectangles) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
                Commande Active
              </p>
              <p className="text-xl font-bold mt-1">
                {activeCommande
                  ? `Commande #${activeCommande.id.toString().slice(-4)}`
                  : "Aucune commande"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activeCommande
                  ? `Statut : ${activeCommande.statutCommande}`
                  : "Prêt pour un nouveau projet ?"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Ruler className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
                Mes Mensurations
              </p>
              <p className="text-xl font-bold mt-1">
                {mesure && mesure.length > 0
                  ? mesure[mesure.length - 1].label
                  : "Non défini"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {mesure && mesure.length > 0
                  ? `Type: ${mesure[mesure.length - 1].status}`
                  : "Aucune donnée enregistrée"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
                Favoris
              </p>
              <p className="text-xl font-bold mt-1">0 Modèles</p>
              <p className="text-xs text-muted-foreground mt-1">
                Bientôt disponible
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM SECTION: LIST CONTAINER (Match Figma Lower Content Area) */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" /> Historique des
          Commandes
        </h3>

        {/* LE GROS CONTENEUR GRIS (Figma Layer 14 Rectangle) */}
        <div className="rounded-2xl border bg-card/50 p-2 space-y-2">
          {Array.isArray(commande) && commande.length > 0 ? (
            commande.map((cmd) => (
              <div
                key={cmd.id}
                className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-all rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    MODOL'K
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      Commande #CMD-{cmd.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cmd.tenues?.length || 0} article(s) •{" "}
                      {cmd.totalPrice?.toLocaleString()} FCFA •{" "}
                      {new Date(cmd.dateCommande).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className={
                      cmd.statutCommande === "LIVRE"
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }
                  >
                    {cmd.statut}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Vous n'avez pas encore de commandes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
