/**
 * Dashboard Queries
 * Stats et métriques pour le dashboard buyer/seller
 */

import { supabase } from '../supabaseClient';
import type { DashboardStats, OrderStats, OrderStatus } from '../types';

// ============================================================================
// Dashboard Stats
// ============================================================================

/**
 * Fetch dashboard stats for a user (buyer or seller perspective)
 */
export async function fetchDashboardStats(
  userId: string,
  role: 'buyer' | 'seller'
): Promise<{ data: DashboardStats | null; error: string | null }> {
  try {
    const roleColumn = role === 'buyer' ? 'buyer_id' : 'seller_id';

    // Fetch orders for counting
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, status, amount, seller_amount')
      .eq(roleColumn, userId);

    if (ordersError) {
      console.error('[Dashboard] Orders fetch error:', ordersError.message);
      return { data: null, error: ordersError.message };
    }

    const ordersData = orders || [];

    // Calculate stats
    const activeStatuses: OrderStatus[] = ['pending', 'payment_authorized', 'accepted', 'in_progress', 'delivered'];
    const completedStatuses: OrderStatus[] = ['completed'];

    const activeOrders = ordersData.filter(o => activeStatuses.includes(o.status as OrderStatus)).length;
    const completedOrders = ordersData.filter(o => completedStatuses.includes(o.status as OrderStatus)).length;

    // For sellers, calculate revenue
    let totalRevenue = 0;
    let pendingRevenue = 0;
    let availableBalance = 0;

    if (role === 'seller') {
      // Fetch seller revenues
      const { data: revenues, error: revenuesError } = await supabase
        .from('seller_revenues')
        .select('net_amount, status')
        .eq('seller_id', userId);

      if (!revenuesError && revenues) {
        for (const rev of revenues) {
          totalRevenue += rev.net_amount || 0;
          if (rev.status === 'pending') {
            pendingRevenue += rev.net_amount || 0;
          } else if (rev.status === 'available') {
            availableBalance += rev.net_amount || 0;
          }
        }
      }
    }

    // Count unread messages
    const { count: unreadCount, error: messagesError } = await supabase
      .from('order_messages')
      .select('id', { count: 'exact', head: true })
      .neq('sender_id', userId)
      .in('order_id', ordersData.map(o => o.id))
      // Note: Pour un vrai système, on aurait besoin d'un champ read_at
      // Ici on compte tous les messages non envoyés par l'utilisateur
      ;

    // Count services for sellers
    let totalServices = 0;
    let activeServices = 0;

    if (role === 'seller') {
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('id, status')
        .eq('seller_id', userId)
        .neq('status', 'deleted');

      if (!servicesError && services) {
        totalServices = services.length;
        activeServices = services.filter(s => s.status === 'active').length;
      }
    }

    const stats: DashboardStats = {
      activeOrders,
      completedOrders,
      totalRevenue,
      pendingRevenue,
      availableBalance,
      unreadMessages: unreadCount || 0,
      totalServices,
      activeServices,
    };

    return { data: stats, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Dashboard] Exception:', message);
    return { data: null, error: message };
  }
}

/**
 * Fetch order stats breakdown by status
 */
export async function fetchOrderStats(
  userId: string,
  role: 'buyer' | 'seller'
): Promise<{ data: OrderStats | null; error: string | null }> {
  try {
    const roleColumn = role === 'buyer' ? 'buyer_id' : 'seller_id';

    const { data: orders, error } = await supabase
      .from('orders')
      .select('status')
      .eq(roleColumn, userId);

    if (error) {
      console.error('[Dashboard] Order stats error:', error.message);
      return { data: null, error: error.message };
    }

    const ordersData = orders || [];

    const stats: OrderStats = {
      total: ordersData.length,
      pending: ordersData.filter(o => o.status === 'pending' || o.status === 'payment_authorized').length,
      inProgress: ordersData.filter(o => o.status === 'accepted' || o.status === 'in_progress').length,
      delivered: ordersData.filter(o => o.status === 'delivered' || o.status === 'revision_requested').length,
      completed: ordersData.filter(o => o.status === 'completed').length,
      cancelled: ordersData.filter(o => o.status === 'cancelled' || o.status === 'refunded').length,
    };

    return { data: stats, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Dashboard] Exception:', message);
    return { data: null, error: message };
  }
}

/**
 * Fetch revenue stats for last 30 days (seller only)
 */
export async function fetchRevenueStats(
  sellerId: string
): Promise<{
  data: {
    last30Days: number;
    previousPeriod: number;
    percentChange: number;
  } | null;
  error: string | null;
}> {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Last 30 days
    const { data: recent, error: recentError } = await supabase
      .from('seller_revenues')
      .select('net_amount')
      .eq('seller_id', sellerId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (recentError) {
      return { data: null, error: recentError.message };
    }

    // Previous 30 days (for comparison)
    const { data: previous, error: previousError } = await supabase
      .from('seller_revenues')
      .select('net_amount')
      .eq('seller_id', sellerId)
      .gte('created_at', sixtyDaysAgo.toISOString())
      .lt('created_at', thirtyDaysAgo.toISOString());

    if (previousError) {
      return { data: null, error: previousError.message };
    }

    const last30Days = (recent || []).reduce((sum, r) => sum + (r.net_amount || 0), 0);
    const previousPeriod = (previous || []).reduce((sum, r) => sum + (r.net_amount || 0), 0);

    const percentChange = previousPeriod > 0
      ? ((last30Days - previousPeriod) / previousPeriod) * 100
      : last30Days > 0 ? 100 : 0;

    return {
      data: {
        last30Days,
        previousPeriod,
        percentChange: Math.round(percentChange * 10) / 10,
      },
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Dashboard] Exception:', message);
    return { data: null, error: message };
  }
}
