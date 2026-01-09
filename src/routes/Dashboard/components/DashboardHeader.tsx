import React, { useState, useRef, useEffect } from "react";
import {
    Bell,
    ChevronDown,
    Globe,
    LogOut,
    Search,
    Settings,
    User,
    HelpCircle,
    X,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../../../lib/auth";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, children, className = "" }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={`absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in ${className}`}
            style={{ minWidth: "200px" }}
        >
            {children}
        </div>
    );
};

interface Language {
    code: string;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "fr", name: "Français", flag: "https://flagcdn.com/w40/fr.png" },
    { code: "es", name: "Español", flag: "https://flagcdn.com/w40/es.png" },
    { code: "de", name: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
];

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: "order" | "message" | "system";
}

const mockNotifications: Notification[] = [
    { id: "1", title: "Nouvelle commande", message: "Commande #12345 reçue", time: "Il y a 5 min", read: false, type: "order" },
    { id: "2", title: "Message reçu", message: "Jean a envoyé un message", time: "Il y a 15 min", read: false, type: "message" },
    { id: "3", title: "Paiement confirmé", message: "Paiement de 150€ reçu", time: "Il y a 1h", read: false, type: "system" },
    { id: "4", title: "Nouveau client", message: "Marie s'est inscrite", time: "Il y a 2h", read: true, type: "system" },
];

export const DashboardHeader = (): JSX.Element => {
    const { user, profile, roles, signOut } = useAuth();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

    const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'Utilisateur';
    const avatarUrl = profile?.avatar_url || "https://c.animaapp.com/mjs8bxbnJhG6tv/img/man-438081-960-720.png";
    const primaryRole = roles.find(r => r.status === 'active')?.role;
    const displayRole = primaryRole || 'Membre';

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLanguageChange = (lang: Language) => {
        setSelectedLanguage(lang);
        setShowLanguageMenu(false);
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleLogout = () => {
        signOut();
        navigate('/');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Search:", searchQuery);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "order": return "bg-green-100 text-green-600";
            case "message": return "bg-blue-100 text-blue-600";
            default: return "bg-orange-100 text-orange-600";
        }
    };

    return (
        <header className="relative w-full h-[70px] bg-[#f8f5f0] border-b border-solid border-[#e5e5e5] z-10">
            <div className="flex w-full max-w-[1200px] items-center justify-between mx-auto px-6 h-full">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative w-full max-w-[400px]">
                    <div className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
                        <Search
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 ${
                                isSearchFocused ? 'text-[#fea38e]' : 'text-[#9ca3af]'
                            }`}
                        />
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className={`w-full h-[42px] bg-white rounded-full border pl-11 pr-4 text-sm transition-all duration-200 [font-family:'Nunito_Sans',Helvetica] ${
                                isSearchFocused
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

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowLanguageMenu(false);
                                setShowProfileMenu(false);
                            }}
                            className={`relative w-10 h-10 rounded-full transition-all duration-200 ${
                                showNotifications
                                    ? 'bg-[#fea38e]/10 text-[#fea38e]'
                                    : 'hover:bg-gray-100 text-[#646464]'
                            }`}
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#ff6b6b] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </Button>

                        <Dropdown
                            isOpen={showNotifications}
                            onClose={() => setShowNotifications(false)}
                            className="w-[340px] right-0"
                        >
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-semibold text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                    Notifications
                                </h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllRead}
                                        className="text-xs text-[#fea38e] hover:text-[#fe8e76] font-medium transition-colors"
                                    >
                                        Tout marquer lu
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[320px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                                                !notif.read ? 'bg-[#fea38e]/5' : ''
                                            }`}
                                        >
                                            <div className="flex gap-3">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationIcon(notif.type)}`}>
                                                    <Bell className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-sm text-[#202224] truncate [font-family:'Nunito_Sans',Helvetica]">
                                                            {notif.title}
                                                        </p>
                                                        {!notif.read && (
                                                            <span className="w-2 h-2 bg-[#fea38e] rounded-full flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-[#606060] truncate mt-0.5 [font-family:'Nunito_Sans',Helvetica]">
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-[10px] text-[#9ca3af] mt-1 [font-family:'Nunito_Sans',Helvetica]">
                                                        {notif.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-[#9ca3af] text-sm">
                                        Aucune notification
                                    </div>
                                )}
                            </div>
                            <div className="px-4 py-3 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setShowNotifications(false);
                                        navigate('/dashboard/messages');
                                    }}
                                    className="w-full text-center text-sm text-[#fea38e] hover:text-[#fe8e76] font-semibold transition-colors [font-family:'Nunito_Sans',Helvetica]"
                                >
                                    Voir toutes les notifications
                                </button>
                            </div>
                        </Dropdown>
                    </div>

                    {/* Language Selector */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setShowLanguageMenu(!showLanguageMenu);
                                setShowNotifications(false);
                                setShowProfileMenu(false);
                            }}
                            className={`flex items-center gap-2 h-10 px-3 rounded-full transition-all duration-200 ${
                                showLanguageMenu
                                    ? 'bg-[#fea38e]/10'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <img
                                className="w-6 h-4 object-cover rounded-sm"
                                alt={selectedLanguage.name}
                                src={selectedLanguage.flag}
                            />
                            <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#646464] text-sm hidden sm:inline">
                                {selectedLanguage.code.toUpperCase()}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-[#646464] transition-transform duration-200 ${showLanguageMenu ? 'rotate-180' : ''}`} />
                        </Button>

                        <Dropdown
                            isOpen={showLanguageMenu}
                            onClose={() => setShowLanguageMenu(false)}
                            className="w-[180px]"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                                        selectedLanguage.code === lang.code ? 'bg-[#fea38e]/5' : ''
                                    }`}
                                >
                                    <img
                                        className="w-6 h-4 object-cover rounded-sm"
                                        alt={lang.name}
                                        src={lang.flag}
                                    />
                                    <span className={`[font-family:'Nunito_Sans',Helvetica] text-sm ${
                                        selectedLanguage.code === lang.code
                                            ? 'font-semibold text-[#fea38e]'
                                            : 'text-[#646464]'
                                    }`}>
                                        {lang.name}
                                    </span>
                                </button>
                            ))}
                        </Dropdown>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gray-200 mx-1" />

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowProfileMenu(!showProfileMenu);
                                setShowNotifications(false);
                                setShowLanguageMenu(false);
                            }}
                            className={`flex items-center gap-3 py-1.5 px-2 rounded-full transition-all duration-200 ${
                                showProfileMenu
                                    ? 'bg-[#fea38e]/10'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <Avatar className="w-9 h-9 ring-2 ring-white shadow-sm">
                                <AvatarImage src={avatarUrl} />
                                <AvatarFallback className="bg-[#fea38e] text-white font-semibold">
                                    {displayName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-col items-start hidden md:flex">
                                <span className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-sm leading-tight">
                                    {displayName}
                                </span>
                                <span className="[font-family:'Nunito_Sans',Helvetica] font-medium text-[#9ca3af] text-xs capitalize">
                                    {displayRole}
                                </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#646464] transition-transform duration-200 hidden md:block ${showProfileMenu ? 'rotate-180' : ''}`} />
                        </button>

                        <Dropdown
                            isOpen={showProfileMenu}
                            onClose={() => setShowProfileMenu(false)}
                            className="w-[220px]"
                        >
                            {/* Profile Header in Dropdown */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={avatarUrl} />
                                        <AvatarFallback className="bg-[#fea38e] text-white font-semibold">
                                            {displayName.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                            {displayName}
                                        </p>
                                        <p className="text-xs text-[#9ca3af] truncate max-w-[140px] [font-family:'Nunito_Sans',Helvetica]">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        navigate('/dashboard/profile');
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <User className="w-4 h-4 text-[#646464]" />
                                    <span className="text-sm text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                        Mon Profil
                                    </span>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        navigate('/dashboard/settings');
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <Settings className="w-4 h-4 text-[#646464]" />
                                    <span className="text-sm text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                        Paramètres
                                    </span>
                                </button>
                                <button
                                    onClick={() => setShowProfileMenu(false)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                >
                                    <HelpCircle className="w-4 h-4 text-[#646464]" />
                                    <span className="text-sm text-[#202224] [font-family:'Nunito_Sans',Helvetica]">
                                        Aide & Support
                                    </span>
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-gray-100 py-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left group"
                                >
                                    <LogOut className="w-4 h-4 text-[#646464] group-hover:text-red-500 transition-colors" />
                                    <span className="text-sm text-[#202224] group-hover:text-red-500 transition-colors [font-family:'Nunito_Sans',Helvetica]">
                                        Déconnexion
                                    </span>
                                </button>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
};
