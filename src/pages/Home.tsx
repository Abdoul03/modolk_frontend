import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Ruler,
  ShoppingBag,
  Calendar,
  ArrowRight,
  Plus,
  Package,
  Clock,
  Heart,
  ChevronRight,
  Settings,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import OrderItem from "@/components/OrderItem";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getUserIdFromToken } from "@/lib/auth-utils";
import api from "@/integrations/api";

const Home = () => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // const userInformation = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const userId = getUserIdFromToken(token);
  //     if (userId) {
  //       const response = await api.get(`/users/${userId}`);
  //       if (response.status === 200 || response.status === 201) {
  //         const userdata = response.data;
  //         setUser(userdata);
  //       }
  //     }
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Erreur lors de l'inscription",
  //       description:
  //         error.response?.data?.message || "Une erreur est survenue.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

    fetchUser();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFB]">
      {/* <Navbar /> */}
      {loading && (
        <p className="text-center text-sm text-muted-foreground animate-pulse">
          Chargement de votre profil...
        </p>
      )}
      <main className="flex-grow container mx-auto px-4 py-10">
        {/* Header du Dashboard */}
        <DashboardHeader
          user={user}
          onAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
            >
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
            >
              Mes Commandes
            </TabsTrigger>
            <TabsTrigger
              value="measurements"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2"
            >
              Mes Mensurations
            </TabsTrigger>
          </TabsList>

          {/* CONTENU : VUE D'ENSEMBLE */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title={"Commande en cours"}
                value={"Tenue Bazin Riche"}
                subtext={"Commande en cours"}
                icon={Package}
              />
              <StatCard
                title={"Profil de Mesures"}
                value={"Standard (2026)"}
                subtext={"Dernière modification : Mars 2026"}
                icon={Ruler}
              />
              <StatCard
                title={"Favoris"}
                value={"12 Modèles"}
                subtext={"Commande en cours"}
                icon={Heart}
              />
            </div>

            {/* Liste des commandes récentes */}
            <h3 className="text-xl font-serif mt-10 mb-4">
              Commandes Récentes
            </h3>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[1, 2].map((order) => (
                <OrderItem order={order} />
              ))}
            </div>
          </TabsContent>

          {/* CONTENU : MENSURATIONS */}
          <TabsContent value="measurements">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-light">
                  Gestion des Mensurations
                </CardTitle>
                <CardDescription>
                  Consultez ou modifiez vos profils de mesures pour vos futures
                  commandes.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary cursor-pointer transition-colors">
                  <Link to={"/mesure"}>
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Ajouter un profil (Enfant, Conjoint...)
                    </p>
                  </Link>
                </div>
                {/* Exemple de carte de mesure existante */}
                <div className="border rounded-lg p-6 bg-slate-50/30">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none">
                      Principal
                    </Badge>
                    <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                  <p className="font-serif text-lg mb-1">Moi (Alassane)</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Dernière mise à jour : 07/04/2026
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm italic">
                      <span className="text-muted-foreground">Cou :</span> 42cm
                    </div>
                    <div className="flex justify-between text-sm italic">
                      <span className="text-muted-foreground">Épaules :</span>{" "}
                      48cm
                    </div>
                    <div className="flex justify-between text-sm italic">
                      <span className="text-muted-foreground">Poitrine :</span>{" "}
                      102cm
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
