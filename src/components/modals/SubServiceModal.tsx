/**
 * Sub-Service Modal - Add collaborator or associate service (Adoption-First)
 * Post-publication only, invisible to clients
 */
import React, { useState } from 'react';

interface SubServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: SubServiceData) => void;
    serviceName?: string;
}

interface SubServiceData {
    type: 'collaborator' | 'service';
    name: string;
    email?: string;
    serviceId?: string;
    marginPercent: number;
}

type Tab = 'collaborator' | 'service';

// Mock data for existing services
const MOCK_SERVICES = [
    { id: '1', name: 'Montage vidéo pro', price: 89, seller: '@monteurpro' },
    { id: '2', name: 'Script & copywriting', price: 49, seller: '@scriptwriter' },
    { id: '3', name: 'Motion design', price: 149, seller: '@motionlab' },
];

export const SubServiceModal: React.FC<SubServiceModalProps> = ({
    isOpen,
    onClose,
    onComplete,
    serviceName = 'ce service',
}) => {
    const [activeTab, setActiveTab] = useState<Tab>('collaborator');
    const [formData, setFormData] = useState<Partial<SubServiceData>>({
        type: 'collaborator',
        marginPercent: 20,
    });
    const [selectedService, setSelectedService] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onComplete?.({
            ...formData,
            type: activeTab,
            serviceId: selectedService || undefined,
        } as SubServiceData);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-[#f8f5f0] rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-[#222325] mb-2">
                            Améliorer la qualité
                        </h2>
                        <p className="text-[#74767e]">
                            Délègue une partie de <strong>{serviceName}</strong> sans que le client le voie.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('collaborator')}
                            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${activeTab === 'collaborator'
                                    ? 'border-[#fea38e] bg-[#fea38e]/10 text-[#fea38e]'
                                    : 'border-gray-200 bg-white text-[#74767e]'
                                }`}
                        >
                            👤 Collaborateur
                        </button>
                        <button
                            onClick={() => setActiveTab('service')}
                            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${activeTab === 'service'
                                    ? 'border-[#fea38e] bg-[#fea38e]/10 text-[#fea38e]'
                                    : 'border-gray-200 bg-white text-[#74767e]'
                                }`}
                        >
                            🔗 Service existant
                        </button>
                    </div>

                    {/* Tab content: Collaborator */}
                    {activeTab === 'collaborator' && (
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Nom ou pseudo
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: @monteurpro"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e]"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#222325] mb-2">
                                    Email du collaborateur
                                </label>
                                <input
                                    type="email"
                                    placeholder="collaborateur@email.com"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e]"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <p className="text-xs text-[#74767e] mt-2">
                                    Il recevra une invitation à rejoindre ton équipe.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Tab content: Existing Service */}
                    {activeTab === 'service' && (
                        <div className="space-y-3 mb-6">
                            {MOCK_SERVICES.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => {
                                        setSelectedService(service.id);
                                        setFormData({ ...formData, name: service.name });
                                    }}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedService === service.id
                                            ? 'border-[#fea38e] bg-[#fea38e]/10'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-semibold text-[#222325]">{service.name}</div>
                                            <div className="text-sm text-[#74767e]">{service.seller}</div>
                                        </div>
                                        <div className="text-[#fea38e] font-bold">€{service.price}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Margin setting */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-[#222325] mb-2">
                            Ta marge sur ce sous-service
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="5"
                                value={formData.marginPercent}
                                onChange={(e) => setFormData({ ...formData, marginPercent: Number(e.target.value) })}
                                className="flex-1"
                            />
                            <span className="text-lg font-bold text-[#fea38e] w-16 text-right">
                                {formData.marginPercent}%
                            </span>
                        </div>
                        <p className="text-xs text-[#74767e] mt-2">
                            Cette marge est ajoutée automatiquement au prix affiché au client.
                        </p>
                    </div>

                    {/* Info box */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <p className="text-green-700 text-sm">
                            🔒 Le client ne voit jamais les sous-services. Il perçoit toujours <strong>1 offre, 1 prix</strong>.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 text-[#74767e] hover:text-[#222325] transition-colors"
                        >
                            Plus tard
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={activeTab === 'collaborator' ? !formData.name : !selectedService}
                            className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubServiceModal;
