/**
 * StatsCard Component
 * Reusable statistics card for dashboard pages
 * Matches the design with larger icons and cards
 */
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Card, CardContent } from "./card";

export interface StatsCardProps {
    title: string;
    value: string;
    change?: number;
    changeText?: string;
    trending?: "up" | "down";
    icon: string;
    iconBgColor?: string;
    isLoading?: boolean;
}

// Predefined icon background colors
const iconBgColors = {
    yellow: "bg-[#fef3c7]",
    blue: "bg-[#dbeafe]",
    orange: "bg-[#ffedd5]",
    green: "bg-[#d1fae5]",
    purple: "bg-[#f3e8ff]",
    pink: "bg-[#fce7f3]",
    cyan: "bg-[#cffafe]",
    red: "bg-[#fee2e2]",
};

export const StatsCard = ({
    title,
    value,
    change,
    changeText,
    trending = "up",
    icon,
    iconBgColor = "green",
    isLoading = false,
}: StatsCardProps): JSX.Element => {
    const bgColorClass = iconBgColors[iconBgColor as keyof typeof iconBgColors] || iconBgColors.green;

    return (
        <Card className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#606060] text-xs">
                            {title}
                        </span>
                        <span className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-2xl tracking-tight">
                            {isLoading ? "..." : value}
                        </span>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center`}>
                        <img
                            className="w-6 h-6"
                            alt="Icon"
                            src={icon}
                        />
                    </div>
                </div>

                {(change !== undefined || changeText) && (
                    <div className="flex items-center gap-1.5">
                        {trending === "up" ? (
                            <TrendingUpIcon className="w-4 h-4 text-[#00b69b]" />
                        ) : (
                            <TrendingDownIcon className="w-4 h-4 text-[#f93c65]" />
                        )}
                        <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-xs">
                            <span className={trending === "up" ? "text-[#00b69b]" : "text-[#f93c65]"}>
                                {change !== undefined ? `${Math.abs(change).toFixed(1)}%` : ""}
                            </span>
                            {changeText && (
                                <span className="text-[#606060] ml-1">
                                    {changeText}
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsCard;
