/**
 * User State Engine
 * Computes intelligent user state for adaptive dashboard behavior
 * 
 * This hook determines what stage of the user journey the user is in
 * and provides dynamic content for the dashboard without visual changes.
 */

import { useMemo } from 'react';
import type { UserProfile, UserRole } from './auth';

// ============================================================================
// Types
// ============================================================================

export type UserState =
    | 'profile_incomplete'      // onboarding_completed = false
    | 'kyc_pending'             // kyc_status != 'verified'
    | 'no_service_created'      // seller with activeServices = 0
    | 'no_payment_method'       // no payment method configured (future)
    | 'first_order_pending'     // new user, no completed orders
    | 'active_user'             // regular active user
    | 'affiliate_active';       // has affiliate role active

export interface DashboardStats {
    activeOrders: number;
    completedOrders: number;
    totalRevenue: number;
    pendingRevenue: number;
    availableBalance: number;
    unreadMessages: number;
    totalServices: number;
    activeServices: number;
}

export interface UserStateResult {
    primaryState: UserState;
    secondaryStates: UserState[];
    priority: number;
    message: string;
    actionLabel: string;
    actionPath: string;
    primaryCTA: number;         // Index of CTA button to highlight
    canAccessOffers: boolean;   // Whether user can see appels d'offres
}

// ============================================================================
// State Configuration
// ============================================================================

interface StateConfig {
    priority: number;
    message: string;
    actionLabel: string;
    actionPath: string;
    primaryCTA: number;
}

const STATE_CONFIG: Record<UserState, StateConfig> = {
    profile_incomplete: {
        priority: 1,
        message: "Complétez votre profil pour commencer à utiliser la plateforme",
        actionLabel: "Compléter mon profil",
        actionPath: "/dashboard/profile",
        primaryCTA: -1, // No CTA button, use card action
    },
    kyc_pending: {
        priority: 2,
        message: "Votre vérification d'identité est en attente",
        actionLabel: "Vérifier mon identité",
        actionPath: "/dashboard/profile",
        primaryCTA: -1,
    },
    no_service_created: {
        priority: 3,
        message: "Publiez votre premier service pour commencer à vendre",
        actionLabel: "Créer un service",
        actionPath: "/dashboard/services",
        primaryCTA: 1, // "Vendre des services" button
    },
    no_payment_method: {
        priority: 4,
        message: "Ajoutez un moyen de paiement pour recevoir vos revenus",
        actionLabel: "Configurer paiement",
        actionPath: "/dashboard/revenue",
        primaryCTA: -1,
    },
    first_order_pending: {
        priority: 5,
        message: "Trouvez votre premier service et passez commande",
        actionLabel: "Explorer les services",
        actionPath: "/services",
        primaryCTA: 2, // "Trouvez des services" button
    },
    active_user: {
        priority: 10,
        message: "Tout est en ordre ! Continuez votre activité",
        actionLabel: "Voir mes commandes",
        actionPath: "/dashboard/orders",
        primaryCTA: -1, // All CTAs equal
    },
    affiliate_active: {
        priority: 10,
        message: "Mode affiliation actif - Partagez et gagnez",
        actionLabel: "Gérer affiliations",
        actionPath: "/dashboard/affiliation",
        primaryCTA: 3, // "Trouvez des service a affilier" button
    },
};

// ============================================================================
// Main Hook
// ============================================================================

interface UseUserStateParams {
    profile: UserProfile | null;
    roles: UserRole[];
    stats: DashboardStats | null;
    refreshKey?: number;
}

export function useUserState({
    profile,
    roles,
    stats,
    refreshKey = 0,
}: UseUserStateParams): UserStateResult {
    return useMemo(() => {
        return computeUserState(profile, roles, stats);
    }, [profile, roles, stats, refreshKey]);
}

// ============================================================================
// State Computation Logic
// ============================================================================

function computeUserState(
    profile: UserProfile | null,
    roles: UserRole[],
    stats: DashboardStats | null
): UserStateResult {
    const detectedStates: UserState[] = [];

    // Get primary role
    const primaryRole = roles.find(r => r.status === 'active')?.role;
    const isSeller = primaryRole === 'freelance' || primaryRole === 'influencer';
    const isAffiliate = primaryRole === 'agent';

    // ==========================================================================
    // State Detection (in priority order)
    // ==========================================================================

    // 1. Profile Incomplete
    if (!profile || !profile.onboarding_completed) {
        detectedStates.push('profile_incomplete');
    }

    // 2. KYC Pending
    if (profile && profile.kyc_status !== 'verified' && profile.kyc_status !== 'none') {
        detectedStates.push('kyc_pending');
    }

    // 3. No Service Created (for sellers)
    if (isSeller && stats && stats.activeServices === 0) {
        detectedStates.push('no_service_created');
    }

    // 4. First Order Pending (for buyers or new users)
    if (stats && stats.completedOrders === 0 && !isSeller) {
        detectedStates.push('first_order_pending');
    }

    // 5. Affiliate Active
    if (isAffiliate) {
        detectedStates.push('affiliate_active');
    }

    // Default to active_user if no issues detected
    if (detectedStates.length === 0) {
        detectedStates.push('active_user');
    }

    // ==========================================================================
    // Select Primary State (lowest priority number = most urgent)
    // ==========================================================================

    const sortedStates = detectedStates.sort(
        (a, b) => STATE_CONFIG[a].priority - STATE_CONFIG[b].priority
    );

    const primaryState = sortedStates[0];
    const secondaryStates = sortedStates.slice(1);
    const config = STATE_CONFIG[primaryState];

    // ==========================================================================
    // Determine if user can access offers (must "earn" it)
    // ==========================================================================

    const canAccessOffers =
        (profile?.onboarding_completed === true) ||
        (stats?.activeServices !== undefined && stats.activeServices > 0) ||
        (roles.some(r =>
            (r.role === 'freelance' || r.role === 'influencer') &&
            r.status === 'active'
        ));

    return {
        primaryState,
        secondaryStates,
        priority: config.priority,
        message: config.message,
        actionLabel: config.actionLabel,
        actionPath: config.actionPath,
        primaryCTA: config.primaryCTA,
        canAccessOffers,
    };
}

// ============================================================================
// Exports
// ============================================================================

export type { UserProfile, UserRole };
