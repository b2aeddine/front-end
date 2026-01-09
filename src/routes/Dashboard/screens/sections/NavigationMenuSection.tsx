import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../../../lib/auth";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  FileText,
  Users,
  UserCircle,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  badge?: number;
}

// Main menu items with icons
const mainMenuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { label: "Products", path: "/dashboard/services", icon: <Package className="w-[18px] h-[18px]" /> },
  { label: "Order Lists", path: "/dashboard/orders", icon: <ClipboardList className="w-[18px] h-[18px]" /> },
  { label: "Inbox", path: "/dashboard/messages", icon: <MessageSquare className="w-[18px] h-[18px]" />, badge: 3 },
  { label: "Revenue", path: "/dashboard/revenues", icon: <TrendingUp className="w-[18px] h-[18px]" /> },
  { label: "Tenders", path: "/dashboard/appels-offres", icon: <FileText className="w-[18px] h-[18px]" /> },
  { label: "Affiliation", path: "/dashboard/affiliation", icon: <Users className="w-[18px] h-[18px]" /> },
  { label: "Profile", path: "/dashboard/profile", icon: <UserCircle className="w-[18px] h-[18px]" /> },
];

// Bottom items
const bottomMenuItems: MenuItem[] = [
  { label: "Settings", path: "/dashboard/settings", icon: <Settings className="w-[18px] h-[18px]" /> },
  { label: "Logout", icon: <LogOut className="w-[18px] h-[18px]" /> },
];

export const NavigationMenuSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const handleClick = (item: MenuItem) => {
    if (item.label === 'Logout') {
      signOut();
      navigate('/');
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const renderMenuItem = (item: MenuItem, index: number, isBottom: boolean = false) => {
    const active = isActive(item.path);
    const isLogout = item.label === 'Logout';

    return (
      <div key={`${item.label}-${index}`} className="relative w-full px-3">
        <Button
          variant="ghost"
          onClick={() => handleClick(item)}
          className={`
            w-full justify-start gap-3 px-4 py-2.5 h-11 rounded-xl transition-all duration-200 group
            ${active
              ? 'bg-[#fea38e] text-white shadow-md shadow-[#fea38e]/20 hover:bg-[#fe9580] hover:text-white'
              : isLogout
                ? 'text-[#606060] hover:text-red-500 hover:bg-red-50'
                : 'text-[#606060] hover:bg-[#fea38e]/10 hover:text-[#202224]'
            }
          `}
        >
          {/* Active Indicator */}
          {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-sm" />
          )}

          {/* Icon */}
          <span className={`flex-shrink-0 transition-transform duration-200 ${!active && !isLogout ? 'group-hover:scale-110' : ''}`}>
            {item.icon}
          </span>

          {/* Label */}
          <span className="[font-family:'Nunito_Sans',Helvetica] text-sm font-semibold tracking-wide flex-1 text-left">
            {item.label}
          </span>

          {/* Badge */}
          {item.badge && item.badge > 0 && (
            <span className={`
              min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center
              ${active
                ? 'bg-white/25 text-white'
                : 'bg-[#fea38e] text-white'
              }
            `}>
              {item.badge}
            </span>
          )}

          {/* Hover Arrow */}
          {!active && !isBottom && (
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
          )}
        </Button>
      </div>
    );
  };

  return (
    <nav className="flex flex-col w-60 min-h-screen bg-[#f8f5f0] py-6 border-r border-[#e5e5e5]/50">
      {/* Logo Section */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#fea38e] to-[#fe8e76] flex items-center justify-center shadow-md shadow-[#fea38e]/30">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-xl tracking-tight">
            DashStack
          </span>
        </div>
      </div>

      {/* Main Menu Section */}
      <div className="px-3 mb-2">
        <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#9ca3af] text-[10px] tracking-[1.5px] uppercase px-4">
          Menu Principal
        </span>
      </div>

      <div className="flex flex-col gap-1 w-full mb-6">
        {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* Divider */}
      <div className="mx-6 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent" />
      </div>

      {/* Pages Section Label */}
      <div className="px-3 mb-2">
        <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#9ca3af] text-[10px] tracking-[1.5px] uppercase px-4">
          Paramètres
        </span>
      </div>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-1 w-full mt-auto">
        {bottomMenuItems.map((item, index) => renderMenuItem(item, index, true))}
      </div>

      {/* User Quick Info */}
      <div className="mx-3 mt-4 p-3 bg-white/50 rounded-xl border border-[#e5e5e5]/50">
        <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="[font-family:'Nunito_Sans',Helvetica]">En ligne</span>
        </div>
      </div>
    </nav>
  );
};
