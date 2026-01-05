import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useAuth } from "../../../../lib/auth";


interface MenuItem {
  label: string;
  icon: string;
  path?: string;
  action?: () => void;
}

const mainMenuItems: MenuItem[] = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Mes Commandes", icon: "📋", path: "/dashboard/orders" },
  { label: "Messages", icon: "📧", path: "/dashboard/messages" },
  { label: "Mes Services", icon: "📦", path: "/dashboard/services" },
  { label: "Favoris", icon: "⭐", path: "/dashboard/favorites" },
];

const pagesMenuItems: MenuItem[] = [
  { label: "Marketplace", icon: "🛒", path: "/" },
  { label: "Mon Profil", icon: "👤", path: "/dashboard/profile" },
  { label: "Revenus", icon: "💰", path: "/dashboard/revenues" },
];

const bottomMenuItems: MenuItem[] = [
  { label: "Paramètres", icon: "⚙", path: "/dashboard/settings" },
  { label: "Déconnexion", icon: "🚪" },  // action handled separately
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
    if (item.label === 'Déconnexion') {
      signOut();
      navigate('/');
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const renderMenuItem = (item: MenuItem, index: number, prefix: string) => {
    const active = isActive(item.path);
    return (
      <Button
        key={`${prefix}-${index}`}
        variant="ghost"
        onClick={() => handleClick(item)}
        className={`relative self-stretch w-full h-[50px] justify-start px-0 rounded-none ${
          active ? 'bg-white hover:bg-white/90' : 'hover:bg-white/50'
        }`}
      >
        {active && <div className="absolute left-0 w-[9px] h-full bg-[#4880ff] rounded-r-lg" />}
        <span className="absolute left-[18.44%] [font-family:'DM_Sans',Helvetica] font-medium text-[#202224] text-[22px] text-center tracking-[0] leading-[normal]">
          {item.icon}
        </span>
        <span className={`absolute left-[31.97%] [font-family:'Nunito_Sans',Helvetica] font-semibold text-sm tracking-[0.30px] leading-[normal] ${
          active ? 'text-[#4880ff]' : 'text-[#1f392c]'
        }`}>
          {item.label}
        </span>
      </Button>
    );
  };

  return (
    <nav className="flex flex-col w-60 items-start gap-[30px] px-0 py-6 bg-[#f8f5f0]">
      <div className="w-60 h-[27px] px-6">
        <h1 className="[font-family:'Nunito_Sans',Helvetica] font-extrabold text-xl tracking-[0] leading-[normal]">
          <span className="text-[#4880ff]">Collab</span>
          <span className="text-[#202224]">Market</span>
        </h1>
      </div>

      <div className="flex flex-col w-60 items-start gap-1">
        {mainMenuItems.map((item, index) => renderMenuItem(item, index, 'main'))}

        <Separator className="w-60 h-px bg-[#e5e5e5]" />

        <div className="self-stretch opacity-60 [font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-xs tracking-[0.26px] leading-[normal] px-6">
          PAGES
        </div>

        {pagesMenuItems.map((item, index) => renderMenuItem(item, index, 'pages'))}

        <Separator className="w-60 h-px bg-[#e5e5e5]" />

        {bottomMenuItems.map((item, index) => renderMenuItem(item, index, 'bottom'))}
      </div>
    </nav>
  );
};
