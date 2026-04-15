import { useEffect, useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Scissors,
  DollarSign,
  Loader2,
  AlertCircle,
} from "lucide-react";
import api from "@/integrations/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ordersCount: 0,
    clientsCount: 0,
    modelsCount: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Appels en parallèle pour la performance
        const [ordersRes, clientsRes, modelsRes] = await Promise.all([
          api.get("/commande"), // Adapte l'URL selon ton controller NestJS
          api.get("/users"),
          api.get("/design"),
        ]);

        const orders = ordersRes.data || [];

        // Calcul du Revenu Total (Somme des totalPrice)
        const revenue = orders.reduce(
          (acc: number, curr) => acc + (curr.totalPrice || 0),
          0,
        );

        setStats({
          totalRevenue: revenue,
          ordersCount: orders.length,
          clientsCount: (clientsRes.data || []).length,
          modelsCount: (modelsRes.data || []).length,
          // On prend les 5 dernières commandes pour l'activité récente
          recentActivities: orders.slice(-5).reverse(),
        });
      } catch (error) {
        console.error("Erreur Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="font-black uppercase tracking-widest text-[10px] animate-pulse">
          Synchronisation des données...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Tableau de Bord
        </h1>
        <p className="text-muted-foreground font-medium italic">
          Analyse en temps réel de votre atelier.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Chiffre d'Affaires"
          value={stats.totalRevenue.toLocaleString()}
          unit="FCFA"
          icon={DollarSign}
          color="text-emerald-500"
        />
        <StatCard
          title="Commandes"
          value={stats.ordersCount}
          unit="Total"
          icon={ShoppingBag}
          color="text-primary"
        />
        <StatCard
          title="Clients"
          value={stats.clientsCount}
          unit="Inscrits"
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Modèles"
          value={stats.modelsCount}
          unit="Catalogue"
          icon={Scissors}
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* GRAPHIQUE (Simplifié pour l'exemple) */}
        <Card className="lg:col-span-4 border-none shadow-2xl rounded-[2.5rem] bg-white p-6">
          <CardHeader>
            <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Performance Ventes
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Total", total: stats.totalRevenue }]}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#0f172a"
                  radius={[10, 10, 0, 0]}
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ACTIVITÉS RÉELLES */}
        <Card className="lg:col-span-3 border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 p-8 border-b">
            <CardTitle className="text-xl font-black uppercase tracking-tight">
              Dernières Commandes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((order) => (
                <ActivityItem
                  key={order.id}
                  name={`Client #${order.utilisateurId}`} // Tu pourras enrichir avec le nom du client plus tard
                  action="Nouvelle commande"
                  time={new Date(order.dateCommande).toLocaleDateString()}
                  price={order.totalPrice.toLocaleString()}
                  status={order.statutCommande}
                />
              ))
            ) : (
              <div className="p-10 text-center text-muted-foreground italic text-sm">
                Aucune commande récente.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Sous-composants inchangés mais avec types propres
const StatCard = ({ title, value, unit, icon: Icon, color }) => (
  <Card className="border-none shadow-xl rounded-[2rem] bg-white">
    <CardContent className="p-6">
      <div className="p-3 bg-slate-50 w-fit rounded-2xl mb-4">
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-black tracking-tighter">{value}</h2>
        <span className="text-[10px] font-bold text-muted-foreground uppercase">
          {unit}
        </span>
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ name, action, time, price, status }) => (
  <div className="p-6 flex items-center justify-between border-b last:border-0 hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
        {name.substring(0, 2)}
      </div>
      <div>
        <p className="text-sm font-black uppercase tracking-tight">{name}</p>
        <p className="text-[10px] text-muted-foreground font-medium italic">
          {action} • {time}
        </p>
      </div>
    </div>
    <div className="text-right font-black text-sm">
      {price} F
      <div
        className={`text-[8px] uppercase tracking-tighter ${
          status === "EnAttente" ? "text-amber-600" : "text-emerald-600"
        }`}
      >
        {status}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
