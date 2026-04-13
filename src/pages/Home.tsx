import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Ruler,
  Plus,
  Package,
  Heart,
  Settings,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import OrderItem from "@/components/OrderItem";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getUserIdFromToken } from "@/lib/auth-utils";
import api from "@/integrations/api";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const userId = getUserIdFromToken(token);

        if (userId) {
          const response = await api.get(`/users/${userId}`);

          if (response.status === 200 || response.status === 201) {
            setUser(response.data);
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Session interrompue",
          description: "Merci de vous reconnecter pour accéder à votre espace.",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchCommande = async () => {};

    const fetchMesure = async () => {};

    fetchUser();
    fetchCommande();
    fetchMesure();
  }, [toast]);

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
              <p className="text-xl font-bold mt-1">Tenue Bazin Riche</p>
              <p className="text-xs text-muted-foreground mt-1">
                Statut : En production
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
              <p className="text-xl font-bold mt-1">Standard (2026)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Dernière modif. : Mars 2026
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
              <p className="text-xl font-bold mt-1">12 Modèles</p>
              <p className="text-xs text-muted-foreground mt-1">
                Enregistrés pour plus tard
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
          {/* CHAQUE ÉLÉMENT DE LISTE (Figma Rectangles 1 to 13) */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-all rounded-lg border"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  PHOTO
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    Commande #MOD-2026-00{i}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2 articles • 45.000 FCFA • {i} Avril 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-none"
                >
                  Livré
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
