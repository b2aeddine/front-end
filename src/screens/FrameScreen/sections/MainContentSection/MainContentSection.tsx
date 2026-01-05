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
    className: "mt-[5px] w-[15px] h-[15px] ml-[5px]",
  },
  {
    name: "youtube",
    src: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/icon-youtube.svg",
    className: "mt-[5px] w-[15px] h-[15px] ml-[5px]",
  },
  {
    name: "tiktok",
    src: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/icon-tiktok.svg",
    className: "mt-1.5 w-[13px] h-[13px] ml-1.5",
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
    <section className="flex flex-col w-full items-center gap-[33px] p-2.5 relative">
      <header className="inline-flex items-start justify-end gap-2.5 p-2.5 relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <h2 className="relative w-fit mt-[-1.00px] [font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-[40px] md:text-[56px] text-center tracking-[0] leading-[normal]">
          Parcourez les createurs en vedettes!
        </h2>

        <img
          className="absolute top-12 left-[571px] w-[411px] h-[77px] hidden lg:block"
          alt="Vector"
          src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/vector.svg"
        />
      </header>

      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-[85px] relative w-full">
        {creators.map((creator, index) => (
          <Card
            key={creator.id}
            className="flex flex-col w-full max-w-[389px] h-[383px] items-start justify-end gap-2.5 px-1 py-[5px] relative border-0 shadow-none bg-transparent translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              {
                "--animation-delay": `${(index + 1) * 200}ms`,
              } as React.CSSProperties
            }
          >
            <div className="absolute top-0 left-0 w-full h-[383px]">
              <img
                className="absolute top-0 left-0 w-full h-[179px] rounded-[15px_15px_0px_0px] object-cover"
                alt="Image ou video du"
                src={creator.serviceImage}
              />

              <div className="absolute top-[179px] left-0 w-full h-[204px] rounded-[0px_0px_15px_15px] shadow-[1px_3px_7px_#0000001a,5px_11px_12px_#00000017,11px_25px_16px_#0000000d,19px_45px_19px_#00000003,29px_70px_21px_transparent] bg-[linear-gradient(180deg,rgba(254,163,142,1)_4%,rgba(248,245,240,1)_100%)]" />
            </div>

            <CardContent className="flex flex-col w-full items-start gap-[11px] relative p-0">
              <div className="flex items-end gap-2 relative self-stretch w-full">
                <div className="inline-flex items-center gap-[5px] relative bg-white rounded-[40px]">
                  <div className="relative w-20 h-20">
                    <div className="absolute -top-1 -left-1 w-[88px] h-[88px] rounded-[44px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />

                    <div className="absolute -top-1 -left-1 w-[88px] h-[88px] rounded-[44px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />

                    <div
                      className="absolute w-full h-full top-0 left-0 rounded-[40px] border border-solid border-white bg-cover bg-[50%_50%]"
                      style={{
                        backgroundImage: `url(${creator.profileImage})`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-[206px] items-start gap-[5px] relative">
                  <h3 className="relative self-stretch h-[24.81px] mt-[-1.00px] [font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-lg tracking-[0] leading-[normal]">
                    {creator.serviceName}
                  </h3>

                  <p className="relative self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#00000080] text-sm tracking-[0] leading-[normal]">
                    {creator.deliveryType}
                  </p>

                  <img
                    className="relative self-stretch w-full h-px object-cover"
                    alt="Line"
                    src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/line-3.svg"
                  />
                </div>

                <div className="flex w-[78.45px] h-6 items-center gap-[3.84px] relative">
                  <img
                    className="relative w-[15.36px] h-[15.36px]"
                    alt="Star"
                    src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/svg.svg"
                  />

                  <div className="relative flex items-center justify-center w-[23.66px] h-[23.04px] mt-[-0.48px] [font-family:'Inter',Helvetica] font-bold text-[#222325] text-[14.5px] tracking-[0] leading-[23.0px] whitespace-nowrap">
                    {creator.rating}
                  </div>

                  <div className="relative flex items-center justify-center w-[28.61px] h-[15.36px] [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.3px] tracking-[0] leading-[23.0px] whitespace-nowrap">
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.3px] tracking-[0] leading-[23.0px]">
                      (
                    </span>

                    <span className="underline">{creator.reviewCount}</span>

                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.3px] tracking-[0] leading-[23.0px]">
                      )
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-0.5 relative self-stretch w-full">
                <div className="flex flex-col w-[84px] items-start relative">
                  <h4 className="relative self-stretch h-[24.81px] mt-[-1.00px] [font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-lg tracking-[0] leading-[normal]">
                    {creator.firstName}
                  </h4>

                  <p className="relative self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#00000080] text-sm tracking-[0] leading-[normal]">
                    {creator.city}
                  </p>
                </div>

                <p className="relative w-[292px] h-[47px] mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium italic text-[#3e2522] text-xs tracking-[0] leading-[normal]">
                  {creator.bio}
                </p>
              </div>

              <div className="flex w-[366px] items-end gap-[125px] relative">
                <div className="flex items-center gap-[8px] relative">
                  {socialIcons.map((social) => (
                    <button
                      key={social.name}
                      className="w-[25px] h-[25px] flex items-center justify-center rounded-[5px] border-2 border-solid border-[#f1f4ef] transition-colors hover:border-[#fea38e]"
                      aria-label={social.name}
                    >
                      <img
                        className={social.className}
                        alt={`Icon ${social.name}`}
                        src={social.src}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col w-[165px] items-end relative mr-[-15.00px]">
                  <p className="relative self-stretch h-[45px] mt-[-1.00px] [font-family:'Inter',Helvetica] font-extrabold text-[#1f392c] text-xl tracking-[0] leading-[normal]">
                    {creator.price}
                  </p>

                  <Button
                    onClick={() => handleViewDetails(creator.slug)}
                    className="w-[126px] h-9 bg-[#fea38e] hover:bg-[#fe8f77] rounded-[10px] transition-colors"
                  >
                    <span className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#f8f5f0] text-sm text-center tracking-[0] leading-[normal]">
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
