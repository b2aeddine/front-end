import { useState, createContext, useContext, ReactNode } from 'react';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// Modal State Context
// ============================================================================

type AuthModalView = 'login' | 'signup' | 'forgot-password';

interface AuthModalContextType {
    isOpen: boolean;
    view: AuthModalView;
    openModal: (view?: AuthModalView) => void;
    closeModal: () => void;
    switchView: (view: AuthModalView) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error('useAuthModal must be used within AuthModalProvider');
    }
    return context;
}

interface AuthModalProviderProps {
    children: ReactNode;
}

export function AuthModalProvider({ children }: AuthModalProviderProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<AuthModalView>('signup');

    const openModal = (initialView: AuthModalView = 'signup') => {
        setView(initialView);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const switchView = (newView: AuthModalView) => {
        setView(newView);
    };

    return (
        <AuthModalContext.Provider value={{ isOpen, view, openModal, closeModal, switchView }}>
            {children}
            {isOpen && <AuthModal />}
        </AuthModalContext.Provider>
    );
}

// ============================================================================
// Modal Component (Overlay - keeping existing design system)
// ============================================================================

function AuthModal(): JSX.Element {
    const { view, closeModal, switchView } = useAuthModal();
    const { signIn, signUp, resetPassword, isLoading } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            if (view === 'signup') {
                if (password !== confirmPassword) {
                    setError('Les mots de passe ne correspondent pas');
                    setIsSubmitting(false);
                    return;
                }
                if (password.length < 6) {
                    setError('Le mot de passe doit contenir au moins 6 caractères');
                    setIsSubmitting(false);
                    return;
                }
                const { error: signUpError } = await signUp(email, password);
                if (signUpError) {
                    setError(signUpError.message);
                } else {
                    closeModal();
                    navigate('/dashboard');
                }
            } else if (view === 'login') {
                const { error: signInError } = await signIn(email, password);
                if (signInError) {
                    setError(signInError.message);
                } else {
                    closeModal();
                    navigate('/dashboard');
                }
            } else if (view === 'forgot-password') {
                const { error: resetError, success } = await resetPassword(email);
                if (resetError) {
                    setError(resetError.message);
                } else if (success) {
                    setSuccessMessage('Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.');
                    // Reset form after success
                    setEmail('');
                }
            }
        } catch (err) {
            setError('Une erreur inattendue s\'est produite');
            console.error('[AuthModal]', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="bg-[#f8f5f0] rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-2xl">
                        {view === 'login' ? 'Connexion' : view === 'signup' ? 'Inscription' : 'Mot de passe oublié'}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="text-[#1f392c]/60 hover:text-[#1f392c] transition-colors text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Success */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                        {successMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white border border-[#1f392c]/20 rounded-xl [font-family:'DM_Sans',Helvetica] text-[#1f392c] focus:outline-none focus:border-[#fea38e] transition-colors"
                            placeholder="votre@email.com"
                        />
                    </div>

                    {view !== 'forgot-password' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-sm">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-[#1f392c]/20 rounded-xl [font-family:'DM_Sans',Helvetica] text-[#1f392c] focus:outline-none focus:border-[#fea38e] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    {view === 'signup' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="[font-family:'DM_Sans',Helvetica] font-medium text-[#1f392c] text-sm">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white border border-[#1f392c]/20 rounded-xl [font-family:'DM_Sans',Helvetica] text-[#1f392c] focus:outline-none focus:border-[#fea38e] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full mt-2 px-8 py-3 bg-[#fea38e] rounded-[100px] [font-family:'DM_Sans',Helvetica] font-semibold text-[#f8f5f0] text-lg hover:bg-[#fea38e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Chargement...' : view === 'login' ? 'Se connecter' : view === 'signup' ? 'S\'inscrire' : 'Réinitialiser'}
                    </button>
                </form>

                {/* Switch views */}
                <div className="mt-6 text-center">
                    {view === 'login' ? (
                        <>
                            <button
                                onClick={() => switchView('forgot-password')}
                                className="[font-family:'DM_Sans',Helvetica] text-[#1f392c]/60 text-sm hover:text-[#1f392c] transition-colors"
                            >
                                Mot de passe oublié ?
                            </button>
                            <p className="mt-2 [font-family:'DM_Sans',Helvetica] text-[#1f392c]/60 text-sm">
                                Pas encore de compte ?{' '}
                                <button
                                    onClick={() => switchView('signup')}
                                    className="text-[#fea38e] font-medium hover:underline"
                                >
                                    S'inscrire
                                </button>
                            </p>
                        </>
                    ) : view === 'signup' ? (
                        <p className="[font-family:'DM_Sans',Helvetica] text-[#1f392c]/60 text-sm">
                            Déjà un compte ?{' '}
                            <button
                                onClick={() => switchView('login')}
                                className="text-[#fea38e] font-medium hover:underline"
                            >
                                Se connecter
                            </button>
                        </p>
                    ) : (
                        <button
                            onClick={() => switchView('login')}
                            className="[font-family:'DM_Sans',Helvetica] text-[#fea38e] font-medium text-sm hover:underline"
                        >
                            Retour à la connexion
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
