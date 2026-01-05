import React, { useState, useEffect } from "react";
import {
    FilterIcon,
    RotateCcwIcon,
    TrendingDownIcon,
    TrendingUpIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { useAuth } from "../../../../lib/auth";
import { fetchSellerRevenues, getAvailableBalance, fetchRevenueStats } from "../../../../lib/queries/withdrawals";

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
            const { data: balanceData } = await getAvailableBalance(user.id);

            // Fetch revenue stats for percentage change
            const { data: revenueStatsData } = await fetchRevenueStats(user.id);

            // Calculate stats from revenues
            const totalRevenue = revenuesData?.reduce((sum, r) => sum + (r.seller_amount || 0), 0) || 0;
            const pendingRevenue = revenuesData?.filter(r => r.status === 'pending').reduce((sum, r) => sum + (r.seller_amount || 0), 0) || 0;
            const withdrawnTotal = revenuesData?.filter(r => r.status === 'paid').reduce((sum, r) => sum + (r.seller_amount || 0), 0) || 0;

            setStats({
                totalRevenue,
                pendingRevenue,
                availableBalance: balanceData || 0,
                withdrawnTotal,
                percentageChange: revenueStatsData?.percentageChange || 0,
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
        <div className="flex-1 w-full bg-[#F5F5F0] min-h-screen">
            {/* Header */}
            <header className="w-full h-[70px] bg-[#f8f5f0] border-b border-[#97979766] px-8 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/man-438081-960-720.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="w-full max-w-7xl mx-auto px-8 py-8 flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-gray-900 [font-family:'Nunito_Sans',Helvetica]">
                    Revenue
                </h1>

                {/* KPIs Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {statsCards.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.bgColor} rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between`}
                        >
                            <div className="w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-600 text-sm font-semibold [font-family:'Nunito_Sans',Helvetica]">
                                            {stat.title}
                                        </span>
                                        <span className="text-gray-900 text-3xl font-bold [font-family:'Nunito_Sans',Helvetica]">
                                            {isLoading ? '...' : stat.value}
                                        </span>
                                    </div>
                                    <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center`}>
                                        {stat.change >= 0 ? (
                                            <TrendingUpIcon className="w-6 h-6 text-current" />
                                        ) : (
                                            <TrendingDownIcon className="w-6 h-6 text-current" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {stat.change >= 0 ? (
                                        <TrendingUpIcon className="w-4 h-4 text-[#00b69b]" />
                                    ) : (
                                        <TrendingDownIcon className="w-4 h-4 text-[#f93c65]" />
                                    )}
                                    <span className={`font-bold text-sm ${stat.change >= 0 ? 'text-[#00b69b]' : 'text-[#f93c65]'}`}>
                                        {Math.abs(stat.change).toFixed(1)}%
                                    </span>
                                    <span className="text-gray-400 text-xs font-semibold">
                                        {stat.change >= 0 ? 'Up' : 'Down'} from yesterday
                                    </span>
                                </div>
                            </div>
                        </div>
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
    );
};
