import React, { useState } from "react";
import {
    Search,
    X,
} from "lucide-react";
import { Input } from "../../../components/ui/input";
import { HeaderUserMenu } from "../../../components/layout/HeaderUserMenu";

export const DashboardHeader = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Search:", searchQuery);
        }
    };

    return (
        <header className="relative w-full h-[70px] bg-[#f8f5f0] border-b border-solid border-[#e5e5e5] z-10">
            <div className="flex w-full max-w-[1200px] items-center justify-between mx-auto px-6 h-full">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative w-full max-w-[400px]">
                    <div className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
                        <Search
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 ${isSearchFocused ? 'text-[#fea38e]' : 'text-[#9ca3af]'
                                }`}
                        />
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className={`w-full h-[42px] bg-white rounded-full border pl-11 pr-4 text-sm transition-all duration-200 [font-family:'Nunito_Sans',Helvetica] ${isSearchFocused
                                    ? 'border-[#fea38e] shadow-[0_0_0_3px_rgba(254,163,142,0.1)]'
                                    : 'border-[#e5e7eb] hover:border-[#d1d5db]'
                                }`}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                </form>

                {/* Right Section: Messages, Notification, Language, Profile */}
                <HeaderUserMenu />
            </div>
        </header>
    );
};
