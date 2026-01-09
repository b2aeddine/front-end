/**
 * Registration Modal - Adoption-First Design
 * 2 steps: Role + Account → Action
 */
import React, { useState } from 'react';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: RegistrationData) => void;
}

interface RegistrationData {
    role: 'freelance' | 'influencer' | 'affiliate' | 'merchant' | null;
    email: string;
    password: string;
}

type Step = 'role' | 'account' | 'action';

const ROLES = [
    { id: 'freelance', title: 'Vendre mes services', desc: 'Montage, design, dev, SEO...', emoji: '💼' },
    { id: 'influencer', title: 'Monétiser mon contenu', desc: 'TikTok, Insta, YouTube...', emoji: '🎬' },
    { id: 'affiliate', title: 'Recommander des services', desc: 'Liens, codes, tracking...', emoji: '🔗' },
    { id: 'merchant', title: 'Développer ma marque', desc: 'Entreprise, agence, studio...', emoji: '🏢' },
] as const;

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('role');
    const [selectedRole, setSelectedRole] = useState<RegistrationData['role']>(null);
    const [formData, setFormData] = useState<Partial<RegistrationData>>({});
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleCreateAccount = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onComplete?.({ ...formData, role: selectedRole } as RegistrationData);
        setIsLoading(false);
        setStep('action');
    };

    const handleAction = (action: string) => {
        onClose();
        // TODO: Navigate based on action
        console.log('Navigate to:', action);
    };

    const getActionForRole = () => {
        switch (selectedRole) {
            case 'freelance':
                return { primary: 'Créer mon premier service', action: '/dashboard/services/new' };
            case 'merchant':
                return { primary: 'Publier une mission', action: '/dashboard/jobs/new' };
            case 'affiliate':
                return { primary: 'Découvrir les services', action: '/explore' };
            case 'influencer':
                return { primary: 'Configurer mon profil', action: '/dashboard/profile' };
            default:
                return { primary: 'Aller au dashboard', action: '/dashboard' };
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && step !== 'action' && onClose()}
        >
            <div className="bg-[#f8f5f0] rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">

                {/* ========== STEP 1: ROLE ========== */}
                {step === 'role' && (
                    <div className="p-8">
                        {/* Promise phrase */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Créer ton compte
                            </h2>
                            <p className="text-[#74767e]">
                                Dis-nous pourquoi tu es là, on te guide.
                            </p>
                        </div>

                        {/* Role selection */}
                        <div className="space-y-3 mb-8">
                            {ROLES.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id as RegistrationData['role'])}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedRole === role.id
                                            ? 'border-[#fea38e] bg-[#fea38e]/10'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl">{role.emoji}</span>
                                        <div>
                                            <div className={`font-semibold ${selectedRole === role.id ? 'text-[#fea38e]' : 'text-[#222325]'}`}>
                                                {role.title}
                                            </div>
                                            <div className="text-sm text-[#74767e]">{role.desc}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button
                                onClick={onClose}
                                className="text-[#74767e] hover:text-[#222325] transition-colors"
                            >
                                J'ai déjà un compte
                            </button>
                            <button
                                onClick={() => setStep('account')}
                                disabled={!selectedRole}
                                className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continuer →
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 2: ACCOUNT ========== */}
                {step === 'account' && (
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Tes identifiants
                            </h2>
                            <p className="text-[#74767e]">
                                C'est tout ce dont on a besoin pour commencer.
                            </p>
                        </div>

                        {/* Form fields */}
                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="toi@email.com"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    placeholder="12+ caractères"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                    value={formData.password || ''}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button
                                onClick={() => setStep('role')}
                                className="px-6 py-3 text-[#74767e] hover:text-[#222325] transition-colors"
                            >
                                ← Retour
                            </button>
                            <button
                                onClick={handleCreateAccount}
                                disabled={!formData.email || !formData.password || isLoading}
                                className="px-8 py-3 bg-[#1f392c] hover:bg-[#2d4f3f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? '⏳ Création...' : '🚀 Créer mon compte'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 3: ACTION (Moment de bascule) ========== */}
                {step === 'action' && (
                    <div className="p-8 bg-gradient-to-b from-green-50 to-[#f8f5f0]">
                        {/* Visual success */}
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl text-white">🎉</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Bienvenue sur CollabMarket !
                            </h2>
                            <p className="text-[#74767e]">
                                Ton compte est créé. Maintenant, passons à l'action.
                            </p>
                        </div>

                        {/* Role-specific action */}
                        <div className="space-y-3 mt-8">
                            <button
                                onClick={() => handleAction(getActionForRole().action)}
                                className="w-full px-6 py-4 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-xl transition-colors"
                            >
                                {getActionForRole().primary}
                            </button>
                            <button
                                onClick={() => handleAction('/dashboard')}
                                className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-[#222325] font-medium rounded-xl border border-gray-200 transition-colors"
                            >
                                Explorer le dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;
