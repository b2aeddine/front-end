import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { AppelsOffresContentSection } from "./sections/AppelsOffresContentSection";

export const AppelsOffresPage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <AppelsOffresContentSection />
        </div>
    );
};
