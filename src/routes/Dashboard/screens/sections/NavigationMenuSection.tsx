import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useAuth } from "../../../../lib/auth";


interface MenuItem {
  label: string;
  path?: string;
  highlighted?: boolean;
}

// Main menu items matching the design
const mainMenuItems: MenuItem[] = [
  { label: "Mon Dashboard", path: "/dashboard" },
  { label: "Services", path: "/dashboard/services" },
  { label: "Commandes", path: "/dashboard/orders" },
  { label: "Messages", path: "/dashboard/messages" },
  { label: "Facturation", path: "/dashboard/invoices" },
  { label: "Appels d'offres", path: "/dashboard/tenders" },
  { label: "Revenue", path: "/dashboard/revenues" },
];

// Affiliation section
const affiliationMenuItems: MenuItem[] = [
  { label: "Mes Affiliation", path: "/dashboard/affiliations" },
  { label: "Services d'affiliation", path: "/dashboard/affiliate-services" },
];

// Other pages
const pagesMenuItems: MenuItem[] = [
  { label: "Contact", path: "/dashboard/contact", highlighted: true },
  { label: "Invoice", path: "/dashboard/invoice" },
  { label: "UI Elements", path: "/dashboard/ui-elements" },
  { label: "Team", path: "/dashboard/team" },
  { label: "Table", path: "/dashboard/table" },
];

// Bottom items
const bottomMenuItems: MenuItem[] = [
  { label: "Settings", path: "/dashboard/settings" },
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
        <span className={`absolute left-[18%] [font-family:'Nunito_Sans',Helvetica] font-semibold text-sm tracking-[0.30px] leading-[normal] ${
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

        <div className="self-stretch opacity-60 [font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-xs tracking-[0.26px] leading-[normal] px-6 py-2">
          AFFILIATION
        </div>

        {affiliationMenuItems.map((item, index) => renderMenuItem(item, index, 'affiliation'))}

        <Separator className="w-60 h-px bg-[#e5e5e5]" />

        <div className="self-stretch opacity-60 [font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-xs tracking-[0.26px] leading-[normal] px-6 py-2">
          PAGES
        </div>

        {pagesMenuItems.map((item, index) => renderMenuItem(item, index, 'pages'))}

        <Separator className="w-60 h-px bg-[#e5e5e5]" />

        {bottomMenuItems.map((item, index) => renderMenuItem(item, index, 'bottom'))}
      </div>
    </nav>
  );
};
