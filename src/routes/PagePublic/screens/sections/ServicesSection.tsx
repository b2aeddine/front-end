import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

const projectData = {
  date: "De : juillet 2023",
  title: "Derrick Hillman for Hawes & Curtis",
  description:
    "The influencer, Derrick, approached me about shooting a series of fashion photos of him wearing his Hawes & Curtis collection, to be used on his and their social media accounts. The main challenge was covering a wide range",
  tag: "Expert Graphiques",
  cost: "$200-$400",
  duration: "1 à 7 jours",
  mainImage: "https://c.animaapp.com/mjs9uq4eaVmanC/img/lr-05270-jpg.png",
  imageCount: 5,
};

const thumbnails = [
  {
    image:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/derrick-hillman-for-hawes---curtis.png",
    borderClass: "border-2 border-[#0c0c0d]",
  },
  {
    image:
      "https://c.animaapp.com/mjs9uq4eaVmanC/img/travel-photoshoot-around-tower-bridge.png",
    borderClass: "border border-[#dadbdd]",
  },
  {
    image: null,
    borderClass: "border border-[#dadbdd]",
    showCount: true,
  },
];

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-2">
      <header className="flex flex-col w-[121.73px] items-center">
        <h2 className="flex items-center justify-center self-stretch h-8 mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-[#222325] text-2xl text-center tracking-[0] leading-8 whitespace-nowrap">
          Portfolio
        </h2>

        <img
          className="w-[121.73px] h-[25.39px]"
          alt="Vector"
          src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector.svg"
        />
      </header>

      <div className="flex items-center gap-4 w-full">
        <Card className="flex-1 rounded-[14px] shadow-[2px_7px_15px_#0000001a,9px_26px_28px_#00000017,21px_60px_38px_#0000000d,37px_106px_45px_#00000003,57px_166px_49px_transparent] bg-[linear-gradient(215deg,rgba(254,163,142,1)_0%,rgba(248,245,240,1)_100%)] border-[#dadbdd]">
          <CardContent className="p-0">
            <div className="w-full h-[450.28px] rounded-2xl border border-solid border-[#dadbdd]">
              <div className="flex items-start gap-[38px] pt-[33px] px-[25px]">
                <div className="flex flex-col w-[514px] items-start gap-[130px]">
                  <div className="flex flex-col items-start gap-[19px] w-full">
                    <p className="flex items-center justify-center self-stretch h-6 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-base tracking-[0] leading-6 whitespace-nowrap">
                      {projectData.date}
                    </p>

                    <div className="w-full h-8">
                      <div className="w-[410px] h-8 flex overflow-hidden">
                        <h3 className="flex items-center justify-center mt-1 w-[410.33px] h-6 [font-family:'Inter',Helvetica] font-bold text-[#222325] text-2xl leading-8 tracking-[0] whitespace-nowrap">
                          {projectData.title}
                        </h3>
                      </div>
                    </div>

                    <div className="w-full h-[66px]">
                      <p className="pt-1 w-[505px] h-[58px] flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#222325] text-sm tracking-[0] leading-[22px]">
                        {projectData.description}
                      </p>
                    </div>

                    <Badge className="h-auto inline-flex items-center justify-center gap-2.5 px-[13px] py-[9px] bg-[#fea38e] rounded-full border border-solid border-[#e4e5e7] hover:bg-[#fea38e]">
                      <span className="flex items-center justify-center w-fit mt-[-5.50px] mb-[-3.50px] [font-family:'Inter',Helvetica] text-[#f8f5f0] leading-5 whitespace-nowrap font-normal text-sm tracking-[0]">
                        {projectData.tag}
                      </span>
                    </Badge>
                  </div>

                  <div className="inline-flex items-center gap-4">
                    <div className="flex flex-col w-[200px] items-start gap-0.5">
                      <div className="w-full h-[18px]">
                        <p className="pt-[3px] w-[84px] h-3 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                          Coût du projet
                        </p>
                      </div>

                      <div className="w-full h-6">
                        <p className="pt-1 w-[86px] h-4 font-bold text-[#222325] text-[14.6px] leading-6 flex items-center justify-center [font-family:'Inter',Helvetica] tracking-[0] whitespace-nowrap">
                          {projectData.cost}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col w-[200px] items-start gap-0.5">
                      <div className="w-full h-[18px]">
                        <p className="pt-[3px] w-[91px] h-3 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                          Durée du projet
                        </p>
                      </div>

                      <div className="w-full h-6">
                        <p className="pt-1 w-[79px] h-4 flex items-center justify-center [font-family:'Inter',Helvetica] font-bold text-[#222325] text-base tracking-[0] leading-6 whitespace-nowrap">
                          {projectData.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="relative w-[512px] h-[384.28px] rounded-lg overflow-hidden bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${projectData.mainImage})` }}
                >
                  <div className="absolute w-full h-full top-0 left-0 bg-[#0000001a]" />

                  <div className="absolute right-8 bottom-8 w-14 h-[30px] flex gap-2 bg-[#00000080] rounded-full backdrop-blur-[1px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1px)_brightness(100%)]">
                    <img
                      className="h-4 w-4 self-center ml-3"
                      alt="Svg"
                      src="https://c.animaapp.com/mjs9uq4eaVmanC/img/svg.svg"
                    />

                    <span className="flex items-center justify-center mt-1 w-[8.31px] h-[22px] [font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
                      {projectData.imageCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col w-[189px] items-start gap-3">
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className="w-full h-[142.09px]">
              {thumbnail.showCount ? (
                <div
                  className={`w-[189px] h-[142px] flex flex-col items-center justify-center rounded-md overflow-hidden ${thumbnail.borderClass}`}
                >
                  <span className="h-[18px] w-[31.45px] font-bold text-[#222325] text-base text-center leading-[26px] flex items-center justify-center [font-family:'Inter',Helvetica] tracking-[0] whitespace-nowrap">
                    +23
                  </span>

                  <span className="flex items-center justify-center h-6 w-[54.54px] [font-family:'Inter',Helvetica] font-normal text-[#74767e] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Projets
                  </span>
                </div>
              ) : (
                <div
                  className={`w-[189px] h-[142px] flex justify-center rounded-md overflow-hidden ${thumbnail.borderClass}`}
                >
                  <div
                    className={`${index === 0 ? "mt-1 w-[181px] h-[134.09px]" : "mt-px w-[187px] h-[140.09px]"} bg-cover bg-[50%_50%]`}
                    style={{ backgroundImage: `url(${thumbnail.image})` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
