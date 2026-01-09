import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

const mainNavItems = [
  { label: "Partners" },
  { label: "How we Work" },
  { label: "Review" },
  { label: "Charity" },
];

const secondaryNavItems = [
  { label: "Partners" },
  { label: "How we Work" },
  { label: "Review" },
  { label: "Charity" },
];

export const ProfileHeaderSection = (): JSX.Element => {
  return (
    <header className="flex flex-col w-full items-start gap-2.5 sticky top-0 z-50 bg-[#f8f5f0]/95 backdrop-blur-sm shadow-sm">
      <div className="flex flex-col items-start gap-2.5 w-full">
        <nav className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2">
            <img
              className="w-8 h-8"
              alt="Logo"
              src="https://c.animaapp.com/mjs9uq4eaVmanC/img/logo.svg"
            />
            <div className="[font-family:'Kulim_Park',Helvetica] font-bold text-[#1f392c] text-2xl tracking-[0] leading-6 whitespace-nowrap">
              The Creator
            </div>
          </div>

          <div className="inline-flex items-start gap-8">
            {mainNavItems.map((item, index) => (
              <button
                key={`main-nav-${index}`}
                className="mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:text-[#fea38e] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button className="inline-flex items-center justify-center gap-2.5 px-8 py-3 bg-[#fea38e] rounded-[100px] hover:bg-[#fe8f77] h-auto transition-colors">
            <span className="[font-family:'DM_Sans',Helvetica] font-semibold text-[#f8f5f0] text-lg text-center tracking-[0.18px] leading-6 whitespace-nowrap">
              S&apos;inscrire
            </span>
          </Button>
        </nav>

        <div className="flex flex-col w-full items-center gap-2.5">
          <Separator className="w-full bg-[#1f392c]/20" />

          <nav className="inline-flex items-center gap-[50px]">
            <div className="inline-flex items-start gap-8">
              {secondaryNavItems.map((item, index) => (
                <button
                  key={`secondary-nav-1-${index}`}
                  className="mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:text-[#fea38e] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-start gap-8">
              {secondaryNavItems.map((item, index) => (
                <button
                  key={`secondary-nav-2-${index}`}
                  className="mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:text-[#fea38e] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <Separator className="w-full max-w-[1021px] bg-[#1f392c]/20" />
        </div>
      </div>

      <img
        className="w-[54.05px] h-[52.67px]"
        alt="Like"
        src="https://c.animaapp.com/mjs9uq4eaVmanC/img/like--1---1--3.png"
      />
    </header>
  );
};
