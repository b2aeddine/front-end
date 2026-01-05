import { GlobeIcon, MapPinIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
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
          <div className="flex flex-col items-center gap-[18px] relative">
            <div className="inline-flex items-center gap-2.5 bg-white rounded-[80px]">
              <div className="relative w-40 h-40">
                <div className="absolute -top-2 -left-2 w-44 h-44 rounded-[88px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />
                <Avatar className="absolute w-full h-full top-0 left-0 rounded-[80px] border-2 border-solid border-white">
                  <AvatarImage
                    src="https://c.animaapp.com/mjs9uq4eaVmanC/img/joschamayer.png"
                    alt="Profile"
                    className="object-cover"
                  />
                </Avatar>
              </div>
            </div>

            <div className="relative w-[188px] h-[249px] rounded-[14px] border border-solid border-[#74767e4c]">
              <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-4 p-4">
                {socialMediaIcons.map((icon, index) => (
                  <button
                    key={index}
                    className="w-[51px] h-[55px] flex items-center justify-center rounded-[5px] border-2 border-solid border-[#f1f4ef] hover:bg-gray-50 transition-colors"
                  >
                    {icon.additionalSrc ? (
                      <div className="w-[30.49px] h-[33.03px] relative">
                        <img
                          className="absolute w-[75.00%] h-[75.00%] top-[12.50%] left-[12.50%]"
                          alt={icon.alt}
                          src={icon.src}
                        />
                        <img
                          className="absolute w-[44.16%] h-[43.46%] top-[25.82%] left-[30.72%]"
                          alt={`${icon.alt} overlay`}
                          src={icon.additionalSrc}
                        />
                      </div>
                    ) : (
                      <img
                        className="w-[30px] h-[30px]"
                        alt={icon.alt}
                        src={icon.src}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 relative">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.6px] tracking-[0] leading-8">
                Karunarathne
              </h1>

              <div className="flex items-center gap-1">
                <img
                  className="w-4 h-4"
                  alt="Star"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg-3.svg"
                />
                <span className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[15.1px] leading-6">
                  4,9
                </span>
                <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.9px] leading-6">
                  (<span className="underline">49</span>)
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

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6 mt-2">
                Vidéos de marketing digital professionnelles de haute qualité,
                engageantes
              </p>

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

        <div className="flex flex-col items-start gap-2 w-full max-w-[476px]">
          <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base tracking-[0] leading-6">
            Mes Compétences :
          </h2>

          <div className="flex items-center gap-[13px] flex-wrap">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                className="h-[29px] px-[13px] py-[9px] bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-full border border-solid border-[#e4e5e7] [font-family:'Inter',Helvetica] font-normal text-[#f8f5f0] text-sm tracking-[0] leading-5"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <img
        className="hidden lg:block w-[376.39px] h-[507.35px] flex-shrink-0"
        alt="Decorative vector"
        src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-6.svg"
      />
    </section>
  );
};
