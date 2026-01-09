/**
 * Appel d'Offres Modal - Adoption-First Design
 * 3 steps: Brief → Budget → Success
 */
import React, { useState } from 'react';
import { createJobPosting } from '../../lib/queries/jobs';

interface AppelOffresModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: AppelOffresData) => void;
}

interface AppelOffresData {
    id?: string;
    title: string;
    category: string;
    description: string;
    budgetMin: number;
    budgetMax: number;
    budgetType: 'fixed' | 'hourly';
    screeningQuestion?: string;
}

type Step = 'brief' | 'budget' | 'success';

// Category ID mapping (simplified - in production, fetch from API)
const CATEGORY_MAP: Record<string, string> = {
    'video': 'cat-video',
    'design': 'cat-design',
    'dev': 'cat-dev',
    'marketing': 'cat-marketing',
    'writing': 'cat-writing',
};

export const AppelOffresModal: React.FC<AppelOffresModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('brief');
    const [formData, setFormData] = useState<Partial<AppelOffresData>>({
        budgetType: 'fixed',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdJobId, setCreatedJobId] = useState<string | null>(null);

    if (!isOpen) return null;

    const handlePublish = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await createJobPosting({
                title: formData.title || 'Mon appel d\'offres',
                description: formData.description || '',
                category_id: CATEGORY_MAP[formData.category || 'video'] || 'cat-video',
                budget_min: formData.budgetMin || 100,
                budget_max: formData.budgetMax || 500,
                budget_type: formData.budgetType || 'fixed',
                screening_questions: formData.screeningQuestion ? [formData.screeningQuestion] : [],
            });

            if (result.error) {
                setError(result.error);
                setIsLoading(false);
                return;
            }

            setCreatedJobId(result.data?.id || null);
            onComplete?.({ ...formData, id: result.data?.id } as AppelOffresData);
            setStep('success');
        } catch (err) {
            setError('Une erreur est survenue. Réessaie plus tard.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewProposals = () => {
        onClose();
        if (createdJobId) {
            window.location.href = `/dashboard/jobs/${createdJobId}`;
        }
    };

    const handleShareLink = () => {
        const link = createdJobId
            ? `https://collabmarket.com/jobs/${createdJobId}`
            : `https://collabmarket.com/jobs/${Date.now()}`;
        navigator.clipboard?.writeText(link);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && step !== 'success' && onClose()}
        >
            <div className="bg-[#f8f5f0] rounded-2xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* ========== STEP 1: BRIEF ========== */}
                {step === 'brief' && (
                    <div className="p-8">
                        {/* Promise phrase */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Créer un appel d'offres
                            </h2>
                            <p className="text-[#74767e]">
                                Explique ton besoin, on s'occupe de trouver les bons profils.
                            </p>
                        </div>

                        {/* Step indicator */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full bg-[#fea38e] text-white flex items-center justify-center font-bold">1</div>
                            <div className="w-12 h-1 bg-gray-300"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">2</div>
                            <div className="w-12 h-1 bg-gray-300"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">✓</div>
                        </div>

                        {/* Form fields */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Titre de la mission
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex : Recherche monteur UGC pour 20 vidéos/mois"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Catégorie
                                </label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent cursor-pointer"
                                    value={formData.category || ''}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Sélectionne une catégorie</option>
                                    <option value="video">Vidéo</option>
                                    <option value="design">Design</option>
                                    <option value="dev">Développement</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="writing">Rédaction</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Description du besoin
                                </label>
                                <textarea
                                    placeholder="Décris ton projet : contexte, objectifs, livrables attendus, style, deadlines..."
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent resize-none"
                                    rows={5}
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 text-[#74767e] hover:text-[#222325] transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => setStep('budget')}
                                disabled={!formData.title || !formData.category || !formData.description}
                                className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continuer →
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 2: BUDGET ========== */}
                {step === 'budget' && (
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Budget & Filtres
                            </h2>
                            <p className="text-[#74767e]">
                                Définis ton budget pour attirer les bons profils.
                            </p>
                        </div>

                        {/* Step indicator */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">✓</div>
                            <div className="w-12 h-1 bg-[#fea38e]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#fea38e] text-white flex items-center justify-center font-bold">2</div>
                            <div className="w-12 h-1 bg-gray-300"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">✓</div>
                        </div>

                        {/* Form fields */}
                        <div className="space-y-6">
                            {/* Budget type */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-3">
                                    Type de budget
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setFormData({ ...formData, budgetType: 'fixed' })}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${formData.budgetType === 'fixed'
                                            ? 'border-[#fea38e] bg-[#fea38e]/10 text-[#fea38e]'
                                            : 'border-gray-200 bg-white text-[#74767e]'
                                            }`}
                                    >
                                        💰 Forfait
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, budgetType: 'hourly' })}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${formData.budgetType === 'hourly'
                                            ? 'border-[#fea38e] bg-[#fea38e]/10 text-[#fea38e]'
                                            : 'border-gray-200 bg-white text-[#74767e]'
                                            }`}
                                    >
                                        ⏱️ Horaire
                                    </button>
                                </div>
                            </div>

                            {/* Budget range */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#222325] mb-2">
                                        Budget min (€)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                        value={formData.budgetMin || ''}
                                        onChange={(e) => setFormData({ ...formData, budgetMin: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#222325] mb-2">
                                        Budget max (€)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                        value={formData.budgetMax || ''}
                                        onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            {/* Screening question (optional) */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Question de filtre <span className="text-[#74767e] font-normal">(optionnel)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex : Peux-tu me montrer 2 exemples de ton travail ?"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                    value={formData.screeningQuestion || ''}
                                    onChange={(e) => setFormData({ ...formData, screeningQuestion: e.target.value })}
                                />
                                <p className="text-xs text-[#74767e] mt-2">
                                    Cette question sera posée aux candidats pour filtrer les profils.
                                </p>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-6">
                                <p className="text-red-700 font-medium">
                                    ❌ {error}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => setStep('brief')}
                                className="px-6 py-3 text-[#74767e] hover:text-[#222325] transition-colors"
                                disabled={isLoading}
                            >
                                ← Retour
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={!formData.budgetMin || !formData.budgetMax || isLoading}
                                className="px-8 py-3 bg-[#1f392c] hover:bg-[#2d4f3f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? '⏳ Publication...' : '🚀 Publier l\'appel d\'offres'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 3: SUCCESS ========== */}
                {step === 'success' && (
                    <div className="p-8 bg-gradient-to-b from-blue-50 to-[#f8f5f0]">
                        {/* Visual success */}
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl text-white">📢</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Ton appel d'offres est en ligne !
                            </h2>
                            <p className="text-[#74767e] max-w-md mx-auto">
                                Les freelances peuvent maintenant te proposer leurs services.
                            </p>
                        </div>

                        {/* Summary */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
                            <h3 className="font-bold text-[#222325] mb-2">{formData.title}</h3>
                            <p className="text-[#74767e] text-sm mb-4 line-clamp-2">{formData.description}</p>
                            <div className="flex gap-4 text-sm">
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                    {formData.budgetMin}€ - {formData.budgetMax}€
                                </span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    {formData.category}
                                </span>
                            </div>
                        </div>

                        {/* What's next */}
                        <div className="space-y-3">
                            <button
                                onClick={handleViewProposals}
                                className="w-full px-6 py-4 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-xl transition-colors"
                            >
                                Voir les propositions
                            </button>
                            <button
                                onClick={handleShareLink}
                                className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-[#222325] font-medium rounded-xl border border-gray-200 transition-colors"
                            >
                                📋 Copier le lien de partage
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-[#74767e] hover:text-[#222325] text-sm transition-colors"
                            >
                                Retour au dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppelOffresModal;
