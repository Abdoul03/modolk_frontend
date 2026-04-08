import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

// Intercepteur de REQUÊTE : Ajoute le token actuel
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur de RÉPONSE : Gère l'expiration (401)
api.interceptors.response.use(
  (response) => response, // Si tout va bien, on retourne la réponse
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 (Non autorisé) et que ce n'est pas déjà une tentative de rafraîchissement
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedRefreshToken = localStorage.getItem("refresh_token");

      if (storedRefreshToken) {
        try {
          // Appel au backend pour obtenir un nouveau access_token
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
            {
              refreshToken: storedRefreshToken,
            },
          );

          const { accessToken, refreshToken } = response.data;

          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);

          // On met à jour l'en-tête de la requête originale et on la renvoie
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Si le refreshToken a aussi expiré, on déconnecte l'utilisateur
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
