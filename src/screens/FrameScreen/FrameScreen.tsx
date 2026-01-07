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
      <div className="flex flex-col w-full max-w-[1518px] items-center gap-7 relative px-4 md:px-0">
        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <HeroSection />
        </div>

        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <HeroContentSection />
        </div>

        <div className="relative w-full max-w-[1512px] flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <PartnersSection />
        </div>

        <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <MainContentSection />
        </div>

        <section className="flex flex-col w-full max-w-[1354px] items-center gap-10 md:gap-[89px] relative flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-3xl md:text-[56px] text-center tracking-[0] leading-[normal]">
            Comment ca marche Collabmarket ?
          </h2>

          <img
            className="absolute top-[65px] left-1/2 -translate-x-1/2 w-[326px] h-4"
            alt="Vector"
            src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/vector-1.svg"
          />

          <img
            className="relative self-stretch w-full h-auto object-cover"
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
