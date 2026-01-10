import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useServiceContext } from "../../PageService";
import { ServicePackage } from "../../../../lib/queries/services";
import { createOrder } from "../../../../lib/queries/orders";
import { useAuth } from "../../../../lib/auth";
import { useAuthModal } from "../../../../lib/authModal";
import { canCreateOrder } from "../../../../lib/featureFlags";

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
        basic: "Pour tester",
        standard: "⭐ Le plus commandé",
        premium: "Pour un lancement sérieux",
    };

    const textColors = ["text-[#313d4f]", "text-[#202224]", "text-[#313d4f]"];

    return {
        name: pkg.name,
        title: pkg.title || titleMap[pkg.name] || pkg.name,
        price: `€ ${pkg.price}`,
        duration: `⏱ ${pkg.delivery_days}j`,
        revisions: pkg.revisions === -1 ? "↺ ∞" : `↺ ${pkg.revisions}`,
        concepts: "",
        features: pkg.features?.map((f) => ({
            name: f,
            included: true,
        })) || [],
        textColor: textColors[index % 3],
    };
}

// Package labels with context
const packageLabels: Record<string, { label: string; badge?: string }> = {
    basic: { label: "Basic", badge: "Pour tester" },
    standard: { label: "Standard", badge: "⭐ Le plus commandé" },
    premium: { label: "Premium", badge: "Pour un lancement sérieux" },
};

export const ServicePackagesSection = (): JSX.Element => {
    const { service } = useServiceContext();
    const { isAuthenticated } = useAuth();
    const { openModal } = useAuthModal();
    const [selectedPackage, setSelectedPackage] = useState<"basic" | "standard" | "premium">("standard");
    const [isOrdering, setIsOrdering] = useState(false);

    // Get pricing tiers from service or use fallback
    const pricingTiers = service?.packages?.length
        ? service.packages.map(mapPackageToDisplay)
        : fallbackPricingTiers;

    // Handle order creation
    const handleOrderClick = async () => {
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

    return (
        <div className="flex flex-col items-center w-full">
            <Card className="w-full rounded-[15px] border border-solid border-[#dadbdd9e] shadow-[0px_-2px_5px_#0000001a,0px_-9px_9px_#00000017,0px_-21px_12px_#0000000d,0px_-37px_15px_#00000003,0px_-57px_16px_transparent] overflow-hidden">
                <CardContent className="flex flex-col items-center gap-0 p-0">
                    {/* Tabs - Package Selection */}
                    <div className="flex w-full">
                        {(['basic', 'standard', 'premium'] as const).map((pkg) => {
                            const isActive = selectedPackage === pkg;
                            const pkgInfo = packageLabels[pkg];
                            return (
                                <button
                                    key={pkg}
                                    onClick={() => setSelectedPackage(pkg)}
                                    className={`flex-1 py-4 px-2 text-center font-semibold text-sm transition-all duration-150 ease-out border-b-[3px] ${isActive
                                        ? 'bg-[#fea38e] text-white border-[#e8927c]'
                                        : 'bg-[#f5f5f5] text-[#6b7280] border-transparent hover:bg-[#ebebeb]'
                                        }`}
                                >
                                    {pkgInfo.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Offer Content */}
                    <div className="flex flex-col items-center gap-5 p-7 w-full">
                        {(() => {
                            const selectedTier = pricingTiers.find(t => t.name === selectedPackage) || pricingTiers[0];
                            const pkgInfo = packageLabels[selectedPackage];
                            return (
                                <div className="flex flex-col items-center gap-6 w-full transition-all duration-200 ease-out">
                                    {/* Context Badge */}
                                    {pkgInfo.badge && (
                                        <div className="inline-flex items-center px-3 py-1 bg-[#fef3f0] rounded-full">
                                            <span className="text-sm font-medium text-[#e8927c]">
                                                {pkgInfo.badge}
                                            </span>
                                        </div>
                                    )}

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
                                                    {String(feature.name)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Separator */}
                                    <div className="w-full h-px bg-[#e5e7eb]" />

                                    {/* Order Button */}
                                    <Button
                                        onClick={handleOrderClick}
                                        disabled={isOrdering}
                                        className="h-12 w-full bg-[#fea38e] hover:bg-[#e8927c] rounded-lg shadow-md transition-all duration-150 disabled:opacity-50"
                                    >
                                        <span className="[font-family:'Inter',Helvetica] font-semibold text-white text-base">
                                            {isOrdering ? 'Chargement...' : '✉ Commander ce service'}
                                        </span>
                                    </Button>

                                    {/* Micro-reassurance */}
                                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#6b7280]">
                                        <span className="flex items-center gap-1">
                                            <span>🔒</span> Paiement sécurisé
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>✅</span> Brief validé avant production
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span>↺</span> Révisions incluses
                                        </span>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
