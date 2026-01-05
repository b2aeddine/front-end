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
