import { useServiceContext } from "../../PageService";

export const AboutServiceSection = (): JSX.Element => {
    const { service } = useServiceContext();

    const serviceDescription = service?.description || "Je réalise des vidéos percutantes qui racontent votre histoire et génèrent des résultats. Qu'il s'agisse de promos de marque, de publicités pour les réseaux sociaux ou de campagnes marketing, je fournis des visuels de haute qualité avec des transitions fluides, un message clair et un impact créatif.";

    // FAQ items - what users need to know
    const faqItems = [
        {
            question: "Comment ça se passe ?",
            answer: "Après votre commande, je vous envoie un brief à remplir. Une fois validé, je commence la production et vous tiens informé de l'avancement."
        },
        {
            question: "Qu'est-ce que je reçois ?",
            answer: "Vous recevez les fichiers finaux dans le format de votre choix, prêts à être utilisés. Les fichiers sources sont inclus selon le package choisi."
        },
        {
            question: "Combien de temps ?",
            answer: "Le délai dépend du package choisi. Je respecte toujours les délais annoncés et vous tiens informé en cas d'imprévu."
        }
    ];

    return (
        <div className="flex flex-col items-start gap-6 w-full">
            {/* Section Header */}
            <div className="flex flex-col items-center gap-1">
                <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-xl tracking-[0] leading-8">
                    À propos de ce service
                </h3>
                <img
                    className="w-[100px] h-[20px]"
                    alt="Underline"
                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector.svg"
                />
            </div>

            {/* Description */}
            <div className="flex flex-col items-start gap-4 p-5 w-full rounded-[14px] border border-solid border-[#74767e4c] bg-white/50">
                <p className="[font-family:'DM_Sans',Helvetica] font-medium text-[#404145] text-base tracking-[0] leading-6">
                    {serviceDescription}
                </p>
            </div>

            {/* FAQ - Process, Deliverables, Timeline */}
            <div className="flex flex-col items-start gap-4 w-full">
                {faqItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-start gap-2 p-4 w-full rounded-lg bg-[#f8f5f0] border border-[#e5e7eb]">
                        <h4 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-sm">
                            {item.question}
                        </h4>
                        <p className="[font-family:'DM_Sans',Helvetica] font-normal text-[#6b7280] text-sm leading-5">
                            {item.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
