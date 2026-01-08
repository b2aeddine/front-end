/**
 * PageHeader Component
 * Unified header for all dashboard pages
 * Provides: title, context message, primary action
 */

import { useNavigate } from 'react-router-dom';
import { Button } from './button';

interface PageHeaderProps {
    title: string;
    contextMessage: string;
    primaryAction?: {
        label: string;
        path?: string;
        onClick?: () => void;
    };
}

export const PageHeader = ({
    title,
    contextMessage,
    primaryAction,
}: PageHeaderProps): JSX.Element => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (primaryAction?.onClick) {
            primaryAction.onClick();
        } else if (primaryAction?.path) {
            navigate(primaryAction.path);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
            {/* Title with orange underline */}
            <h1 className="dashboard-title mb-2">{title}</h1>

            {/* Context message + primary action */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
                <p className="[font-family:'Nunito_Sans',Helvetica] font-normal text-[#606060] text-base">
                    {contextMessage}
                </p>

                {primaryAction && (
                    <Button
                        onClick={handleAction}
                        className="w-fit h-10 rounded-[10px] bg-[#fea38e] hover:bg-[#fe8e76] px-5 [font-family:'DM_Sans',Helvetica] font-bold text-[#f8f5f0] text-sm transition-all duration-200"
                    >
                        {primaryAction.label}
                    </Button>
                )}
            </div>
        </div>
    );
};
