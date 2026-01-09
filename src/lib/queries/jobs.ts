import { supabase } from '../supabaseClient';

// ============================================================================
// Types (based on backend schema for job_postings)
// ============================================================================

export interface JobPosting {
    id: string;
    client_id: string;
    category_id: string | null;
    title: string;
    description: string;
    budget_min: number;
    budget_max: number;
    budget_type: 'fixed' | 'hourly';
    expected_duration: string | null;
    project_size: string | null;
    skills_required: string[];
    screening_questions: string[];
    status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
    visibility: 'public' | 'invite_only';
    created_at: string;
    updated_at: string;
    // Joined fields
    client?: {
        id: string;
        display_name: string;
        avatar_url: string | null;
    };
    category?: {
        id: string;
        name: string;
        slug: string;
    };
    proposals_count?: number;
}

export interface CreateJobInput {
    title: string;
    description: string;
    category_id: string;
    budget_min: number;
    budget_max: number;
    budget_type: 'fixed' | 'hourly';
    expected_duration?: string;
    project_size?: string;
    skills_required?: string[];
    screening_questions?: string[];
    visibility?: 'public' | 'invite_only';
}

export interface UpdateJobInput {
    title?: string;
    description?: string;
    budget_min?: number;
    budget_max?: number;
    status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

// ============================================================================
// Job Creation & Management
// ============================================================================

/**
 * Create a new job posting (client action).
 * Job starts in 'open' status directly (no review needed).
 */
export async function createJobPosting(
    input: CreateJobInput
): Promise<{ data: JobPosting | null; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { data: null, error: 'Not authenticated' };
        }

        const { data: job, error: jobError } = await supabase
            .from('job_postings')
            .insert({
                client_id: session.user.id,
                title: input.title,
                description: input.description,
                category_id: input.category_id,
                budget_min: input.budget_min,
                budget_max: input.budget_max,
                budget_type: input.budget_type,
                expected_duration: input.expected_duration || null,
                project_size: input.project_size || null,
                skills_required: input.skills_required || [],
                screening_questions: input.screening_questions || [],
                status: 'open',
                visibility: input.visibility || 'public',
            })
            .select()
            .single();

        if (jobError) {
            console.error('[Jobs] Create error:', jobError.message);
            return { data: null, error: jobError.message };
        }

        return { data: job as JobPosting, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Jobs] Exception:', message);
        return { data: null, error: message };
    }
}

/**
 * Fetch all job postings for the current client (dashboard).
 */
export async function fetchMyJobPostings(
    userId: string
): Promise<{ data: JobPosting[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('job_postings')
            .select(`
                *,
                category:categories(id, name, slug)
            `)
            .eq('client_id', userId)
            .neq('status', 'cancelled')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[Jobs] Fetch error:', error.message);
            return { data: [], error: error.message };
        }

        return { data: (data || []) as JobPosting[], error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Jobs] Exception:', message);
        return { data: [], error: message };
    }
}

/**
 * Fetch open job postings for marketplace (freelancers view).
 */
export async function fetchOpenJobPostings(
    filters: { category?: string; budgetMin?: number; budgetMax?: number } = {},
    pagination: { page?: number; limit?: number } = {}
): Promise<{ data: JobPosting[]; count: number; error: string | null }> {
    try {
        const page = pagination.page || 1;
        const limit = pagination.limit || 20;
        const offset = (page - 1) * limit;

        let query = supabase
            .from('job_postings')
            .select(`
                *,
                client:profiles!client_id(id, display_name, avatar_url),
                category:categories(id, name, slug)
            `, { count: 'exact' })
            .eq('status', 'open')
            .eq('visibility', 'public')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (filters.category) {
            query = query.eq('category_id', filters.category);
        }
        if (filters.budgetMin) {
            query = query.gte('budget_max', filters.budgetMin);
        }
        if (filters.budgetMax) {
            query = query.lte('budget_min', filters.budgetMax);
        }

        const { data, count, error } = await query;

        if (error) {
            console.error('[Jobs] Fetch error:', error.message);
            return { data: [], count: 0, error: error.message };
        }

        return { data: (data || []) as JobPosting[], count: count || 0, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Jobs] Exception:', message);
        return { data: [], count: 0, error: message };
    }
}

/**
 * Update a job posting (client action).
 */
export async function updateJobPosting(
    jobId: string,
    input: UpdateJobInput
): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { error } = await supabase
            .from('job_postings')
            .update({
                ...input,
                updated_at: new Date().toISOString(),
            })
            .eq('id', jobId)
            .eq('client_id', session.user.id);

        if (error) {
            console.error('[Jobs] Update error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[Jobs] Exception:', message);
        return { success: false, error: message };
    }
}

/**
 * Cancel a job posting (client action).
 */
export async function cancelJobPosting(
    jobId: string
): Promise<{ success: boolean; error: string | null }> {
    return updateJobPosting(jobId, { status: 'cancelled' });
}
