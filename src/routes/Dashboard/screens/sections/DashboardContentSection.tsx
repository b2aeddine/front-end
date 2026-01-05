import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  MapPinIcon,
  MoreVerticalIcon,
  SearchIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../../../lib/auth";
import { fetchMyOrders, Order } from "../../../../lib/queries/orders";

const actionButtons = [
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14648.svg",
    label: "poster une appel\n d'offres",
  },
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14647.svg",
    label: "Vendre des\nservices",
  },
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14649.svg",
    label: "Trouvez des services",
  },
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14649.svg",
    label: "Trouvez des service a affilier",
  },
];

const applicantImages = [
  "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-6.png",
  "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-7.png",
  "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-8.png",
];

export const DashboardContentSection = (): JSX.Element => {
  const { user, profile, roles } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statsCards, setStatsCards] = useState([
    {
      title: "Commandes en cours",
      value: "0",
      change: "0%",
      changeText: "",
      trending: "up" as const,
      icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-2.png",
    },
    {
      title: "Revenues 30j",
      value: "€0",
      change: "0%",
      changeText: "",
      trending: "up" as const,
      icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon.png",
    },
    {
      title: "Messages\nnon-lues",
      value: "0",
      change: "0%",
      changeText: "",
      trending: "up" as const,
      icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-1.png",
    },
  ]);

  // Fetch orders on mount
  useEffect(() => {
    if (user?.id) {
      fetchMyOrders(user.id, 'buyer').then(({ data }) => {
        if (data) {
          setOrders(data.slice(0, 5));
          const activeOrders = data.filter(o => !['completed', 'cancelled', 'refunded'].includes(o.status)).length;
          setStatsCards(prev => prev.map((card, idx) => {
            if (idx === 0) return { ...card, value: String(activeOrders) };
            return card;
          }));
        }
      });
    }
  }, [user?.id]);

  const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Utilisateur';
  const avatarUrl = profile?.avatar_url || "https://c.animaapp.com/mjs8bxbnJhG6tv/img/man-438081-960-720.png";
  const primaryRole = roles.find(r => r.status === 'active')?.role || 'Membre';

  // Get the latest order for display
  const latestOrder = orders[0];

  return (
    <section className="flex flex-col w-full items-start border border-solid border-[#9797974c]">
      <header className="relative w-full h-[70px] bg-[#f8f5f0] border-[0.5px] border-solid border-[#97979766]">
        <div className="flex w-full max-w-[1095px] items-center justify-between mx-auto px-4 h-full">
          <div className="relative w-[390.65px]">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#202224] opacity-50" />
              <Input
                placeholder="Search"
                className="w-full h-[38px] bg-[#f5f6fa] rounded-[19px] border-[0.6px] border-neutral-300 pl-12 [font-family:'Nunito_Sans',Helvetica] text-sm"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-auto p-0">
              <div className="relative w-[31.05px] h-[30.5px]">
                <img
                  className="absolute w-[77.43%] h-[58.98%] top-[16.39%] left-0"
                  alt="Combined shape"
                  src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/combined-shape.svg"
                />
                <div className="absolute w-[19.36%] h-[19.67%] top-[63.93%] left-[29.03%] bg-[#ff0000] rounded-[2.25px] opacity-30" />
                <img
                  className="absolute w-[51.62%] h-[52.46%] top-0 left-[41.94%]"
                  alt="Oval"
                  src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/oval.svg"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[#f8f5f0] text-xs [font-family:'Nunito_Sans',Helvetica]">
                  6
                </div>
              </div>
            </Button>

            <Button variant="ghost" size="icon" className="h-auto p-0">
              <img
                className="w-[18.03px] h-[18px]"
                alt="Oval"
                src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/oval.svg"
              />
            </Button>

            <div className="flex items-center gap-2">
              <img
                className="w-[40.07px] h-[27px]"
                alt="Flag"
                src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/flag.png"
              />
              <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#646464] text-sm">
                English
              </span>
              <ChevronDownIcon className="w-4 h-4 text-[#646464]" />
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="[font-family:'Nunito_Sans',Helvetica] font-bold text-neutral-700 text-sm">
                  {displayName}
                </div>
                <div className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#565656] text-xs capitalize">
                  {primaryRole}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-auto p-0">
                <MoreVerticalIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col items-start gap-2.5 relative w-full">
        <img
          className="absolute top-0 left-0 w-full h-[1313.24px] object-cover -z-10"
          alt="Main bg color"
          src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
        />

        <div className="w-full px-[25px] pt-24">
          <h1 className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-[32px] tracking-[-0.11px]">
            Dashboard
          </h1>
        </div>

        <div className="flex flex-col w-full px-[25px] gap-3 mt-[54px]">
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex flex-col w-[708px] items-start gap-[9px]">
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="[font-family:'DM_Sans',Helvetica] font-bold text-[25px] tracking-[1.00px]">
                  <span className="text-[#202224] tracking-[0.25px]">
                    Salut{" "}
                  </span>
                  <span className="text-[#fea38e] tracking-[0.25px]">
                    {displayName}
                  </span>
                  <span className="text-[#202224] tracking-[0.25px]">
                    , quoi de neuf aujourd&apos;hui ?
                  </span>
                </div>
              </div>

              <Card className="w-[172px] bg-[#fff0f0] rounded-[3.2px] border-[0.4px] border-solid border-[#dcdcdc] shadow-[0px_1.6px_2.4px_-0.8px_#24242408,0px_4.8px_6.4px_-1.6px_#24242414]">
                <CardContent className="p-2 gap-[4.8px] flex flex-col">
                  <div className="flex items-start justify-between gap-1">
                    <div className="[font-family:'Inter',Helvetica] font-medium text-[#292929] text-[7.2px] leading-[7.2px]">
                      Notification title
                    </div>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#7c7c7c] text-[5.6px] leading-[8px]">
                      10 mins ago
                    </div>
                  </div>

                  <div className="relative w-full h-[60.8px] rounded-[3.2px] overflow-hidden border-[0.4px] border-solid border-[#dcdcdc]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Image"
                      src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/image-3.png"
                    />
                  </div>

                  <div className="[font-family:'Inter',Helvetica] font-normal text-neutral-600 text-[5.6px] leading-[8.4px]">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                  </div>

                  <div className="flex gap-[6.4px] items-start">
                    <Button
                      variant="ghost"
                      className="h-auto p-0 [font-family:'Inter',Helvetica] font-normal text-[#292929] text-[5.6px] leading-[8px]"
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 [font-family:'Inter',Helvetica] font-bold text-[#ab0909] text-[5.6px] leading-[8px]"
                    >
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col w-[391px] items-center gap-1">
              <Card className="w-[213px] bg-[#fea38ec7] rounded-[3.46px] border-[0.43px] border-solid border-[#dcdcdc] shadow-[0px_1.73px_2.6px_-0.87px_#24242408,0px_5.2px_6.93px_-1.73px_#24242414]">
                <CardContent className="p-[8.66px] flex items-start gap-[5.2px]">
                  <div className="flex items-center justify-center w-[20.79px] h-[20.79px] rounded-[3.46px]">
                    <img
                      className="w-[17.32px] h-[17.32px]"
                      alt="Icon rocketlaunch"
                      src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-rocketlaunch.svg"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-[7.85px] flex-1">
                    <div className="flex items-start justify-between w-full gap-[4.9px]">
                      <div className="[font-family:'Inter',Helvetica] font-medium text-[#292929] text-[8.8px] leading-[8.8px]">
                        Etat utlisateur
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#7c7c7c] text-[6.9px] leading-[9.8px]">
                        10 mins ago
                      </div>
                    </div>

                    <div className="[font-family:'Inter',Helvetica] font-normal text-neutral-600 text-[6.9px] leading-[10.3px]">
                      par exemple : il vous reste 1 verification a faire ou vous
                      n&apos;avez encore piblier aucun service
                    </div>

                    <div className="flex gap-[7.85px] items-start">
                      <Button
                        variant="ghost"
                        className="h-auto p-0 [font-family:'Inter',Helvetica] font-bold text-[#292929] text-[6.9px] leading-[9.8px]"
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-end gap-0">
                {actionButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex flex-col w-[78px] items-center h-auto p-0 hover:bg-transparent"
                  >
                    <img
                      className="w-[47px] h-[47px]"
                      alt="Frame"
                      src={button.icon}
                    />
                    <div className="h-[54px] flex items-center justify-center text-center [font-family:'DM_Sans',Helvetica] font-normal text-[#000000] text-[10px] leading-[15px] whitespace-pre-line">
                      {button.label}
                    </div>
                  </Button>
                ))}
              </div>

              <div className="flex items-start gap-2 w-full">
                {statsCards.map((stat, index) => (
                  <Card
                    key={index}
                    className="flex-1 bg-[#f8f5f0] rounded-[6.64px] border border-solid border-[#97979766] shadow-[2.85px_2.85px_25.61px_#0000000d]"
                  >
                    <CardContent className="p-[7px] flex flex-col gap-2.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="opacity-80 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-[10px] whitespace-pre-line">
                            {stat.title}
                          </div>
                          <img
                            className="w-[28.45px] h-[28.45px]"
                            alt="Icon"
                            src={stat.icon}
                          />
                        </div>

                        <div className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-[13.3px] tracking-[0.47px]">
                          {stat.value}
                        </div>

                        <div className="flex items-center gap-1">
                          {stat.trending === "up" ? (
                            <TrendingUpIcon className="w-3 h-3 text-[#00b69b]" />
                          ) : (
                            <TrendingDownIcon className="w-3 h-3 text-[#f93c65]" />
                          )}
                          <div className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[7.6px]">
                            <span
                              className={
                                stat.trending === "up"
                                  ? "text-[#00b69b]"
                                  : "text-[#f93c65]"
                              }
                            >
                              {stat.change}
                            </span>
                            <span className="text-[#606060]">
                              {" "}
                              {stat.changeText}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between w-full gap-4">
            <div className="w-[660px] flex flex-col items-start gap-[30px]">
              <div className="flex items-end justify-between w-full">
                <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-black text-[25px] tracking-[0.25px]">
                  Appel d&apos;offres recentes :
                </h2>
                <img
                  alt="Frame"
                  src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-40.svg"
                />
              </div>

              <Card className="w-[293.09px] bg-[#fea38e4c] rounded-lg border-[0.8px] border-solid border-[#fea38e]">
                <CardContent className="p-[7px] flex flex-col gap-2.5">
                  <div className="flex flex-col gap-[15px]">
                    <div className="flex items-center justify-between gap-[17px]">
                      <div className="flex flex-col gap-1">
                        <div className="[font-family:'Poppins',Helvetica] font-medium text-gray-900 text-[14.4px] leading-[14.4px]">
                          Senior UI/UX Designer
                        </div>
                        <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-[11.2px] leading-[11.2px]">
                          Salary: $30,000 - $55,000
                        </div>
                      </div>

                      <Badge className="bg-[#fea38e] text-[#f8f5f0] border border-solid border-[#e4e5e7] rounded-full h-[19px] px-[13px] [font-family:'Inter',Helvetica] font-normal text-[10px]">
                        Expert Graphiques
                      </Badge>
                    </div>

                    <div className="flex items-start gap-2">
                      <Avatar className="w-[49.15px] h-[49.15px] border-[0.61px] border-solid border-white">
                        <AvatarImage src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/joschamayer.png" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col gap-0.5 pt-0.5">
                        <div className="[font-family:'Poppins',Helvetica] font-medium text-[#303030] text-[12.8px] leading-[12.8px]">
                          Apple
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-3.5 h-3.5 text-gray-500" />
                          <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-[11.2px] leading-[11.2px]">
                            Boston, USA
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="[font-family:'DM_Sans',Helvetica] font-normal text-[#8e8e93] text-xs tracking-[0.60px] leading-[19.0px]">
                      brief detail de l&apos;appel d&apos;offre.
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
                        9+ applicants
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
                        Voir les details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col w-[391px] items-start gap-2.5 p-2.5">
              <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-4xl tracking-[1.44px]">
                Vos commandes :
              </h2>

              <Card className="w-full rounded-[15px] shadow-[1px_2px_6px_#0000001a,5px_9px_10px_#00000017,12px_20px_14px_#0000000d,22px_36px_17px_#00000003,34px_56px_18px_transparent] bg-[linear-gradient(180deg,rgba(254,163,142,0.7)_0%,rgba(248,245,240,1)_100%)] border-0">
                <CardContent className="p-4 flex flex-col gap-[7px]">
                  <div className="flex items-start justify-between">
                    <div className="opacity-90 font-semibold text-[#202224] text-sm [font-family:'Nunito_Sans',Helvetica]">
                      {latestOrder?.order_number || '00001'}
                    </div>
                    <Badge className="bg-[#00b69b] bg-opacity-20 text-[#00b69b] border border-solid border-[#97979766] rounded-[4.5px] h-[27px] px-4 [font-family:'Nunito_Sans',Helvetica] font-bold text-xs hover:bg-[#00b69b] hover:bg-opacity-20">
                      {latestOrder?.status || 'Completed'}
                    </Badge>
                  </div>

                  <div className="opacity-90 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-sm">
                    {latestOrder?.service?.title || 'Nom du service a faire'}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="opacity-90 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-sm">
                      {latestOrder?.seller?.display_name || 'Christine Brooks'}
                    </div>
                    <div className="opacity-90 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-sm">
                      Categorie et sous categorie
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="opacity-90 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-sm">
                      {latestOrder?.created_at ? new Date(latestOrder.created_at).toLocaleDateString('fr-FR') : '04 Sep 2019'}
                    </div>
                    <div className="opacity-90 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-sm">
                      Detail bref
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-[126px] h-9 rounded-[10px] border-[1.5px] border-solid border-[#fea38e] bg-transparent [font-family:'DM_Sans',Helvetica] font-extrabold italic text-[#303030] text-sm"
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
