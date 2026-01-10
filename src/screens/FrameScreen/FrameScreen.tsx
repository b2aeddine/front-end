import React from "react";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { HeroContentSection } from "./sections/HeroContentSection";
import { HowWeWorkSection1 } from "./sections/HowWeWorkSection1";
import { HowWeWorkSection2 } from "./sections/HowWeWorkSection2";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { MainContentSection } from "./sections/MainContentSection";
import { PartnersSection } from "./sections/PartnersSection";
import { ReviewSection } from "./sections/ReviewSection";

export const FrameScreen = (): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-center relative bg-[#f5f5f0] overflow-x-hidden w-full"
      data-model-id="155:5077"
    >
      {/* Main container with responsive padding and gaps */}
      <div className="flex flex-col w-full max-w-[1518px] items-center gap-6 sm:gap-7 relative px-4 sm:px-6 md:px-8 lg:px-4 xl:px-0">
        {/* Header Section - z-index for dropdowns */}
        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] relative z-[100]">
          <HeroSection />
        </div>

        {/* Hero Content - responsive layout handled in component */}
        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <HeroContentSection />
        </div>

        {/* Partners Section */}
        <div className="relative w-full max-w-[1512px] flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <PartnersSection />
        </div>

        {/* Main Content - Featured Creators */}
        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <MainContentSection />
        </div>

        {/* How It Works Section - Responsive title and image */}
        <section className="flex flex-col w-full max-w-[1354px] items-center gap-6 sm:gap-10 md:gap-16 lg:gap-[89px] relative flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms] px-4 sm:px-0">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-2xl sm:text-3xl md:text-4xl lg:text-[56px] text-center tracking-[0] leading-tight md:leading-normal">
            Comment ca marche Collabmarket ?
          </h2>

          {/* Decorative vector - hidden on mobile */}
          <img
            className="absolute top-[50px] sm:top-[65px] left-1/2 -translate-x-1/2 w-[200px] sm:w-[280px] md:w-[326px] h-3 sm:h-4 hidden sm:block"
            alt="Vector"
            src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/vector-1.svg"
          />

          {/* Main image - fluid width */}
          <img
            className="relative self-stretch w-full h-auto object-cover rounded-xl sm:rounded-2xl"
            alt="Rectangle"
            src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/rectangle-59.png"
          />
        </section>

        <div className="relative flex-[0_0_auto] w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
          <HowWeWorkSection1 />
        </div>

        <div className="relative flex-[0_0_auto] w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]">
          <HowWeWorkSection2 />
        </div>

        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms]">
          <HowItWorksSection />
        </div>

        <div className="relative self-stretch w-full h-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms]">
          <ReviewSection />
        </div>

        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1800ms]">
          <FooterSection />
        </div>
      </div>
    </div>
  );
};
