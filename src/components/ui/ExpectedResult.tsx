/**
 * ExpectedResult Component
 * Motivation zone that answers: "If I do this, what do I gain?"
 * Sits below the MasterCard, before stats
 */

import { TrendingUpIcon } from 'lucide-react';
import { Card, CardContent } from './card';

interface ExpectedResultProps {
    currentValue: string;
    potential: string;
    encouragement: string;
}

export const ExpectedResult = ({
    currentValue,
    potential,
    encouragement,
}: ExpectedResultProps): JSX.Element => {
    return (
        <Card className="w-full bg-[#f8f5f0] rounded-[12px] border border-solid border-[#97979766] shadow-[2px_2px_20px_#0000000a]">
            <CardContent className="p-4 md:p-5 flex items-center gap-4">
                {/* Trend Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(254,163,142,0.2)]">
                    <TrendingUpIcon className="w-6 h-6 text-[#fea38e]" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="[font-family:'Nunito_Sans',Helvetica] font-bold text-[#202224] text-base">
                            {currentValue}
                        </span>
                        <span className="[font-family:'Nunito_Sans',Helvetica] font-medium text-[#00b69b] text-sm">
                            → {potential}
                        </span>
                    </div>
                    <p className="[font-family:'Nunito_Sans',Helvetica] font-normal text-[#606060] text-sm">
                        {encouragement}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
