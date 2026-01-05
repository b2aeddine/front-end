/**
 * Messaging Queries
 * Gère les conversations et messages de la plateforme CollabMarket
 */

import { supabase } from '../supabaseClient';
import { canSendMessage } from '../featureFlags';

// ============================================================================
// Types
// ============================================================================

export interface Conversation {
    id: string;
    participant1_id: string;
    participant2_id: string;
    last_message_at: string | null;
    created_at: string;
    // Joined data
    participant1?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    };
    participant2?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    };
    last_message?: Message;
    unread_count?: number;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    is_read: boolean;
    attachments: string[] | null;
    created_at: string;
    // Joined data
    sender?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    };
}

// ============================================================================
// Conversation Queries
// ============================================================================

/**
 * Fetch all conversations for the current user.
 */
export async function fetchConversations(): Promise<{
    data: Conversation[];
    error: string | null;
}> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: [], error: 'Not authenticated' };
        }

        const userId = session.user.id;

        const { data, error } = await supabase
            .from('conversations')
            .select(`
                id,
                participant1_id,
                participant2_id,
                last_message_at,
                created_at,
                participant1:profiles!participant1_id (
                    id,
                    username,
                    display_name,
                    avatar_url
                ),
                participant2:profiles!participant2_id (
                    id,
                    username,
                    display_name,
                    avatar_url
                )
            `)
            .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
            .order('last_message_at', { ascending: false, nullsFirst: false });

        if (error) {
            console.error('[Conversations] Fetch error:', error.message);
            return { data: [], error: error.message };
        }

        return { data: (data as unknown as Conversation[]) || [], error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Conversations] Exception:', message);
        return { data: [], error: message };
    }
}

/**
 * Get or create a conversation with another user.
 */
export async function getOrCreateConversation(
    otherUserId: string
): Promise<{ data: Conversation | null; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: null, error: 'Not authenticated' };
        }

        const userId = session.user.id;

        // Check if conversation already exists
        const { data: existing, error: fetchError } = await supabase
            .from('conversations')
            .select('*')
            .or(`and(participant1_id.eq.${userId},participant2_id.eq.${otherUserId}),and(participant1_id.eq.${otherUserId},participant2_id.eq.${userId})`)
            .single();

        if (existing) {
            return { data: existing as Conversation, error: null };
        }

        // Create new conversation
        const { data: newConv, error: createError } = await supabase
            .from('conversations')
            .insert({
                participant1_id: userId,
                participant2_id: otherUserId,
            })
            .select()
            .single();

        if (createError) {
            console.error('[Conversations] Create error:', createError.message);
            return { data: null, error: createError.message };
        }

        return { data: newConv as Conversation, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Conversations] Exception:', message);
        return { data: null, error: message };
    }
}

// ============================================================================
// Message Queries
// ============================================================================

/**
 * Fetch messages for a conversation.
 */
export async function fetchMessages(
    conversationId: string,
    limit: number = 50,
    before?: string
): Promise<{ data: Message[]; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: [], error: 'Not authenticated' };
        }

        let query = supabase
            .from('messages')
            .select(`
                id,
                conversation_id,
                sender_id,
                content,
                is_read,
                attachments,
                created_at,
                sender:profiles!sender_id (
                    id,
                    username,
                    display_name,
                    avatar_url
                )
            `)
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (before) {
            query = query.lt('created_at', before);
        }

        const { data, error } = await query;

        if (error) {
            console.error('[Messages] Fetch error:', error.message);
            return { data: [], error: error.message };
        }

        // Reverse to show oldest first
        return { data: ((data as unknown as Message[]) || []).reverse(), error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Messages] Exception:', message);
        return { data: [], error: message };
    }
}

/**
 * Send a message in a conversation.
 * Checks feature flag before sending.
 */
export async function sendMessage(
    conversationId: string,
    content: string,
    attachments?: string[]
): Promise<{ data: Message | null; error: string | null }> {
    try {
        // Check feature flag
        const { allowed, reason } = await canSendMessage();
        if (!allowed) {
            return { data: null, error: reason || 'Messaging is disabled' };
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: null, error: 'Not authenticated' };
        }

        // Insert message
        const { data: message, error } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversationId,
                sender_id: session.user.id,
                content,
                attachments: attachments || null,
                is_read: false,
            })
            .select(`
                id,
                conversation_id,
                sender_id,
                content,
                is_read,
                attachments,
                created_at
            `)
            .single();

        if (error) {
            console.error('[Messages] Send error:', error.message);
            return { data: null, error: error.message };
        }

        // Update conversation's last_message_at
        await supabase
            .from('conversations')
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', conversationId);

        return { data: message as Message, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Messages] Exception:', message);
        return { data: null, error: message };
    }
}

/**
 * Mark messages as read.
 */
export async function markMessagesAsRead(
    conversationId: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { error } = await supabase
            .from('messages')
            .update({ is_read: true })
            .eq('conversation_id', conversationId)
            .neq('sender_id', session.user.id)
            .eq('is_read', false);

        if (error) {
            console.error('[Messages] Mark read error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Messages] Exception:', message);
        return { success: false, error: message };
    }
}

/**
 * Get unread message count for current user.
 */
export async function getUnreadCount(): Promise<{
    count: number;
    error: string | null;
}> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { count: 0, error: 'Not authenticated' };
        }

        const userId = session.user.id;

        // Get conversations where user is a participant
        const { data: conversations, error: convError } = await supabase
            .from('conversations')
            .select('id')
            .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`);

        if (convError || !conversations?.length) {
            return { count: 0, error: convError?.message || null };
        }

        const conversationIds = conversations.map(c => c.id);

        // Count unread messages in those conversations
        const { count, error } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .in('conversation_id', conversationIds)
            .neq('sender_id', userId)
            .eq('is_read', false);

        if (error) {
            console.error('[Messages] Count error:', error.message);
            return { count: 0, error: error.message };
        }

        return { count: count || 0, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Messages] Exception:', message);
        return { count: 0, error: message };
    }
}

// ============================================================================
// Real-time Subscriptions
// ============================================================================

/**
 * Subscribe to new messages in a conversation.
 */
export function subscribeToMessages(
    conversationId: string,
    onMessage: (message: Message) => void
) {
    const channel = supabase
        .channel(`messages:${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`,
            },
            (payload) => {
                onMessage(payload.new as Message);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}

/**
 * Subscribe to conversation updates (new messages indicator).
 */
export function subscribeToConversations(
    userId: string,
    onUpdate: () => void
) {
    const channel = supabase
        .channel(`conversations:${userId}`)
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'conversations',
            },
            () => {
                onUpdate();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}
