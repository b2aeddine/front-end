/**
 * Account Setup Modal System - Adoption-First Design
 * Point d'entrée + 2 modales guidées (Identity + Connect)
 *
 * Philosophie: L'utilisateur ne veut pas vérifier son identité,
 * il veut vendre et recevoir de l'argent.
 */
import React, { useState } from 'react';
import {
    Shield,
    CreditCard,
    CheckCircle2,
    Clock,
    Lock,
    Sparkles,
    ChevronRight,
    X,
    FileCheck,
    Wallet,
    BadgeCheck,
    Eye,
    Smartphone,
    Building2,
    ArrowRight,
    PartyPopper,
} from 'lucide-react';

interface AccountSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: () => void;
}

type ModalView = 'intro' | 'identity' | 'identity_success' | 'connect' | 'connect_success' | 'complete';

// Simulated verification states (in production, fetch from API/Stripe)
interface VerificationState {
    identityVerified: boolean;
    connectComplete: boolean;
}

export const AccountSetupModal: React.FC<AccountSetupModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [currentView, setCurrentView] = useState<ModalView>('intro');
    const [isLoading, setIsLoading] = useState(false);
    const [verificationState, setVerificationState] = useState<VerificationState>({
        identityVerified: false,
        connectComplete: false,
    });

    if (!isOpen) return null;

    const handleStartIdentity = () => {
        setCurrentView('identity');
    };

    const handleLaunchIdentityVerification = async () => {
        setIsLoading(true);
        // Simulate Stripe Identity flow (in production, redirect to Stripe Identity)
        setTimeout(() => {
            setIsLoading(false);
            setVerificationState(prev => ({ ...prev, identityVerified: true }));
            setCurrentView('identity_success');
        }, 2000);
    };

    const handleStartConnect = () => {
        setCurrentView('connect');
    };

    const handleLaunchConnectOnboarding = async () => {
        setIsLoading(true);
        // Simulate Stripe Connect flow (in production, redirect to Stripe Connect OAuth)
        setTimeout(() => {
            setIsLoading(false);
            setVerificationState(prev => ({ ...prev, connectComplete: true }));
            setCurrentView('connect_success');
        }, 2000);
    };

    const handleComplete = () => {
        setCurrentView('complete');
    };

    const handleFinish = () => {
        onComplete?.();
        onClose();
    };

    const handleClose = () => {
        // Allow close except on success screens
        if (!['identity_success', 'connect_success', 'complete'].includes(currentView)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div className="bg-[#f8f5f0] rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* ========== INTRO - Point d'entrée ========== */}
                {currentView === 'intro' && (
                    <div className="p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#fea38e] to-[#fe8e76] rounded-xl flex items-center justify-center shadow-lg shadow-[#fea38e]/30">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Title */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2 [font-family:'DM_Sans',Helvetica]">
                                Finalise ton compte vendeur
                            </h2>
                            <p className="text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                Une seule configuration, ensuite tu peux vendre librement.
                            </p>
                        </div>

                        {/* Pourquoi c'est nécessaire */}
                        <div className="bg-white rounded-xl p-5 mb-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-[#222325] [font-family:'Nunito_Sans',Helvetica]">
                                    Pourquoi c'est nécessaire ?
                                </h3>
                            </div>
                            <ul className="space-y-3 text-sm text-[#606060] [font-family:'Nunito_Sans',Helvetica]">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    Protéger les acheteurs et vendeurs
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    Autoriser les paiements et virements
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    Respecter les règles légales (obligatoire)
                                </li>
                            </ul>
                        </div>

                        {/* Ce que ça débloque */}
                        <div className="bg-[#fea38e]/10 rounded-xl p-5 mb-6 border border-[#fea38e]/20">
                            <h3 className="font-semibold text-[#222325] mb-4 [font-family:'Nunito_Sans',Helvetica]">
                                Ce que ça débloque
                            </h3>
                            <ul className="space-y-3 text-sm [font-family:'Nunito_Sans',Helvetica]">
                                <li className="flex items-center gap-3 text-[#222325]">
                                    <div className="w-5 h-5 bg-[#fea38e] rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                    Publier des services
                                </li>
                                <li className="flex items-center gap-3 text-[#222325]">
                                    <div className="w-5 h-5 bg-[#fea38e] rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                    Recevoir des paiements automatiquement
                                </li>
                                <li className="flex items-center gap-3 text-[#222325]">
                                    <div className="w-5 h-5 bg-[#fea38e] rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                    Être visible comme vendeur vérifié
                                </li>
                            </ul>
                        </div>

                        {/* Comment ça se passe */}
                        <div className="flex items-center gap-6 mb-8 text-sm text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5–10 minutes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                <span>Sécurisé par Stripe</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleStartIdentity}
                            className="w-full py-4 bg-[#fea38e] hover:bg-[#fe8e76] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 [font-family:'DM_Sans',Helvetica]"
                        >
                            Commencer la vérification
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <p className="text-center text-xs text-[#9ca3af] mt-4 [font-family:'Nunito_Sans',Helvetica]">
                            Tu pourras reprendre plus tard si besoin
                        </p>
                    </div>
                )}

                {/* ========== IDENTITY - Vérification d'identité ========== */}
                {currentView === 'identity' && (
                    <div className="p-8">
                        {/* Progress */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full bg-[#fea38e] text-white flex items-center justify-center font-bold text-sm">1</div>
                            <div className="w-12 h-1 bg-gray-200"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">2</div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileCheck className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2 [font-family:'DM_Sans',Helvetica]">
                                Vérification d'identité
                            </h2>
                            <p className="text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                Stripe vérifie ton identité pour s'assurer que les paiements sont envoyés à la bonne personne.
                            </p>
                        </div>

                        {/* Trust badge */}
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800 [font-family:'Nunito_Sans',Helvetica]">
                                <strong>CollabMarket n'a jamais accès à tes documents.</strong> Tout est géré directement par Stripe, leader mondial des paiements.
                            </p>
                        </div>

                        {/* Ce dont tu auras besoin */}
                        <div className="bg-white rounded-xl p-5 mb-8 border border-gray-100">
                            <h3 className="font-semibold text-[#222325] mb-4 [font-family:'Nunito_Sans',Helvetica]">
                                Ce dont tu auras besoin
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <BadgeCheck className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#222325] text-sm [font-family:'Nunito_Sans',Helvetica]">Une pièce d'identité</p>
                                        <p className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">Carte d'identité, passeport ou permis</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Smartphone className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#222325] text-sm [font-family:'Nunito_Sans',Helvetica]">Ton téléphone</p>
                                        <p className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">Pour prendre une photo rapide</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#222325] text-sm [font-family:'Nunito_Sans',Helvetica]">2 minutes au calme</p>
                                        <p className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">Bon éclairage recommandé</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleLaunchIdentityVerification}
                                disabled={isLoading}
                                className="w-full py-4 bg-[#1f392c] hover:bg-[#2d4f3f] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed [font-family:'DM_Sans',Helvetica]"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Vérification en cours...
                                    </>
                                ) : (
                                    <>
                                        Vérifier mon identité
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="py-3 text-[#74767e] hover:text-[#222325] transition-colors text-sm [font-family:'Nunito_Sans',Helvetica]"
                            >
                                Je ferai ça plus tard
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== IDENTITY SUCCESS ========== */}
                {currentView === 'identity_success' && (
                    <div className="p-8 bg-gradient-to-b from-green-50 to-[#f8f5f0]">
                        {/* Progress */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-1 bg-[#fea38e]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#fea38e] text-white flex items-center justify-center font-bold text-sm">2</div>
                        </div>

                        {/* Success message */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2 [font-family:'DM_Sans',Helvetica]">
                                Identité validée ✓
                            </h2>
                            <p className="text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                Plus qu'une étape pour vendre.
                            </p>
                        </div>

                        {/* Next step preview */}
                        <div className="bg-white rounded-xl p-5 mb-8 border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#fea38e]/20 rounded-xl flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-[#fea38e]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#222325] [font-family:'Nunito_Sans',Helvetica]">
                                        Prochaine étape
                                    </h3>
                                    <p className="text-sm text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                        Configurer les paiements pour recevoir ton argent
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleStartConnect}
                            className="w-full py-4 bg-[#fea38e] hover:bg-[#fe8e76] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 [font-family:'DM_Sans',Helvetica]"
                        >
                            Configurer les paiements
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* ========== CONNECT - Configuration des paiements ========== */}
                {currentView === 'connect' && (
                    <div className="p-8">
                        {/* Progress */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-1 bg-green-500"></div>
                            <div className="w-8 h-8 rounded-full bg-[#fea38e] text-white flex items-center justify-center font-bold text-sm">2</div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#fea38e]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="w-8 h-8 text-[#fea38e]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2 [font-family:'DM_Sans',Helvetica]">
                                Configuration des paiements
                            </h2>
                            <p className="text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">
                                Reçois ton argent simplement et automatiquement sur ton compte bancaire.
                            </p>
                        </div>

                        {/* Ce que tu configures */}
                        <div className="bg-white rounded-xl p-5 mb-6 border border-gray-100">
                            <h3 className="font-semibold text-[#222325] mb-4 [font-family:'Nunito_Sans',Helvetica]">
                                Tu configures
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#222325] text-sm [font-family:'Nunito_Sans',Helvetica]">Ton compte bancaire</p>
                                        <p className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">IBAN pour recevoir les virements</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <FileCheck className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#222325] text-sm [font-family:'Nunito_Sans',Helvetica]">Tes informations de paiement</p>
                                        <p className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">Informations fiscales basiques</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Wallet className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#222325] text-sm [font-family:'Nunito_Sans',Helvetica]">Virements automatiques</p>
                                        <p className="text-xs text-[#74767e] [font-family:'Nunito_Sans',Helvetica]">Argent envoyé automatiquement</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Trust badge */}
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 flex items-start gap-3">
                            <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-800 [font-family:'Nunito_Sans',Helvetica]">
                                <strong>CollabMarket ne stocke aucune information bancaire.</strong> Tout est géré directement par Stripe.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleLaunchConnectOnboarding}
                                disabled={isLoading}
                                className="w-full py-4 bg-[#1f392c] hover:bg-[#2d4f3f] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed [font-family:'DM_Sans',Helvetica]"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Configuration en cours...
                                    </>
                                ) : (
                                    <>
                                        Connecter mon compte Stripe
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="py-3 text-[#74767e] hover:text-[#222325] transition-colors text-sm [font-family:'Nunito_Sans',Helvetica]"
                            >
                                Je ferai ça plus tard
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== CONNECT SUCCESS ========== */}
                {currentView === 'connect_success' && (
                    <div className="p-8 bg-gradient-to-b from-green-50 to-[#f8f5f0]">
                        {/* Success visual */}
                        <div className="text-center py-6">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                                <PartyPopper className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2 [font-family:'DM_Sans',Helvetica]">
                                Ton compte est prêt !
                            </h2>
                            <p className="text-[#74767e] max-w-sm mx-auto [font-family:'Nunito_Sans',Helvetica]">
                                Tu peux maintenant créer et vendre des services sur CollabMarket.
                            </p>
                        </div>

                        {/* Verified badges */}
                        <div className="bg-white rounded-xl p-5 mb-8 border border-gray-100">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-[#222325] [font-family:'Nunito_Sans',Helvetica]">Identité vérifiée</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-[#222325] [font-family:'Nunito_Sans',Helvetica]">Paiements configurés</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-[#222325] [font-family:'Nunito_Sans',Helvetica]">Prêt à vendre</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleFinish}
                            className="w-full py-4 bg-[#fea38e] hover:bg-[#fe8e76] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 [font-family:'DM_Sans',Helvetica]"
                        >
                            🚀 Créer mon premier service
                        </button>

                        <button
                            onClick={() => { onComplete?.(); onClose(); }}
                            className="w-full py-3 text-[#74767e] hover:text-[#222325] transition-colors text-sm mt-3 [font-family:'Nunito_Sans',Helvetica]"
                        >
                            Retour au dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSetupModal;
