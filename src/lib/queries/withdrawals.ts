/**
 * Withdrawals & Stripe Connect Queries
 * Gestion des retraits et de l'onboarding Stripe
 */

import { supabase } from '../supabaseClient';
import { postToEdge } from '../api';
import type {
  Withdrawal,
  SellerRevenue,
  ProcessWithdrawalRequest,
  ProcessWithdrawalResponse,
  CreateStripeConnectResponse,
  CreateOnboardingLinkResponse,
  SyncStripeStatusResponse,
} from '../types';

// ============================================================================
// Stripe Connect Onboarding
// ============================================================================

/**
 * Create a Stripe Connect account for the current seller
 */
export async function createStripeConnectAccount(): Promise<{
  data: CreateStripeConnectResponse | null;
  error: string | null;
}> {
  const result = await postToEdge<CreateStripeConnectResponse>('create-stripe-connect-account', {});
  return result;
}

/**
 * Get Stripe onboarding link for the current seller
 */
export async function getOnboardingLink(
  returnUrl?: string,
  refreshUrl?: string
): Promise<{ url: string | null; error: string | null }> {
  const payload: { return_url?: string; refresh_url?: string } = {};
  if (returnUrl) payload.return_url = returnUrl;
  if (refreshUrl) payload.refresh_url = refreshUrl;

  const result = await postToEdge<CreateOnboardingLinkResponse>('create-onboarding-link', payload);
  return { url: result.data?.url || null, error: result.error };
}

/**
 * Sync Stripe account status (charges_enabled, payouts_enabled)
 */
export async function syncStripeStatus(): Promise<{
  data: SyncStripeStatusResponse | null;
  error: string | null;
}> {
  const result = await postToEdge<SyncStripeStatusResponse>('sync-stripe-status', {});
  return result;
}

/**
 * Check if seller has completed Stripe onboarding
 */
export async function checkStripeOnboarding(
  userId: string
): Promise<{
  hasAccount: boolean;
  isComplete: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_onboarding_complete')
      .eq('id', userId)
      .single();

    if (error) {
      return {
        hasAccount: false,
        isComplete: false,
        chargesEnabled: false,
        payoutsEnabled: false,
        error: error.message,
      };
    }

    // Si on a un compte, sync pour avoir le statut à jour
    if (data?.stripe_account_id) {
      const syncResult = await syncStripeStatus();
      if (syncResult.data) {
        return {
          hasAccount: true,
          isComplete: syncResult.data.details_submitted,
          chargesEnabled: syncResult.data.charges_enabled,
          payoutsEnabled: syncResult.data.payouts_enabled,
          error: null,
        };
      }
    }

    return {
      hasAccount: !!data?.stripe_account_id,
      isComplete: data?.stripe_onboarding_complete || false,
      chargesEnabled: false,
      payoutsEnabled: false,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return {
      hasAccount: false,
      isComplete: false,
      chargesEnabled: false,
      payoutsEnabled: false,
      error: message,
    };
  }
}

// ============================================================================
// Seller Revenues
// ============================================================================

/**
 * Fetch seller revenues
 */
export async function fetchSellerRevenues(
  sellerId: string,
  status?: 'pending' | 'available' | 'withdrawn' | 'refunded'
): Promise<{ data: SellerRevenue[]; error: string | null }> {
  try {
    let query = supabase
      .from('seller_revenues')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Revenues] Fetch error:', error.message);
      return { data: [], error: error.message };
    }

    return { data: (data as SellerRevenue[]) || [], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Revenues] Exception:', message);
    return { data: [], error: message };
  }
}

/**
 * Get available balance for withdrawal
 */
export async function getAvailableBalance(
  sellerId: string
): Promise<{ balance: number; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('seller_revenues')
      .select('net_amount')
      .eq('seller_id', sellerId)
      .eq('status', 'available');

    if (error) {
      return { balance: 0, error: error.message };
    }

    const balance = (data || []).reduce((sum, r) => sum + (r.net_amount || 0), 0);
    return { balance, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { balance: 0, error: message };
  }
}

// ============================================================================
// Withdrawals
// ============================================================================

/**
 * Request a withdrawal
 */
export async function requestWithdrawal(
  amount: number
): Promise<{
  success: boolean;
  withdrawalId?: string;
  error: string | null;
}> {
  const result = await postToEdge<ProcessWithdrawalResponse>('process-withdrawal', {
    amount,
  } as ProcessWithdrawalRequest);

  return {
    success: result.data?.success || false,
    withdrawalId: result.data?.withdrawal_id,
    error: result.error,
  };
}

/**
 * Fetch withdrawal history
 */
export async function fetchWithdrawals(
  sellerId: string,
  limit = 20
): Promise<{ data: Withdrawal[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('seller_id', sellerId)
      .order('requested_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[Withdrawals] Fetch error:', error.message);
      return { data: [], error: error.message };
    }

    return { data: (data as Withdrawal[]) || [], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Withdrawals] Exception:', message);
    return { data: [], error: message };
  }
}

/**
 * Get pending withdrawal total
 */
export async function getPendingWithdrawalsTotal(
  sellerId: string
): Promise<{ total: number; count: number; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('amount')
      .eq('seller_id', sellerId)
      .in('status', ['pending', 'processing']);

    if (error) {
      return { total: 0, count: 0, error: error.message };
    }

    const withdrawals = data || [];
    const total = withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);

    return { total, count: withdrawals.length, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { total: 0, count: 0, error: message };
  }
}
