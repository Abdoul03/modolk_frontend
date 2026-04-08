import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Extrait l'ID utilisateur (sub) contenu dans le jeton JWT.
 * @param token Le jeton d'accès (accessToken)
 * @returns L'ID de l'utilisateur ou null si le token est invalide
 */

export const getUserIdFromToken = (token: string | null): number | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<MyTokenPayload>(token);

    // Dans ton backend, 'sub' contient le userId
    return decoded.sub;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
};
