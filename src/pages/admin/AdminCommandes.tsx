import { useEffect, useState } from "react";
import api from "@/integrations/api";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle2,
  Clock,
  Scissors,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Commande } from "@/models/commande";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tenue } from "@/models/tenue";

const AdminCommandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const handleOpenDetails = async (cmd) => {
    setIsDialogOpen(true);
    setIsDetailsLoading(true);
    setSelectedOrderDetails(null);

    try {
      const userRes = await api.get(`/users/${cmd.utilisateurId}`);

      const tenuesEnrichies = await Promise.all(
        cmd.tenues.map(async (tenue) => {
          // Récupération du modèle, du tissu ET des détails des options
          const [modelRes, tissuRes] = await Promise.all([
            api.get(`/design/${tenue.modelId}`),
            api.get(`/tissus/${tenue.tissusId}`),
          ]);

          // Enrichissement des options de personnalisation
          const optionsDetails = await Promise.all(
            tenue.options.map(async (opt) => {
              const optRes = await api.get(
                `/custum-option/${opt.optionCustomisationId}`,
              );
              return optRes.data;
            }),
          );

          return {
            ...tenue,
            modelData: modelRes.data,
            tissuData: tissuRes.data,
            optionsEnrichies: optionsDetails, // On stocke les noms des options ici
          };
        }),
      );

      setSelectedOrderDetails({
        ...cmd,
        clientName: `${userRes.data.prenom} ${userRes.data.nom}`,
        tenues: tenuesEnrichies,
      });
    } catch (error) {
      console.error("Erreur d'enrichissement:", error);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/commande");
      setCommandes(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          error.response?.data?.message ||
          "Impossible de récupérer les commandes.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatut = async (id: number, nouveauStatut: string) => {
    try {
      await api.patch(`/commande/${id}/statut`, {
        statutCommande: nouveauStatut,
      });
      toast({
        title: "Statut mis à jour",
        description: `La commande est maintenant : ${nouveauStatut}`,
      });
      fetchCommandes(); // Recharger la liste
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Mise à jour échouée.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "EnAttente":
        return (
          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
            En Attente
          </Badge>
        );
      case "Payer":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
            Confirmé / Payé
          </Badge>
        );
      case "EnProduction":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
            En Atelier
          </Badge>
        );
      case "Pret":
        return (
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
            Prêt pour retrait
          </Badge>
        );
      case "Livre":
        return (
          <Badge className="bg-slate-900 text-white hover:bg-slate-900 border-none rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
            Livré
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="rounded-full px-4 font-black uppercase text-[9px] tracking-widest border-slate-200"
          >
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Gestion des Commandes
          </h1>
          <p className="text-muted-foreground font-medium italic">
            Suivez et gérez l'état des confections en temps réel.
          </p>
        </div>
      </header>

      {/* FILTRES & RECHERCHE */}
      <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une commande (ID, Client...)"
                className="pl-12 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-slate-100 gap-2 font-bold uppercase text-[10px] tracking-widest px-6"
            >
              <Filter className="h-4 w-4" /> Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* TABLEAU DES COMMANDES */}
      <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="w-[100px] font-black uppercase text-[10px] tracking-widest p-6">
                ID
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">
                Date
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">
                Articles
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-right">
                Total
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">
                Statut
              </TableHead>
              <TableHead className="text-right p-6 font-black uppercase text-[10px] tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commandes.map((cmd) => (
              <TableRow
                key={cmd.id}
                className="group hover:bg-slate-50 transition-colors border-slate-50"
              >
                <TableCell className="p-6 font-bold text-primary">
                  #{cmd.id}
                </TableCell>
                <TableCell className="font-medium text-slate-500 italic">
                  {new Date(cmd.dateCommande).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span className="font-black text-xs uppercase bg-slate-100 px-3 py-1 rounded-lg">
                    {cmd.tenues?.length || 1} Tenues
                  </span>
                </TableCell>
                <TableCell className="text-right font-black text-sm">
                  {cmd.totalPrice.toLocaleString()} F
                </TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(cmd.statutCommande)}
                </TableCell>
                <TableCell className="text-right p-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 rounded-full hover:bg-white shadow-sm"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-2xl p-2 shadow-2xl border-none"
                    >
                      <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground p-3">
                        Actions rapides
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleOpenDetails(cmd)}
                        className="rounded-xl p-3 cursor-pointer gap-3 font-bold text-xs uppercase tracking-tighter"
                      >
                        <Eye className="h-4 w-4" /> Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground p-3">
                        Changer l'état
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => updateStatut(cmd.id, "EnProduction")}
                        className="rounded-xl p-3 cursor-pointer gap-3 font-bold text-xs uppercase tracking-tighter text-blue-600"
                      >
                        <Scissors className="h-4 w-4" /> Lancer la coupe
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateStatut(cmd.id, "Pret")}
                        className="rounded-xl p-3 cursor-pointer gap-3 font-bold text-xs uppercase tracking-tighter text-emerald-600"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Marquer comme Prêt
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateStatut(cmd.id, "Livre")}
                        className="rounded-xl p-3 cursor-pointer gap-3 font-bold text-xs uppercase tracking-tighter text-slate-600"
                      >
                        <Truck className="h-4 w-4" /> Confirmer la livraison
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {commandes.length === 0 && !loading && (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <Clock className="h-12 w-12 text-slate-200" />
            <p className="font-black uppercase tracking-tighter italic text-slate-400">
              Aucune commande enregistrée pour le moment.
            </p>
          </div>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-0 bg-slate-50 border-none">
          {isDetailsLoading ? (
            <div className="p-10 text-center">Chargement des détails...</div>
          ) : (
            selectedOrderDetails && (
              <div className="p-8 space-y-6">
                {selectedOrderDetails.tenues.map((tenue, idx: number) => (
                  <Card
                    key={idx}
                    className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image avec URL correcte */}
                      <div className="w-full md:w-40 h-40 bg-slate-100">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            tenue.modelData?.medias?.[0]?.imageUrl
                          }`}
                          className="h-full w-full object-cover"
                          alt="Modèle"
                        />
                      </div>

                      <div className="p-6 flex-1 space-y-4">
                        <div>
                          <h4 className="font-black uppercase text-base">
                            {tenue.modelData?.nom}
                          </h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase italic">
                            Tissu : {tenue.tissuData?.type} (
                            {tenue.tissuData?.couleur})
                          </p>
                        </div>

                        {/* Affichage des Options de personnalisation choisies */}
                        {tenue.optionsEnrichies?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tenue.optionsEnrichies.map((opt) => (
                              <span
                                key={opt.id}
                                className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold uppercase"
                              >
                                + {opt.nom}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Correction du rendu des mesures (Capture 10) */}
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
                          {Object.entries(tenue.mesuresSnapshot || {}).map(
                            ([key, val]) =>
                              key !== "label" && (
                                <div
                                  key={key}
                                  className="bg-slate-50 p-2 rounded-xl border border-slate-100"
                                >
                                  <p className="text-[7px] uppercase font-black text-slate-400 leading-none mb-1">
                                    {key}
                                  </p>
                                  <p className="text-xs font-bold text-slate-700">
                                    {val as string}
                                  </p>
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCommandes;
