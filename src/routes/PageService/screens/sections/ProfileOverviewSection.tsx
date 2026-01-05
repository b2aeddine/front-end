import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

const navLinks = [
  { label: "Partners" },
  { label: "How we Work" },
  { label: "Review" },
  { label: "Charity" },
];

const pricingTiers = [
  {
    title: "Ultra complet",
    price: "€ 299",
    duration: "⏱ 7j",
    revisions: "↺ ∞",
    concepts: "✦ 8 concepts",
    features: [
      { name: "Fichier imprimable HD", included: true },
      { name: "Transparence (PNG)", included: true },
      { name: "3D Mockup", included: true },
      { name: "Fichiers sources", included: true },
    ],
    textColor: "text-[#313d4f]",
  },
  {
    title: "Pour démarrer",
    price: "€ 129",
    duration: "⏱ 14j",
    revisions: "↺ 2",
    concepts: "✦ 2 concepts",
    features: [
      { name: "Fichier imprimable HD", included: true },
      { name: "Transparence (PNG)", included: true },
      { name: "3D Mockup", included: false },
      { name: "Fichiers sources", included: false },
    ],
    textColor: "text-[#202224]",
  },
  {
    title: "Le meilleur choix",
    price: "€ 199",
    duration: "⏱ 10j",
    revisions: "↺ 5",
    concepts: "✦ 4 concepts",
    features: [
      { name: "Fichier imprimable HD", included: true },
      { name: "Transparence (PNG)", included: true },
      { name: "3D Mockup", included: true },
      { name: "Fichiers sources", included: true },
    ],
    textColor: "text-[#313d4f]",
  },
];

export const ProfileOverviewSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[70px] w-full">
      <div className="flex flex-col w-full max-w-[1192px] items-start gap-2.5">
        <div className="flex flex-col items-start gap-2.5 w-full">
          <nav className="flex items-center gap-[211px] w-full">
            <div className="inline-flex items-center gap-2">
              <img
                className="w-8 h-8"
                alt="Logo"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/logo.svg"
              />
              <div className="[font-family:'Kulim_Park',Helvetica] font-bold text-[#1f392c] text-2xl tracking-[0] leading-6 whitespace-nowrap">
                The Creator
              </div>
            </div>

            <div className="inline-flex items-start gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <Button className="h-auto bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-[100px] px-8 py-3">
              <span className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#f8f5f0] text-lg text-center tracking-[0.18px] leading-6">
                S&apos;inscrire
              </span>
            </Button>
          </nav>

          <div className="flex flex-col w-full max-w-[1122px] items-center gap-2.5">
            <Separator className="w-full bg-[url(https://c.animaapp.com/mjsa8xj74uh4Dq/img/line-4.svg)] bg-cover bg-[50%_50%]" />

            <div className="inline-flex items-center gap-[50px]">
              <div className="inline-flex items-start gap-8">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-start gap-8">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <img
              className="w-[1021px] h-0.5 object-cover"
              alt="Line"
              src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/line-5.svg"
            />
          </div>
        </div>
      </div>

      <div className="flex items-end gap-[84px] w-full">
        <div className="flex flex-col w-[855px] items-start gap-[41px]">
          <div className="flex flex-col items-center gap-[21px] w-full">
            <h1 className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-black text-xl text-center tracking-[0] leading-[normal]">
              Titre du services
            </h1>

            <div className="flex flex-col items-start gap-2.5 p-2.5 w-full">
              <div className="flex items-start gap-[69px] w-full">
                <div className="inline-flex items-center gap-8">
                  <div className="relative w-40 h-40 bg-white rounded-[80px]">
                    <div className="absolute -top-2 -left-2 w-44 h-44 rounded-[88px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />
                    <div className="absolute top-0 left-0 w-40 h-40 flex">
                      <div className="flex-1 w-40 rounded-[80px] border-2 border-solid border-white bg-[url(https://c.animaapp.com/mjsa8xj74uh4Dq/img/joschamayer.png)] bg-cover bg-[50%_50%]" />
                    </div>
                  </div>

                  <div className="flex flex-col w-[445.65px] items-start gap-2">
                    <div className="inline-flex items-center gap-2">
                      <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.4px] tracking-[0] leading-8 whitespace-nowrap">
                        Joscha
                      </h2>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-lg tracking-[0] leading-[26px] whitespace-nowrap">
                        @joschamayer
                      </span>
                    </div>

                    <div className="relative w-[84.16px] h-6">
                      <img
                        className="absolute w-[calc(100%_-_68px)] h-[calc(100%_-_8px)] top-0.5 left-0"
                        alt="Star"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-3.svg"
                      />
                      <div className="absolute top-0 left-5 w-[25px] h-6 flex items-center justify-center [font-family:'Inter',Helvetica] font-bold text-[#222325] text-[15.1px] tracking-[0] leading-6 whitespace-nowrap">
                        4,9
                      </div>
                      <div className="absolute top-1 left-12 w-9 h-4 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-[14.8px] tracking-[0] leading-6 whitespace-nowrap">
                        <span>(</span>
                        <span className="underline">120</span>
                        <span>)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full">
                      <img
                        className="w-4 h-4"
                        alt="Location"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-49.svg"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6 whitespace-nowrap">
                        Royaume-Uni
                      </span>
                      <img
                        className="w-4 h-4"
                        alt="Language"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-39.svg"
                      />
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-base tracking-[0] leading-6 whitespace-nowrap">
                        Anglais, Allemand, Français, Espagnol
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="h-9 w-[126px] bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-[10px] shadow-[0px_3px_3px_#00000040]">
                  <span className="[font-family:'DM_Sans',Helvetica] font-extrabold italic text-white text-sm text-center tracking-[0] leading-[normal]">
                    Voir mon profil
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <img
            className="w-[764px]"
            alt="Divider"
            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/frame-14689.svg"
          />

          <div className="flex flex-col items-center gap-1.5 w-full">
            <div className="flex flex-col w-[328px] items-end">
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.8px] tracking-[0] leading-8 whitespace-nowrap">
                A propos de mes Services
              </h3>
              <img
                className="w-[121.73px] h-[25.39px]"
                alt="Underline"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector.svg"
              />
            </div>

            <div className="flex flex-col h-[117px] items-start gap-2.5 px-0 py-[18px] w-full rounded-[14px] border border-solid border-[#74767e4c] relative">
              <p className="[font-family:'DM_Sans',Helvetica] font-medium text-[#404145] text-base tracking-[0] leading-6 w-[779.39px]">
                Je réalise des vidéos percutantes qui racontent votre histoire
                et génèrent des résultats. Qu&#39;il s&#39;agisse
                <br />
                de promos de marque, de publicités pour les réseaux sociaux ou
                de campagnes marketing, je fournis
                <br />
                des visuels de haute qualité avec des transitions fluides, un
                message clair et un impact cr...
              </p>
              <button className="absolute top-20 left-[704px] [font-family:'Inter',Helvetica] font-normal text-[#404145] text-base tracking-[0] leading-6 underline whitespace-nowrap hover:opacity-80 transition-opacity">
                Plus d&apos;infos
              </button>
            </div>
          </div>
        </div>

        <Card className="w-[424px] h-[801px] rounded-[15px] border border-solid border-[#dadbdd9e] shadow-[0px_-2px_5px_#0000001a,0px_-9px_9px_#00000017,0px_-21px_12px_#0000000d,0px_-37px_15px_#00000003,0px_-57px_16px_transparent]">
          <CardContent className="flex flex-col w-[362px] items-center gap-5 p-7 pt-[26px]">
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="inline-flex items-center">
                <div className="w-[31px] h-[33px] bg-[#fea38e] rounded-[15.5px/16.5px]" />
                <div className="w-14 h-[5px] bg-[#fea38e]" />
                <div className="w-14 h-[5px] bg-[#d9d9d9]" />
                <div className="w-[31px] h-[33px] bg-[#d9d9d9] rounded-[15.5px/16.5px]" />
                <div className="w-14 h-[5px] bg-[#d9d9d9]" />
                <div className="w-14 h-[5px] bg-[#d9d9d9]" />
                <div className="w-[31px] h-[33px] bg-[#d9d9d9] rounded-[15.5px/16.5px]" />
              </div>

              <div className="flex items-center gap-[74px] w-full">
                <span className="[font-family:'Inter',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-6 whitespace-nowrap w-[68px]">
                  basic
                </span>
                <span className="[font-family:'Inter',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-6 whitespace-nowrap w-[68px]">
                  basic
                </span>
                <span className="[font-family:'Inter',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-6 whitespace-nowrap w-[68px]">
                  basic
                </span>
              </div>
            </div>

            <Separator className="w-full h-[3.07px]" />

            <div className="flex flex-col w-[231px] items-start gap-[22px]">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-[18px] w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`[font-family:'Inter',Helvetica] font-normal ${tier.textColor} text-xs tracking-[0] leading-[normal]`}
                    >
                      {tier.title}
                    </span>
                    <span className="[font-family:'Inter',Helvetica] font-bold italic text-gray-900 text-lg tracking-[0] leading-[normal]">
                      {tier.price}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-[27px]">
                    <span
                      className={`[font-family:'Inter',Helvetica] font-normal ${tier.textColor} text-xs tracking-[0] leading-[normal]`}
                    >
                      {tier.duration}
                    </span>
                    <span
                      className={`[font-family:'Inter',Helvetica] font-normal ${tier.textColor} text-xs tracking-[0] leading-[normal]`}
                    >
                      {tier.revisions}
                    </span>
                    <span
                      className={`[font-family:'Inter',Helvetica] font-normal ${tier.textColor} text-xs tracking-[0] leading-[normal]`}
                    >
                      {tier.concepts}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col w-[125px] items-start gap-[9px]">
                      {tier.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className={`[font-family:'Inter',Helvetica] font-normal ${tier.textColor} text-xs tracking-[0] leading-[normal]`}
                        >
                          {feature.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col w-[11px] items-start gap-[9px]">
                      {tier.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className={`[font-family:'Inter',Helvetica] font-normal ${
                            feature.included
                              ? "text-green-600"
                              : "text-[#979797]"
                          } text-xs tracking-[0] leading-[normal]`}
                        >
                          {feature.included ? "✓" : "—"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="[font-family:'Inter',Helvetica] font-normal text-[#62646a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
              Temps de réponse moyen de 3 heures
            </p>

            <Button className="h-12 w-full bg-[#fea38e] hover:bg-[#fea38e]/90 rounded-lg border border-solid border-transparent shadow-[0px_2px_5px_#0000001a,0px_9px_9px_#00000017,0px_20px_12px_#0000000d,0px_35px_14px_#00000003,0px_55px_15px_transparent] relative">
              <img
                className="absolute top-[calc(50.00%_-_8px)] left-[calc(50.00%_-_70px)] w-4 h-4"
                alt="Contact"
                src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/svg-48.svg"
              />
              <span className="[font-family:'Inter',Helvetica] font-semibold text-white text-[15.9px] text-center tracking-[0] leading-[26px] whitespace-nowrap">
                Contactez-moi
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
