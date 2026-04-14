import { Mesure } from "./mesure";
import { Option } from "./option";

export interface Tenue {
  id: number;
  commandeId: number;
  modelId: number;
  tissusId: number;
  mesureId: number;
  mesuresSnapshot: Mesure;
  quantite: number;
  prixUnitaire: number;
  options: Option[];
}
