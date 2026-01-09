/**
 * Order Creation Modal - Adoption-First Design (Polished)
 * 5 steps: Package → Info → Payment → Brief → Success
 */
import React, { useState } from 'react';

interface OrderCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: OrderData) => void;
    service?: {
        id: string;
        title: string;
        packages: { name: string; price: number; deliverables: string; deliveryDays: number }[];
    };
}

interface OrderData {
    packageIndex: number;
    extras: string[];
    usageRights: 'personal' | 'commercial' | 'resale';
    billingName: string;
    email: string;
    country: string;
    brief: string;
}

type Step = 'package' | 'info' | 'payment' | 'brief' | 'success';

const EXTRAS = [
    { id: 'express', name: 'Livraison express (24h)', price: 40, emoji: '⚡' },
    { id: 'sources', name: 'Fichiers sources', price: 25, emoji: '📁' },
    { id: 'revisions', name: 'Révisions illimitées', price: 30, emoji: '🔄' },
];

const PACKAGES = [
    { name: 'Basic', price: 89, deliverables: '1 livrable', days: 2, badge: 'Populaire' },
    { name: 'Standard', price: 149, deliverables: '2 livrables', days: 3, badge: null },
    { name: 'Premium', price: 299, deliverables: '4 livrables', days: 5, badge: null },
];

const COUNTRIES = ['France', 'Belgique', 'Suisse', 'Canada', 'Autre'];

export const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('package');
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [formData, setFormData] = useState<Partial<OrderData>>({
        usageRights: 'personal',
        country: 'France',
    });

    if (!isOpen) return null;

    const toggleExtra = (id: string) => {
        setSelectedExtras(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        const packagePrice = PACKAGES[selectedPackage].price;
        const extrasPrice = EXTRAS
            .filter(e => selectedExtras.includes(e.id))
            .reduce((sum, e) => sum + e.price, 0);
        const subtotal = packagePrice + extrasPrice;
        const fees = Math.round(subtotal * 0.05);
        return { subtotal, fees, total: subtotal + fees };
    };

    const handlePay = () => {
        setStep('brief');
    };

    const handleSubmitBrief = () => {
        onComplete?.({
            ...formData,
            packageIndex: selectedPackage,
            extras: selectedExtras,
        } as OrderData);
        setStep('success');
    };

    const prices = calculateTotal();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && step !== 'success' && onClose()}
        >
            <div className="bg-[#f8f5f0] rounded-2xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* ========== STEP 1: PACKAGE ========== */}
                {step === 'package' && (
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Choisir ton offre
                            </h2>
                            <p className="text-[#74767e]">
                                Choisis ton offre, paie en toute sécurité, démarre le projet.
                            </p>
                        </div>

                        {/* Packages */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {PACKAGES.map((pkg, index) => (
                                <button
                                    key={pkg.name}
                                    onClick={() => setSelectedPackage(index)}
                                    className={`p-4 rounded-xl border-2 text-center transition-all ${selectedPackage === index
                                            ? 'border-[#fea38e] bg-[#fea38e]/10'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    {pkg.badge && (
                                        <span className="inline-block bg-[#fea38e] text-white text-xs px-2 py-1 rounded-full mb-2">
                                            {pkg.badge}
                                        </span>
                                    )}
                                    <div className="font-bold text-[#222325]">{pkg.name}</div>
                                    <div className="text-2xl font-bold text-[#fea38e] my-2">€{pkg.price}</div>
                                    <div className="text-sm text-[#74767e]">{pkg.deliverables}</div>
                                    <div className="text-xs text-[#74767e]">{pkg.days} jours</div>
                                </button>
                            ))}
                        </div>

                        {/* Extras */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-[#222325] mb-3">Extras</h3>
                            <div className="space-y-2">
                                {EXTRAS.map((extra) => (
                                    <button
                                        key={extra.id}
                                        onClick={() => toggleExtra(extra.id)}
                                        className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition-all ${selectedExtras.includes(extra.id)
                                                ? 'border-[#fea38e] bg-[#fea38e]/10'
                                                : 'border-gray-200 bg-white'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{extra.emoji}</span>
                                            <span>{extra.name}</span>
                                        </span>
                                        <span className="font-bold text-[#fea38e]">+€{extra.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button onClick={onClose} className="text-[#74767e]">Annuler</button>
                            <button
                                onClick={() => setStep('info')}
                                className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full"
                            >
                                Continuer →
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 2: INFO ========== */}
                {step === 'info' && (
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Informations
                            </h2>
                            <p className="text-[#74767e]">
                                Pour la facturation et les droits d'usage.
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            {/* Country */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">Pays</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                >
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            {/* Usage Rights */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">Droits d'usage</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['personal', 'commercial', 'resale'] as const).map((right) => (
                                        <button
                                            key={right}
                                            onClick={() => setFormData({ ...formData, usageRights: right })}
                                            className={`py-2 px-3 rounded-xl border-2 text-sm ${formData.usageRights === right
                                                    ? 'border-[#fea38e] bg-[#fea38e]/10 text-[#fea38e]'
                                                    : 'border-gray-200 bg-white'
                                                }`}
                                        >
                                            {right === 'personal' ? 'Personnel' : right === 'commercial' ? 'Commercial' : 'Revente'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Billing Name */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">Nom de facturation</label>
                                <input
                                    type="text"
                                    placeholder="Société ou nom complet"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                                    value={formData.billingName || ''}
                                    onChange={(e) => setFormData({ ...formData, billingName: e.target.value })}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="contact@email.com"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button onClick={() => setStep('package')} className="text-[#74767e]">← Retour</button>
                            <button
                                onClick={() => setStep('payment')}
                                disabled={!formData.billingName || !formData.email}
                                className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full disabled:opacity-50"
                            >
                                Continuer →
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 3: PAYMENT ========== */}
                {step === 'payment' && (
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Récapitulatif & Paiement
                            </h2>
                        </div>

                        {/* Summary */}
                        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex justify-between mb-2">
                                <span>Package {PACKAGES[selectedPackage].name}</span>
                                <span>€{PACKAGES[selectedPackage].price}</span>
                            </div>
                            {selectedExtras.map(id => {
                                const extra = EXTRAS.find(e => e.id === id)!;
                                return (
                                    <div key={id} className="flex justify-between mb-2 text-sm text-[#74767e]">
                                        <span>{extra.name}</span>
                                        <span>€{extra.price}</span>
                                    </div>
                                );
                            })}
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Sous-total</span>
                                    <span>€{prices.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-1 text-[#74767e]">
                                    <span>Frais plateforme (5%)</span>
                                    <span>€{prices.fees}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-2">
                                    <span>Total</span>
                                    <span className="text-[#fea38e]">€{prices.total}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button onClick={() => setStep('info')} className="text-[#74767e]">← Retour</button>
                            <button
                                onClick={handlePay}
                                className="px-8 py-3 bg-[#1f392c] hover:bg-[#2d4f3f] text-white font-bold rounded-full"
                            >
                                💳 Payer €{prices.total}
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 4: BRIEF ========== */}
                {step === 'brief' && (
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Brief du projet
                            </h2>
                            <p className="text-[#74767e]">
                                Décris ton besoin pour que le créateur puisse démarrer.
                            </p>
                        </div>

                        <textarea
                            placeholder="Objectif du projet, contexte, style attendu, références..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl resize-none mb-6"
                            rows={8}
                            value={formData.brief || ''}
                            onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                        />

                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button onClick={() => setStep('payment')} className="text-[#74767e]">← Retour</button>
                            <button
                                onClick={handleSubmitBrief}
                                disabled={!formData.brief}
                                className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full disabled:opacity-50"
                            >
                                Envoyer le brief
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== STEP 5: SUCCESS ========== */}
                {step === 'success' && (
                    <div className="p-8 bg-gradient-to-b from-green-50 to-[#f8f5f0]">
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl text-white">✓</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#222325] mb-2">
                                Commande créée !
                            </h2>
                            <p className="text-[#74767e] max-w-md mx-auto">
                                Le créateur va valider ton brief sous 24h.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={onClose}
                                className="w-full px-6 py-4 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-xl"
                            >
                                Voir ma commande
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-[#74767e] hover:text-[#222325] text-sm"
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

export default OrderCreationModal;
