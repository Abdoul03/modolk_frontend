import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        formData,
      );

      if (response.status === 200) {
        const { tokens, user } = response.data;
        // 1. Stockage des jetons pour maintenir la session
        localStorage.setItem("access_token", tokens.accessToken);
        localStorage.setItem("refresh_token", tokens.refreshToken);

        toast({
          title: "Connexion réussie !",
          description: `Bienvenue ${user.prenom} chez modol'k, vous êtes maintenant connecté.`,
        });

        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description:
          error.response?.data?.message || "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      {/* Section principale centrée */}
      <main className="flex-grow flex items-center justify-center bg-muted/30 px-4 py-12">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Connexion
            </CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre compte Modol'k
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleConnexion}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  required
                  className="bg-background"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-background"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full text-white font-medium" type="submit">
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Vous n'avez pas de compte ?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                >
                  S'inscrire
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
