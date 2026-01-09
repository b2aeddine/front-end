import { Button } from "../../components/ui/button";
import { MessageCircleIcon } from "lucide-react";

interface StickyCTAProps {
    creatorId?: string;
    onContact?: () => void;
}

export const StickyCTA = ({
    creatorId,
    onContact,
}: StickyCTAProps): JSX.Element => {
    const handleContact = () => {
        if (onContact) {
            onContact();
        } else {
            // Préparation future checkout/contact modal
            console.log("Contact intent:", { creatorId, intent: "sticky_mobile" });
        }
    };

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
            <Button
                onClick={handleContact}
                className="w-full bg-[#fea38e] hover:bg-[#e8937f] text-white py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
            >
                <MessageCircleIcon className="w-5 h-5" />
                Contacter ce créateur
            </Button>
        </div>
    );
};
