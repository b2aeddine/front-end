import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuth } from "../../lib/auth";
import { useAuthModal } from "../../lib/authModal";
import { HeaderUserMenu } from "./HeaderUserMenu";

// Navigation items (Public specific)
const navItems = [
    { label: "Partners", href: "/#partners" },
    { label: "How we Work", href: "/#how-we-work" },
    { label: "Review", href: "/#review" },
    { label: "Charity", href: "/#charity" },
];

interface PublicHeaderProps {
    variant?: "landing" | "default";
    showSecondaryNav?: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
    variant = "default",
    showSecondaryNav = true,
}) => {
    const { isAuthenticated } = useAuth();
    const { openModal } = useAuthModal();
    const navigate = useNavigate();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setShowMobileMenu(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll effect & ScrollSpy
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            if (location.pathname === '/') {
                const sections = navItems.map(item => item.href.substring(2)); // remove /#
                let currentActive = "";
                for (const sectionId of sections) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            currentActive = sectionId;
                            break;
                        }
                    }
                }
                setActiveSection(currentActive);
            } else {
                setActiveSection("");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate(href);
        } else {
            const targetId = href.substring(href.indexOf('#') + 1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setShowMobileMenu(false);
    };

    const handleAuthClick = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            openModal('signup');
        }
    };

    return (
        <header
            className={`flex flex-col w-full items-start gap-2.5 transition-all duration-300 ${variant === "default"
                ? `sticky top-0 z-[60] ${isScrolled ? 'bg-[#f8f5f0]/95 backdrop-blur-md shadow-sm py-2' : 'bg-[#f8f5f0] py-4'}`
                : ""
                }`}
        >
            <div className={`flex flex-col items-start gap-2.5 w-full px-4 md:px-8 lg:px-16 transition-all duration-300`}>
                {/* Main Navigation Row */}
                <nav className="flex items-center justify-between w-full relative z-[70]">
                    {/* Logo (Left) */}
                    <Link to="/" className="inline-flex items-center gap-2 flex-shrink-0 group">
                        <img
                            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                            alt="Logo"
                            src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/logo.svg"
                        />
                        <span className="[font-family:'Kulim_Park',Helvetica] font-bold text-[#1f392c] text-2xl tracking-[0] leading-6 whitespace-nowrap">
                            The Creator
                        </span>
                    </Link>

                    {/* Desktop Navigation Links (Center) */}
                    <div className="hidden lg:inline-flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                onClick={(e) => handleNavLinkClick(e, item.href)}
                                className="relative [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-lg tracking-[0] leading-6 whitespace-nowrap hover:text-[#fea38e] transition-colors group py-2"
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#fea38e] transition-all duration-300 ${activeSection === item.href.substring(2) ? 'w-full' : 'w-0 group-hover:w-full'} opacity-80`}></span>
                            </a>
                        ))}
                    </div>

                    {/* Right Section (Notifications, Language, Profile/Auth) */}
                    <div className="flex items-center gap-2">

                        {isAuthenticated ? (
                            <HeaderUserMenu />
                        ) : (
                            /* Not Authenticated: Sign Up Button */
                            <Button
                                onClick={handleAuthClick}
                                className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-[#fea38e] rounded-full hover:bg-[#fe8e76] transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md h-auto ml-2 group"
                            >
                                <span className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#f8f5f0] text-base text-center tracking-[0.16px] leading-6 whitespace-nowrap group-hover:tracking-wide transition-all">
                                    S'inscrire
                                </span>
                            </Button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="lg:hidden w-10 h-10 rounded-full hover:bg-[#1f392c]/5"
                        >
                            {showMobileMenu ? (
                                <X className="w-5 h-5 text-[#1f392c]" />
                            ) : (
                                <Menu className="w-5 h-5 text-[#1f392c]" />
                            )}
                        </Button>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden w-full py-6 px-2 border-t border-[#1f392c]/10 bg-[#f8f5f0]/95 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item, index) => {
                                const isActive = activeSection === item.href.substring(2);
                                return (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${isActive
                                            ? 'bg-[#fea38e]/10 text-[#fea38e] font-semibold'
                                            : 'text-[#1f392c] hover:bg-[#1f392c]/5'
                                            }`}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <span className="text-lg">{item.label}</span>
                                        {isActive && <div className="w-2 h-2 rounded-full bg-[#fea38e]" />}
                                    </a>
                                );
                            })}
                            {!isAuthenticated && (
                                <div className="mt-4 pt-4 border-t border-[#1f392c]/10">
                                    <Button
                                        onClick={() => { handleAuthClick(); setShowMobileMenu(false); }}
                                        className="w-full bg-[#fea38e] hover:bg-[#fe8e76] text-white rounded-xl py-6 text-lg shadow-sm"
                                    >
                                        S'inscrire maintenant
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Secondary Navigation (Marquee) - Optional */}
                {showSecondaryNav && (
                    <div className="flex flex-col w-full items-center gap-2.5">
                        <Separator className="w-full h-px bg-[#1f392c]/20" />
                        <div className="overflow-hidden w-full group cursor-default">
                            <div className="inline-flex items-center gap-[50px] animate-marquee whitespace-nowrap group-hover:pause">
                                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-base tracking-[0] leading-6 whitespace-nowrap">
                                    Trusted by 5000+ Companies Worldwide
                                </span>
                                <span className="w-1.5 h-1.5 bg-[#fea38e] rounded-full"></span>
                                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-base tracking-[0] leading-6 whitespace-nowrap">
                                    Vérified Freelancers & Safe Payments
                                </span>
                                <span className="w-1.5 h-1.5 bg-[#fea38e] rounded-full"></span>
                                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-base tracking-[0] leading-6 whitespace-nowrap">
                                    24/7 Premium Support
                                </span>
                                <span className="w-1.5 h-1.5 bg-[#fea38e] rounded-full"></span>
                                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-base tracking-[0] leading-6 whitespace-nowrap">
                                    Quality Guaranteed
                                </span>
                                <span className="w-1.5 h-1.5 bg-[#fea38e] rounded-full"></span>
                                <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-base tracking-[0] leading-6 whitespace-nowrap">
                                    Trusted by 5000+ Companies Worldwide
                                </span>
                                <span className="w-1.5 h-1.5 bg-[#fea38e] rounded-full"></span>
                            </div>
                        </div>
                        <Separator className="w-full max-w-[1021px] h-0.5 bg-[#1f392c]/20" />
                    </div>
                )}
            </div>
        </header>
    );
};
