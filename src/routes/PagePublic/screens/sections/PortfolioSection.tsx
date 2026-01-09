import { ShoppingCartIcon, ShieldCheckIcon, ClockIcon, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const servicesData = [
  {
    id: 1,
    image: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
    title: "Vidéo Promo Réseaux",
    description: "Vidéo courte optimisée pour Instagram, TikTok et YouTube Shorts",
    price: 50,
    deliveryDays: 5,
    rating: 4.9,
    reviewCount: 49,
  },
  {
    id: 2,
    image: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
    title: "Campagne Publicitaire",
    description: "Pack complet pour vos campagnes ads avec formats multiples",
    price: 150,
    deliveryDays: 7,
    rating: 4.8,
    reviewCount: 32,
  },
  {
    id: 3,
    image: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
    title: "Vidéo Corporate",
    description: "Présentation professionnelle de votre entreprise ou produit",
    price: 300,
    deliveryDays: 10,
    rating: 5.0,
    reviewCount: 18,
  },
];

export const PortfolioSection = (): JSX.Element => {
  const handleOrderService = (serviceId: number) => {
    console.log("Order intent:", { serviceId, intent: "order" });
  };

  return (
    <section id="services" className="flex flex-col items-center w-full gap-6 scroll-mt-8">
      <header className="inline-flex flex-col items-center gap-1">
        <h2 className="font-bold text-[23.8px] leading-8 [font-family:'Inter',Helvetica] text-[#222325] tracking-[0]">
          Mes Services
        </h2>
        <img
          className="w-[121.73px] h-[25.39px]"
          alt="Vector"
          src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector.svg"
        />
      </header>

      {/* Cards container - same layout as créateurs en vedettes */}
      <div className="flex flex-wrap justify-center items-start gap-10 md:gap-[60px] w-full">
        {servicesData.map((service, index) => (
          <Card
            key={service.id}
            className="flex flex-col w-full max-w-[389px] h-[430px] items-start justify-end relative border-0 shadow-none bg-transparent translate-y-[-1rem] animate-fade-in opacity-0 hover-scale group"
            style={{
              "--animation-delay": `${(index + 1) * 200}ms`,
            } as React.CSSProperties}
          >
            {/* Background structure - adjusted heights */}
            <div className="absolute top-0 left-0 w-full h-[430px] transition-all">
              {/* Service image - top part */}
              <img
                className="absolute top-0 left-0 w-full h-[180px] rounded-[15px_15px_0px_0px] object-cover transition-transform group-hover:scale-105"
                alt={service.title}
                src={service.image}
              />

              {/* Gradient bottom - increased height for more content */}
              <div className="absolute top-[180px] left-0 w-full h-[250px] rounded-[0px_0px_15px_15px] shadow-[1px_3px_7px_#0000001a,5px_11px_12px_#00000017,11px_25px_16px_#0000000d,19px_45px_19px_#00000003,29px_70px_21px_transparent] bg-[linear-gradient(180deg,rgba(254,163,142,1)_4%,rgba(248,245,240,1)_100%)] group-hover:shadow-glow-primary transition-all" />
            </div>

            {/* Content - positioned to start after image */}
            <CardContent className="flex flex-col w-full h-[250px] items-start gap-2.5 relative p-5 z-10">
              {/* Title + Rating row */}
              <div className="flex items-start justify-between w-full gap-2">
                <h3 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-lg tracking-[0] leading-tight flex-1">
                  {service.title}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-4 h-4 fill-[#fea38e] text-[#fea38e]" />
                  <span className="font-bold text-[#222325] text-sm">
                    {service.rating.toFixed(1).replace('.', ',')}
                  </span>
                  <span className="text-[#74767e] text-xs">({service.reviewCount})</span>
                </div>
              </div>

              {/* Delivery time */}
              <div className="flex items-center gap-1 text-[#74767e]">
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{service.deliveryDays}-{service.deliveryDays + 2} jours</span>
              </div>

              {/* Description */}
              <p className="[font-family:'Inter',Helvetica] font-medium text-[#3e2522] text-sm tracking-[0] leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[#1f392c]/10" />

              {/* Price + CTA row */}
              <div className="flex items-center justify-between w-full">
                <p className="[font-family:'Inter',Helvetica] font-extrabold text-[#1f392c] text-xl tracking-[0]">
                  À partir de {service.price} €
                </p>

                <Button
                  onClick={() => handleOrderService(service.id)}
                  className="h-9 px-5 bg-[#fea38e] hover:bg-[#fe8f77] rounded-[10px] transition-all flex items-center gap-2 shadow-glow-primary-hover hover:scale-105 group/btn"
                >
                  <ShoppingCartIcon className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1" />
                  <span className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#f8f5f0] text-sm">
                    Commander
                  </span>
                </Button>
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-1.5 text-[#74767e] w-full">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs">Paiement sécurisé – Annulation possible</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
