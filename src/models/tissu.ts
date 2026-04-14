import { Media } from "./media";

export interface Tissu {
  id: number;
  type: string;
  couleur: string;
  texture: string;
  prixParMetre: number;
  stock: number;
  medias: Media[];
}
