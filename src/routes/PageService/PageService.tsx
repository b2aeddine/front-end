import { ExperienceAndSkillsSection } from "./screens/sections/ExperienceAndSkillsSection";
import { ProfileOverviewSection } from "./screens/sections/ProfileOverviewSection";
import { UserCommentsSection } from "./screens/sections/UserCommentsSection";

export const PageService = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start relative bg-[#f8f5f0] w-full">
      <ProfileOverviewSection />
      <ExperienceAndSkillsSection />
      <UserCommentsSection />
    </div>
  );
};
