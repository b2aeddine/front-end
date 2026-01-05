import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";


const mainMenuItems = [
  { label: "Products", icon: "📦", active: true },
  { label: "Products", icon: "📦", active: false },
  { label: "Favorites", icon: "⭐", active: false },
  { label: "Inbox", icon: "📧", active: false },
  { label: "Order Lists", icon: "📋", active: false },
  { label: "Product Stock", icon: "📊", active: false },
];

const pagesMenuItems = [
  { label: "Pricing", icon: "💰" },
  { label: "Calender", icon: "📅" },
  { label: "To-Do", icon: "✓" },
  { label: "Contact", icon: "👤" },
  { label: "Invoice", icon: "🧾" },
  { label: "UI Elements", icon: "🎨" },
  { label: "Team", icon: "👥" },
  { label: "Table", icon: "📊" },
];

const bottomMenuItems = [
  { label: "Settings", icon: "⚙" },
  { label: "Logout", icon: "🚪" },
];

export const NavigationMenuSection = (): JSX.Element => {
  return (
    <nav className="flex flex-col w-60 items-start gap-[30px] px-0 py-6 bg-[#f8f5f0]">
      <div className="w-60 h-[27px] px-6">
        <h1 className="[font-family:'Nunito_Sans',Helvetica] font-extrabold text-xl tracking-[0] leading-[normal]">
          <span className="text-[#4880ff]">Dash</span>
          <span className="text-[#202224]">Stack</span>
        </h1>
      </div>

      <div className="flex flex-col w-60 items-start gap-1">
        <div className="flex flex-col items-start gap-2.5 self-stretch w-full">
          <div className="relative w-full h-[50px]">
            <Button
              className="absolute inset-0 w-full h-full bg-white hover:bg-white/90 text-white justify-start px-0 rounded-none"
              variant="ghost"
            >
              <div className="absolute left-0 w-[9px] h-full bg-[#4880ff] rounded-r-lg" />
              <span className="absolute left-[18.44%] [font-family:'DM_Sans',Helvetica] font-medium text-[22px] text-center tracking-[0] leading-[normal]">
                📦
              </span>
              <span className="absolute left-[31.97%] [font-family:'Nunito_Sans',Helvetica] font-semibold text-sm tracking-[0.30px] leading-[normal]">
                Products
              </span>
            </Button>
          </div>
        </div>

        {mainMenuItems.slice(1).map((item, index) => (
          <Button
            key={`main-${index}`}
            variant="ghost"
            className="relative self-stretch w-full h-[50px] justify-start px-0 hover:bg-white/50 rounded-none"
          >
            <span className="absolute left-[18.44%] [font-family:'DM_Sans',Helvetica] font-medium text-[#202224] text-[22px] text-center tracking-[0] leading-[normal]">
              {item.icon}
            </span>
            <span className="absolute left-[31.97%] [font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-sm tracking-[0.30px] leading-[normal]">
              {item.label}
            </span>
          </Button>
        ))}

        <Separator className="w-60 h-px bg-[#e5e5e5]" />

        <div className="self-stretch opacity-60 [font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-xs tracking-[0.26px] leading-[normal] px-6">
          PAGES
        </div>

        {pagesMenuItems.map((item, index) => (
          <Button
            key={`pages-${index}`}
            variant="ghost"
            className="relative self-stretch w-full h-[50px] justify-start px-0 hover:bg-white/50 rounded-none"
          >
            <span className="absolute left-[18.44%] [font-family:'DM_Sans',Helvetica] font-medium text-[#202224] text-[22px] text-center tracking-[0] leading-[normal]">
              {item.icon}
            </span>
            <span className="absolute left-[31.97%] [font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-sm tracking-[0.30px] leading-[normal]">
              {item.label}
            </span>
          </Button>
        ))}

        <Separator className="w-60 h-px bg-[#e5e5e5]" />

        {bottomMenuItems.map((item, index) => (
          <Button
            key={`bottom-${index}`}
            variant="ghost"
            className="relative self-stretch w-full h-[50px] justify-start px-0 hover:bg-white/50 rounded-none"
          >
            <span className="absolute left-[18.44%] [font-family:'DM_Sans',Helvetica] font-medium text-[#202224] text-[22px] text-center tracking-[0] leading-[normal]">
              {item.icon}
            </span>
            <span className="absolute left-[31.97%] [font-family:'DM_Sans',Helvetica] font-semibold text-[#1f392c] text-sm tracking-[0.30px] leading-[normal]">
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
};
