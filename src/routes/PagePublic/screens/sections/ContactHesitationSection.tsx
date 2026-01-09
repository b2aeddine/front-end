import { Button } from "../../components/ui/button";
import { MessageCircleIcon } from "lucide-react";

interface ContactHesitationSectionProps {
    creatorId?: string;
    onContact?: () => void;
}

export const ContactHesitationSection = ({
    creatorId,
    onContact
}: ContactHesitationSectionProps): JSX.Element => {
    const handleContact = () => {
        if (onContact) {
            onContact();
        } else {
            // Préparation future checkout/contact modal
            console.log("Contact intent:", { creatorId, intent: "hesitation" });
        }
    };

    return (
        <section className="flex flex-col items-center gap-4 py-10 md:py-12 px-6 bg-gradient-to-r from-[#fea38e]/10 via-[#fea38e]/5 to-[#f8f5f0]">
            <div className="flex items-center gap-2">
                <MessageCircleIcon className="w-6 h-6 text-[#fea38e]" />
                <h3 className="text-lg md:text-xl font-bold text-[#222325]">
                    Vous hésitez sur le bon service ?
                </h3>
            </div>

            <p className="text-[#74767e] text-center max-w-md text-sm md:text-base">
                Discutons de votre projet en 2 minutes. Je vous conseille le format adapté à vos besoins.
            </p>

            <Button
                onClick={handleContact}
                className="bg-[#fea38e] hover:bg-[#e8937f] text-white px-6 md:px-8 py-3 md:py-4 font-bold rounded-full transition-all hover:shadow-lg"
            >
                Discuter de mon projet
            </Button>
        </section>
    );
};
