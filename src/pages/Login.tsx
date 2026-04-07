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
import { Link } from "react-router-dom";

const Login = () => {
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

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                required
                className="bg-background"
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
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full text-white font-medium">
              Se connecter
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
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
