import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { fetchServices, Service } from "../../../../lib/queries/services";

// Fallback data for demo mode or when no services are available
const fallbackCreatorsData = [
  {
    id: "1",
    serviceImage:
      "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-ou-video-du-services-2.png",
    profileImage: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-pdp.png",
    serviceName: "nom du service",
    slug: "demo-service-1",
    deliveryType: "livraison",
    rating: "4,9",
    reviewCount: "49",
    firstName: "Prenom",
    city: "Ville",
    bio: "BIO decrivez ce que vous représenter en quelque ligne",
    price: "A partir de 10 €",
  },
  {
    id: "2",
    serviceImage:
      "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-ou-video-du-services-2.png",
    profileImage: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-pdp-1.png",
    serviceName: "nom du service",
    slug: "demo-service-2",
    deliveryType: "livraison",
    rating: "4,9",
    reviewCount: "49",
    firstName: "Prenom",
    city: "Ville",
    bio: "BIO decrivez ce que vous représenter en quelque ligne",
    price: "A partir de 10 €",
  },
  {
    id: "3",
    serviceImage:
      "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-ou-video-du-services-2.png",
    profileImage: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-pdp-2.png",
    serviceName: "nom du service",
    slug: "demo-service-3",
    deliveryType: "livraison",
    rating: "4,9",
    reviewCount: "49",
    firstName: "Prenom",
    city: "Ville",
    bio: "BIO decrivez ce que vous représenter en quelque ligne",
    price: "A partir de 10 €",
  },
];

// Transform Service from backend to display format
function mapServiceToDisplay(service: Service) {
  const primaryMedia = service.media?.find(m => m.is_primary) || service.media?.[0];

  return {
    id: service.id,
    serviceImage: primaryMedia?.url || "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-ou-video-du-services-2.png",
    profileImage: service.seller?.avatar_url || "https://c.animaapp.com/mjqxqi8lTyFq6W/img/image-pdp.png",
    serviceName: service.title,
    slug: service.slug,
    deliveryType: `${service.min_delivery_days}j livraison`,
    rating: service.rating_average?.toFixed(1)?.replace('.', ',') || "5,0",
    reviewCount: String(service.rating_count || 0),
    firstName: service.seller?.display_name || service.seller?.username || "Créateur",
    city: "", // Not in the backend schema for now
    bio: service.description?.substring(0, 80) + (service.description?.length > 80 ? '...' : '') || "",
    price: `A partir de ${service.base_price} €`,
  };
}

const socialIcons = [
  {
    name: "instagram",
    src: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/icon-instagram.svg",
  },
  {
    name: "youtube",
    src: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/icon-youtube.svg",
  },
  {
    name: "tiktok",
    src: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/icon-tiktok.svg",
  },
];

export const MainContentSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState(fallbackCreatorsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      try {
        const { data, error } = await fetchServices({}, { limit: 6 });

        if (mounted && !error && data.length > 0) {
          setCreators(data.map(mapServiceToDisplay));
        }
        // If no data or error, keep fallback data
      } catch (err) {
        console.error('[MainContent] Failed to load services:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  const handleViewDetails = (slug: string) => {
    navigate(`/service/${slug}`);
  };

  return (
    <section className="flex flex-col w-full items-center gap-6 sm:gap-8 md:gap-10 p-2 sm:p-4 relative">
      {/* Section Header - Responsive title */}
      <header className="flex flex-col items-center gap-2 px-2 relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <h2 className="relative w-full [font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-2xl sm:text-3xl md:text-4xl lg:text-[56px] text-center tracking-[0] leading-tight">
          Parcourez les createurs en vedettes!
        </h2>

        {/* Decorative vector - hidden on mobile/tablet */}
        <img
          className="absolute top-8 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] md:w-[411px] h-auto hidden lg:block"
          alt="Vector"
          src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/vector.svg"
        />
      </header>

      {/* Cards Grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full max-w-[1300px] mx-auto">
        {creators.map((creator, index) => (
          <Card
            key={creator.id}
            className="flex flex-col w-full items-start justify-end gap-2 p-1 relative border-0 shadow-none bg-transparent translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              {
                "--animation-delay": `${(index + 1) * 200}ms`,
              } as React.CSSProperties
            }
          >
            {/* Card Background with Image */}
            <div className="relative w-full aspect-[389/383]">
              {/* Service Image - Top half */}
              <img
                className="absolute top-0 left-0 w-full h-[47%] rounded-t-2xl object-cover"
                alt="Service preview"
                src={creator.serviceImage}
              />

              {/* Gradient Background - Bottom half */}
              <div className="absolute bottom-0 left-0 w-full h-[53%] rounded-b-2xl shadow-lg bg-gradient-to-b from-[#fea38e] to-[#f8f5f0]" />
            </div>

            {/* Card Content - Positioned over the gradient */}
            <CardContent className="absolute bottom-0 left-0 right-0 flex flex-col w-full items-start gap-2 sm:gap-3 p-3 sm:p-4">
              {/* Profile Row */}
              <div className="flex items-end gap-2 sm:gap-3 w-full">
                {/* Profile Image with Glow */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fea38e] to-[#fea38e]/30 p-0.5">
                    <div
                      className="w-full h-full rounded-full border-2 border-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${creator.profileImage})`,
                      }}
                    />
                  </div>
                </div>

                {/* Service Info */}
                <div className="flex flex-col flex-1 min-w-0 gap-1">
                  <h3 className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-base sm:text-lg truncate">
                    {creator.serviceName}
                  </h3>

                  <p className="[font-family:'Inter',Helvetica] font-semibold text-[#00000080] text-xs sm:text-sm">
                    {creator.deliveryType}
                  </p>

                  <div className="w-full h-px bg-[#1f392c]/20" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <img
                    className="w-4 h-4"
                    alt="Star"
                    src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/svg.svg"
                  />
                  <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-sm">
                    {creator.rating}
                  </span>
                  <span className="[font-family:'Inter',Helvetica] text-[#74767e] text-xs">
                    ({creator.reviewCount})
                  </span>
                </div>
              </div>

              {/* Creator Info & Bio */}
              <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-2 w-full">
                <div className="flex flex-col flex-shrink-0">
                  <h4 className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-base sm:text-lg">
                    {creator.firstName}
                  </h4>
                  <p className="[font-family:'Inter',Helvetica] font-semibold text-[#00000080] text-xs sm:text-sm">
                    {creator.city}
                  </p>
                </div>

                <p className="flex-1 [font-family:'Inter',Helvetica] font-medium italic text-[#3e2522] text-xs leading-relaxed line-clamp-2">
                  {creator.bio}
                </p>
              </div>

              {/* Footer: Social Icons + Price + CTA */}
              <div className="flex items-end justify-between gap-2 w-full mt-1">
                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  {socialIcons.map((social) => (
                    <button
                      key={social.name}
                      className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-md border-2 border-[#f1f4ef] transition-colors hover:border-[#fea38e] hover:bg-[#fea38e]/10 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0"
                      aria-label={social.name}
                    >
                      <img
                        className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                        alt={`Icon ${social.name}`}
                        src={social.src}
                      />
                    </button>
                  ))}
                </div>

                {/* Price & Button */}
                <div className="flex flex-col items-end gap-1">
                  <p className="[font-family:'Inter',Helvetica] font-extrabold text-[#1f392c] text-sm sm:text-base md:text-lg">
                    {creator.price}
                  </p>

                  <Button
                    onClick={() => handleViewDetails(creator.slug)}
                    className="h-10 sm:h-9 px-4 sm:px-6 bg-[#fea38e] hover:bg-[#fe8f77] rounded-xl sm:rounded-lg transition-colors min-h-[44px] sm:min-h-0"
                  >
                    <span className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#f8f5f0] text-sm text-center">
                      Voir les details
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
