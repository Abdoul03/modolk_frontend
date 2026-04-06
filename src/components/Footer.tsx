import logoImage from "@/assets/modolk-logo.png";
import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <img
              src={logoImage}
              alt="MODOL'K"
              className="w-12 h-12 object-contain mb-4"
            />
            <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3">
              MODOL'K
            </p>
            <p className="text-[11px] text-accent-foreground/50 leading-relaxed">
              Mode premium. Conçu à Bamako, porté dans le monde.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-accent-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-accent-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {[
            {
              title: "Boutique",
              links: [
                "Homme",
                "Femme",
                "Sur-mesure",
                "Accessoires",
                "Nouveautés",
              ],
            },
            {
              title: "Aide",
              links: [
                "FAQ",
                "Livraison",
                "Retours",
                "Guide des tailles",
                "Paiement",
              ],
            },
            {
              title: "Maison",
              links: [
                "À propos",
                "Nos artisans",
                "Durabilité",
                "Carrières",
                "Presse",
              ],
            },
            {
              title: "Contact",
              links: ["WhatsApp", "Email", "Instagram", "Rendez-vous"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-4 text-accent-foreground/80">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[11px] text-accent-foreground/50 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-accent-foreground/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-accent-foreground/30 tracking-wider">
            © 2026 MODOL'K. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {["CGV", "Confidentialité", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
