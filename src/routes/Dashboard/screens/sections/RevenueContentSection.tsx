import { useState, useEffect } from "react";
import {
    FilterIcon,
    RotateCcwIcon,
    TrendingDownIcon,
    TrendingUpIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { useAuth } from "../../../../lib/auth";
import { fetchSellerRevenues, getAvailableBalance } from "../../../../lib/queries/withdrawals";
import { fetchRevenueStats } from "../../../../lib/queries/dashboard";
import { DashboardHeader } from "../../components/DashboardHeader";
import { PageHeader } from "../../../../components/ui/PageHeader";

interface RevenueRecord {
    id: string;
    order_id: string;
    order_number: string;
    buyer_name: string;
    service_title: string;
    amount: number;
    status: 'pending' | 'available' | 'withdrawn';
    created_at: string;
}

interface RevenueStats {
    totalRevenue: number;
    pendingRevenue: number;
    availableBalance: number;
    withdrawnTotal: number;
    percentageChange: number;
}

const getStatusDisplay = (status: string): { label: string; color: string } => {
    const statusMap: Record<string, { label: string; color: string }> = {
        pending: { label: "En attente", color: "bg-[#fff4e5] text-[#ff9f43]" },
        available: { label: "Disponible", color: "bg-[#d7f7ef] text-[#00b69b]" },
        withdrawn: { label: "Retiré", color: "bg-[#e7d6fa] text-[#936dd3]" },
    };
    return statusMap[status] || { label: status, color: "bg-gray-100 text-gray-600" };
};


export const RevenueContentSection = (): JSX.Element => {
    const { user } = useAuth();
    const [revenues, setRevenues] = useState<RevenueRecord[]>([]);
    const [stats, setStats] = useState<RevenueStats>({
        totalRevenue: 0,
        pendingRevenue: 0,
        availableBalance: 0,
        withdrawnTotal: 0,
        percentageChange: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<string>("newest");

    useEffect(() => {
        if (!user?.id) return;

        const loadRevenues = async () => {
            setIsLoading(true);

            // Fetch revenues
            const { data: revenuesData } = await fetchSellerRevenues(user.id);
            if (revenuesData) {
                setRevenues(revenuesData as unknown as RevenueRecord[]);
            }

            // Fetch balance
            const { balance: balanceData } = await getAvailableBalance(user.id);

            // Fetch revenue stats for percentage change
            const { data: revenueStatsData } = await fetchRevenueStats(user.id);

            // Calculate stats from revenues
            const totalRevenue = revenuesData?.reduce((sum: number, r: any) => sum + (r.seller_amount || 0), 0) || 0;
            const pendingRevenue = revenuesData?.filter((r: any) => r.status === 'pending').reduce((sum: number, r: any) => sum + (r.seller_amount || 0), 0) || 0;
            const withdrawnTotal = revenuesData?.filter((r: any) => r.status === 'paid').reduce((sum: number, r: any) => sum + (r.seller_amount || 0), 0) || 0;

            setStats({
                totalRevenue,
                pendingRevenue,
                availableBalance: balanceData || 0,
                withdrawnTotal,
                percentageChange: revenueStatsData?.percentChange || 0,
            });

            setIsLoading(false);
        };

        loadRevenues();
    }, [user?.id]);

    // Filter and sort revenues
    const filteredRevenues = revenues
        .filter(rev => statusFilter === "all" || rev.status === statusFilter)
        .sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    const resetFilters = () => {
        setStatusFilter("all");
        setSortOrder("newest");
    };

    const statsCards = [
        {
            title: "Total des revenus",
            value: `€${stats.totalRevenue.toFixed(0)}`,
            change: stats.percentageChange,
            bgColor: "bg-[#fff8e5]",
            iconBg: "bg-[#feae00]/20",
        },
        {
            title: "En cours",
            value: `€${stats.pendingRevenue.toFixed(0)}`,
            change: stats.percentageChange,
            bgColor: "bg-[#eef3ff]",
            iconBg: "bg-[#5a8cff]/20",
        },
        {
            title: "En attente",
            value: `€${stats.availableBalance.toFixed(0)}`,
            change: stats.percentageChange,
            bgColor: "bg-[#fff0f0]",
            iconBg: "bg-[#ff6d6d]/20",
        },
        {
            title: "Terminées",
            value: `€${stats.withdrawnTotal.toFixed(0)}`,
            change: stats.percentageChange,
            bgColor: "bg-[#e5f8f5]",
            iconBg: "bg-[#00b69b]/20",
        },
    ];

    return (
        <section className="relative flex flex-col w-full min-h-screen items-start bg-[#f8f5f0] isolate overflow-hidden">
            <DashboardHeader />


            {/* Content with decorative background */}
            <div className="flex flex-col items-start gap-2.5 relative w-full flex-1">
                <img
                    className="absolute top-0 left-0 w-full h-[1313px] object-cover md:object-none md:object-top -z-10"
                    alt="Main bg color"
                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                />

                {/* PageHeader */}
                <PageHeader
                    title="Revenus"
                    contextMessage="Consultez vos revenus et demandez des retraits"
                    primaryAction={{
                        label: "Demander retrait",
                        path: "/dashboard/revenue/withdraw",
                    }}
                />

                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-12 flex flex-col gap-8">
                    {/* KPIs Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {statsCards.map((stat, index) => (
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
                                                src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon.png"
                                            />
                                        </div>

                                        <div className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-[13.3px] tracking-[0.47px]">
                                            {isLoading ? '...' : stat.value}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {stat.change >= 0 ? (
                                                <TrendingUpIcon className="w-3 h-3 text-[#00b69b]" />
                                            ) : (
                                                <TrendingDownIcon className="w-3 h-3 text-[#f93c65]" />
                                            )}
                                            <div className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[7.6px]">
                                                <span
                                                    className={
                                                        stat.change >= 0
                                                            ? "text-[#00b69b]"
                                                            : "text-[#f93c65]"
                                                    }
                                                >
                                                    {Math.abs(stat.change).toFixed(1)}%
                                                </span>
                                                <span className="text-[#606060]">
                                                    {" "}
                                                    {stat.change >= 0 ? 'Up' : 'Down'} from yesterday
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-transparent text-gray-600">
                                <FilterIcon className="w-4 h-4" />
                                <span className="text-sm font-bold [font-family:'Nunito_Sans',Helvetica]">Filter By</span>
                            </div>

                            <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger className="w-[120px] bg-gray-50 border-none font-semibold focus:ring-0 rounded-full">
                                    <SelectValue placeholder="Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Plus récent</SelectItem>
                                    <SelectItem value="oldest">Plus ancien</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[150px] bg-gray-50 border-none font-semibold focus:ring-0 rounded-full">
                                    <SelectValue placeholder="Order Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous</SelectItem>
                                    <SelectItem value="pending">En attente</SelectItem>
                                    <SelectItem value="available">Disponible</SelectItem>
                                    <SelectItem value="withdrawn">Retiré</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button variant="ghost" className="text-red-500 hover:text-red-600 font-bold [font-family:'Nunito_Sans',Helvetica]" onClick={resetFilters}>
                            <RotateCcwIcon className="w-4 h-4 mr-2" />
                            Reset Filter
                        </Button>
                    </div>

                    {/* Main Table */}
                    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">ID</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">NAME</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">ADDRESS</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">DATE</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">TYPE</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className="p-6 text-center text-gray-500">Chargement...</td>
                                        </tr>
                                    ) : filteredRevenues.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="p-6 text-center text-gray-500">Aucun revenu trouvé</td>
                                        </tr>
                                    ) : (
                                        filteredRevenues.map((revenue) => {
                                            const statusDisplay = getStatusDisplay(revenue.status);
                                            return (
                                                <tr key={revenue.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-6 text-sm font-bold text-gray-900 [font-family:'Nunito_Sans',Helvetica]">
                                                        {revenue.order_number?.slice(-5) || revenue.id.slice(-5)}
                                                    </td>
                                                    <td className="p-6 text-sm font-medium text-gray-900 [font-family:'Nunito_Sans',Helvetica]">
                                                        {revenue.buyer_name || 'Client'}
                                                    </td>
                                                    <td className="p-6 text-sm text-gray-500 [font-family:'Nunito_Sans',Helvetica]">
                                                        {revenue.service_title || 'Service'}
                                                    </td>
                                                    <td className="p-6 text-sm text-gray-500 [font-family:'Nunito_Sans',Helvetica]">
                                                        {new Date(revenue.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="p-6 text-sm text-gray-900 [font-family:'Nunito_Sans',Helvetica]">
                                                        €{revenue.amount?.toFixed(2) || '0.00'}
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold [font-family:'Nunito_Sans',Helvetica] ${statusDisplay.color}`}>
                                                            {statusDisplay.label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 [font-family:'Nunito_Sans',Helvetica]">
                            <span>Affichage de {filteredRevenues.length} transaction{filteredRevenues.length > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
