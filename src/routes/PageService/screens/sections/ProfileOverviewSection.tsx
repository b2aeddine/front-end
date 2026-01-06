import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { useServiceContext } from "../../PageService";
import { ServicePackage } from "../../../../lib/queries/services";
import { createOrder } from "../../../../lib/queries/orders";
import { useAuth } from "../../../../lib/auth";
import { useAuthModal } from "../../../../lib/authModal";
import { canCreateOrder } from "../../../../lib/featureFlags";

const navLinks = [
  { label: "Partners" },
  { label: "How we Work" },
  { label: "Review" },
  { label: "Charity" },
];

// Fallback pricing tiers for demo mode
const fallbackPricingTiers = [
  {
    name: "premium" as const,
    title: "Ultra complet",
    price: "€ 299",
    duration: "⏱ 7j",
    revisions: "↺ ∞",
    concepts: "✦ 8 concepts",
    features: [
      { name: "Fichier imprimable HD", included: true },
      { name: "Transparence (PNG)", included: true },
      { name: "3D Mockup", included: true },
      { name: "Fichiers sources", included: true },
    ],
    textColor: "text-[#313d4f]",
  },
  {
    name: "basic" as const,
    title: "Pour démarrer",
    price: "€ 129",
    duration: "⏱ 14j",
    revisions: "↺ 2",
    concepts: "✦ 2 concepts",
    features: [
      { name: "Fichier imprimable HD", included: true },
      { name: "Transparence (PNG)", included: true },
      { name: "3D Mockup", included: false },
      { name: "Fichiers sources", included: false },
    ],
    textColor: "text-[#202224]",
  },
  {
    name: "standard" as const,
    title: "Le meilleur choix",
    price: "€ 199",
    duration: "⏱ 10j",
    revisions: "↺ 5",
    concepts: "✦ 4 concepts",
    features: [
      { name: "Fichier imprimable HD", included: true },
      { name: "Transparence (PNG)", included: true },
      { name: "3D Mockup", included: true },
      { name: "Fichiers sources", included: true },
    ],
    textColor: "text-[#313d4f]",
  },
];

// Map backend packages to display format
function mapPackageToDisplay(pkg: ServicePackage, index: number) {
  const titleMap: Record<string, string> = {
    basic: "Pour démarrer",
    standard: "Le meilleur choix",
    premium: "Ultra complet",
  };

  const textColors = ["text-[#313d4f]", "text-[#202224]", "text-[#313d4f]"];

  return {
    name: pkg.name,
    title: pkg.title || titleMap[pkg.name] || pkg.name,
    price: `€ ${pkg.price}`,
    duration: `⏱ ${pkg.delivery_days}j`,
    revisions: pkg.revisions === -1 ? "↺ ∞" : `↺ ${pkg.revisions}`,
    concepts: "",
    features: pkg.features?.map((f, i) => ({
      name: f,
      included: true,
    })) || [],
    textColor: textColors[index % 3],
  };
}

export const ProfileOverviewSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { service, isLoading } = useServiceContext();
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "standard" | "premium">("basic");
  const [isOrdering, setIsOrdering] = useState(false);

  // Get pricing tiers from service or use fallback
  const pricingTiers = service?.packages?.length
    ? service.packages.map(mapPackageToDisplay)
    : fallbackPricingTiers;

  // Get service data or fallback
  const serviceTitle = service?.title || "Titre du service";
  const serviceDescription = service?.description || "Je réalise des vidéos percutantes qui racontent votre histoire et génèrent des résultats. Qu'il s'agisse de promos de marque, de publicités pour les réseaux sociaux ou de campagnes marketing, je fournis des visuels de haute qualité avec des transitions fluides, un message clair et un impact créatif.";
  const sellerName = service?.seller?.display_name || service?.seller?.username || "Joscha";
  const sellerUsername = service?.seller?.username || "joschamayer";
  const sellerAvatar = service?.seller?.avatar_url || "https://c.animaapp.com/mjsa8xj74uh4Dq/img/joschamayer.png";
  const sellerRating = service?.rating_average?.toFixed(1)?.replace('.', ',') || "4,9";
  const reviewCount = service?.rating_count || 120;

  // Handle order creation
  const handleContactClick = async () => {
    if (!isAuthenticated) {
      openModal('login');
      return;
    }

    if (!service) {
      console.error('[Order] No service loaded');
      return;
    }

    // Check feature flags
    const { allowed, reason } = await canCreateOrder();
    if (!allowed) {
      console.error('[Order] Cannot create order:', reason);
      return;
    }

    setIsOrdering(true);

    try {
      const { data, error } = await createOrder({
        service_id: service.id,
        package_name: selectedPackage,
      });

      if (error) {
        console.error('[Order] Create failed:', error);
        return;
      }

      if (data?.checkout_url) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkout_url;
      }
    } catch (err) {
      console.error('[Order] Exception:', err);
    } finally {
      setIsOrdering(false);
    }
  };

  const handleViewProfile = () => {
    if (service?.seller?.username) {
      navigate(`/public/${service.seller.username}`);
    }
  };

  return (
    <section className="flex flex-col items-center gap-[70px] w-full">
      <div className="flex flex-col w-full max-w-[1192px] items-start gap-2.5">
        <div className="flex flex-col items-start gap-2.5 w-full">
          <nav className="flex items-center gap-[211px] w-full">
            <div className="inline-flex items-center gap-2">
              <img
                className="w-8 h-8"
                alt="Logo"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/logo.svg"
              />
              <div className="[font-family:'Kulim_Park',Helvetica] font-bold text-[#1f392c] text-2xl tracking-[0] leading-6 whitespace-nowrap">
                The Creator
              </div>
            </div>

            <div className="inline-flex items-start gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <Button className="h-auto bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-[100px] px-8 py-3">
              <span className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#f8f5f0] text-lg text-center tracking-[0.18px] leading-6">
                S&apos;inscrire
              </span>
            </Button>
          </nav>

          <div className="flex flex-col w-full max-w-[1122px] items-center gap-2.5">
            <Separator className="w-full bg-[url(https://c.animaapp.com/mjsa8xj74uh4Dq/img/line-4.svg)] bg-cover bg-[50%_50%]" />

            <div className="inline-flex items-center gap-[50px]">
              <div className="inline-flex items-start gap-8">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-start gap-8">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <img
              className="w-[1021px] h-0.5 object-cover"
              alt="Line"
              src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/line-5.svg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-end gap-[84px] w-full">
        <div className="flex flex-col w-[855px] items-start gap-[41px]">
          <div className="flex flex-col items-center gap-[21px] w-full">
            <h1 className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-black text-xl text-center tracking-[0] leading-[normal]">
              {serviceTitle}
            </h1>

            <div className="flex flex-col items-start gap-2.5 p-2.5 w-full">
              <div className="flex items-start gap-[69px] w-full">
                <div className="inline-flex items-center gap-8">
                  <div className="relative w-40 h-40 bg-white rounded-[80px]">
                    <div className="absolute -top-2 -left-2 w-44 h-44 rounded-[88px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />
                    <div className="absolute top-0 left-0 w-40 h-40 flex">
                      <div
                        className="flex-1 w-40 rounded-[80px] border-2 border-solid border-white bg-cover bg-[50%_50%]"
                        style={{ backgroundImage: `url(${sellerAvatar})` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-[445.65px] items-start gap-2">
                    <div className="inline-flex items-center gap-2">
                      <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.4px] tracking-[0] leading-8 whitespace-nowrap">
                        {sellerName}
                      </h2>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-lg tracking-[0] leading-[26px] whitespace-nowrap">
                        @{sellerUsername}
                      </span>
                    </div>

                    <div className="relative w-[84.16px] h-6">
                      <img
                        className="absolute w-[calc(100%_-_68px)] h-[calc(100%_-_8px)] top-0.5 left-0"
                        alt="Star"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-3.svg"
                      />
                      <div className="absolute top-0 left-5 w-[25px] h-6 flex items-center justify-center [font-family:'Inter',Helvetica] font-bold text-[#222325] text-[15.1px] tracking-[0] leading-6 whitespace-nowrap">
                        {sellerRating}
                      </div>
                      <div className="absolute top-1 left-12 w-9 h-4 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.8px] tracking-[0] leading-6 whitespace-nowrap">
                        <span>(</span>
                        <span className="underline">{reviewCount}</span>
                        <span>)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full">
                      <img
                        className="w-4 h-4"
                        alt="Location"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-49.svg"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6 whitespace-nowrap">
                        Royaume-Uni
                      </span>
                      <img
                        className="w-4 h-4"
                        alt="Language"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-39.svg"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6 whitespace-nowrap">
                        Anglais, Allemand, Français, Espagnol
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleViewProfile}
                  className="h-9 w-[126px] bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-[10px] shadow-[0px_3px_3px_#00000040]"
                >
                  <span className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-white text-sm text-center tracking-[0] leading-[normal]">
                    Voir mon profil
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <img
            className="w-[764px]"
            alt="Divider"
            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/frame-14689.svg"
          />

          <div className="flex flex-col items-center gap-1.5 w-full">
            <div className="flex flex-col w-[328px] items-end">
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.8px] tracking-[0] leading-8 whitespace-nowrap">
                A propos de mes Services
              </h3>
              <img
                className="w-[121.73px] h-[25.39px]"
                alt="Underline"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector.svg"
              />
            </div>

            <div className="flex flex-col h-[117px] items-start gap-2.5 px-0 py-[18px] w-full rounded-[14px] border border-solid border-[#74767e4c] relative">
              <p className="[font-family:'DM_Sans',Helvetica] font-medium text-[#404145] text-base tracking-[0] leading-6 w-[779.39px]">
                {serviceDescription.substring(0, 250)}
                {serviceDescription.length > 250 ? '...' : ''}
              </p>
              {serviceDescription.length > 250 && (
                <button className="absolute top-20 left-[704px] [font-family:'Inter',Helvetica] font-normal text-[#404145] text-base tracking-[0] leading-6 underline whitespace-nowrap hover:opacity-80 transition-opacity">
                  Plus d&apos;infos
                </button>
              )}
            </div>
          </div>
        </div>

        <Card className="w-[424px] rounded-[15px] border border-solid border-[#dadbdd9e] shadow-[0px_-2px_5px_#0000001a,0px_-9px_9px_#00000017,0px_-21px_12px_#0000000d,0px_-37px_15px_#00000003,0px_-57px_16px_transparent] overflow-hidden">
          <CardContent className="flex flex-col items-center gap-0 p-0">
            {/* Tabs - Package Selection */}
            <div className="flex w-full">
              {(['basic', 'standard', 'premium'] as const).map((pkg) => {
                const isActive = selectedPackage === pkg;
                const labels = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };
                return (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`flex-1 py-4 px-2 text-center font-semibold text-sm transition-all duration-150 ease-out border-b-[3px] ${isActive
                        ? 'bg-[#fea38e] text-white border-[#e8927c]'
                        : 'bg-[#f5f5f5] text-[#6b7280] border-transparent hover:bg-[#ebebeb]'
                      }`}
                  >
                    {labels[pkg]}
                  </button>
                );
              })}
            </div>

            {/* Selected Offer Content */}
            <div className="flex flex-col items-center gap-5 p-7 w-full">
              {(() => {
                const selectedTier = pricingTiers.find(t => t.name === selectedPackage) || pricingTiers[0];
                return (
                  <div className="flex flex-col items-center gap-6 w-full transition-all duration-200 ease-out">
                    {/* Offer Title */}
                    <div className="text-center">
                      <span className="text-sm text-[#6b7280] font-medium">
                        {selectedTier.title}
                      </span>
                    </div>

                    {/* Price - Large and Prominent */}
                    <div className="text-center">
                      <span className="[font-family:'Inter',Helvetica] font-bold text-[#1f2937] text-4xl tracking-tight">
                        {selectedTier.price}
                      </span>
                    </div>

                    {/* Duration & Revisions */}
                    <div className="flex items-center justify-center gap-6 text-sm text-[#4b5563]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">⏱</span>
                        <span>{selectedTier.duration.replace('⏱ ', '')}</span>
                      </div>
                      <div className="w-px h-4 bg-[#d1d5db]" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">↺</span>
                        <span>{selectedTier.revisions.replace('↺ ', '')} révisions</span>
                      </div>
                      {selectedTier.concepts && (
                        <>
                          <div className="w-px h-4 bg-[#d1d5db]" />
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg">✦</span>
                            <span>{selectedTier.concepts.replace('✦ ', '')}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-[#e5e7eb]" />

                    {/* Features List */}
                    <div className="flex flex-col items-start gap-3 w-full">
                      {selectedTier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 w-full">
                          <span className={`text-base ${feature.included ? 'text-green-500' : 'text-[#9ca3af]'}`}>
                            {feature.included ? '✓' : '—'}
                          </span>
                          <span className={`text-sm ${feature.included ? 'text-[#374151]' : 'text-[#9ca3af]'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-[#e5e7eb]" />

                    {/* Response Time */}
                    <p className="text-sm text-[#6b7280] text-center">
                      Temps de réponse moyen : <span className="font-medium">3 heures</span>
                    </p>

                    {/* Order Button */}
                    <Button
                      onClick={handleContactClick}
                      disabled={isOrdering}
                      className="h-12 w-full bg-[#fea38e] hover:bg-[#e8927c] rounded-lg shadow-md transition-all duration-150 disabled:opacity-50"
                    >
                      <span className="[font-family:'Inter',Helvetica] font-semibold text-white text-base">
                        {isOrdering ? 'Chargement...' : '✉ Commander'}
                      </span>
                    </Button>
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
