import { DashboardHeader } from "../../components/DashboardHeader";
import { Button } from "../../../PagePublic/components/ui/button";
import { Card, CardContent } from "../../../PagePublic/components/ui/card";

const servicesData = [
    {
        id: 1,
        image: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
        title: "nom du service",
        description: "BIO decrivez ce que vous représenter en quelque ligne",
        price: "A partir de 10 $",
    },
    {
        id: 2,
        image: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
        title: "nom du service",
        description: "BIO decrivez ce que vous représenter en quelque ligne",
        price: "A partir de 10 $",
    },
    {
        id: 3,
        image: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png",
        title: "nom du service",
        description: "BIO decrivez ce que vous représenter en quelque ligne",
        price: "A partir de 10 $",
    },
];

export const ServicesContentSection = (): JSX.Element => {
    return (
        <section className="relative flex flex-col w-full min-h-screen items-start bg-[#f8f5f0] isolate overflow-hidden">
            <DashboardHeader />

            <div className="flex flex-col items-start gap-2.5 relative w-full flex-1">
                <img
                    className="absolute top-0 left-0 w-full h-[1313px] object-cover md:object-none md:object-top -z-10"
                    alt="Main bg color"
                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                />

                {/* Main Content Area */}
                <div className="w-full max-w-7xl mx-auto px-8 py-8 flex flex-col gap-8">
                    <div className="w-full">
                        <h1 className="dashboard-title">Mes Services</h1>

                        {/* Services Section - Copied from PortfolioSection */}
                        <section className="flex flex-col items-center w-full gap-6 mt-8">
                            <div className="flex items-center gap-8 w-full flex-wrap">
                                {servicesData.map((service) => (
                                    <Card
                                        key={service.id}
                                        className="flex-1 min-w-[280px] max-w-[350px] rounded-[15px] shadow-[1px_2px_6px_#0000001a,5px_9px_10px_#00000017,12px_20px_14px_#0000000d,22px_36px_17px_#00000003,34px_56px_18px_transparent] bg-[linear-gradient(180deg,rgba(254,163,142,0.7)_0%,rgba(248,245,240,1)_100%)] border-0"
                                    >
                                        <CardContent className="flex flex-col gap-2.5 p-2">
                                            <img
                                                className="w-full h-24 rounded-[15px] object-cover"
                                                alt="Rectangle"
                                                src={service.image}
                                            />

                                            <div className="flex items-end justify-between gap-4">
                                                <div className="flex flex-col gap-[3px] flex-1">
                                                    <h3 className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-lg tracking-[0] leading-[normal]">
                                                        {service.title}
                                                    </h3>
                                                    <p className="[font-family:'Inter',Helvetica] font-medium italic text-[#3e2522] text-xs tracking-[0] leading-[normal]">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <p className="[font-family:'Inter',Helvetica] font-extrabold text-[#1f392c] text-xl tracking-[0] leading-[normal]">
                                                        {service.price}
                                                    </p>
                                                    <Button className="h-9 px-4 bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-[10px]">
                                                        <span className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#f8f5f0] text-sm tracking-[0] leading-[normal]">
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
                    </div>
                </div>
            </div>
        </section>
    );
};
