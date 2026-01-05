import { ExperienceSkillsSection } from "./screens/sections/ExperienceSkillsSection";
import { PortfolioSection } from "./screens/sections/PortfolioSection";
import { ProfileHeaderSection } from "./screens/sections/ProfileHeaderSection";
import { ProfileOverviewSection } from "./screens/sections/ProfileOverviewSection";
import { ReviewsSection } from "./screens/sections/ReviewsSection";
import { ServicesSection } from "./screens/sections/ServicesSection";

export const PagePublic = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full relative bg-[#f8f5f0] overflow-x-hidden">
      <ProfileHeaderSection />
      <ProfileOverviewSection />
      <PortfolioSection />
      <ServicesSection />
      <ReviewsSection />
      <ExperienceSkillsSection />
    </div>
  );
};
