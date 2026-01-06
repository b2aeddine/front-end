import React from "react";
import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { ProfileContentSection } from "./sections/ProfileContentSection";

export const ProfilePage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <ProfileContentSection />
        </div>
    );
};
