import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { RevenueContentSection } from "./sections/RevenueContentSection";

export const RevenuePage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <RevenueContentSection />
        </div>
    );
};
