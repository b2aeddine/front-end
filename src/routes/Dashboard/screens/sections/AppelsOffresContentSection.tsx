import { MapPinIcon } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { DashboardHeader } from "../../components/DashboardHeader";

const applicantImages = [
    "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-6.png",
    "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-7.png",
    "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-8.png",
];

// Sample offers data
const offersData = [
    {
        id: 1,
        title: "Senior UI/UX Designer",
        salary: "$30,000 - $55,000",
        badge: "Expert Graphiques",
        company: "Apple",
        location: "Boston, USA",
        avatar: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/joschamayer.png",
        description: "brief detail de l'appel d'offre.",
        applicants: "9+",
    },
    {
        id: 2,
        title: "Motion Designer",
        salary: "$25,000 - $45,000",
        badge: "Animation",
        company: "Google",
        location: "Paris, France",
        avatar: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/joschamayer.png",
        description: "Création de motion design pour campagnes publicitaires.",
        applicants: "12+",
    },
    {
        id: 3,
        title: "Brand Designer",
        salary: "$20,000 - $35,000",
        badge: "Branding",
        company: "Meta",
        location: "London, UK",
        avatar: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/joschamayer.png",
        description: "Développement d'identité visuelle pour startup.",
        applicants: "5+",
    },
];

export const AppelsOffresContentSection = (): JSX.Element => {
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
                        <h1 className="dashboard-title">Appels d'Offres</h1>

                        {/* Offers Section - Copied from DashboardContentSection */}
                        <div className="flex flex-col items-start gap-[30px] w-full mt-8">
                            <div className="flex items-end justify-between w-full">
                                <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-black text-[25px] tracking-[0.25px]">
                                    Appel d&apos;offres recentes :
                                </h2>
                                <img
                                    alt="Frame"
                                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-40.svg"
                                />
                            </div>

                            {/* Grid of offer cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {offersData.map((offer) => (
                                    <Card
                                        key={offer.id}
                                        className="w-full bg-[#fea38e4c] rounded-lg border-[0.8px] border-solid border-[#fea38e]"
                                    >
                                        <CardContent className="p-[7px] flex flex-col gap-2.5">
                                            <div className="flex flex-col gap-[15px]">
                                                <div className="flex items-center justify-between gap-[17px]">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="[font-family:'Poppins',Helvetica] font-medium text-gray-900 text-[14.4px] leading-[14.4px]">
                                                            {offer.title}
                                                        </div>
                                                        <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-[11.2px] leading-[11.2px]">
                                                            Salary: {offer.salary}
                                                        </div>
                                                    </div>

                                                    <Badge className="bg-[#fea38e] text-[#f8f5f0] border border-solid border-[#e4e5e7] rounded-full h-[19px] px-[13px] [font-family:'Inter',Helvetica] font-normal text-[10px]">
                                                        {offer.badge}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <Avatar className="w-[49.15px] h-[49.15px] border-[0.61px] border-solid border-white">
                                                        <AvatarImage src={offer.avatar} />
                                                        <AvatarFallback>A</AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex flex-col gap-0.5 pt-0.5">
                                                        <div className="[font-family:'Poppins',Helvetica] font-medium text-[#303030] text-[12.8px] leading-[12.8px]">
                                                            {offer.company}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPinIcon className="w-3.5 h-3.5 text-gray-500" />
                                                            <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-[11.2px] leading-[11.2px]">
                                                                {offer.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="[font-family:'DM_Sans',Helvetica] font-normal text-[#8e8e93] text-xs tracking-[0.60px] leading-[19.0px]">
                                                    {offer.description}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        {applicantImages.map((img, index) => (
                                                            <img
                                                                key={index}
                                                                className="w-[15px] h-[17px] border-[0.17px] border-solid border-[#6300b3] object-cover -ml-[11px] first:ml-0"
                                                                alt="Ellipse"
                                                                src={img}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="[font-family:'Poppins',Helvetica] font-medium text-[#303030] text-[9.6px] leading-[9.6px]">
                                                        {offer.applicants} applicants
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-[13px] w-full">
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 h-9 rounded-[10px] border-[1.5px] border-solid border-[#fea38e] bg-transparent [font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#303030] text-sm"
                                                    >
                                                        Voir les détails
                                                    </Button>
                                                    <Button className="flex-1 h-9 rounded-[10px] bg-[#fea38e] hover:bg-[#fea38e]/90 [font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#f8f5f0] text-sm">
                                                        Postuler
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
