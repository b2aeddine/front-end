import React from "react";
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

const ordersData = [
    {
        id: "00009",
        name: "Dollie Hines",
        address: "124 Lyla Forge Suite 975",
        date: "09 Jan 2019",
        type: "Book",
        status: "In Transit",
        statusColor: "bg-[#e7d6fa] text-[#936dd3]", // Purple
    },
    {
        id: "00001",
        name: "Christine Brooks",
        address: "089 Kutch Green Apt. 448",
        date: "04 Sep 2019",
        type: "Electric",
        status: "Completed",
        statusColor: "bg-[#d7f7ef] text-[#00b69b]", // Green
    },
    {
        id: "00002",
        name: "Rosie Pearson",
        address: "979 Immanuel Ferry Suite 526",
        date: "28 May 2019",
        type: "Book",
        status: "Processing",
        statusColor: "bg-[#e7d6fa] text-[#936dd3]",
    },
    {
        id: "00003",
        name: "Darrell Caldwell",
        address: "8587 Frida Ports",
        date: "23 Nov 2019",
        type: "Medicine",
        status: "Rejected",
        statusColor: "bg-[#feeceb] text-[#ea5455]", // Red
    },
    {
        id: "00004",
        name: "Gilbert Johnston",
        address: "768 Destiny Lake Suite 600",
        date: "05 Feb 2019",
        type: "Mobile",
        status: "Completed",
        statusColor: "bg-[#d7f7ef] text-[#00b69b]",
    },
    {
        id: "00005",
        name: "Alan Cain",
        address: "042 Mylene Throughway",
        date: "29 Jul 2019",
        type: "Watch",
        status: "Processing",
        statusColor: "bg-[#e7d6fa] text-[#936dd3]",
    },
    {
        id: "00008",
        name: "Rosie Todd",
        address: "New Jon",
        date: "30 Apr 2019",
        type: "Medicine",
        status: "On Hold",
        statusColor: "bg-[#fff4e5] text-[#ff9f43]", // Orange
    },
];

export const OrderListSection = (): JSX.Element => {
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
                        {/* KPI 1 */}
                        <div className="dashbord-thq-frame14754-elm bg-[#fff8e5] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm1 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm39 text-gray-600 text-sm font-semibold">Total des commandes</span>
                                        <span className="dashbord-thq-text-elm40 text-gray-900 text-3xl font-bold">10293</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#feae00]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-3gk.svg" className="w-6 h-6 text-[#feae00]" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm1 flex items-center gap-2 mt-2">
                                    <img src="/path2793-5riu.svg" className="w-4 h-4" alt="up" />
                                    <span className="text-emerald-500 font-bold text-sm">1.3%</span>
                                    <span className="text-gray-400 text-xs font-semibold">Up from past week</span>
                                </div>
                            </div>
                        </div>

                        {/* KPI 2 */}
                        <div className="dashbord-thq-frame14755-elm bg-[#eef3ff] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm2 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm45 text-gray-600 text-sm font-semibold">En cours</span>
                                        <span className="dashbord-thq-text-elm46 text-gray-900 text-3xl font-bold">10293</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#5a8cff]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-pcq.svg" className="w-6 h-6" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm2 flex items-center gap-2 mt-2">
                                    <img src="/path2793-ygat.svg" className="w-4 h-4" alt="up" />
                                    <span className="text-emerald-500 font-bold text-sm">1.3%</span>
                                    <span className="text-gray-400 text-xs font-semibold">Up from past week</span>
                                </div>
                            </div>
                        </div>

                        {/* KPI 3 */}
                        <div className="dashbord-thq-frame14756-elm bg-[#fff0f0] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm3 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm51 text-gray-600 text-sm font-semibold">En attente</span>
                                        <span className="dashbord-thq-text-elm52 text-gray-900 text-3xl font-bold">10293</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#ff6d6d]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-0e9h.svg" className="w-6 h-6" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm3 flex items-center gap-2 mt-2">
                                    <img src="/path2793-1mp.svg" className="w-4 h-4" alt="up" />
                                    <span className="text-emerald-500 font-bold text-sm">1.3%</span>
                                    <span className="text-gray-400 text-xs font-semibold">Up from past week</span>
                                </div>
                            </div>
                        </div>

                        {/* KPI 4 */}
                        <div className="dashbord-thq-frame14757-elm bg-[#e5f8f5] rounded-[14px] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-[160px] flex flex-col justify-between">
                            <div className="dashbord-thq-total-order-elm4 w-full h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex flex-col gap-1">
                                        <span className="dashbord-thq-text-elm57 text-gray-600 text-sm font-semibold">Terminées</span>
                                        <span className="dashbord-thq-text-elm58 text-gray-900 text-3xl font-bold">10293</span>
                                    </div>
                                    <div className="w-12 h-12 bg-[#00b69b]/20 rounded-2xl flex items-center justify-center">
                                        <img src="/combinedshape2793-s3x9.svg" className="w-6 h-6" alt="icon" />
                                    </div>
                                </div>
                                <div className="dashbord-thq-frame85-upfromyesterday-elm4 flex items-center gap-2 mt-2">
                                    <img src="/path2793-ltt.svg" className="w-4 h-4" alt="up" />
                                    <span className="text-emerald-500 font-bold text-sm">1.3%</span>
                                    <span className="text-gray-400 text-xs font-semibold">Up from past week</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-transparent text-gray-600">
                                <FilterIcon className="w-4 h-4" />
                                <span className="text-sm font-bold font-nunito">Filter By</span>
                            </div>

                            <Select>
                                <SelectTrigger className="w-[120px] bg-gray-50 border-none font-semibold focus:ring-0 rounded-full">
                                    <SelectValue placeholder="Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-[140px] bg-gray-50 border-none font-semibold focus:ring-0 rounded-full">
                                    <SelectValue placeholder="Order Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="book">Book</SelectItem>
                                    <SelectItem value="electric">Electric</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-[150px] bg-gray-50 border-none font-semibold focus:ring-0 rounded-full">
                                    <SelectValue placeholder="Order Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button variant="ghost" className="text-red-500 hover:text-red-600 font-bold font-nunito">
                            <RotateCcwIcon className="w-4 h-4 mr-2" />
                            Reset Filter
                        </Button>
                    </div>


                    {/* Main Table */}
                    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-gray-100 mb-10">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">ID</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">NAME</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">ADDRESS</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">DATE</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">TYPE</th>
                                        <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito opacity-70">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {ordersData.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-6 text-sm font-bold text-gray-900 font-nunito">{order.id}</td>
                                            <td className="p-6 text-sm font-medium text-gray-900 font-nunito">{order.name}</td>
                                            <td className="p-6 text-sm text-gray-500 font-nunito">{order.address}</td>
                                            <td className="p-6 text-sm text-gray-500 font-nunito">{order.date}</td>
                                            <td className="p-6 text-sm text-gray-900 font-nunito">{order.type}</td>
                                            <td className="p-6">
                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold font-nunito ${order.statusColor}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-nunito">
                            <span>Showing 1-7 of 78</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled className="text-gray-400 border-gray-200">Previous</Button>
                                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">Next</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
