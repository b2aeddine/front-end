import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useServiceContext } from "../../PageService";

const experiences = [
    {
        logo: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/rectangle-3890.png",
        title: "Sr. Product Designer",
        company: "ShartTrip Inc.",
        location: "Dhaka, Bangladesh",
        period: "January 2022 to Present",
        description:
            "ShareTrip is the country's first and pioneer online travel aggregator (OTA). My goal was to craft a functional and delightful experience through web and mobile apps currently consisting of 1.2M+ & future billion users… ",
    },
];

const skills = [
    { name: "UX Design", level: "Expert" },
    { name: "UI Design", level: "Expert" },
    { name: "User Research", level: "Expert" },
    { name: "Design System", level: "Expert" },
];

export const CreatorProfileSection = (): JSX.Element => {
    const navigate = useNavigate();
    const { service } = useServiceContext();

    const sellerName = service?.seller?.display_name || service?.seller?.username || "Créateur";
    const sellerUsername = service?.seller?.username || "username";
    const sellerAvatar = service?.seller?.avatar_url || "https://c.animaapp.com/mjsa8xj74uh4Dq/img/joschamayer.png";

    const handleViewProfile = () => {
        if (service?.seller?.username) {
            navigate(`/public/${service.seller.username}`);
        }
    };

    return (
        <section className="flex flex-col items-center w-full px-4 py-8">
            <div className="flex flex-col w-full max-w-[900px] items-center gap-6">
                {/* Section Header */}
                <div className="flex flex-col items-center gap-1">
                    <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-xl tracking-[0] leading-8">
                        À propos de {sellerName}
                    </h3>
                    <img
                        className="w-[100px] h-[20px]"
                        alt="Underline"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector.svg"
                    />
                </div>

                <div className="rounded-[14px] border border-solid border-[#74767e4c] p-6 w-full">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute -top-2 -left-2 w-24 h-24 rounded-full bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,0.5)_50%,rgba(254,163,142,0.3)_100%)]" />
                            <div
                                className="absolute top-0 left-0 w-20 h-20 rounded-full bg-cover bg-center border-2 border-white"
                                style={{ backgroundImage: `url(${sellerAvatar})` }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <h4 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-lg">
                                {sellerName}
                            </h4>
                            <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-sm">
                                @{sellerUsername}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
                                <img
                                    className="w-4 h-4"
                                    alt="Location"
                                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-49.svg"
                                />
                                <span>Royaume-Uni</span>
                                <img
                                    className="w-4 h-4 ml-2"
                                    alt="Language"
                                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-39.svg"
                                />
                                <span>Anglais, Français</span>
                            </div>
                        </div>
                        <Button
                            onClick={handleViewProfile}
                            variant="outline"
                            className="h-auto px-4 py-2 rounded-[10px] border-2 border-solid border-[#fea38e] bg-transparent hover:bg-[#fea38e]/10"
                        >
                            <span className="font-semibold text-[#fea38e] text-sm">
                                Voir le profil complet
                            </span>
                        </Button>
                    </div>

                    {/* Experience */}
                    <Card className="bg-[#f8f5f0] border-0 mb-4">
                        <CardContent className="p-4">
                            <h5 className="font-semibold text-[#222325] text-sm mb-3">Expériences</h5>
                            {experiences.map((exp, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <img
                                        className="w-12 h-12 rounded-lg"
                                        alt={exp.company}
                                        src={exp.logo}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-[#222325] text-sm">{exp.title}</p>
                                        <p className="text-[#6b7280] text-xs">{exp.company} • {exp.location}</p>
                                        <p className="text-[#9ca3af] text-xs">{exp.period}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card className="bg-[#f8f5f0] border-0">
                        <CardContent className="p-4">
                            <h5 className="font-semibold text-[#222325] text-sm mb-3">Compétences</h5>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-white rounded-full text-xs font-medium text-[#4b5563] border border-[#e5e7eb]"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
