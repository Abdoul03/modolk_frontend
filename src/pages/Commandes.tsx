import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Package,
  Clock,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Loader2,
  ChevronRight,
  Info,
  Layers,
  Ruler,
} from "lucide-react";
import api from "@/integrations/api";
import { Commande } from "@/models/commande";
import { useToast } from "@/components/ui/use-toast";
import { getUserIdFromToken } from "@/lib/auth-utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tissu } from "@/models/tissu";
import { Model } from "@/models/model";

const API_URL = import.meta.env.VITE_API_URL;

const Commandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { toast } = useToast();
  const [activeCmd, setActiveCmd] = useState<Commande | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const fetchCommandes = async () => {
      const token = localStorage.getItem("access_token");
      const userId = getUserIdFromToken(token);
      try {
        setLoading(true);
        const response = await api.get(`/commande/user/${userId}`);
        const rawCommandes: Commande[] = response.data;

        // Enrichissement des données
        const enrichedCommandes = await Promise.all(
          rawCommandes.map(async (cmd) => {
            const enrichedTenues = await Promise.all(
              cmd.tenues.map(async (tenue) => {
                // Appels API simultanés pour le modèle et le tissu
                const [modelRes, tissuRes] = await Promise.all([
                  api.get(`/design/${tenue.modelId}`),
                  api.get(`/tissus/${tenue.tissusId}`),
                ]);

                return {
                  ...tenue,
                  model: modelRes.data,
                  tissu: tissuRes.data,
                };
              }),
            );
            return { ...cmd, tenues: enrichedTenues };
          }),
        );

        setCommandes(enrichedCommandes);
        if (enrichedCommandes.length > 0) setActiveCmd(enrichedCommandes[0]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur de synchronisation",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCommandes();
  }, [toast]);

  const getStatusBadge = (status: string) => {
    const s = status?.trim();
    switch (s) {
      case "EnAttente":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 shadow-none hover:bg-amber-100 uppercase text-[10px] font-bold tracking-tighter">
            <Clock className="w-3 h-3 mr-1" /> En attente
          </Badge>
        );
      case "Payer":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 shadow-none hover:bg-blue-100 uppercase text-[10px] font-bold tracking-tighter">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Payée
          </Badge>
        );
      case "EnProduction":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 shadow-none hover:bg-purple-100 uppercase text-[10px] font-bold tracking-tighter">
            <Package className="w-3 h-3 mr-1" /> Production
          </Badge>
        );
      case "Pret":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shadow-none hover:bg-emerald-100 uppercase text-[10px] font-bold tracking-tighter">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Terminée
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="uppercase text-[10px] font-bold"
          >
            {status}
          </Badge>
        );
    }
  };

  const processPayment = async (method: string) => {
    setPaymentLoading(true);
    toast({
      title: "Traitement...",
      description: `Paiement ${method} en cours.`,
    });
    setTimeout(() => {
      setPaymentLoading(false);
      setIsPaymentOpen(false);
      toast({
        title: "Demande envoyée",
        description: "Validez la notification sur votre mobile.",
      });
    }, 2000);
  };

  if (loading)
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-bold uppercase tracking-tighter text-muted-foreground italic">
          Veuillez patienter...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto py-10 px-4 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
            Mon Vestiaire
          </h1>
          <p className="text-muted-foreground font-medium italic">
            Historique de vos confections sur-mesure
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLONNE GAUCHE : LISTE DES COMMANDES */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Commandes Récentes
            </h2>
            <ScrollArea className="h-[70vh] pr-4">
              <div className="space-y-4">
                {commandes.map((cmd) => (
                  <Card
                    key={cmd.id}
                    onClick={() => setActiveCmd(cmd)}
                    className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
                      activeCmd?.id === cmd.id
                        ? "border-primary ring-1 ring-primary/20 shadow-xl"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-20 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0 border">
                        {/* On affiche la photo de la première tenue */}
                        <img
                          src={`${API_URL}${cmd.tenues?.[0]?.model?.medias?.[0]?.imageUrl}`}
                          className="h-full w-full object-cover"
                          alt="Model"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[10px] font-black text-primary">
                            #CMD-{cmd.id}
                          </span>
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {new Date(cmd.dateCommande).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-tight leading-none">
                          {cmd.tenues?.length || 0} Tenue(s)
                        </h3>
                        <div className="pt-1">
                          {getStatusBadge(cmd.statutCommande)}
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 transition-transform ${
                          activeCmd?.id === cmd.id
                            ? "text-primary translate-x-1"
                            : "text-slate-300"
                        }`}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* COLONNE DROITE : DÉTAILS DE LA COMMANDE ACTIVE */}
          <div className="lg:col-span-7 sticky top-10">
            {activeCmd ? (
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter">
                        Détails Commande
                      </h2>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Réf : #CMD-{activeCmd.id}
                      </p>
                    </div>
                    <div className="text-right leading-none">
                      <p className="text-xs font-black uppercase text-muted-foreground mb-1">
                        Total
                      </p>
                      <p className="text-3xl font-black text-primary italic">
                        {activeCmd.totalPrice?.toLocaleString()} F
                      </p>
                    </div>
                  </div>

                  {activeCmd.statutCommande === "EnAttente" && (
                    <div className="bg-amber-50 border-2 border-amber-100 rounded-3xl p-6 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-xl mt-1">
                          <Info className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-black uppercase text-xs tracking-tight text-amber-800">
                            Action requise
                          </p>
                          <p className="text-xs text-amber-700 leading-tight">
                            Procédez au paiement pour lancer la production.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsPaymentOpen(true)}
                        className="rounded-full px-8 font-black uppercase italic shadow-lg shadow-primary/20 transition-transform hover:scale-105"
                      >
                        <CreditCard className="mr-2 h-4 w-4" /> Payer
                      </Button>
                    </div>
                  )}

                  <ScrollArea className="h-[45vh] pr-4">
                    <div className="space-y-8">
                      {activeCmd.tenues?.map((tenue, idx) => (
                        <div
                          key={tenue.id}
                          className="space-y-6 animate-in slide-in-from-bottom-4 duration-500"
                        >
                          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                            <Layers className="h-4 w-4" /> Tenue {idx + 1}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* PHOTO MODÈLE */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-muted-foreground">
                                Modèle
                              </p>
                              <div className="aspect-[4/5] rounded-2xl overflow-hidden border shadow-inner">
                                <img
                                  src={`${API_URL}${tenue.model?.medias?.[0]?.imageUrl}`}
                                  className="h-full w-full object-cover"
                                  alt="Model"
                                />
                              </div>
                              <p className="font-bold text-sm uppercase text-center mt-2">
                                {tenue.model?.nom}
                              </p>
                            </div>

                            {/* PHOTO TISSU */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-muted-foreground">
                                Tissu
                              </p>
                              <div className="aspect-[4/5] rounded-2xl overflow-hidden border shadow-inner relative">
                                <img
                                  src={`${API_URL}${tenue.tissu?.medias?.[0]?.imageUrl}`}
                                  className="h-full w-full object-cover"
                                  alt="Tissu"
                                />
                                <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-xl text-center">
                                  <p className="text-[10px] font-bold uppercase">
                                    {tenue.tissu?.couleur}
                                  </p>
                                </div>
                              </div>
                              <p className="font-bold text-sm uppercase text-center mt-2">
                                {tenue.tissu?.type}
                              </p>
                            </div>
                          </div>

                          {/* DÉTAILS OPTIONS ET MESURES */}
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-dashed">
                              <div className="flex items-center gap-2 mb-2 text-primary">
                                <Ruler className="h-3 w-3" />
                                <p className="text-[10px] font-black uppercase">
                                  Mesures utilisées
                                </p>
                              </div>
                              <p className="text-sm font-bold uppercase">
                                {tenue.mesuresSnapshot?.label ||
                                  "Mesures standards"}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-dashed">
                              <div className="flex items-center gap-2 mb-2 text-primary">
                                <Package className="h-3 w-3" />
                                <p className="text-[10px] font-black uppercase">
                                  Quantité
                                </p>
                              </div>
                              <p className="text-sm font-bold uppercase">
                                {tenue.quantite} exemplaire(s)
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </Card>
            ) : (
              <div className="h-[70vh] flex items-center justify-center border-4 border-dashed rounded-[3rem] border-slate-200">
                <p className="font-black uppercase tracking-tighter text-slate-300 italic">
                  Sélectionnez une commande
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE PAIEMENT (Inchangé mais stylisé) */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8 border-none shadow-2xl">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-4xl font-black uppercase tracking-tighter text-center">
              Règlement
            </DialogTitle>
            <DialogDescription className="text-center font-medium italic text-base">
              Commande{" "}
              <span className="text-primary font-bold">
                #CMD-{activeCmd?.id}
              </span>{" "}
              •
              <span className="text-foreground font-black ml-1 text-lg">
                {activeCmd?.totalPrice?.toLocaleString()} F
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-8">
            <Button
              variant="outline"
              disabled={paymentLoading}
              onClick={() => processPayment("Orange Money / Wave")}
              className="h-24 justify-start gap-5 rounded-3xl border-2 hover:border-primary hover:bg-primary/5 group"
            >
              <div className="bg-amber-100 p-4 rounded-2xl group-hover:bg-amber-200 transition-colors">
                <Smartphone className="h-8 w-8 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="font-black text-xl uppercase tracking-tighter leading-none mb-1">
                  Mobile Money
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                  Orange • Wave • Moov
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              disabled={paymentLoading}
              onClick={() => processPayment("Carte")}
              className="h-24 justify-start gap-5 rounded-3xl border-2 hover:border-primary hover:bg-primary/5 group"
            >
              <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-black text-xl uppercase tracking-tighter leading-none mb-1">
                  Carte Bancaire
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                  Visa • MasterCard
                </p>
              </div>
            </Button>
          </div>

          <DialogFooter>
            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] bg-slate-100 px-6 py-3 rounded-full mx-auto w-full justify-center">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Sécurisé par
              MODOL'K Pay
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Commandes;
