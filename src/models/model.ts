import { Categorie } from "./categorie";
import { Media } from "./media";

export interface Model {
  id: number;
  nom: string;
  description: string;
  prixBase: number;
  nombreDeMetre: number;
  categorieId: number;
  tissusId: number | null;
  medias: Media[];
  categorie: Categorie;
}
