/**
 * MasterCard Component
 * The most important card on the dashboard - always at the top
 * Shows ONE headline and ONE action. Never more.
 */

import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './card';
import { Button } from './button';

interface MasterCardProps {
    headline: string;
    actionLabel: string;
    actionPath?: string;
    onAction?: () => void;
    variant?: 'primary' | 'secondary';
}

export const MasterCard = ({
    headline,
    actionLabel,
    actionPath,
    onAction,
    variant = 'primary',
}: MasterCardProps): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onAction) {
            onAction();
        } else if (actionPath) {
            navigate(actionPath);
        }
    };

    return (
        <Card
            className={`
        w-full rounded-[15px] border-0
        ${variant === 'primary'
                    ? 'bg-[linear-gradient(180deg,rgba(254,163,142,0.85)_0%,rgba(248,245,240,1)_100%)]'
                    : 'bg-[#f8f5f0] border border-solid border-[#97979766]'
                }
        shadow-[1px_2px_6px_#0000001a,5px_9px_10px_#00000017,12px_20px_14px_#0000000d]
      `}
        >
            <CardContent className="p-6 md:p-8 flex flex-col gap-5">
                {/* Question headline */}
                <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-xl md:text-2xl tracking-[0.25px] leading-tight">
                    {headline}
                </h2>

                {/* Single CTA */}
                <Button
                    onClick={handleClick}
                    className="w-fit h-11 rounded-[10px] bg-[#fea38e] hover:bg-[#fe8e76] px-6 [font-family:'DM_Sans',Helvetica] font-bold text-[#f8f5f0] text-base transition-all duration-200"
                >
                    {actionLabel}
                </Button>
            </CardContent>
        </Card>
    );
};
