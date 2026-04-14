import { useToast } from "@/components/ui/use-toast";
import api from "@/integrations/api";
import { Model } from "@/models/model";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Customisation = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const [tissu, setTissu] = useState(null);
  const [model, setModel] = useState<Model | null>(
    location.state?.modelData || null,
  );

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!model && id) {
      const fetchModel = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/design/${id}`);
          setModel(response.data);
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

      fetchModel();
    }

    const fetchTissu = async () => {
      try {
        const response = await api.get(`/tissus/${model.tissusId}`);
        if (response.status === 200) {
          setTissu(response.data);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Session interrompue",
          description:
            error.response?.data?.message || "Une erreur est survenue.",
        });
        setTissu(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTissu();
  }, [id, model, toast]);

  if (loading) return <div>Chargement du studio de création...</div>;
  if (!model) return <div>Modèle introuvable.</div>;

  return <div></div>;
};

export default Customisation;
