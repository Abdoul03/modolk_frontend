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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    motDePasse: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        formData,
      );

      if (response.status === 201) {
        const { tokens, user } = response.data;
        // 1. Stockage des jetons pour maintenir la session
        localStorage.setItem("access_token", tokens.accessToken);
        localStorage.setItem("refresh_token", tokens.refreshToken);

        // 2. Stockage optionnel des infos utilisateur (pour l'affichage dans la Navbar par exemple)
        // localStorage.setItem("user", JSON.stringify(user));

        toast({
          title: "Inscription réussie !",
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

      <main className="flex-grow flex items-center justify-center bg-muted/30 px-4 py-12">
        <Card className="w-full max-w-lg border-none shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">
              Créer un compte
            </CardTitle>
            <CardDescription>
              Rejoignez l'univers Modol'k et personnalisez votre style
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Grille pour Nom et Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder="Entre votre prénom"
                    required
                    onChange={handleChange}
                    value={formData.prenom}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Entre votre nom"
                    required
                    onChange={handleChange}
                    value={formData.nom}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@gmail.com"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  placeholder="Numero de telephone"
                  required
                  onChange={handleChange}
                  value={formData.telephone}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  placeholder="Quartier/ville"
                  required
                  onChange={handleChange}
                  value={formData.adresse}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motDePasse">Mot de passe</Label>
                <Input
                  id="motDePasse"
                  type="password"
                  required
                  onChange={handleChange}
                  value={formData.motDePasse}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full text-white font-semibold py-6 text-lg"
              >
                {loading ? "Création en cours..." : "S'inscrire"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Se connecter
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

export default Register;
