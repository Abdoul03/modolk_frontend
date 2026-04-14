import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Eye,
  Package,
  Clock,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import api from "@/integrations/api";
import { Commande } from "@/models/commande";
import { useToast } from "@/components/ui/use-toast";
import { getUserIdFromToken } from "@/lib/auth-utils";

const Commandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { toast } = useToast();

  const [selectedCmd, setSelectedCmd] = useState<Commande | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const fetchCommandes = async () => {
      const token = localStorage.getItem("access_token");
      const userId = getUserIdFromToken(token);
      try {
        setLoading(true);
        const response = await api.get(`/commande/user/${userId}`);
        setCommandes(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            error.response?.data?.message ||
            "Impossible de charger vos commandes.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCommandes();
  }, [toast]);

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || "en attente";
    switch (s) {
      case "EnAttente":
        return (
          <Badge
            variant="outline"
            className="text-amber-600 border-amber-200 bg-amber-50"
          >
            <Clock className="w-3 h-3 mr-1" /> En attente
          </Badge>
        );
      case "Payer":
        return (
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" /> Payée
          </Badge>
        );
      case "EnProduction":
        return (
          <Badge
            variant="outline"
            className="text-purple-600 border-purple-200 bg-purple-50"
          >
            <Package className="w-3 h-3 mr-1" /> Au dédalo
          </Badge>
        );
      case "Pret":
        return (
          <Badge
            variant="outline"
            className="text-emerald-600 border-emerald-200 bg-emerald-50"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" /> Prête
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handlePaymentClick = (cmd: Commande) => {
    setSelectedCmd(cmd);
    setIsPaymentOpen(true);
  };

  const processPayment = async (method: string) => {
    setPaymentLoading(true);
    toast({
      title: "Traitement...",
      description: `Initialisation du paiement via ${method}.`,
    });

    // Simulation d'appel API paiement
    setTimeout(() => {
      setPaymentLoading(false);
      setIsPaymentOpen(false);
      toast({
        title: "Paiement envoyé",
        description: "Veuillez confirmer la transaction sur votre téléphone.",
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 font-medium">
          Récupération de vos commandes...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <header className="mb-10 space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Mes Commandes
        </h1>
        <p className="text-muted-foreground font-medium italic">
          Gérez vos confections et procédez au règlement de vos tenues.
        </p>
      </header>

      <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg flex items-center gap-2 font-bold uppercase tracking-wider">
            <Package className="w-5 h-5 text-primary" />
            Historique des Commandes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold py-4 px-6">Référence</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Articles</TableHead>
                <TableHead className="font-bold text-center">Statut</TableHead>
                <TableHead className="font-bold text-right">Montant</TableHead>
                <TableHead className="font-bold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commandes.length > 0 ? (
                commandes.map((cmd) => (
                  <TableRow
                    key={cmd.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="py-5 px-6 font-mono text-xs font-black text-primary">
                      #CMD-{cmd.id}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {new Date(cmd.dateCommande).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold">
                          {cmd.tenues?.length || 0} Tenue(s)
                        </span>
                        <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-tighter">
                          Sur-mesure MODOL'K
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(cmd.statutCommande)}
                    </TableCell>
                    <TableCell className="text-right font-black text-base">
                      {cmd.totalPrice?.toLocaleString()} F
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full shadow-sm hover:text-primary"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {cmd.statutCommande?.toLowerCase() === "en attente" && (
                          <Button
                            size="sm"
                            className="rounded-full px-4 font-bold shadow-md shadow-primary/20"
                            onClick={() => handlePaymentClick(cmd)}
                          >
                            Payer
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-40 text-center text-muted-foreground font-medium italic"
                  >
                    Aucune commande trouvée dans votre historique.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAL DE PAIEMENT */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8 border-none shadow-2xl">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-center">
              Paiement Sécurisé
            </DialogTitle>
            <DialogDescription className="text-center text-base font-medium">
              Règlement de la commande{" "}
              <span className="text-primary font-bold">
                #CMD-{selectedCmd?.id}
              </span>
              <br />
              Montant :{" "}
              <span className="text-xl font-black text-foreground">
                {selectedCmd?.totalPrice.toLocaleString()} FCFA
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-8">
            <Button
              variant="outline"
              disabled={paymentLoading}
              className="h-20 justify-start gap-5 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all group"
              onClick={() => processPayment("Orange Money / Wave")}
            >
              <div className="bg-amber-100 p-3 rounded-xl group-hover:bg-amber-200 transition-colors">
                <Smartphone className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-left space-y-1">
                <p className="font-black text-lg leading-none uppercase tracking-tighter">
                  Mobile Money
                </p>
                <p className="text-xs text-muted-foreground font-medium italic">
                  Orange Money, Wave, Moov Money
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              disabled={paymentLoading}
              className="h-20 justify-start gap-5 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all group"
              onClick={() => processPayment("Carte Bancaire")}
            >
              <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left space-y-1">
                <p className="font-black text-lg leading-none uppercase tracking-tighter">
                  Carte Bancaire
                </p>
                <p className="text-xs text-muted-foreground font-medium italic">
                  Visa, Mastercard, GIM-UEMOA
                </p>
              </div>
            </Button>
          </div>

          <DialogFooter className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-4 py-2 rounded-full">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Transactions cryptées & sécurisées
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Commandes;
