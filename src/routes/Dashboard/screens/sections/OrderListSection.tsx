import React, { useState, useEffect } from "react";
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
import { fetchMyOrders, Order } from "../../../../lib/queries/orders";
import { fetchOrderStats } from "../../../../lib/queries/dashboard";
import { OrderStatus } from "../../../../lib/types";

// Helper to map OrderStatus to display properties
const getStatusDisplay = (status: OrderStatus): { label: string; color: string } => {
    const statusMap: Record<OrderStatus, { label: string; color: string }> = {
        pending: { label: "En attente", color: "bg-[#fff4e5] text-[#ff9f43]" },
        payment_authorized: { label: "Paiement autorisé", color: "bg-[#eef3ff] text-[#5a8cff]" },
        accepted: { label: "Acceptée", color: "bg-[#e7d6fa] text-[#936dd3]" },
        in_progress: { label: "En cours", color: "bg-[#e7d6fa] text-[#936dd3]" },
        delivered: { label: "Livrée", color: "bg-[#eef3ff] text-[#5a8cff]" },
        revision_requested: { label: "Révision demandée", color: "bg-[#fff4e5] text-[#ff9f43]" },
        completed: { label: "Terminée", color: "bg-[#d7f7ef] text-[#00b69b]" },
        cancelled: { label: "Annulée", color: "bg-[#feeceb] text-[#ea5455]" },
        refunded: { label: "Remboursée", color: "bg-[#feeceb] text-[#ea5455]" },
        disputed: { label: "Litige", color: "bg-[#feeceb] text-[#ea5455]" },
    };
    return statusMap[status] || { label: status, color: "bg-gray-100 text-gray-600" };
};

interface OrderStats {
    total: number;
    inProgress: number;
    pending: number;
    completed: number;
}

export const OrderListSection = (): JSX.Element => {
    const { user, profile, roles } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState<OrderStats>({ total: 0, inProgress: 0, pending: 0, completed: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<string>("newest");

    // Determine role for filtering
    const primaryRole = roles.find(r => r.status === 'active')?.role;
    const dashboardRole: 'buyer' | 'seller' =
        primaryRole === 'freelance' || primaryRole === 'influencer' ? 'seller' : 'buyer';

    // Display name for header
    const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Utilisateur';
    const avatarUrl = profile?.avatar_url || "https://c.animaapp.com/mjs8bxbnJhG6tv/img/man-438081-960-720.png";

    useEffect(() => {
        if (!user?.id) return;

        const loadOrders = async () => {
            setIsLoading(true);

            // Fetch orders
            const { data: ordersData } = await fetchMyOrders(user.id, dashboardRole);
            if (ordersData) {
                setOrders(ordersData);
            }

            // Fetch order stats
            const { data: statsData } = await fetchOrderStats(user.id, dashboardRole);
            if (statsData) {
                setStats({
                    total: statsData.total,
                    inProgress: statsData.in_progress,
                    pending: statsData.pending + statsData.payment_authorized,
                    completed: statsData.completed,
                });
            }

            setIsLoading(false);
        };

        loadOrders();
    }, [user?.id, dashboardRole]);

    // Filter and sort orders
    const filteredOrders = orders
        .filter(order => statusFilter === "all" || order.status === statusFilter)
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
            title: "Total des commandes",
            value: stats.total.toString(),
            change: 0, // Placeholder as we don't have historical data yet
            changeText: "toutes vos commandes"
        },
        {
            title: "En cours",
            value: stats.inProgress.toString(),
            change: 0,
            changeText: "commandes actives"
        },
        {
            title: "En attente",
            value: stats.pending.toString(),
            change: 0,
            changeText: "attente de traitement"
        },
        {
            title: "Terminées",
            value: stats.completed.toString(),
            change: 0,
            changeText: "commandes livrées"
        },
    ];

    return (
        <section className="flex flex-col w-full items-start border border-solid border-[#9797974c]">
            {/* Header */}
            <header className="relative w-full h-[70px] bg-[#f8f5f0] border-b border-[#97979766] px-8 flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* Content with decorative background */}
            <div className="flex flex-col items-start gap-2.5 relative w-full min-h-screen">
                <img
                    className="absolute top-0 left-0 w-full h-[1313.24px] object-cover -z-10"
                    alt="Main bg color"
                    src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/main-bg-color.svg"
                />

                <div className="w-full max-w-7xl mx-auto px-8 py-8 flex flex-col gap-8">
                    <h1 className="text-3xl font-bold text-gray-900 [font-family:'Nunito_Sans',Helvetica]">
                        Commandes
                    </h1>

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
                                                src="https://c.animaapp.com/mjs8bxbnJhG6tv/img/icon-2.png" // Blue Folder Icon
                                            />
                                        </div>

                                        <div className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-[13.3px] tracking-[0.47px]">
                                            {isLoading ? '...' : stat.value}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <TrendingUpIcon className="w-3 h-3 text-[#00b69b]" />
                                            <div className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[7.6px]">
                                                <span className="text-[#00b69b]">
                                                    {/* Always positive/neutral for now as we don't have historical diffs */}
                                                    Up
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

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-transparent text-gray-600">
                                <FilterIcon className="w-4 h-4" />
                                <span className="text-sm font-bold [font-family:'Nunito_Sans',Helvetica]">Filtrer par</span>
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
                                <SelectTrigger className="w-[180px] bg-gray-50 border-none font-semibold focus:ring-0 rounded-full">
                                    <SelectValue placeholder="Statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="pending">En attente</SelectItem>
                                    <SelectItem value="payment_authorized">Paiement autorisé</SelectItem>
                                    <SelectItem value="accepted">Acceptée</SelectItem>
                                    <SelectItem value="in_progress">En cours</SelectItem>
                                    <SelectItem value="delivered">Livrée</SelectItem>
                                    <SelectItem value="completed">Terminée</SelectItem>
                                    <SelectItem value="cancelled">Annulée</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button variant="ghost" className="text-red-500 hover:text-red-600 font-bold [font-family:'Nunito_Sans',Helvetica]" onClick={resetFilters}>
                            <RotateCcwIcon className="w-4 h-4 mr-2" />
                            Réinitialiser Filter
                        </Button>
                    </div>

                    {/* Main Table */}
                    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">N° Commande</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">Service</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">{dashboardRole === 'buyer' ? 'Vendeur' : 'Acheteur'}</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">Date</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">Montant</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider [font-family:'Nunito_Sans',Helvetica] opacity-70">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className="p-6 text-center text-gray-500">Chargement...</td>
                                        </tr>
                                    ) : filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="p-6 text-center text-gray-500">Aucune commande trouvée</td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            const statusDisplay = getStatusDisplay(order.status as OrderStatus);
                                            const counterparty = dashboardRole === 'buyer' ? order.seller : order.buyer;
                                            return (
                                                <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <td className="p-6 text-sm font-bold text-gray-900 [font-family:'Nunito_Sans',Helvetica]">{order.order_number}</td>
                                                    <td className="p-6 text-sm font-medium text-gray-900 [font-family:'Nunito_Sans',Helvetica]">{order.service?.title || 'Service'}</td>
                                                    <td className="p-6 text-sm text-gray-500 [font-family:'Nunito_Sans',Helvetica]">{counterparty?.display_name || counterparty?.username || '-'}</td>
                                                    <td className="p-6 text-sm text-gray-500 [font-family:'Nunito_Sans',Helvetica]">{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                                                    <td className="p-6 text-sm text-gray-900 [font-family:'Nunito_Sans',Helvetica]">€{order.amount.toFixed(2)}</td>
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
                            <span>Affichage de {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
