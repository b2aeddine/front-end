import { Button } from "../../components/ui/button";
import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";

interface FinalCTASectionProps {
    creatorName?: string;
    creatorId?: string;
    onContact?: () => void;
    onViewServices?: () => void;
}

export const FinalCTASection = ({
    creatorName = "ce créateur",
    creatorId,
    onContact,
    onViewServices,
}: FinalCTASectionProps): JSX.Element => {
    const handleContact = () => {
        if (onContact) {
            onContact();
        } else {
            // Préparation future checkout/contact modal
            console.log("Contact intent:", { creatorId, intent: "final_cta" });
        }
    };

    const handleViewServices = () => {
        if (onViewServices) {
            onViewServices();
        } else {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="flex flex-col items-center gap-6 py-12 md:py-16 px-6 bg-[#1f392c] text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Prêt à lancer votre projet ?
            </h2>

            <p className="text-[#d1d5db] text-center max-w-lg text-sm md:text-base">
                Contactez {creatorName} dès maintenant et transformez votre vision en réalité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={handleContact}
                    className="bg-[#fea38e] hover:bg-[#e8937f] text-white px-6 md:px-8 py-3 md:py-4 font-bold rounded-full transition-all hover:shadow-lg flex items-center gap-2"
                >
                    <MessageCircleIcon className="w-5 h-5" />
                    Contacter {creatorName}
                </Button>

                <Button
                    onClick={handleViewServices}
                    variant="outline"
                    className="border-white text-white px-6 py-3 md:py-4 rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                >
                    Voir les services
                    <ArrowRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </section>
    );
};
