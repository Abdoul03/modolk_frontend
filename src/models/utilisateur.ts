export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  role: "CLIENT" | "ADMIN";
  taille?: number;
}
