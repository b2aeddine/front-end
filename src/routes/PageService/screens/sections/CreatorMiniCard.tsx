import { useServiceContext } from "../../PageService";

export const CreatorMiniCard = (): JSX.Element => {
    const { service } = useServiceContext();

    const sellerUsername = service?.seller?.username || "username";
    const sellerAvatar = service?.seller?.avatar_url || "https://c.animaapp.com/mjsa8xj74uh4Dq/img/joschamayer.png";
    const sellerRating = service?.rating_average?.toFixed(1)?.replace('.', ',') || "4,9";
    const reviewCount = service?.rating_count || 120;

    return (
        <div className="flex items-center gap-4 p-4 w-full rounded-xl bg-white border border-[#e5e7eb] shadow-sm">
            {/* Avatar */}
            <div className="relative w-14 h-14">
                <div className="absolute -top-1 -left-1 w-16 h-16 rounded-full bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,0.5)_50%,rgba(254,163,142,0.3)_100%)]" />
                <div
                    className="absolute top-0 left-0 w-14 h-14 rounded-full bg-cover bg-center border-2 border-white"
                    style={{ backgroundImage: `url(${sellerAvatar})` }}
                />
            </div>

            {/* Info */}
            <div className="flex flex-col items-start gap-1 flex-1">
                <div className="flex items-center gap-2">
                    <span className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base">
                        Créé par
                    </span>
                    <span className="[font-family:'Inter',Helvetica] font-medium text-[#fea38e] text-base">
                        @{sellerUsername}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                    <div className="flex items-center gap-1">
                        <img
                            className="w-4 h-4"
                            alt="Star"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-3.svg"
                        />
                        <span className="font-semibold text-[#222325]">{sellerRating}</span>
                        <span>— {reviewCount} ventes</span>
                    </div>
                    <span className="text-[#d1d5db]">•</span>
                    <span>Répond en ~3h</span>
                </div>
            </div>
        </div>
    );
};

