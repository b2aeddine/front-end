import { useServiceContext } from "../../PageService";

export const HeroServiceSection = (): JSX.Element => {
    const { service } = useServiceContext();

    // Get service data or fallback
    const serviceTitle = service?.title || "Titre du service";
    const sellerUsername = service?.seller?.username || "username";
    const sellerAvatar = service?.seller?.avatar_url || "https://c.animaapp.com/mjsa8xj74uh4Dq/img/joschamayer.png";
    const sellerRating = service?.rating_average?.toFixed(1)?.replace('.', ',') || "4,9";
    const reviewCount = service?.rating_count || 120;

    // Generate result-oriented subtitle based on category
    const getResultSubtitle = () => {
        const category = service?.category?.name?.toLowerCase() || "";
        if (category.includes("video") || category.includes("ugc")) {
            return "Idéal pour les marques qui veulent augmenter l'engagement sur les réseaux sociaux";
        }
        if (category.includes("design") || category.includes("logo")) {
            return "Parfait pour les entreprises qui veulent une identité visuelle professionnelle";
        }
        if (category.includes("dev") || category.includes("web")) {
            return "Pour les entrepreneurs qui veulent un site performant et moderne";
        }
        return "Pour les professionnels qui veulent des résultats de qualité";
    };

    return (
        <section className="flex flex-col items-center w-full px-4 py-8">
            <div className="flex flex-col w-full max-w-[1192px] items-center gap-6">
                {/* Title - Vendor's original */}
                <h1 className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-black text-2xl md:text-3xl text-center tracking-[0] leading-tight">
                    {serviceTitle}
                </h1>

                {/* Result-oriented subtitle */}
                <p className="[font-family:'DM_Sans',Helvetica] font-medium text-[#6b7280] text-base md:text-lg text-center max-w-[600px]">
                    {getResultSubtitle()}
                </p>

                {/* Micro-proofs row */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <img
                            className="w-4 h-4"
                            alt="Star"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-3.svg"
                        />
                        <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325]">
                            {sellerRating}
                        </span>
                        <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e]">
                            ({reviewCount} avis)
                        </span>
                    </div>

                    <div className="w-px h-4 bg-[#d1d5db]" />

                    {/* Response time */}
                    <div className="flex items-center gap-2">
                        <span className="text-base">⏱</span>
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[#4b5563]">
                            Réponse en ~3h
                        </span>
                    </div>

                    <div className="w-px h-4 bg-[#d1d5db]" />

                    {/* Creator mini info */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded-full bg-cover bg-center border border-white shadow-sm"
                            style={{ backgroundImage: `url(${sellerAvatar})` }}
                        />
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[#4b5563]">
                            par @{sellerUsername}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
