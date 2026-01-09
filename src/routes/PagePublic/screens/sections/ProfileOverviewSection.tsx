import { GlobeIcon, MapPinIcon, MessageCircleIcon, ArrowDownIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

const socialMediaIcons = [
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-8.svg",
    alt: "Instagram",
    additionalSrc: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-5.svg",
  },
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-2.svg",
    alt: "YouTube",
  },
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-3.svg",
    alt: "TikTok",
  },
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/ri-snapchat-fill.svg",
    alt: "Snapchat",
  },
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/mdi-linkedin.svg",
    alt: "LinkedIn",
  },
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/ic-baseline-facebook.svg",
    alt: "Facebook",
  },
  {
    src: "https://c.animaapp.com/mjs9uq4eaVmanC/img/mdi-pinterest.svg",
    alt: "Pinterest",
  },
];

const skills = ["Expert Graphiques", "Expert Graphiques", "Expert Graphiques"];

export const ProfileOverviewSection = (): JSX.Element => {
  return (
    <section className="flex w-full items-start gap-8 lg:gap-[178px] relative">
      <div className="flex flex-col w-full max-w-[1014px] items-start gap-[107px]">
        <div className="flex w-full items-start justify-between gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex flex-col items-center gap-[18px] relative animate-fade-up opacity-0" style={{"--animation-delay": "0.2s"} as React.CSSProperties}>
            <div className="inline-flex items-center gap-2.5 bg-white rounded-[80px] shadow-glow-primary">
              <div className="relative w-40 h-40 group">
                <div className="absolute -top-2 -left-2 w-44 h-44 rounded-[88px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)] animate-pulse-glow" />
                <Avatar className="absolute w-full h-full top-0 left-0 rounded-[80px] border-2 border-solid border-white transition-transform group-hover:scale-105">
                  <AvatarImage
                    src="https://c.animaapp.com/mjs9uq4eaVmanC/img/joschamayer.png"
                    alt="Profile"
                    className="object-cover"
                  />
                </Avatar>
              </div>
            </div>

            <div className="relative w-[188px] h-[249px] rounded-[14px] border border-solid border-[#74767e4c] glass-effect shadow-md hover:shadow-glow-primary transition-all animate-scale-up" style={{"--animation-delay": "0.4s"} as React.CSSProperties}>
              <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-4 p-4">
                {socialMediaIcons.map((icon, index) => (
                  <button
                    key={index}
                    className="w-[51px] h-[55px] flex items-center justify-center rounded-[5px] border-2 border-solid border-[#f1f4ef] hover:bg-[#fea38e] hover:border-[#fea38e] transition-all hover:scale-110 hover:-translate-y-1 group"
                    style={{"--animation-delay": `${0.5 + index * 0.1}s`} as React.CSSProperties}
                  >
                    {icon.additionalSrc ? (
                      <div className="w-[30.49px] h-[33.03px] relative">
                        <img
                          className="absolute w-[75.00%] h-[75.00%] top-[12.50%] left-[12.50%] transition-transform group-hover:scale-110"
                          alt={icon.alt}
                          src={icon.src}
                        />
                        <img
                          className="absolute w-[44.16%] h-[43.46%] top-[25.82%] left-[30.72%] transition-transform group-hover:scale-110"
                          alt={`${icon.alt} overlay`}
                          src={icon.additionalSrc}
                        />
                      </div>
                    ) : (
                      <img
                        className="w-[30px] h-[30px] transition-transform group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                        alt={icon.alt}
                        src={icon.src}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 relative animate-fade-up opacity-0" style={{"--animation-delay": "0.3s"} as React.CSSProperties}>
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.6px] tracking-[0] leading-8 hover:text-[#fea38e] transition-colors">
                Karunarathne
              </h1>

              <div className="flex items-center gap-1 group">
                <img
                  className="w-4 h-4 transition-transform group-hover:rotate-12 group-hover:scale-125"
                  alt="Star"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-3.svg"
                />
                <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[15.1px] leading-6 group-hover:text-[#fea38e] transition-colors">
                  4,9
                </span>
                <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.9px] leading-6">
                  (<span className="underline hover:text-[#fea38e] transition-colors cursor-pointer">49</span>)
                </span>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4 text-[#222325]" />
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6">
                    Pays, ville
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <GlobeIcon className="w-4 h-4 text-[#222325]" />
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6">
                    Anglais
                  </span>
                </div>
              </div>

              {/* Phrase d'accroche orientée résultat */}
              <p className="[font-family:'Inter',Helvetica] font-semibold text-[#fea38e] text-lg tracking-[0] leading-7 mt-2">
                Des vidéos marketing qui transforment votre audience en clients.
              </p>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6 mt-1">
                Vidéos de marketing digital professionnelles de haute qualité,
                engageantes
              </p>

              {/* CTAs principaux */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6">
                <Button
                  onClick={() => {
                    // Préparation future checkout/contact modal
                    console.log("Contact intent:", { creatorId: "karunarathne", intent: "hero_primary" });
                  }}
                  className="bg-[#fea38e] hover:bg-[#e8937f] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full transition-all hover:shadow-lg flex items-center gap-2 shadow-glow-primary-hover hover:scale-105 animate-scale-up group"
                >
                  <MessageCircleIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Contacter ce créateur
                </Button>

                <Button
                  onClick={() => {
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="outline"
                  className="border-2 border-[#fea38e] text-[#fea38e] px-6 py-3 md:py-4 rounded-full hover:bg-[#fea38e]/10 transition-all flex items-center gap-2 hover:scale-105 animate-scale-up group"
                  style={{"--animation-delay": "0.2s"} as React.CSSProperties}
                >
                  Voir les services
                  <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col gap-4">
                <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base tracking-[0] leading-6">
                  À propos de moi :
                </h2>

                <div className="pl-3.5">
                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#404145] text-base tracking-[0] leading-6">
                    Je réalise des vidéos percutantes qui racontent votre
                    histoire et génèrent des résultats. Qu&apos;il s&apos;agisse
                    <br />
                    de promos de marque, de publicités pour les réseaux sociaux
                    ou de campagnes marketing, je fournis
                    <br />
                    des visuels de haute qualité avec des transitions fluides,
                    un message clair et un impact cr...
                  </p>

                  <button className="[font-family:'Inter',Helvetica] font-normal text-[#404145] text-base tracking-[0] leading-6 underline mt-2 hover:text-[#222325] transition-colors">
                    Plus d&apos;infos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full max-w-[476px] animate-fade-up opacity-0" style={{"--animation-delay": "0.6s"} as React.CSSProperties}>
          <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base tracking-[0] leading-6">
            Mes Compétences :
          </h2>

          <div className="flex items-center gap-[13px] flex-wrap">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                className="h-[29px] px-[13px] py-[9px] bg-[#fea38e] hover:bg-[#fe8f77] rounded-full border border-solid border-[#e4e5e7] [font-family:'Inter',Helvetica] font-normal text-[#f8f5f0] text-sm tracking-[0] leading-5 transition-all hover:scale-110 hover:shadow-glow-primary cursor-pointer animate-scale-up"
                style={{"--animation-delay": `${0.7 + index * 0.1}s`} as React.CSSProperties}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <img
        className="hidden lg:block w-[376.39px] h-[507.35px] flex-shrink-0 animate-float opacity-40 hover:opacity-60 transition-opacity"
        alt="Decorative vector"
        src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-6.svg"
      />
    </section>
  );
};
