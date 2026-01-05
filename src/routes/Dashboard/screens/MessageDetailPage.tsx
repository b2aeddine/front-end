import { useParams } from "react-router-dom";
import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { MessageDetailContentSection } from "./sections/MessageDetailContentSection";

export const MessageDetailPage = (): JSX.Element => {
    const { conversationId } = useParams<{ conversationId: string }>();

    return (
        <div className="flex w-full">
            <NavigationMenuSection />
            <MessageDetailContentSection conversationId={conversationId || ''} />
        </div>
    );
};
