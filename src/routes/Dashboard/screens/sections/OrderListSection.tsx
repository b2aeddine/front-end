import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./OrderListSection.css";
import {
    FilterIcon,
    RotateCcwIcon,
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
    const { user, roles } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState<OrderStats>({ total: 0, inProgress: 0, pending: 0, completed: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<string>("newest");

    // Determine role for filtering
    const primaryRole = roles.find(r => r.status === 'active')?.role;
    const dashboardRole: 'buyer' | 'seller' =
        primaryRole === 'freelance' || primaryRole === 'influencer' ? 'seller' : 'buyer';

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

    return (
        <div className="dashbord-container1 w-full bg-[#F5F5F0]">
            <Helmet>
                <title>exported project</title>
                <meta property="og:title" content="exported project" />
            </Helmet>
            <div className="dashbord-thq-dashbord-elm w-full justify-start"> {/* Modified simplify layout */}
                <div className="dashbord-thq-frame14672-elm w-full border-none"> {/* removed fixed width to allow fluid */}
                    <div className="dashbord-thq-navigation-top-bar1-elm w-full justify-between px-8 bg-[#F8F5F0]"> {/* fluid width and padding */}
                        <div className="dashbord-thq-frame14705-elm relative top-0 left-0 w-full max-w-7xl mx-auto flex items-center justify-between h-full"> {/* Centered content wrapper */}
                            <div className="dashbord-thq-search-elm1">
                                {/* Search Input Placeholder - keeping structure */}
                                <div className="relative w-full h-full flex items-center bg-[#F5F6FA] rounded-full px-4 border border-gray-200">
                                    <span className="dashbord-thq-text-elm30 text-gray-400 text-sm">Search</span>
                                    <div className="absolute right-4 flex gap-2">
                                        <img
                                            alt="Oval2733"
                                            src="/oval2733-k2xi.svg"
                                            className="w-4 h-4 opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="dashbord-thq-frame14704-elm flex items-center gap-6">
                                <div className="dashbord-thq-icon-elm10 relative w-8 h-8">
                                    <div className="dashbord-thq-icon-elm11 w-full h-full">
                                        <img
                                            alt="CombinedShape2733"
                                            src="/combinedshape2733-081b.svg"
                                            className="dashbord-thq-combined-shape-elm1 w-full h-full"
                                        />
                                        {/* Notification Badge */}
                                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="dashbord-thq-english-elm flex items-center gap-2">
                                    <div className="dashbord-thq-flag-elm w-6 h-4 relative overflow-hidden rounded-sm">
                                        <img
                                            alt="UKFlag2733"
                                            src="/ukflag2733-i80a-200h.png"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="dashbord-thq-text-elm31 font-semibold text-gray-600 text-sm">English</span>
                                    <img
                                        alt="Shape2733"
                                        src="/shape2733-n9lp.svg"
                                        className="w-2 h-2"
                                    />
                                </div>

                                <div className="dashbord-thq-profile-elm flex items-center gap-3 pl-4 border-l border-gray-200">
                                    <div className="dashbord-thq-man438081960720-elm w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            alt="allefvinicius343875unsplash2733"
                                            src="/allefvinicius343875unsplash2733-cg9f-200h.png"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="dashbord-thq-text-elm32 font-bold text-gray-800 text-sm">Moni Roy</span>
                                        <span className="dashbord-thq-text-elm33 font-semibold text-gray-500 text-xs text-left">Admin</span>
                                    </div>
                                    <div className="dashbord-thq-more-elm ml-2">
                                        <div className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full">
                                            <img
                                                alt="Shape2733"
                                                src="/shape2733-ibg.svg"
                                                className="w-2 h-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashbord-thq-frame14753-elm relative w-full h-[300px] overflow-hidden"> {/* Background container */}
                        <div className="dashbord-thq-main-bg-color-elm absolute inset-0 w-full h-full">
                            <img
                                alt="MainBg2733"
                                src="/mainbg2733-7wf-1300w.png"
                                className="dashbord-thq-main-bg-elm w-full h-full object-cover absolute top-0 left-0"
                            />
                            {/* Decorative floating elements */}
                            <img
                                alt="Vector2733"
                                src="/vector2733-slfb.svg"
                                className="dashbord-thq-vector-elm1 absolute top-10 right-20 w-32 opacity-80"
                            />
                            <img
                                alt="Removebg12733"
                                src="/removebg12733-3td-200w.png"
                                className="dashbord-thq-removebg1-elm absolute top-20 right-40 w-24"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashbord-thq-frame14724-elm w-full max-w-7xl mx-auto px-8 -mt-20 relative z-10 flex flex-col gap-8">
                <span className="dashbord-thq-text-elm34 text-3xl font-bold text-gray-900">Order Lists</span>

                <div className="dashbord-thq-frame14723-elm w-full flex flex-col gap-8">

                    {/* KPIs Section */}
                    <div className="dashbord-thq-frame13968-elm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"> {/* Grid Layout */}
                        {/* KPI 1 - Total */}
                        <div className="dashbord-thq-frame14754-elm bg-[#fff8e5] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm1 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm39 text-gray-600 text-sm font-semibold">Total des commandes</span>
                                        <span className="dashbord-thq-text-elm40 text-gray-900 text-3xl font-bold">{isLoading ? '...' : stats.total}</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#feae00]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-3gk.svg" className="w-6 h-6 text-[#feae00]" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm1 flex items-center gap-2 mt-2">
                                    <span className="text-gray-400 text-xs font-semibold">Toutes vos commandes</span>
                                </div>
                            </div>
                        </div>

                        {/* KPI 2 - In Progress */}
                        <div className="dashbord-thq-frame14755-elm bg-[#eef3ff] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm2 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm45 text-gray-600 text-sm font-semibold">En cours</span>
                                        <span className="dashbord-thq-text-elm46 text-gray-900 text-3xl font-bold">{isLoading ? '...' : stats.inProgress}</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#5a8cff]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-pcq.svg" className="w-6 h-6" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm2 flex items-center gap-2 mt-2">
                                    <span className="text-gray-400 text-xs font-semibold">Commandes actives</span>
                                </div>
                            </div>
                        </div>

                        {/* KPI 3 - Pending */}
                        <div className="dashbord-thq-frame14756-elm bg-[#fff0f0] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm3 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm51 text-gray-600 text-sm font-semibold">En attente</span>
                                        <span className="dashbord-thq-text-elm52 text-gray-900 text-3xl font-bold">{isLoading ? '...' : stats.pending}</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#ff6d6d]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-0e9h.svg" className="w-6 h-6" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm3 flex items-center gap-2 mt-2">
                                    <span className="text-gray-400 text-xs font-semibold">Attente de traitement</span>
                                </div>
                            </div>
                        </div>

                        {/* KPI 4 - Completed */}
                        <div className="dashbord-thq-frame14757-elm bg-[#e5f8f5] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm4 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm57 text-gray-600 text-sm font-semibold">Terminées</span>
                                        <span className="dashbord-thq-text-elm58 text-gray-900 text-3xl font-bold">{isLoading ? '...' : stats.completed}</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#00b69b]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-s3x9.svg" className="w-6 h-6" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm4 flex items-center gap-2 mt-2">
                                    <span className="text-gray-400 text-xs font-semibold">Commandes livrées</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-transparent text-gray-600">
                                <FilterIcon className="w-4 h-4" />
                                <span className="text-sm font-bold font-nunito">Filtrer par</span>
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

                        <Button variant="ghost" className="text-red-500 hover:text-red-600 font-bold font-nunito" onClick={resetFilters}>
                            <RotateCcwIcon className="w-4 h-4 mr-2" />
                            Réinitialiser
                        </Button>
                    </div>


                    {/* Main Table */}
                    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-gray-100 mb-10">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">N° Commande</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">Service</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">{dashboardRole === 'buyer' ? 'Vendeur' : 'Acheteur'}</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">Date</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">Montant</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">Statut</th>
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
                                                    <td className="p-6 text-sm font-bold text-gray-900 font-nunito">{order.order_number}</td>
                                                    <td className="p-6 text-sm font-medium text-gray-900 font-nunito">{order.service?.title || 'Service'}</td>
                                                    <td className="p-6 text-sm text-gray-500 font-nunito">{counterparty?.display_name || counterparty?.username || '-'}</td>
                                                    <td className="p-6 text-sm text-gray-500 font-nunito">{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                                                    <td className="p-6 text-sm text-gray-900 font-nunito">€{order.amount.toFixed(2)}</td>
                                                    <td className="p-6">
                                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold font-nunito ${statusDisplay.color}`}>
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
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-nunito">
                            <span>Affichage de {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
