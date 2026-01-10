import { useState, useEffect } from "react";
import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { RevenueContentSection } from "./sections/RevenueContentSection";
import { Menu, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

export const RevenuePage = (): JSX.Element => {
    // Mobile sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar on window resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex w-full min-h-screen relative">
            {/* Mobile Menu Toggle Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-3 left-3 z-[80] lg:hidden w-11 h-11 rounded-xl bg-white shadow-md border border-gray-100 hover:bg-[#fea38e]/10"
                aria-label={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
                {isSidebarOpen ? (
                    <X className="w-5 h-5 text-[#1f392c]" />
                ) : (
                    <Menu className="w-5 h-5 text-[#1f392c]" />
                )}
            </Button>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Navigation */}
            <div
                className={`
                    fixed lg:static inset-y-0 left-0 z-[70]
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <NavigationMenuSection onNavigate={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-auto">
                <RevenueContentSection />
            </div>
        </div>
    );
};
