import { useState, useEffect } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PageHeader } from "../../../../components/ui/PageHeader";
import { EmptyState } from "../../../../components/ui/EmptyState";
import { Button } from "../../../PagePublic/components/ui/button";
import { Card, CardContent } from "../../../PagePublic/components/ui/card";
import { useAuth } from "../../../../lib/auth";
import { fetchMyServices, Service } from "../../../../lib/queries/services";
import { ServiceCreationModal } from "../../../../components/modals";

export const ServicesContentSection = (): JSX.Element => {
    const { user } = useAuth();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

    useEffect(() => {
        const loadServices = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await fetchMyServices(user.id);
                if (data) {
                    setServices(data);
                }
            } catch (error) {
                console.error('Failed to load services:', error);
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, [user?.id]);

    return (
        <>
            <section className="relative flex flex-col w-full min-h-screen items-start bg-[#f8f5f0] isolate overflow-hidden">
                <DashboardHeader />

                <div className="flex flex-col items-start gap-2.5 relative w-full flex-1">
                    <img
                        className="absolute top-0 left-0 w-full h-[1313px] object-cover md:object-none md:object-top -z-10"
                        alt="Main bg color"
                        src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                    />

                    {/* PageHeader with context */}
                    <PageHeader
                        title="Mes Services"
                        contextMessage="Gérez vos services et créez-en de nouveaux pour gagner de l'argent"
                        primaryAction={{
                            label: "Créer un service",
                            onClick: () => setIsServiceModalOpen(true),
                        }}
                    />

                    {/* Main Content Area */}
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fea38e]"></div>
                            </div>
                        ) : services.length === 0 ? (
                            <EmptyState type="services" />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {services.map((service) => (
                                    <Card
                                        key={service.id}
                                        className="w-full rounded-[15px] shadow-[1px_2px_6px_#0000001a,5px_9px_10px_#00000017,12px_20px_14px_#0000000d,22px_36px_17px_#00000003,34px_56px_18px_transparent] bg-[linear-gradient(180deg,rgba(254,163,142,0.7)_0%,rgba(248,245,240,1)_100%)] border-0"
                                    >
                                        <CardContent className="flex flex-col gap-2.5 p-2">
                                            <img
                                                className="w-full h-24 rounded-[15px] object-cover"
                                                alt={service.title}
                                                src={service.media?.[0]?.thumbnail_url || service.media?.[0]?.url || "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-63-2.png"}
                                            />

                                            <div className="flex items-end justify-between gap-4">
                                                <div className="flex flex-col gap-[3px] flex-1">
                                                    <h3 className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-lg tracking-[0] leading-[normal]">
                                                        {service.title}
                                                    </h3>
                                                    <p className="[font-family:'Inter',Helvetica] font-medium italic text-[#3e2522] text-xs tracking-[0] leading-[normal] line-clamp-2">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <p className="[font-family:'Inter',Helvetica] font-extrabold text-[#1f392c] text-xl tracking-[0] leading-[normal]">
                                                        À partir de {service.base_price}€
                                                    </p>
                                                    <Button className="h-9 px-4 bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-[10px]">
                                                        <span className="[font-family:'DM_Sans',Helvetica] font-bold text-[#f8f5f0] text-sm tracking-[0] leading-[normal]">
                                                            Modifier
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <ServiceCreationModal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                onComplete={(data) => {
                    console.log('Service created:', data);
                    setIsServiceModalOpen(false);
                }}
            />
        </>
    );
};
