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

// ============================================================================
// Service Creation & Update (Seller actions)
// ============================================================================

export interface CreateServiceInput {
    title: string;
    description: string;
    category_id: string;
    service_role: 'influencer' | 'freelance';
    search_tags?: string[];
    packages: Array<{
        name: 'basic' | 'standard' | 'premium';
        title?: string;
        description?: string;
        price: number;
        delivery_days: number;
        revisions: number;
        features?: string[];
    }>;
}

export interface UpdateServiceInput {
    title?: string;
    description?: string;
    category_id?: string;
    search_tags?: string[];
    status?: 'draft' | 'active' | 'paused';
}

/**
 * Create a new service (seller action).
 * Service starts in 'draft' status.
 */
export async function createService(
    input: CreateServiceInput
): Promise<{ data: Service | null; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: null, error: 'Not authenticated' };
        }

        // Generate slug from title
        const slug = input.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') + '-' + Date.now().toString(36);

        // Create the service
        const { data: service, error: serviceError } = await supabase
            .from('services')
            .insert({
                seller_id: session.user.id,
                title: input.title,
                slug,
                description: input.description,
                category_id: input.category_id,
                service_role: input.service_role,
                search_tags: input.search_tags || [],
                base_price: Math.min(...input.packages.map(p => p.price)),
                min_delivery_days: Math.min(...input.packages.map(p => p.delivery_days)),
                status: 'draft',
            })
            .select()
            .single();

        if (serviceError) {
            console.error('[Services] Create error:', serviceError.message);
            return { data: null, error: serviceError.message };
        }

        // Create packages
        const packagesData = input.packages.map(pkg => ({
            service_id: service.id,
            name: pkg.name,
            title: pkg.title || null,
            description: pkg.description || null,
            price: pkg.price,
            delivery_days: pkg.delivery_days,
            revisions: pkg.revisions,
            features: pkg.features || [],
            is_active: true,
        }));

        const { error: packagesError } = await supabase
            .from('service_packages')
            .insert(packagesData);

        if (packagesError) {
            console.error('[Services] Create packages error:', packagesError.message);
            // Service was created but packages failed - return partial success
        }

        return { data: service as unknown as Service, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { data: null, error: message };
    }
}

/**
 * Update an existing service (seller action).
 */
export async function updateService(
    serviceId: string,
    input: UpdateServiceInput
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { error } = await supabase
            .from('services')
            .update({
                ...input,
                updated_at: new Date().toISOString(),
            })
            .eq('id', serviceId)
            .eq('seller_id', session.user.id); // Ensure ownership

        if (error) {
            console.error('[Services] Update error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { success: false, error: message };
    }
}

/**
 * Submit service for review (draft → pending_review).
 */
export async function submitServiceForReview(
    serviceId: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { error } = await supabase
            .from('services')
            .update({ status: 'pending_review' })
            .eq('id', serviceId)
            .eq('seller_id', session.user.id)
            .eq('status', 'draft'); // Can only submit from draft

        if (error) {
            console.error('[Services] Submit for review error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { success: false, error: message };
    }
}

/**
 * Delete a service (soft delete → status = 'deleted').
 */
export async function deleteService(
    serviceId: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { error } = await supabase
            .from('services')
            .update({ status: 'deleted' })
            .eq('id', serviceId)
            .eq('seller_id', session.user.id);

        if (error) {
            console.error('[Services] Delete error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Services] Exception:', message);
        return { success: false, error: message };
    }
}

// ============================================================================
// Media Upload
// ============================================================================

/**
 * Upload media for a service.
 * Uses Supabase Storage.
 */
export async function uploadServiceMedia(
    serviceId: string,
    file: File,
    isPrimary: boolean = false
): Promise<{ data: ServiceMedia | null; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: null, error: 'Not authenticated' };
        }

        // Determine media type
        const mediaType = file.type.startsWith('image/') ? 'image'
            : file.type.startsWith('video/') ? 'video'
                : file.type.startsWith('audio/') ? 'audio'
                    : 'document';

        // Generate unique filename
        const ext = file.name.split('.').pop() || 'bin';
        const fileName = `${serviceId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
            .from('service-media')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            console.error('[Media] Upload error:', uploadError.message);
            return { data: null, error: uploadError.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('service-media')
            .getPublicUrl(fileName);

        // Get current max sort_order
        const { data: existingMedia } = await supabase
            .from('service_media')
            .select('sort_order')
            .eq('service_id', serviceId)
            .order('sort_order', { ascending: false })
            .limit(1);

        const sortOrder = (existingMedia?.[0]?.sort_order ?? -1) + 1;

        // If this is primary, unset other primaries
        if (isPrimary) {
            await supabase
                .from('service_media')
                .update({ is_primary: false })
                .eq('service_id', serviceId);
        }

        // Create media record
        const { data: media, error: mediaError } = await supabase
            .from('service_media')
            .insert({
                service_id: serviceId,
                media_type: mediaType,
                url: publicUrl,
                sort_order: sortOrder,
                is_primary: isPrimary,
            })
            .select()
            .single();

        if (mediaError) {
            console.error('[Media] Record error:', mediaError.message);
            return { data: null, error: mediaError.message };
        }

        return { data: media as ServiceMedia, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Media] Exception:', message);
        return { data: null, error: message };
    }
}

/**
 * Delete service media.
 */
export async function deleteServiceMedia(
    mediaId: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        // Get media record to find the file path
        const { data: media, error: fetchError } = await supabase
            .from('service_media')
            .select('url, service_id')
            .eq('id', mediaId)
            .single();

        if (fetchError || !media) {
            return { success: false, error: 'Media not found' };
        }

        // Verify ownership through service
        const { data: service } = await supabase
            .from('services')
            .select('seller_id')
            .eq('id', media.service_id)
            .single();

        if (service?.seller_id !== session.user.id) {
            return { success: false, error: 'Not authorized' };
        }

        // Delete from storage (extract path from URL)
        const urlParts = media.url.split('/service-media/');
        if (urlParts[1]) {
            await supabase.storage
                .from('service-media')
                .remove([urlParts[1]]);
        }

        // Delete record
        const { error } = await supabase
            .from('service_media')
            .delete()
            .eq('id', mediaId);

        if (error) {
            console.error('[Media] Delete error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Media] Exception:', message);
        return { success: false, error: message };
    }
}
