import { StarIcon, CheckCircleIcon } from "lucide-react";

export const SocialProofSection = (): JSX.Element => {
    return (
        <section className="flex items-center justify-center gap-8 md:gap-12 py-6 md:py-8 bg-white/60 backdrop-blur-sm border-y border-[#e4e5e7]">
            <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 md:w-6 md:h-6 text-[#fea38e] fill-[#fea38e]" />
                <span className="font-bold text-xl md:text-2xl text-[#222325]">4,9/5</span>
                <span className="text-[#74767e] text-sm md:text-base">(49 avis)</span>
            </div>

            <div className="h-8 w-px bg-[#e4e5e7]" />

            <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                <span className="font-bold text-xl md:text-2xl text-[#222325]">+23</span>
                <span className="text-[#74767e] text-sm md:text-base">projets réalisés</span>
            </div>

            <div className="hidden md:block h-8 w-px bg-[#e4e5e7]" />

            <span className="hidden md:block text-xs text-[#74767e]">
                Basé sur des projets vérifiés
            </span>
        </section>
    );
};
