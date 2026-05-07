import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { Utilisateur } from "@/models/utilisateur";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Search,
  Filter,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminClient = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Utilisateur[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users", {
        params: { role: "CLIENT" },
      });
      setClients(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: "Impossible de récupérer la liste des clients.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8 bg-[#F8F9FB] min-h-screen">
      {/* Header avec Statistiques Rapides */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
            Portefeuille Clients
          </h1>
          <p className="text-slate-500 font-medium italic text-sm">
            {clients.length} clients de la marque Modol'k enregistrés.
          </p>
        </div>
        {/* <Button className="rounded-full bg-slate-900 hover:bg-slate-800 px-6 font-bold uppercase text-[10px] tracking-widest h-12 shadow-lg transition-all">
          <UserPlus className="mr-2 h-4 w-4" /> Nouveau Client
        </Button> */}
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex gap-4 items-center bg-white p-2 rounded-[1.5rem] shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher un nom ou un email..."
            className="pl-12 border-none bg-transparent focus-visible:ring-0 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <Button
          variant="ghost"
          className="rounded-xl font-bold uppercase text-[10px] gap-2"
        >
          <Filter className="h-4 w-4" /> Filtres
        </Button> */}
      </div>

      {/* Grille de Clients */}
      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-400 font-bold uppercase text-xs tracking-widest animate-pulse">
          Chargement de la base client...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="group relative overflow-hidden border-none shadow-sm rounded-[2.5rem] bg-white transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Décoration en arrière-plan */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <User size={120} />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <Avatar className="h-16 w-16 border-4 border-slate-50 shadow-sm rounded-2xl">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.nom}`}
                    />
                    <AvatarFallback className="bg-slate-900 text-white font-black">
                      {client.nom.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MoreHorizontal className="h-5 w-5 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-2xl border-none shadow-2xl p-2"
                    >
                      <DropdownMenuItem className="font-bold uppercase text-[10px] gap-2 py-3 cursor-pointer rounded-xl">
                        <ArrowUpRight className="h-3 w-3" /> Voir les mesures
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-bold uppercase text-[10px] gap-2 py-3 cursor-pointer rounded-xl text-red-600">
                        Désactiver le compte
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="font-black uppercase text-lg leading-tight text-slate-900">
                    {client.prenom} {client.nom}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-500 border-none font-bold text-[8px] uppercase tracking-tighter"
                  >
                    Client Privilège
                  </Badge>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-medium truncate">
                      {client.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-medium">
                      {client.telephone || "+223 -- -- -- --"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      Inscrit en Avril 2026
                    </span>
                  </div>
                </div>

                <Button className="w-full mt-8 rounded-2xl bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-900 border-none font-black uppercase text-[10px] tracking-widest h-12 transition-all">
                  Consulter l'historique
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminClient;
