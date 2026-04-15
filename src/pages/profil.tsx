import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { getUserIdFromToken } from "@/lib/auth-utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  LogOut,
  Camera,
  Loader2,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Profil = () => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // État pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
    motDePasse: "", // Pour la section sécurité
  });

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
            // Initialisation des données du formulaire
            setFormData({
              nom: response.data.nom || "",
              prenom: response.data.prenom || "",
              telephone: response.data.telephone || "",
              adresse: response.data.adresse || "",
              motDePasse: "",
            });
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
    fetchUser();
  }, [toast]);

  // Fonction de mise à jour
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("access_token");
      const userId = getUserIdFromToken(token);

      // On prépare les données (on ne vide pas le mot de passe s'il n'est pas saisi)
      const payload = { ...formData };
      if (!payload.motDePasse) delete payload.motDePasse;

      const response = await api.patch(`/users/${userId}`, payload);

      if (response.status === 200) {
        setUser(response.data);
        toast({
          title: "Profil mis à jour",
          description: "Vos modifications ont été enregistrées avec succès.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de mise à jour",
        description:
          error.response?.data?.message ||
          "Impossible de sauvegarder les changements.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="h-28 w-28 border-4 border-white shadow-2xl">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-white text-3xl font-black">
                {user?.prenom?.[0]}
                {user?.nom?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border cursor-pointer hover:bg-slate-50 transition-colors">
              <Camera className="h-4 w-4 text-slate-600" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
              {user?.prenom} {user?.nom}
            </h1>
            <p className="text-muted-foreground font-medium italic mt-2">
              Membre {user?.role || "CLIENT"} • {user?.adresse}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="rounded-2xl border-destructive/20 text-destructive hover:bg-destructive/5 font-bold uppercase italic px-6"
        >
          <LogOut className="mr-2 h-4 w-4" /> Déconnexion
        </Button>
      </header>

      <Tabs defaultValue="informations" className="space-y-8">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-8">
          <TabsTrigger
            value="informations"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-black uppercase tracking-widest text-[10px]"
          >
            Informations Personnelles
          </TabsTrigger>
          <TabsTrigger
            value="securite"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-black uppercase tracking-widest text-[10px]"
          >
            Sécurité & Accès
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="informations"
          className="animate-in fade-in-50 duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-0">
                  <CardTitle className="text-xl font-black uppercase tracking-tight">
                    Modifier le profil
                  </CardTitle>
                  <CardDescription className="italic font-medium">
                    Mettez à jour vos coordonnées de livraison et contact.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstname"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Prénom
                      </Label>
                      <Input
                        id="firstname"
                        value={formData.prenom}
                        onChange={(e) =>
                          setFormData({ ...formData, prenom: e.target.value })
                        }
                        className="rounded-xl border-2 focus-visible:ring-primary h-12 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastname"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Nom
                      </Label>
                      <Input
                        id="lastname"
                        value={formData.nom}
                        onChange={(e) =>
                          setFormData({ ...formData, nom: e.target.value })
                        }
                        className="rounded-xl border-2 focus-visible:ring-primary h-12 font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                    >
                      Adresse Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        defaultValue={user?.email}
                        className="pl-12 rounded-xl border-2 h-12 font-bold"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Téléphone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.telephone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              telephone: e.target.value,
                            })
                          }
                          className="pl-12 rounded-xl border-2 h-12 font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Lieu de résidence (Mali)
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={formData.adresse}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              adresse: e.target.value,
                            })
                          }
                          className="pl-12 rounded-xl border-2 h-12 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      onClick={handleUpdate}
                      disabled={updating}
                      className="w-full md:w-auto px-10 h-12 rounded-xl font-black uppercase italic shadow-lg shadow-primary/20"
                    >
                      {updating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Enregistrer les modifications"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-xl rounded-[2rem] bg-slate-900 text-white overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-white/10 rounded-2xl">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-lg">
                    Compte Vérifié
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-medium italic">
                    Votre compte est certifié conforme aux standards de MODOL'K
                    pour les confections sur-mesure.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
                <CardContent className="p-8 space-y-4">
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">
                    Besoin d'aide ?
                  </h4>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-bold text-primary italic underline"
                  >
                    Contacter le support
                  </Button>
                  <Separator />
                  <p className="text-[10px] font-medium text-slate-400">
                    Dernière mise à jour du profil le 14 Avril 2026
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="securite"
          className="animate-in fade-in-50 duration-500"
        >
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white p-8">
            <div className="flex items-center gap-4 mb-8">
              <Settings className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Paramètres de sécurité
              </h2>
            </div>
            <div className="max-w-md space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">
                  Nouveau mot de passe
                </Label>
                <Input
                  type="password"
                  value={formData.motDePasse}
                  onChange={(e) =>
                    setFormData({ ...formData, motDePasse: e.target.value })
                  }
                  placeholder="Laissez vide pour ne pas changer"
                  className="rounded-xl border-2 h-12"
                />
              </div>
              <Button
                onClick={handleUpdate}
                disabled={updating}
                variant="secondary"
                className="rounded-xl font-bold uppercase italic px-8 h-12"
              >
                {updating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Mettre à jour l'accès"
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profil;
