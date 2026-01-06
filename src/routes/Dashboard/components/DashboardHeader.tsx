import React from "react";
import {
    ChevronDownIcon,
    MoreVerticalIcon,
    SearchIcon,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../../../lib/auth";

export const DashboardHeader = (): JSX.Element => {
    const { user, profile, roles } = useAuth();

    const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Utilisateur';
    const avatarUrl = profile?.avatar_url || "https://c.animaapp.com/mjs8bxbnJhG6tv/img/man-438081-960-720.png";
    const primaryRole = roles.find(r => r.status === 'active')?.role;
    const displayRole = primaryRole || 'Membre';

    return (
        <header className="relative w-full h-[70px] bg-[#f8f5f0] border-b border-solid border-[#97979766] z-10">
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
                        <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#646464] text-sm hidden sm:inline">
                            English
                        </span>
                        <ChevronDownIcon className="w-4 h-4 text-[#646464]" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Avatar className="w-11 h-11">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col hidden md:flex">
                            <div className="[font-family:'Nunito_Sans',Helvetica] font-bold text-neutral-700 text-sm">
                                {displayName}
                            </div>
                            <div className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#565656] text-xs capitalize">
                                {displayRole}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-auto p-0">
                            <MoreVerticalIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
