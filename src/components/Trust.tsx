import { Phone, RotateCcw, Shield, Truck } from "lucide-react";

const Trust = () => {
  return (
    <div>
      <section className="py-14 border-y border-border bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Livraison mondiale",
                text: "Express 5-14 jours",
              },
              {
                icon: RotateCcw,
                title: "Retours gratuits",
                text: "Sous 14 jours",
              },
              {
                icon: Shield,
                title: "Paiement sécurisé",
                text: "SSL & 3D Secure",
              },
              { icon: Phone, title: "Service client", text: "WhatsApp 7j/7" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center group">
                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/5 transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[11px] tracking-[0.1em] uppercase font-semibold text-foreground mb-1">
                  {title}
                </p>
                <p className="text-[11px] text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trust;
