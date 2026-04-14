import { Mesure } from "./mesure";
import { Model } from "./model";
import { Option } from "./option";
import { Tissu } from "./tissu";

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

  // Ajoute ces relations optionnelles
  model?: Model;
  tissu?: Tissu;
}
