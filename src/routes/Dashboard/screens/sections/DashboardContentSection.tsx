import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  MapPinIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../../../lib/auth";
import { fetchMyOrders, Order } from "../../../../lib/queries/orders";
import { fetchDashboardStats, fetchRevenueStats } from "../../../../lib/queries/dashboard";
import { useUserState, DashboardStats } from "../../../../lib/useUserState";
import { ServiceCreationModal, AppelOffresModal, AccountSetupModal } from "../../../../components/modals";

// Intent-based action buttons (role-based filtering happens invisibly)
const actionButtons = [
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14648.svg",
    label: "Trouver un\nprestataire",
    path: "/dashboard/appels-offres",
    modal: "appel_offres" as const,
    roles: ['merchant'] as const,
    stateMatch: ['active_user'] as const,
    priority: 1,
  },
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14647.svg",
    label: "Gagner de\nl'argent",
    path: "/dashboard/services",
    modal: "service_creation" as const,
    roles: ['freelance', 'influencer'] as const,
    stateMatch: ['no_service_created', 'active_user'] as const,
    priority: 2,
  },
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14649.svg",
    label: "Explorer les\nservices",
    path: "/services",
    modal: null,
    roles: ['merchant', 'freelance', 'influencer', 'agent'] as const,
    stateMatch: ['first_order_pending', 'active_user'] as const,
    priority: 3,
  },
  {
    icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-14649.svg",
    label: "Promouvoir\ndes offres",
    path: "/dashboard/affiliation",
    modal: null,
    roles: ['agent', 'influencer'] as const,
    stateMatch: ['affiliate_active', 'active_user'] as const,
    priority: 4,
  },
];

const applicantImages = [
  "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-6.png",
  "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-7.png",
  "https://c.animaapp.com/mjs8bxbnJhG6tv/img/ellipse-8.png",
];

import { DashboardHeader } from "../../components/DashboardHeader";
import { MasterCard } from "../../../../components/ui/MasterCard";
import { ExpectedResult } from "../../../../components/ui/ExpectedResult";

export const DashboardContentSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, profile, roles } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

  // Modal states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isAppelOffresModalOpen, setIsAppelOffresModalOpen] = useState(false);
  const [isAccountSetupModalOpen, setIsAccountSetupModalOpen] = useState(false);

  const [statsCards, setStatsCards] = useState([
    {
      title: "Commandes en cours",
      value: "0",
      change: "0%",
      changeText: "",
      trending: "up" as "up" | "down",
      icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-2.png",
      alwaysShow: true,
    },
    {
      title: "Revenues 30j",
      value: "€0",
      change: "0%",
      changeText: "",
      trending: "up" as "up" | "down",
      icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon.png",
      alwaysShow: false, // Hide for new users with no revenue
    },
    {
      title: "Messages\nnon-lues",
      value: "0",
      change: "0%",
      changeText: "",
      trending: "up" as "up" | "down",
      icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-1.png",
      alwaysShow: true,
    },
  ]);

  // Determine primary role for dashboard context
  const primaryRole = roles.find(r => r.status === 'active')?.role;
  const dashboardRole: 'buyer' | 'seller' =
    primaryRole === 'freelance' || primaryRole === 'influencer' ? 'seller' : 'buyer';

  // =========================================================================
  // Intelligent User State
  // =========================================================================
  const userState = useUserState({
    profile,
    roles,
    stats: dashboardStats,
  });

  // Sort and prioritize CTA buttons based on user state
  const sortedButtons = [...actionButtons]
    .filter(btn => {
      if (!primaryRole) return true;
      return (btn.roles as readonly string[]).includes(primaryRole);
    })
    .sort((a, b) => {
      const aMatch = a.stateMatch.some(s => s === userState.primaryState);
      const bMatch = b.stateMatch.some(s => s === userState.primaryState);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a.priority - b.priority;
    });

  // Filter stats cards - hide irrelevant ones for new users
  const visibleStats = statsCards.filter(stat => {
    if (stat.alwaysShow) return true;
    // Hide revenue for users with no revenue and not a seller
    if (stat.title.includes('Revenue') && dashboardStats?.totalRevenue === 0 && dashboardRole !== 'seller') {
      return false;
    }
    return true;
  });

  // Fetch dashboard stats and orders on mount
  useEffect(() => {
    if (!user?.id) return;

    const loadDashboard = async () => {
      // Fetch dashboard stats (active orders, revenue, unread messages)
      const { data: stats } = await fetchDashboardStats(user.id, dashboardRole);

      // Fetch orders for display
      const { data: ordersData } = await fetchMyOrders(user.id, dashboardRole);
      if (ordersData) {
        setOrders(ordersData.slice(0, 5));
      }

      // For sellers, also fetch detailed revenue stats
      let revenueChange = 0;
      if (dashboardRole === 'seller') {
        const { data: revenueData } = await fetchRevenueStats(user.id);
        if (revenueData) {
          revenueChange = revenueData.percentChange;
        }
      }

      // Update stats cards with real data
      if (stats) {
        // Store raw stats for useUserState hook
        setDashboardStats(stats);

        setStatsCards([
          {
            title: "Commandes en cours",
            value: String(stats.activeOrders),
            change: stats.activeOrders > 0 ? "+1" : "0",
            changeText: "cette semaine",
            trending: "up" as "up" | "down",
            icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-2.png",
            alwaysShow: true,
          },
          {
            title: "Revenues 30j",
            value: `€${stats.totalRevenue.toFixed(0)} `,
            change: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}% `,
            changeText: "vs mois précédent",
            trending: (revenueChange >= 0 ? "up" : "down") as "up" | "down",
            icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon.png",
            alwaysShow: false, // Hide for new users
          },
          {
            title: "Messages\nnon-lues",
            value: String(stats.unreadMessages),
            change: stats.unreadMessages > 0 ? "Nouveau" : "",
            changeText: "",
            trending: "up" as "up" | "down",
            icon: "https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-1.png",
            alwaysShow: true,
          },
        ]);
      }
    };

    loadDashboard();
  }, [user?.id, dashboardRole]);

  const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Utilisateur';

  // Get the latest order for display
  const latestOrder = orders[0];

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

          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
            <h1 className="dashboard-title">
              Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-7xl mx-auto px-4 md:px-8 gap-8 pb-12">

            {/* LEFT COLUMN (8 cols) - Master Flow: MasterCard → ExpectedResult → Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {/* 1. MASTER CARD - Always at top, one headline, one action */}
              <MasterCard
                headline={userState.masterCard.headline}
                actionLabel={userState.masterCard.actionLabel}
                actionPath={userState.masterCard.actionPath}
                onAction={
                  userState.primaryState === 'profile_incomplete' || userState.priorityMode === 'onboarding'
                    ? () => setIsAccountSetupModalOpen(true)
                    : undefined
                }
              />

              {/* 2. EXPECTED RESULT - Motivation zone */}
              <ExpectedResult
                currentValue={userState.expectedResult.currentValue}
                potential={userState.expectedResult.potential}
                encouragement={userState.expectedResult.encouragement}
              />

              {/* 3. Welcome message (simplified) */}
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="[font-family:'DM_Sans',Helvetica] font-bold text-xl tracking-[0.25px] text-left w-full">
                  <span className="text-[#202224]">Salut </span>
                  <span className="text-[#fea38e]">{displayName}</span>
                  <span className="text-[#202224]"> 👋</span>
                </div>
              </div>

              {/* 2. Your Orders (Moved from right column) */}
              <div className="flex flex-col w-full items-start gap-2.5 mt-4">
                <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-[25px] tracking-[0.25px]">
                  Vos commandes :
                </h2>

                <Card className="w-full md:max-w-[400px] rounded-[15px] shadow-[1px_2px_6px_#0000001a,5px_9px_10px_#00000017,12px_20px_14px_#0000000d,22px_36px_17px_#00000003,34px_56px_18px_transparent] bg-[linear-gradient(180deg,rgba(254,163,142,0.7)_0%,rgba(248,245,240,1)_100%)] border-0">
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
                      className="w-[126px] h-9 rounded-[10px] border-[1.5px] border-solid border-[#fea38e] bg-transparent [font-family:'DM_Sans',Helvetica] font-bold text-[#303030] text-sm"
                    >
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* RIGHT COLUMN (4 cols) - Sidebar Widgets */}
            <div className="lg:col-span-4 flex flex-col gap-8 w-full pr-4 lg:pr-8">

              {/* 1. Status & Actions */}
              <div className="flex flex-col w-full items-center lg:items-start gap-4">
                <Card className="w-full max-w-[391px] bg-[#fea38ec7] rounded-[3.46px] border-[0.43px] border-solid border-[#dcdcdc] shadow-[0px_1.73px_2.6px_-0.87px_#24242408,0px_5.2px_6.93px_-1.73px_#24242414]">
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
                          État utilisateur
                        </div>
                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#7c7c7c] text-[6.9px] leading-[9.8px]">
                          Priorité {userState.priority}
                        </div>
                      </div>

                      <div className="[font-family:'Inter',Helvetica] font-normal text-neutral-600 text-[6.9px] leading-[10.3px]">
                        {userState.message}
                      </div>

                      <div className="flex gap-[7.85px] items-start">
                        <Button
                          variant="ghost"
                          className="h-auto p-0 [font-family:'Inter',Helvetica] font-bold text-[#292929] text-[6.9px] leading-[9.8px]"
                          onClick={() => navigate(userState.actionPath)}
                        >
                          {userState.actionLabel}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-4 gap-2 w-full max-w-[391px]">
                  {sortedButtons.slice(0, 4).map((button, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`flex flex-col w-full items-center h-auto p-0 hover:bg-transparent ${index === 0 ? 'opacity-100' : 'opacity-70'}`}
                      onClick={() => {
                        if (button.modal === 'service_creation') {
                          setIsServiceModalOpen(true);
                        } else if (button.modal === 'appel_offres') {
                          setIsAppelOffresModalOpen(true);
                        } else {
                          navigate(button.path);
                        }
                      }}
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

                <div className="grid grid-cols-2 gap-2 w-full max-w-[391px]">
                  {visibleStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-[#f8f5f0] rounded-[6.64px] border border-solid border-[#97979766] shadow-[2.85px_2.85px_25.61px_#0000000d]"
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

              {/* 2. Recent Offers (Conditional - user must "earn" access) */}
              {userState.canAccessOffers && (
                <div className="flex flex-col items-start gap-[30px] w-full max-w-[391px]">
                  <div className="flex items-end justify-between w-full">
                    <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-black text-[25px] tracking-[0.25px]">
                      Opportunités récentes :
                    </h2>
                    <img
                      alt="Frame"
                      src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-40.svg"
                    />
                  </div>

                  <Card className="w-full bg-[#fea38e4c] rounded-lg border-[0.8px] border-solid border-[#fea38e]">
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
                            className="flex-1 h-9 rounded-[10px] border-[1.5px] border-solid border-[#fea38e] bg-transparent [font-family:'DM_Sans',Helvetica] font-bold text-[#303030] text-sm"
                          >
                            Voir les détails
                          </Button>
                          <Button className="flex-1 h-9 rounded-[10px] bg-[#fea38e] hover:bg-[#fea38e]/90 [font-family:'DM_Sans',Helvetica] font-bold text-[#f8f5f0] text-sm">
                            Voir les details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ServiceCreationModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onComplete={(data) => {
          console.log('Service created:', data);
          setIsServiceModalOpen(false);
          navigate('/dashboard/services');
        }}
      />
      <AppelOffresModal
        isOpen={isAppelOffresModalOpen}
        onClose={() => setIsAppelOffresModalOpen(false)}
        onComplete={(data) => {
          console.log('Appel offres created:', data);
          setIsAppelOffresModalOpen(false);
          navigate('/dashboard/appels-offres');
        }}
      />
      <AccountSetupModal
        isOpen={isAccountSetupModalOpen}
        onClose={() => setIsAccountSetupModalOpen(false)}
        onComplete={() => {
          setIsAccountSetupModalOpen(false);
          // After account setup is complete, open the service creation modal
          setIsServiceModalOpen(true);
        }}
      />
    </>
  );
};
