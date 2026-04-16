import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors, Ruler } from "lucide-react";
import AddTissueDialog from "./utils/AddTissueDialog";
import api from "@/integrations/api";

const AdminTissus = () => {
  const [tissus, setTissus] = useState([]);

  const fetchTissus = async () => {
    const res = await api.get("/tissus");
    setTissus(res.data);
  };

  useEffect(() => {
    fetchTissus();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
            Gestion des Tissus
          </h1>
          <p className="text-slate-500 text-sm font-medium italic">
            Suivez votre inventaire et vos matières premières.
          </p>
        </div>
        <AddTissueDialog onTissueAdded={fetchTissus} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tissus.map((tissu) => (
          <Card
            key={tissu.id}
            className="group overflow-hidden border-none shadow-sm rounded-[2.5rem] bg-white transition-all hover:shadow-xl"
          >
            <div className="relative h-48 bg-slate-100">
              <img
                src={`${import.meta.env.VITE_API_URL}${
                  tissu.medias?.[0]?.imageUrl
                }`}
                alt={tissu.type}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 backdrop-blur-sm border-none text-[9px] font-black uppercase">
                Stock: {tissu.stock}m
              </Badge>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-black uppercase text-base text-slate-900">
                  {tissu.type}
                </h3>
                <span className="font-black text-primary text-sm">
                  {tissu.prixParMetre} F/m
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">
                Couleur: {tissu.couleur}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Scissors className="h-3 w-3" />
                  <span className="text-[9px] font-bold uppercase">
                    {tissu.texture || "Texture standard"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTissus;
