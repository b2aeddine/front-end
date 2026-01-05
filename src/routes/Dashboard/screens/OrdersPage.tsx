import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { OrderListSection } from "./sections/OrderListSection";

export const OrdersPage = (): JSX.Element => {
    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <OrderListSection />
        </div>
    );
};
