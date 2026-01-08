/**
 * EmptyState Component
 * Intelligent empty state for lists with contextual guidance
 * Never shows a "dead" empty screen - always guides the user
 */

import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './card';
import { Button } from './button';
import {
    PackageIcon,
    ShoppingCartIcon,
    MessageSquareIcon,
    LinkIcon,
    WalletIcon,
    SearchIcon,
    FileTextIcon
} from 'lucide-react';

type EmptyStateType =
    | 'services'
    | 'orders'
    | 'messages'
    | 'affiliation'
    | 'revenue'
    | 'offers'
    | 'generic';

interface EmptyStateConfig {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    actionPath?: string;
}

const EMPTY_STATE_CONFIG: Record<EmptyStateType, EmptyStateConfig> = {
    services: {
        icon: <PackageIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Aucun service encore",
        description: "Créez votre premier service pour commencer à gagner de l'argent",
        actionLabel: "Créer un service",
        actionPath: "/dashboard/services",
    },
    orders: {
        icon: <ShoppingCartIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Aucune commande",
        description: "Vos commandes apparaîtront ici. Explorez les services disponibles !",
        actionLabel: "Explorer les services",
        actionPath: "/services",
    },
    messages: {
        icon: <MessageSquareIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Aucune conversation",
        description: "Vos messages apparaîtront ici une fois que vous aurez des échanges",
    },
    affiliation: {
        icon: <LinkIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Aucun lien d'affiliation",
        description: "Sélectionnez un service pour générer votre lien et gagner des commissions",
        actionLabel: "Explorer les services",
        actionPath: "/dashboard/affiliation",
    },
    revenue: {
        icon: <WalletIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Aucun revenu encore",
        description: "Créez des services et recevez des commandes pour voir vos revenus ici",
        actionLabel: "Créer un service",
        actionPath: "/dashboard/services",
    },
    offers: {
        icon: <FileTextIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Aucun appel d'offres",
        description: "Les appels d'offres disponibles apparaîtront ici",
        actionLabel: "Poster un appel",
        actionPath: "/dashboard/appels-offres",
    },
    generic: {
        icon: <SearchIcon className="w-12 h-12 text-[#fea38e]" />,
        title: "Rien à afficher",
        description: "Il n'y a pas encore de contenu ici",
    },
};

interface EmptyStateProps {
    type: EmptyStateType;
    customTitle?: string;
    customDescription?: string;
    customAction?: {
        label: string;
        path?: string;
        onClick?: () => void;
    };
}

export const EmptyState = ({
    type,
    customTitle,
    customDescription,
    customAction,
}: EmptyStateProps): JSX.Element => {
    const navigate = useNavigate();
    const config = EMPTY_STATE_CONFIG[type];

    const title = customTitle || config.title;
    const description = customDescription || config.description;
    const actionLabel = customAction?.label || config.actionLabel;
    const actionPath = customAction?.path || config.actionPath;

    const handleAction = () => {
        if (customAction?.onClick) {
            customAction.onClick();
        } else if (actionPath) {
            navigate(actionPath);
        }
    };

    return (
        <Card className="w-full bg-[#f8f5f0] border border-dashed border-[#e5e7eb] rounded-xl">
            <CardContent className="p-8 md:p-12 flex flex-col items-center text-center gap-4">
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(254,163,142,0.15)]">
                    {config.icon}
                </div>

                {/* Title */}
                <h3 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-xl">
                    {title}
                </h3>

                {/* Description */}
                <p className="[font-family:'Nunito_Sans',Helvetica] font-normal text-[#606060] text-base max-w-md">
                    {description}
                </p>

                {/* Action button */}
                {actionLabel && (
                    <Button
                        onClick={handleAction}
                        className="mt-2 h-10 rounded-[10px] bg-[#fea38e] hover:bg-[#fe8e76] px-6 [font-family:'DM_Sans',Helvetica] font-bold text-[#f8f5f0] text-sm transition-all duration-200"
                    >
                        {actionLabel}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
