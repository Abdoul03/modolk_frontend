import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { Model } from "@/models/model";
import { Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Catalog = () => {
  const [models, setModels] = useState<Model[] | null>(null);

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await api.get("/design");
        if (response.status === 200) {
          setModels(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Session interrompue",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [toast]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* HEADER & FILTRES */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Catalogue de Modèles
          </h1>
          <p className="text-muted-foreground">
            Trouvez l'inspiration pour votre prochaine création unique.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un modèle..."
              className="pl-9 bg-background"
            />
          </div> */}
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* GRID DES MODÈLES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-xl bg-muted animate-pulse"
                />
              ))
          : models?.map((model) => (
              <Card
                key={model.id}
                className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/custom/${model.id}`} state={{ modelData: model }}>
                  {/* IMAGE DU MODÈLE */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={
                        model.medias?.[0]?.imageUrl
                          ? `${import.meta.env.VITE_API_URL}${
                              model.medias[0].imageUrl
                            }`
                          : "Image"
                      }
                      alt={model.nom}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white border-none shadow-sm">
                      {model.categorie?.nom || "Nouveauté"}
                    </Badge>
                  </div>

                  {/* DÉTAILS DU MODÈLE */}
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg leading-tight truncate">
                      {model.nom}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {model.description ||
                        "Un modèle élégant conçu avec soin."}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-black text-primary">
                        {model.prixBase?.toLocaleString()} FCFA
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {model.nombreDeMetre} mètres requis
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full gap-2 group-hover:bg-primary transition-colors">
                      <ShoppingBag className="h-4 w-4" /> Commander
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Catalog;
