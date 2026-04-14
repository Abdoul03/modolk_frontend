import { Tenue } from "./tenue";

export interface Commande {
  id: number;
  dateCommande: Date;
  statutCommande: string;
  totalPrice: number;
  utilisateurId: number;
  tenues: Tenue[];
}
