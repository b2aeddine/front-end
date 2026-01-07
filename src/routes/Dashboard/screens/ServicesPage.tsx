import React from "react";
import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { ServicesContentSection } from "./sections/ServicesContentSection";

export const ServicesPage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <ServicesContentSection />
        </div>
    );
};
