import { DashboardContentSection } from "./sections/DashboardContentSection";
import { NavigationMenuSection } from "./sections/NavigationMenuSection";

export const Dashboard = (): JSX.Element => {
  return (
    <div className="flex w-full">
      <NavigationMenuSection />
      <DashboardContentSection />
    </div>
  );
};
