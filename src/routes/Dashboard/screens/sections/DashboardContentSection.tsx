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
          {/* Background image - optimized for mobile */}
          <img
            className="absolute top-0 left-0 w-full h-[800px] sm:h-[1000px] md:h-[1313px] object-cover -z-10 opacity-60 sm:opacity-100"
            alt="Main bg color"
            src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
          />

          {/* Header with extra left padding on mobile for burger menu */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 pl-16 sm:pl-6 lg:pl-8">
            <h1 className="dashboard-title text-xl sm:text-2xl md:text-3xl font-bold text-[#202224]">
              Dashboard
            </h1>
          </div>

          {/* Main grid - stacked on mobile, side by side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 gap-6 md:gap-8 pb-8 md:pb-12">

            {/* LEFT COLUMN (8 cols on lg) - Master Flow: MasterCard → ExpectedResult → Content */}
            <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">

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

              {/* 3. Welcome message (simplified) - responsive text */}
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="[font-family:'DM_Sans',Helvetica] font-bold text-lg sm:text-xl tracking-[0.25px] text-left w-full">
                  <span className="text-[#202224]">Salut </span>
                  <span className="text-[#fea38e]">{displayName}</span>
                  <span className="text-[#202224]"> 👋</span>
                </div>
              </div>

              {/* 2. Your Orders - Full width on mobile */}
              <div className="flex flex-col w-full items-start gap-2.5 mt-2 sm:mt-4">
                <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-lg sm:text-xl md:text-[25px] tracking-[0.25px]">
                  Vos commandes :
                </h2>

                <Card className="w-full sm:max-w-[400px] rounded-xl sm:rounded-[15px] shadow-lg bg-[linear-gradient(180deg,rgba(254,163,142,0.7)_0%,rgba(248,245,240,1)_100%)] border-0">
                  <CardContent className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-[7px]">
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
                      className="w-full sm:w-[126px] h-10 sm:h-9 rounded-xl sm:rounded-[10px] border-[1.5px] border-solid border-[#fea38e] bg-transparent [font-family:'DM_Sans',Helvetica] font-bold text-[#303030] text-sm min-h-[44px] sm:min-h-0"
                    >
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* RIGHT COLUMN (4 cols on lg) - Sidebar Widgets - Shows first on mobile */}
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 w-full order-1 lg:order-2">

              {/* 1. Status & Actions - Full width on mobile */}
              <div className="flex flex-col w-full items-center gap-3 sm:gap-4">
                {/* Status Card - scales on mobile */}
                <Card className="w-full bg-[#fea38ec7] rounded-lg border border-[#dcdcdc] shadow-sm">
                  <CardContent className="p-3 sm:p-4 flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-6 sm:h-6 rounded-lg bg-white/20 flex-shrink-0">
                      <img
                        className="w-5 h-5 sm:w-4 sm:h-4"
                        alt="Icon rocketlaunch"
                        src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-rocketlaunch.svg"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                      <div className="flex items-start justify-between w-full gap-2">
                        <div className="[font-family:'Inter',Helvetica] font-medium text-[#292929] text-xs sm:text-[10px] leading-tight">
                          État utilisateur
                        </div>
                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#7c7c7c] text-[10px] sm:text-[8px] leading-tight flex-shrink-0">
                          Priorité {userState.priority}
                        </div>
                      </div>

                      <div className="[font-family:'Inter',Helvetica] font-normal text-neutral-600 text-xs sm:text-[10px] leading-relaxed">
                        {userState.message}
                      </div>

                      <div className="flex gap-2 items-start">
                        <Button
                          variant="ghost"
                          className="h-auto p-0 [font-family:'Inter',Helvetica] font-bold text-[#292929] text-xs sm:text-[10px] leading-tight underline min-h-[44px] sm:min-h-0"
                          onClick={() => navigate(userState.actionPath)}
                        >
                          {userState.actionLabel}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons Grid - 2 cols on mobile, 4 on tablet+ */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 w-full">
                  {sortedButtons.slice(0, 4).map((button, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`flex flex-col w-full items-center h-auto p-2 sm:p-0 hover:bg-[#fea38e]/10 rounded-xl sm:hover:bg-transparent ${index === 0 ? 'opacity-100' : 'opacity-70'} min-h-[80px] sm:min-h-0`}
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
                        className="w-10 h-10 sm:w-[47px] sm:h-[47px]"
                        alt="Frame"
                        src={button.icon}
                      />
                      <div className="h-auto sm:h-[54px] flex items-center justify-center text-center [font-family:'DM_Sans',Helvetica] font-normal text-[#000000] text-[11px] sm:text-[10px] leading-tight sm:leading-[15px] whitespace-pre-line mt-1">
                        {button.label}
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Stats Cards - Responsive grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-2 w-full">
                  {visibleStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-[#f8f5f0] rounded-xl sm:rounded-lg border border-solid border-[#97979766] shadow-sm"
                    >
                      <CardContent className="p-3 sm:p-2 flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="opacity-80 [font-family:'Nunito_Sans',Helvetica] font-semibold text-[#202224] text-xs sm:text-[10px] whitespace-pre-line leading-tight">
                              {stat.title}
                            </div>
                            <img
                              className="w-7 h-7 sm:w-[28.45px] sm:h-[28.45px] flex-shrink-0"
                              alt="Icon"
                              src={stat.icon}
                            />
                          </div>

                          <div className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-base sm:text-[13.3px] tracking-[0.47px]">
                            {stat.value}
                          </div>

                          <div className="flex items-center gap-1">
                            {stat.trending === "up" ? (
                              <TrendingUpIcon className="w-3 h-3 text-[#00b69b]" />
                            ) : (
                              <TrendingDownIcon className="w-3 h-3 text-[#f93c65]" />
                            )}
                            <div className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[10px] sm:text-[8px]">
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
                <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
                  <div className="flex items-end justify-between w-full">
                    <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-black text-lg sm:text-xl md:text-[25px] tracking-[0.25px]">
                      Opportunités récentes :
                    </h2>
                    <img
                      alt="Frame"
                      src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/frame-40.svg"
                    />
                  </div>

                  <Card className="w-full bg-[#fea38e4c] rounded-xl border border-solid border-[#fea38e]">
                    <CardContent className="p-3 sm:p-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {/* Header with badge - stacks on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex flex-col gap-1">
                            <div className="[font-family:'Poppins',Helvetica] font-medium text-gray-900 text-sm sm:text-[14.4px] leading-tight">
                              Senior UI/UX Designer
                            </div>
                            <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-xs sm:text-[11.2px] leading-tight">
                              Salary: $30,000 - $55,000
                            </div>
                          </div>

                          <Badge className="w-fit bg-[#fea38e] text-[#f8f5f0] border border-solid border-[#e4e5e7] rounded-full h-6 px-3 [font-family:'Inter',Helvetica] font-normal text-xs sm:text-[10px]">
                            Expert Graphiques
                          </Badge>
                        </div>

                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12 sm:w-[49.15px] sm:h-[49.15px] border border-solid border-white flex-shrink-0">
                            <AvatarImage src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/joschamayer.png" />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col gap-1 pt-0.5">
                            <div className="[font-family:'Poppins',Helvetica] font-medium text-[#303030] text-sm sm:text-[12.8px] leading-tight">
                              Apple
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gray-500" />
                              <div className="[font-family:'Poppins',Helvetica] font-normal text-gray-500 text-xs sm:text-[11.2px] leading-tight">
                                Boston, USA
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="[font-family:'DM_Sans',Helvetica] font-normal text-[#8e8e93] text-xs tracking-[0.60px] leading-relaxed">
                          brief detail de l&apos;appel d&apos;offre.
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {applicantImages.map((img, index) => (
                              <img
                                key={index}
                                className="w-5 h-5 sm:w-[15px] sm:h-[17px] border border-solid border-[#6300b3] object-cover -ml-2 sm:-ml-[11px] first:ml-0 rounded-full"
                                alt="Ellipse"
                                src={img}
                              />
                            ))}
                          </div>
                          <div className="[font-family:'Poppins',Helvetica] font-medium text-[#303030] text-xs sm:text-[9.6px] leading-tight">
                            9+ applicants
                          </div>
                        </div>

                        {/* Buttons - Stack on mobile, side by side on tablet+ */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
                          <Button
                            variant="outline"
                            className="w-full sm:flex-1 h-11 sm:h-9 rounded-xl sm:rounded-[10px] border-[1.5px] border-solid border-[#fea38e] bg-transparent [font-family:'DM_Sans',Helvetica] font-bold text-[#303030] text-sm"
                          >
                            Voir les détails
                          </Button>
                          <Button className="w-full sm:flex-1 h-11 sm:h-9 rounded-xl sm:rounded-[10px] bg-[#fea38e] hover:bg-[#fea38e]/90 [font-family:'DM_Sans',Helvetica] font-bold text-[#f8f5f0] text-sm">
                            Postuler
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
