import { supabase } from '../supabaseClient';

// ============================================================================
// Types (based on backend schema)
// ============================================================================

export interface Service {
    id: string;
    seller_id: string;
    category_id: string | null;
    service_role: 'influencer' | 'freelance';
    title: string;
    slug: string;
    description: string;
    search_tags: string[];
    base_price: number;
    min_delivery_days: number;
    status: 'draft' | 'pending_review' | 'active' | 'paused' | 'rejected' | 'deleted';
    rejection_reason: string | null;
    rating_average: number;
    rating_count: number;
    total_orders: number;
    view_count: number;
    is_affiliable: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    // Joined data
    seller?: {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
        average_rating: number;
    };
    category?: {
        id: string;
        name: string;
        slug: string;
    };
    packages?: ServicePackage[];
    media?: ServiceMedia[];
}

export interface ServicePackage {
    id: string;
    service_id: string;
    name: 'basic' | 'standard' | 'premium';
    title: string | null;
    description: string | null;
    price: number;
    delivery_days: number;
    revisions: number;
    features: unknown[];
    is_active: boolean;
}

export interface ServiceMedia {
    id: string;
    service_id: string;
    media_type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    thumbnail_url: string | null;
    sort_order: number;
    is_primary: boolean;
}

export interface ServiceFilters {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    serviceRole?: 'influencer' | 'freelance';
    searchTerm?: string;
    sellerId?: string;
}

export interface PaginationOptions {
    page?: number;
    limit?: number;
}

// ============================================================================
// Query Helpers
// ============================================================================

/**
 * Fetch active services with optional filters and pagination.
 * For public marketplace listing.
 */
export async function fetchServices(
    filters: ServiceFilters = {},
    pagination: PaginationOptions = {}
): Promise<{ data: Service[]; count: number; error: string | null }> {
    const { page = 1, limit = 12 } = pagination;
    const offset = (page - 1) * limit;

    try {
        let query = supabase
            .from('services')
            .select(`
        id,
        seller_id,
        category_id,
        service_role,
        title,
        slug,
        description,
        search_tags,
        base_price,
        min_delivery_days,
        status,
        rating_average,
        rating_count,
        total_orders,
        view_count,
        is_affiliable,
        is_featured,
        created_at,
        seller:profiles!seller_id (
          id,
          username,
          display_name,
          avatar_url,
          average_rating
        ),
        category:categories!category_id (
          id,
          name,
          slug
        ),
        media:service_media (
          id,
          media_type,
          url,
          thumbnail_url,
          sort_order,
          is_primary
        )
      `, { count: 'exact' })
            .eq('status', 'active')
            .order('is_featured', { ascending: false })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        // Apply filters
        if (filters.category) {
            query = query.eq('category_id', filters.category);
        }
        if (filters.priceMin !== undefined) {
            query = query.gte('base_price', filters.priceMin);
        }
        if (filters.priceMax !== undefined) {
            query = query.lte('base_price', filters.priceMax);
        }
        if (filters.serviceRole) {
            query = query.eq('service_role', filters.serviceRole);
        }
        if (filters.sellerId) {
            query = query.eq('seller_id', filters.sellerId);
        }
        if (filters.searchTerm) {
            query = query.ilike('title', `%${filters.searchTerm}%`);
        }

        const { data, count, error } = await query;

        if (error) {
            console.error('[Services] Fetch error:', error.message);
            return { data: [], count: 0, error: error.message };
        }

        return { data: (data as unknown as Service[]) || [], count: count || 0, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { data: [], count: 0, error: message };
    }
}

/**
 * Fetch a single service by slug (for service detail page).
 */
export async function fetchServiceBySlug(
    slug: string,
    sellerId?: string
): Promise<{ data: Service | null; error: string | null }> {
    try {
        let query = supabase
            .from('services')
            .select(`
        *,
        seller:profiles!seller_id (
          id,
          username,
          display_name,
          avatar_url,
          average_rating,
          total_reviews,
          completed_orders_count,
          bio,
          city,
          country
        ),
        category:categories!category_id (
          id,
          name,
          slug
        ),
        packages:service_packages (
          id,
          name,
          title,
          description,
          price,
          delivery_days,
          revisions,
          features,
          is_active
        ),
        media:service_media (
          id,
          media_type,
          url,
          thumbnail_url,
          sort_order,
          is_primary
        ),
        faqs:service_faqs (
          id,
          question,
          answer,
          sort_order
        ),
        requirements:service_requirements (
          id,
          question,
          type,
          options,
          is_required,
          sort_order
        )
      `)
            .eq('slug', slug);

        if (sellerId) {
            query = query.eq('seller_id', sellerId);
        }

        const { data, error } = await query.single();

        if (error) {
            console.error('[Services] Fetch by slug error:', error.message);
            return { data: null, error: error.message };
        }

        return { data: data as unknown as Service, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { data: null, error: message };
    }
}

/**
 * Fetch services for current user (seller dashboard).
 */
export async function fetchMyServices(
    userId: string
): Promise<{ data: Service[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('services')
            .select(`
        id,
        title,
        slug,
        status,
        base_price,
        min_delivery_days,
        rating_average,
        rating_count,
        total_orders,
        view_count,
        is_featured,
        created_at,
        updated_at,
        category:categories!category_id (
          id,
          name
        ),
        media:service_media (
          id,
          url,
          is_primary
        )
      `)
            .eq('seller_id', userId)
            .neq('status', 'deleted')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[Services] Fetch my services error:', error.message);
            return { data: [], error: error.message };
        }

        return { data: (data as unknown as Service[]) || [], error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { data: [], error: message };
    }
}

/**
 * Fetch categories for filtering/selection.
 */
export async function fetchCategories(): Promise<{
    data: Array<{ id: string; name: string; slug: string; parent_id: string | null }>;
    error: string | null;
}> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('id, name, slug, parent_id, sort_order')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('[Categories] Fetch error:', error.message);
            return { data: [], error: error.message };
        }

        return { data: data || [], error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Categories] Exception:', message);
        return { data: [], error: message };
    }
}
