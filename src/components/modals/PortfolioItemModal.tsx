/**
 * Portfolio Item Modal - Add example to service (Adoption-First)
 * Post-publication only, never blocks
 */
import React, { useState } from 'react';

interface PortfolioItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: PortfolioItemData) => void;
    serviceId?: string;
    serviceName?: string;
}

interface PortfolioItemData {
    type: 'image' | 'video';
    file?: File;
    url?: string;
    title: string;
    result?: string;
}

export const PortfolioItemModal: React.FC<PortfolioItemModalProps> = ({
    isOpen,
    onClose,
    onComplete,
    serviceName = 'ce service',
}) => {
    const [formData, setFormData] = useState<Partial<PortfolioItemData>>({
        type: 'image',
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setFormData({ ...formData, file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        onComplete?.(formData as PortfolioItemData);
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
                            Ajouter un exemple
                        </h2>
                        <p className="text-[#74767e]">
                            Montre ce que tu sais faire pour <strong>{serviceName}</strong>
                        </p>
                    </div>

                    {/* Upload zone */}
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${isDragging
                                ? 'border-[#fea38e] bg-[#fea38e]/10'
                                : 'border-gray-300 bg-white'
                            }`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        {previewUrl ? (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-h-48 mx-auto rounded-lg"
                                />
                                <button
                                    onClick={() => { setPreviewUrl(null); setFormData({ ...formData, file: undefined }); }}
                                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="text-4xl mb-3">📷</div>
                                <p className="text-[#74767e] mb-2">
                                    Glisse une image ou vidéo ici
                                </p>
                                <label className="inline-block px-4 py-2 bg-[#fea38e] text-white rounded-full cursor-pointer hover:bg-[#e8937f] transition-colors">
                                    Parcourir
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <p className="text-xs text-[#74767e] mt-3">
                                    JPG, PNG, MP4 — Max 10 Mo
                                </p>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-[#222325] mb-2">
                            Titre court
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Vidéo UGC pour marque skincare"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e]"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Result (optional) */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-[#222325] mb-2">
                            Résultat obtenu <span className="text-[#74767e] font-normal">(optionnel)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: +45% d'engagement, 100k vues..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fea38e]"
                            value={formData.result || ''}
                            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                        />
                    </div>

                    {/* Tip */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-blue-700 text-sm">
                            💡 Les services avec exemples convertissent <strong>+30%</strong> de plus.
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
                            disabled={!formData.file || !formData.title}
                            className="px-8 py-3 bg-[#fea38e] hover:bg-[#e8937f] text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Ajouter l'exemple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioItemModal;
