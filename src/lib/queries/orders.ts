import { supabase } from '../supabaseClient';
import { postToEdge } from '../api';

// ============================================================================
// Types (based on backend schema)
// ============================================================================

export type OrderStatus =
    | 'pending'
    | 'payment_pending'
    | 'accepted'
    | 'in_progress'
    | 'delivered'
    | 'revision_requested'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'disputed';

export interface Order {
    id: string;
    order_number: string;
    buyer_id: string;
    seller_id: string;
    service_id: string;
    package_id: string | null;
    status: OrderStatus;
    amount: number;
    platform_fee: number;
    seller_amount: number;
    agent_commission: number | null;
    requirements_submitted: boolean;
    requirements_data: Record<string, unknown>;
    delivery_deadline: string | null;
    delivered_at: string | null;
    completed_at: string | null;
    cancelled_at: string | null;
    cancellation_reason: string | null;
    current_revision: number;
    max_revisions: number;
    created_at: string;
    updated_at: string;
    // Joined data
    buyer?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    };
    seller?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    };
    service?: {
        id: string;
        title: string;
        slug: string;
    };
    package?: {
        id: string;
        name: string;
        title: string | null;
        price: number;
    };
}

export interface OrderMessage {
    id: string;
    order_id: string;
    sender_id: string;
    content: string;
    is_system: boolean;
    attachments: string[] | null;
    created_at: string;
    sender?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    };
}

// ============================================================================
// Query Helpers
// ============================================================================

/**
 * Fetch orders for the current user (as buyer or seller).
 */
export async function fetchMyOrders(
    userId: string,
    role: 'buyer' | 'seller' = 'buyer'
): Promise<{ data: Order[]; error: string | null }> {
    try {
        const roleColumn = role === 'buyer' ? 'buyer_id' : 'seller_id';

        const { data, error } = await supabase
            .from('orders')
            .select(`
        id,
        order_number,
        buyer_id,
        seller_id,
        service_id,
        package_id,
        status,
        amount,
        platform_fee,
        seller_amount,
        requirements_submitted,
        delivery_deadline,
        delivered_at,
        completed_at,
        current_revision,
        max_revisions,
        created_at,
        updated_at,
        buyer:profiles!buyer_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        seller:profiles!seller_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        service:services!service_id (
          id,
          title,
          slug
        ),
        package:service_packages!package_id (
          id,
          name,
          title,
          price
        )
      `)
            .eq(roleColumn, userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[Orders] Fetch error:', error.message);
            return { data: [], error: error.message };
        }

        return { data: (data as unknown as Order[]) || [], error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Orders] Exception:', message);
        return { data: [], error: message };
    }
}

/**
 * Fetch a single order by ID.
 */
export async function fetchOrderById(
    orderId: string
): Promise<{ data: Order | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        buyer:profiles!buyer_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        seller:profiles!seller_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        service:services!service_id (
          id,
          title,
          slug,
          description
        ),
        package:service_packages!package_id (
          id,
          name,
          title,
          description,
          price,
          delivery_days,
          revisions
        )
      `)
            .eq('id', orderId)
            .single();

        if (error) {
            console.error('[Orders] Fetch by ID error:', error.message);
            return { data: null, error: error.message };
        }

        return { data: data as unknown as Order, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Orders] Exception:', message);
        return { data: null, error: message };
    }
}

/**
 * Fetch messages for an order.
 */
export async function fetchOrderMessages(
    orderId: string,
    limit = 50
): Promise<{ data: OrderMessage[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('order_messages')
            .select(`
        id,
        order_id,
        sender_id,
        content,
        is_system,
        attachments,
        created_at,
        sender:profiles!sender_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
            .eq('order_id', orderId)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (error) {
            console.error('[Messages] Fetch error:', error.message);
            return { data: [], error: error.message };
        }

        return { data: (data as unknown as OrderMessage[]) || [], error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Messages] Exception:', message);
        return { data: [], error: message };
    }
}

/**
 * Send a message in an order.
 */
export async function sendOrderMessage(
    orderId: string,
    content: string
): Promise<{ data: OrderMessage | null; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: null, error: 'Not authenticated' };
        }

        const { data, error } = await supabase
            .from('order_messages')
            .insert({
                order_id: orderId,
                sender_id: session.user.id,
                content,
                is_system: false,
            })
            .select()
            .single();

        if (error) {
            console.error('[Messages] Send error:', error.message);
            return { data: null, error: error.message };
        }

        return { data: data as OrderMessage, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Messages] Exception:', message);
        return { data: null, error: message };
    }
}

// ============================================================================
// Edge Function Wrappers (for mutations)
// ============================================================================

interface CreateOrderParams {
    service_id: string;
    package_name: 'basic' | 'standard' | 'premium';
    affiliate_code?: string;
    requirements?: Record<string, unknown>;
}

interface CreateOrderResponse {
    order_id: string;
    checkout_url: string;
}

/**
 * Create an order via Edge Function (safe transaction).
 */
export async function createOrder(
    params: CreateOrderParams
): Promise<{ data: CreateOrderResponse | null; error: string | null }> {
    const result = await postToEdge<CreateOrderResponse>('create-order', params);
    return result;
}

/**
 * Confirm delivery (buyer action).
 */
export async function confirmDelivery(
    orderId: string
): Promise<{ success: boolean; error: string | null }> {
    const result = await postToEdge<{ success: boolean }>('confirm-delivery', { order_id: orderId });
    return { success: result.data?.success || false, error: result.error };
}

/**
 * Request revision (buyer action).
 */
export async function requestRevision(
    orderId: string,
    reason: string
): Promise<{ success: boolean; error: string | null }> {
    // This might be a direct DB update or an Edge Function depending on backend
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status: 'revision_requested' })
            .eq('id', orderId);

        if (error) {
            return { success: false, error: error.message };
        }

        // Send system message about revision
        await supabase.from('order_messages').insert({
            order_id: orderId,
            sender_id: (await supabase.auth.getSession()).data.session?.user.id,
            content: `Revision requested: ${reason}`,
            is_system: true,
        });

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return { success: false, error: message };
    }
}
