import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../../../lib/auth";


interface MenuItem {
  label: string;
  path?: string;
  highlighted?: boolean;
}

// Main menu items matching the design but mapped to real routes
const mainMenuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/dashboard/services" },
  { label: "Order Lists", path: "/dashboard/orders" },
  { label: "Inbox", path: "/dashboard/messages" },
  { label: "Revenue", path: "/dashboard/revenues" },
  { label: "Tenders", path: "/dashboard/appels-offres" },
  { label: "Affiliation", path: "/dashboard/affiliation" },
  { label: "Profile", path: "/dashboard/profile" },
];

// Bottom items
const bottomMenuItems: MenuItem[] = [
  { label: "Settings", path: "/dashboard/settings" }, // Keeping settings as standard bottom item, usually expected
  { label: "Logout" },
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

  const renderMenuItem = (item: MenuItem, index: number) => {
    const active = isActive(item.path);
    return (
      <div className="relative w-full px-4 mb-1">
        <Button
          key={`${item.label}-${index}`}
          variant="ghost"
          onClick={() => handleClick(item)}
          className={`w-full justify-start px-4 py-2 h-auto rounded-full transition-all ${active ? 'bg-[#FF9F88] text-white font-bold shadow-md' : 'text-[#202224] font-semibold opacity-70 hover:opacity-100'
            }`}
        >
          {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[24px] bg-white rounded-r-full" />
          )}
          <span className="[font-family:'Nunito_Sans',Helvetica] text-sm tracking-[0.30px] leading-[normal] ml-2">
            {item.label}
          </span>
        </Button>
      </div>
    );
  };

  return (
    <nav className="flex flex-col w-60 min-h-screen bg-[#f8f5f0] py-8 border-r border-transparent">
      {/* Logo */}
      <div className="px-6 mb-8">
        <span className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-xl tracking-wide">
          DashStack
        </span>
      </div>

      {/* Main Menu */}
      <div className="flex flex-col gap-2 w-full mb-6">
        {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* PAGES Section Divider */}
      <div className="px-6 mb-4 mt-4">
        <span className="[font-family:'Nunito_Sans',Helvetica] font-semibold text-[#9a9a9a] text-xs tracking-[1px] uppercase">
          PAGES
        </span>
      </div>

      {/* Secondary Pages - placeholder for additional pages like in mockup */}
      <div className="flex flex-col gap-2 w-full mb-6">
        {/* These are visual placeholders matching the mockup structure */}
      </div>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-2 w-full mt-auto">
        {bottomMenuItems.map((item, index) => renderMenuItem(item, index))}
      </div>
    </nav>
  );
};
