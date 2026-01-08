import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { useAuthModal } from "../../../../lib/authModal";
import { useAuth } from "../../../../lib/auth";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Partners" },
  { label: "How we Work" },
  { label: "Review" },
  { label: "Charity" },
];

export const HeroSection = (): JSX.Element => {
  const { openModal } = useAuthModal();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      openModal('signup');
    }
  };

  return (
    <header className="flex flex-col w-full items-start gap-2.5 relative">
      <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full">
        <nav className="flex flex-wrap items-center justify-between gap-8 relative self-stretch w-full translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="inline-flex items-center gap-2 relative flex-shrink-0">
            <img
              className="relative w-8 h-8"
              alt="Logo"
              src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/logo.svg"
            />
            <div className="relative w-fit [font-family:'Kulim_Park',Helvetica] font-bold text-[#1f392c] text-2xl tracking-[0] leading-6 whitespace-nowrap">
              The Creator
            </div>
          </div>

          <div className="hidden md:inline-flex items-start gap-8 relative flex-shrink-0">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-70 transition-opacity"
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            onClick={handleAuthClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3 relative flex-shrink-0 bg-[#fea38e] rounded-[100px] hover:bg-[#fea38e]/90 transition-colors h-auto"
          >
            <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'DM_Sans',Helvetica] font-semibold text-[#f8f5f0] text-lg text-center tracking-[0.18px] leading-6 whitespace-nowrap">
              {isAuthenticated ? 'Dashboard' : 'S\'inscrire'}
            </span>
          </Button>
        </nav>


        <div className="flex flex-col w-full items-center gap-2.5 relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Separator className="w-full h-px bg-[#1f392c]/20" />

          <div className="inline-flex items-center gap-[50px] relative flex-wrap justify-center">
            <div className="inline-flex items-start gap-8 relative">
              {navItems.map((item, index) => (
                <button
                  key={`mobile-1-${index}`}
                  className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-start gap-8 relative">
              {navItems.map((item, index) => (
                <button
                  key={`mobile-2-${index}`}
                  className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#1f392c] text-xl tracking-[0] leading-6 whitespace-nowrap hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Separator className="w-full max-w-[1021px] h-0.5 bg-[#1f392c]/20" />
        </div>
      </div>
    </header>
  );
};
