import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from './supabaseClient';

// ============================================================================
// Types
// ============================================================================

interface UserProfile {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    kyc_status: string;
    onboarding_completed: boolean;
}

interface UserRole {
    role: 'influencer' | 'freelance' | 'merchant' | 'agent';
    status: 'active' | 'pending' | 'suspended';
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    roles: UserRole[];
    isLoading: boolean;
    isAuthenticated: boolean;
    isDemoMode: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null; success: boolean }>;
    refreshProfile: () => Promise<void>;
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [roles, setRoles] = useState<UserRole[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const isDemoMode = !isSupabaseConfigured();
    const isDevBypass = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';

    // Fetch user profile and roles from DB
    const fetchUserData = async (userId: string) => {
        if (isDemoMode) return; // Skip in demo mode

        try {
            // Fetch profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, username, display_name, avatar_url, kyc_status, onboarding_completed')
                .eq('id', userId)
                .single();

            if (profileError) {
                console.error('[Auth] Profile fetch error:', profileError.message);
            } else {
                setProfile(profileData);
            }

            // Fetch roles
            const { data: rolesData, error: rolesError } = await supabase
                .from('user_roles')
                .select('role, status')
                .eq('user_id', userId);

            if (rolesError) {
                console.error('[Auth] Roles fetch error:', rolesError.message);
            } else {
                setRoles(rolesData || []);
            }
        } catch (err) {
            console.error('[Auth] fetchUserData exception:', err);
        }
    };

    // Initialize auth state
    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            // In demo mode, skip auth check and immediately set loading to false
            if (isDemoMode) {
                console.log('[Auth] Running in demo mode - Supabase not configured');
                if (mounted) setIsLoading(false);
                return;
            }

            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession();

                if (mounted && currentSession) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                    await fetchUserData(currentSession.user.id);
                }
            } catch (err) {
                console.error('[Auth] Init error:', err);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        initAuth();

        // Skip auth listener in demo mode
        if (isDemoMode) {
            return;
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                if (!mounted) return;

                setSession(newSession);
                setUser(newSession?.user ?? null);

                if (newSession?.user) {
                    await fetchUserData(newSession.user.id);
                } else {
                    setProfile(null);
                    setRoles([]);
                }

                setIsLoading(false);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [isDemoMode]);

    // Auth methods
    const signIn = async (email: string, password: string) => {
        if (isDemoMode) {
            console.warn('[Auth] Cannot sign in - demo mode');
            return { error: { message: 'Demo mode - configure Supabase to enable auth' } as AuthError };
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
        if (isDemoMode) {
            console.warn('[Auth] Cannot sign up - demo mode');
            return { error: { message: 'Demo mode - configure Supabase to enable auth' } as AuthError };
        }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata },
        });
        return { error };
    };

    const signOut = async () => {
        if (!isDemoMode) {
            await supabase.auth.signOut();
        }
        setUser(null);
        setSession(null);
        setProfile(null);
        setRoles([]);
    };

    const resetPassword = async (email: string) => {
        if (isDemoMode) {
            console.warn('[Auth] Cannot reset password - demo mode');
            return { error: { message: 'Demo mode - configure Supabase to enable auth' } as AuthError, success: false };
        }
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { error, success: !error };
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchUserData(user.id);
        }
    };

    const value: AuthContextType = {
        user,
        session,
        profile,
        roles,
        isLoading,
        isAuthenticated: !!session || isDemoMode || isDevBypass, // In demo/dev bypass mode, consider as "authenticated"
        isDemoMode,
        signIn,
        signUp,
        signOut,
        resetPassword,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// ============================================================================
// Protected Route Wrapper
// ============================================================================

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: 'influencer' | 'freelance' | 'merchant' | 'agent';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps): JSX.Element {
    const { isAuthenticated, isLoading, roles, isDemoMode } = useAuth();
    const location = useLocation();

    // In demo mode, allow access to all routes
    if (isDemoMode) {
        return <>{children}</>;
    }

    // Show nothing while loading (invisible - no UI change)
    if (isLoading) {
        return <div data-loading="true" style={{ visibility: 'hidden' }}>{children}</div>;
    }

    // Redirect to home if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Check role if required
    if (requiredRole) {
        const hasRole = roles.some(r => r.role === requiredRole && r.status === 'active');
        if (!hasRole) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return <>{children}</>;
}

// ============================================================================
// Redirect If Authenticated (for public pages like home)
// ============================================================================

interface RedirectIfAuthenticatedProps {
    children: ReactNode;
    redirectTo?: string;
}

/**
 * Wrapper that redirects authenticated users to dashboard.
 * Used for landing page and other public-only pages.
 */
export function RedirectIfAuthenticated({
    children,
    redirectTo = '/dashboard'
}: RedirectIfAuthenticatedProps): JSX.Element {
    const { isAuthenticated, isLoading, isDemoMode } = useAuth();

    // In demo mode, show the page normally
    if (isDemoMode) {
        return <>{children}</>;
    }

    // Show nothing while loading (invisible - no UI change)
    if (isLoading) {
        return <div data-loading="true" style={{ visibility: 'hidden' }}>{children}</div>;
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}

