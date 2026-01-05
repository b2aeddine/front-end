import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { MessagesContentSection } from "./sections/MessagesContentSection";

export const MessagesPage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <MessagesContentSection />
        </div>
    );
};
