/**
 * Service Creation Modal - Adoption-First Design
 * 3 steps: Basics → Pricing → Success
 */
import React, { useState } from 'react';
import { PortfolioItemModal } from './PortfolioItemModal';
import { SubServiceModal } from './SubServiceModal';
import { createService } from '../../lib/queries/services';

interface ServiceCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: ServiceData) => void;
}

interface ServiceData {
    id?: string;
    title: string;
    category: string;
    deliverables: string;
    tags: string;
    packages: Package[];
}

interface Package {
    name: string;
    deliverables: number;
    deliveryDays: number;
    revisions: number;
    price: number;
}

type Step = 'basics' | 'pricing' | 'success';

// Category ID mapping (simplified - in production, fetch from API)
const CATEGORY_MAP: Record<string, string> = {
    'video': 'cat-video',
    'design': 'cat-design',
    'dev': 'cat-dev',
    'marketing': 'cat-marketing',
    'writing': 'cat-writing',
};

export const ServiceCreationModal: React.FC<ServiceCreationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('basics');
    const [formData, setFormData] = useState<Partial<ServiceData>>({
        packages: [
            { name: 'Basic', deliverables: 1, deliveryDays: 2, revisions: 1, price: 49 },
            { name: 'Standard', deliverables: 3, deliveryDays: 4, revisions: 2, price: 129 },
            { name: 'Premium', deliverables: 6, deliveryDays: 7, revisions: 3, price: 249 },
        ],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);

    // Sub-modal states
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [isSubServiceModalOpen, setIsSubServiceModalOpen] = useState(false);

    if (!isOpen) return null;

    const handlePublish = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Map form data to API format
            const packages = (formData.packages || []).map((pkg, index) => ({
                name: (['basic', 'standard', 'premium'] as const)[index],
                title: pkg.name,
                description: `${pkg.deliverables} livrables inclus`,
                price: pkg.price,
                delivery_days: pkg.deliveryDays,
                revisions: pkg.revisions,
                features: [],
            }));

            const result = await createService({
                title: formData.title || 'Mon service',
                description: formData.deliverables || '',
                category_id: CATEGORY_MAP[formData.category || 'video'] || 'cat-video',
                service_role: 'freelance',
                search_tags: formData.tags?.split(',').map(t => t.trim()) || [],
                packages,
            });

            if (result.error) {
                setError(result.error);
                setIsLoading(false);
                return;
            }

            setCreatedServiceId(result.data?.id || null);
            onComplete?.({ ...formData, id: result.data?.id } as ServiceData);
            setStep('success');
        } catch (err) {
            setError('Une erreur est survenue. Réessaie plus tard.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewService = () => {
        onClose();
        if (createdServiceId) {
            // TODO: Navigate to service page with createdServiceId
            window.location.href = `/service/${createdServiceId}`;
        }
    };

    const handleAddExample = () => {
        setIsPortfolioModalOpen(true);
    };

    const handleAddCollaborator = () => {
        setIsSubServiceModalOpen(true);
    };

    const updatePackage = (index: number, field: keyof Package, value: number) => {
        const newPackages = [...(formData.packages || [])];
        newPackages[index] = { ...newPackages[index], [field]: value };
        setFormData({ ...formData, packages: newPackages });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && step !== 'success' && onClose()}
        >
            <div className="bg-[#f8f5f0] rounded-2xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* ========== STEP 1: BASICS ========== */}
                {step === 'basics' && (
                    <div className="p-8">
                        {/* Promise phrase */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Créer un service
                            </h2>
                            <p className="text-[#74767e]">
                                Crée une offre claire que les clients peuvent acheter immédiatement.
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

                        {/* Form fields - ONLY essential ones */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Titre du service
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex : Je monte tes vidéos TikTok avec sous-titres + hooks"
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

                            {/* Deliverables */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Ce que le client reçoit
                                </label>
                                <textarea
                                    placeholder="Ex: 3 vidéos format 9:16 + fichiers sources + miniatures"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent resize-none"
                                    rows={3}
                                    value={formData.deliverables || ''}
                                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Tags (pour la recherche)
                                </label>
                                <input
                                    type="text"
                                    placeholder="UGC, TikTok, Montage, Shopify..."
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e] focus:border-transparent"
                                    value={formData.tags || ''}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
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
                                onClick={() => setStep('pricing')}
                                disabled={!formData.title || !formData.category}
                                className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continuer →
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 2: PRICING ========== */}
                {step === 'pricing' && (
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Prix & Délais
                            </h2>
                            <p className="text-[#74767e]">
                                Définis tes offres. Après cette étape, ton service sera achetable.
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

                        {/* Packages grid */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {formData.packages?.map((pkg, index) => (
                                <div
                                    key={pkg.name}
                                    className={`p-4 rounded-xl border-2 ${index === 1 ? 'border-[#fea38e] bg-[#fea38e]/5' : 'border-gray-200 bg-white'}`}
                                >
                                    <h3 className={`font-bold text-center mb-4 ${index === 1 ? 'text-[#fea38e]' : 'text-[#222325]'}`}>
                                        {pkg.name}
                                        {index === 1 && <span className="block text-xs font-normal mt-1">Recommandé</span>}
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-[#74767e]">Prix (€)</label>
                                            <input
                                                type="number"
                                                value={pkg.price}
                                                onChange={(e) => updatePackage(index, 'price', Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[#74767e]">Livrables</label>
                                            <input
                                                type="number"
                                                value={pkg.deliverables}
                                                onChange={(e) => updatePackage(index, 'deliverables', Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[#74767e]">Délai (jours)</label>
                                            <input
                                                type="number"
                                                value={pkg.deliveryDays}
                                                onChange={(e) => updatePackage(index, 'deliveryDays', Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[#74767e]">Révisions</label>
                                            <input
                                                type="number"
                                                value={pkg.revisions}
                                                onChange={(e) => updatePackage(index, 'revisions', Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Trigger message */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-6">
                            <p className="text-green-700 font-medium">
                                💡 Après publication, ton service sera immédiatement visible et achetable.
                            </p>
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
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button
                                onClick={() => setStep('basics')}
                                className="px-6 py-3 text-[#74767e] hover:text-[#222325] transition-colors"
                                disabled={isLoading}
                            >
                                ← Retour
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={isLoading}
                                className="px-8 py-3 bg-[#1f392c] hover:bg-[#2d4f3f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? '⏳ Publication...' : '🚀 Publier le service'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 3: SUCCESS (Moment de bascule) ========== */}
                {step === 'success' && (
                    <div className="p-8 bg-gradient-to-b from-green-50 to-[#f8f5f0]">
                        {/* Visual success */}
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl text-white">✓</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Ton service est en ligne !
                            </h2>
                            <p className="text-[#74767e] max-w-md mx-auto">
                                Les clients peuvent maintenant le découvrir et le commander.
                            </p>
                        </div>

                        {/* Service summary */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
                            <h3 className="font-bold text-[#222325] mb-2">{formData.title}</h3>
                            <p className="text-[#74767e] text-sm mb-4">{formData.deliverables}</p>
                            <div className="flex gap-4 text-sm">
                                <span className="bg-[#fea38e]/10 text-[#fea38e] px-3 py-1 rounded-full">
                                    À partir de {formData.packages?.[0]?.price}€
                                </span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    {formData.category}
                                </span>
                            </div>
                        </div>

                        {/* What's next */}
                        <div className="space-y-3">
                            <button
                                onClick={handleViewService}
                                className="w-full px-6 py-4 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-xl transition-colors"
                            >
                                Voir mon service
                            </button>

                            {/* Portfolio CTA */}
                            <button
                                onClick={handleAddExample}
                                className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-[#222325] font-medium rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <span>📷</span>
                                <span>Ajouter un exemple (+30% de ventes)</span>
                            </button>

                            {/* SubService CTA */}
                            <button
                                onClick={handleAddCollaborator}
                                className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-[#222325] font-medium rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <span>👥</span>
                                <span>Ajouter un collaborateur</span>
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

            {/* Sub-modals */}
            <PortfolioItemModal
                isOpen={isPortfolioModalOpen}
                onClose={() => setIsPortfolioModalOpen(false)}
                serviceName={formData.title}
                onComplete={(data) => {
                    console.log('Portfolio item added:', data);
                    setIsPortfolioModalOpen(false);
                }}
            />

            <SubServiceModal
                isOpen={isSubServiceModalOpen}
                onClose={() => setIsSubServiceModalOpen(false)}
                serviceName={formData.title}
                onComplete={(data) => {
                    console.log('Sub-service added:', data);
                    setIsSubServiceModalOpen(false);
                }}
            />
        </div>
    );
};

export default ServiceCreationModal;
