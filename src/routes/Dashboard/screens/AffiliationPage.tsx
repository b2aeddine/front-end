
import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { AffiliationContentSection } from "./sections/AffiliationContentSection";

export const AffiliationPage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <AffiliationContentSection />
        </div>
    );
};
