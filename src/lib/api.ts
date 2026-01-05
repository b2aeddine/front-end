import { supabase, getSupabaseFunctionsUrl } from './supabaseClient';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    headers?: Record<string, string>;
}

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

/**
 * Call a Supabase Edge Function with automatic auth token injection.
 * @param functionName - Name of the Edge Function (e.g., 'create-order')
 * @param options - HTTP method, body, and extra headers
 */
export async function callEdgeFunction<T = unknown>(
    functionName: string,
    options: ApiOptions = {}
): Promise<ApiResponse<T>> {
    const { method = 'POST', body, headers = {} } = options;

    try {
        // Get current session token
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData?.session?.access_token;

        const functionsUrl = getSupabaseFunctionsUrl();
        const url = `${functionsUrl}/${functionName}`;

        const requestHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...headers,
        };

        // Add Authorization header if user is logged in
        if (accessToken) {
            requestHeaders['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData?.error || responseData?.message || `HTTP ${response.status}`;
            console.error(`[API] ${functionName} failed:`, errorMessage);
            return { data: null, error: errorMessage };
        }

        return { data: responseData as T, error: null };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`[API] ${functionName} exception:`, errorMessage);
        return { data: null, error: errorMessage };
    }
}

/**
 * Shorthand for GET requests to Edge Functions
 */
export async function getFromEdge<T = unknown>(
    functionName: string,
    params?: Record<string, string>
): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return callEdgeFunction<T>(`${functionName}${queryString}`, { method: 'GET' });
}

/**
 * Shorthand for POST requests to Edge Functions
 */
export async function postToEdge<T = unknown>(
    functionName: string,
    body: unknown
): Promise<ApiResponse<T>> {
    return callEdgeFunction<T>(functionName, { method: 'POST', body });
}

// ============================================================================
// Affiliate Tracking
// ============================================================================

import type {
    TrackAffiliateRequest,
    TrackAffiliateResponse,
    ResolveCreatorCodeRequest,
    ResolveCreatorCodeResponse,
} from './types';

/**
 * Track an affiliate click (can be called anonymously)
 * Call this when a user lands on the site with an affiliate code
 */
export async function trackAffiliateClick(
    code: string,
    source?: string,
    landingPage?: string
): Promise<{ success: boolean; clickId?: string; error: string | null }> {
    const payload: TrackAffiliateRequest = { code };
    if (source) payload.source = source;
    if (landingPage) payload.landing_page = landingPage;

    const result = await callEdgeFunction<TrackAffiliateResponse>('track-affiliate-click', {
        method: 'POST',
        body: payload,
    });

    return {
        success: result.data?.success || false,
        clickId: result.data?.click_id,
        error: result.error,
    };
}

/**
 * Resolve a creator code to get creator info and discount
 * Use before checkout to display creator info
 */
export async function resolveCreatorCode(
    code: string
): Promise<{
    valid: boolean;
    creator?: { id: string; display_name: string; avatar_url: string | null };
    discountPercent?: number;
    error: string | null;
}> {
    const result = await callEdgeFunction<ResolveCreatorCodeResponse>('resolve-creator-code', {
        method: 'POST',
        body: { code } as ResolveCreatorCodeRequest,
    });

    if (result.error) {
        return { valid: false, error: result.error };
    }

    return {
        valid: result.data?.valid || false,
        creator: result.data?.creator,
        discountPercent: result.data?.discount_percent,
        error: null,
    };
}

// ============================================================================
// AI Worker (if ai_enabled)
// ============================================================================

import type { AIWorkerRequest, AIWorkerResponse } from './types';

/**
 * Submit a job to the AI worker
 * Only works if ai_enabled feature flag is true
 */
export async function submitAIJob(
    jobType: AIWorkerRequest['job_type'],
    payload: Record<string, unknown>
): Promise<{ success: boolean; result?: unknown; jobId?: string; error: string | null }> {
    const result = await callEdgeFunction<AIWorkerResponse>('ai-worker', {
        method: 'POST',
        body: { job_type: jobType, payload } as AIWorkerRequest,
    });

    return {
        success: result.data?.success || false,
        result: result.data?.result,
        jobId: result.data?.job_id,
        error: result.error,
    };
}

/**
 * Generate service description using AI
 */
export async function generateServiceDescription(
    title: string,
    category: string,
    keywords?: string[]
): Promise<{ description: string | null; error: string | null }> {
    const result = await submitAIJob('generate_description', {
        title,
        category,
        keywords,
    });

    if (result.error || !result.success) {
        return { description: null, error: result.error || 'AI generation failed' };
    }

    return {
        description: (result.result as { description?: string })?.description || null,
        error: null,
    };
}

/**
 * Generate search tags for a service using AI
 */
export async function generateServiceTags(
    title: string,
    description: string
): Promise<{ tags: string[]; error: string | null }> {
    const result = await submitAIJob('generate_tags', {
        title,
        description,
    });

    if (result.error || !result.success) {
        return { tags: [], error: result.error || 'AI generation failed' };
    }

    return {
        tags: (result.result as { tags?: string[] })?.tags || [],
        error: null,
    };
}
