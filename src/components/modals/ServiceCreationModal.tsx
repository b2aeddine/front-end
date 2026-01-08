/**
 * Service Creation Modal - Multi-step service wizard
 * Converted from frame14735.js
 */
import React, { useState } from 'react';
import './ServiceCreationModal.css';

interface ServiceCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: ServiceData) => void;
}

interface ServiceData {
    title: string;
    category: string;
    subcategory: string;
    description: string;
    packages: Package[];
    deliverables: string;
    tags: string[];
}

interface Package {
    name: string;
    description: string;
    deliverables: number;
    deliveryDays: number;
    revisions: number;
    price: number;
}

type Step = 'basics' | 'packages' | 'process' | 'media' | 'affiliation';

export const ServiceCreationModal: React.FC<ServiceCreationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('basics');
    const [formData, setFormData] = useState<Partial<ServiceData>>({
        packages: [
            { name: 'Basic', description: '', deliverables: 1, deliveryDays: 2, revisions: 1, price: 49 },
            { name: 'Standard', description: '', deliverables: 3, deliveryDays: 4, revisions: 2, price: 129 },
            { name: 'Premium', description: '', deliverables: 6, deliveryDays: 7, revisions: 3, price: 249 },
        ],
    });

    if (!isOpen) return null;

    const handleContinue = () => {
        switch (step) {
            case 'basics':
                setStep('packages');
                break;
            case 'packages':
                setStep('process');
                break;
            case 'process':
                setStep('media');
                break;
            case 'media':
                setStep('affiliation');
                break;
            case 'affiliation':
                onComplete?.(formData as ServiceData);
                onClose();
                break;
        }
    };

    const handleBack = () => {
        switch (step) {
            case 'packages':
                setStep('basics');
                break;
            case 'process':
                setStep('packages');
                break;
            case 'media':
                setStep('process');
                break;
            case 'affiliation':
                setStep('media');
                break;
        }
    };

    const handleSaveDraft = () => {
        console.log('Saving draft:', formData);
        // TODO: Save to backend
    };

    return (
        <div className="frame14735-container1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="frame14735-thq-frame14735-elm">
                {/* Step 1: Basics */}
                {step === 'basics' && (
                    <div className="frame14735-thq-frame-elm1">
                        <img
                            src="/vector1371-qnh7.svg"
                            alt=""
                            className="frame14735-thq-vector-elm1"
                        />
                        <div className="frame14735-thq-frame14362-elm">
                            <div className="frame14735-thq-frame14338-elm10"></div>
                            <div className="frame14735-thq-frame14591-elm">
                                <span className="frame14735-thq-text-elm100">Créer un service</span>
                                <img
                                    src="/frame145881381-e75q.svg"
                                    alt=""
                                    className="frame14735-thq-frame14588-elm1"
                                />
                            </div>
                            <div className="frame14735-thq-frame14361-elm">
                                <div className="frame14735-thq-frame14357-elm1">
                                    <span className="frame14735-thq-text-elm101">
                                        Champs recommandés pour convertir : titre clair + livrables précis + tags.
                                    </span>
                                    <span className="frame14735-thq-text-elm102">Titre du service</span>
                                    <div className="frame14735-thq-frame14339-elm1">
                                        <input
                                            type="text"
                                            placeholder="Ex : Je monte tes vidéos TikTok avec sous-titres + hooks"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit', fontSize: 'inherit' }}
                                            value={formData.title || ''}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <span className="frame14735-thq-text-elm104">
                                        Conseil : résultat + format + délai ("en 48h").
                                    </span>
                                    <span className="frame14735-thq-text-elm105">Catégorie</span>
                                    <div className="frame14735-thq-frame14354-elm">
                                        <div className="frame14735-thq-frame14340-elm">
                                            <select
                                                style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', cursor: 'pointer' }}
                                                value={formData.category || ''}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="">Design / Vidéo / Dev / Marketing…</option>
                                                <option value="design">Design</option>
                                                <option value="video">Vidéo</option>
                                                <option value="dev">Développement</option>
                                                <option value="marketing">Marketing</option>
                                            </select>
                                        </div>
                                        <div className="frame14735-thq-frame14341-elm">
                                            <span className="frame14735-thq-text-elm107">Sous-catégorie</span>
                                        </div>
                                    </div>
                                    <span className="frame14735-thq-text-elm108">Langue &amp; zone</span>
                                    <div className="frame14735-thq-frame14353-elm">
                                        <div className="frame14735-thq-frame14342-elm">
                                            <span className="frame14735-thq-text-elm109">Langue du service</span>
                                        </div>
                                        <div className="frame14735-thq-frame14343-elm">
                                            <span className="frame14735-thq-text-elm110">Fuseau horaire</span>
                                        </div>
                                        <div className="frame14735-thq-frame14344-elm">
                                            <span className="frame14735-thq-text-elm111">Pays ciblés</span>
                                        </div>
                                    </div>
                                    <span className="frame14735-thq-text-elm112">Type d'offre</span>
                                    <div className="frame14735-thq-frame14352-elm">
                                        <div className="frame14735-thq-frame14345-elm">
                                            <span className="frame14735-thq-text-elm113">Prestation "one-shot"</span>
                                        </div>
                                        <div className="frame14735-thq-frame14346-elm">
                                            <span className="frame14735-thq-text-elm114">Récurrent / abonnement</span>
                                        </div>
                                        <div className="frame14735-thq-frame14350-elm">
                                            <span className="frame14735-thq-text-elm115">Disponible en urgence</span>
                                        </div>
                                    </div>
                                    <span className="frame14735-thq-text-elm116">Livrables &amp; formats</span>
                                    <div className="frame14735-thq-frame14347-elm">
                                        <textarea
                                            placeholder="Décris précisément ce que le client reçoit (ex: 3 vidéos 9:16 + fichiers .mp4 + miniatures .png)."
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', resize: 'none', minHeight: '60px', color: 'inherit' }}
                                            value={formData.deliverables || ''}
                                            onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                                        />
                                    </div>
                                    <span className="frame14735-thq-text-elm119">Tags (recherche)</span>
                                    <div className="frame14735-thq-frame14351-elm">
                                        <div className="frame14735-thq-frame14348-elm">
                                            <input
                                                type="text"
                                                placeholder="Tape et ajoute : UGC, Shopify, After Effects… (max 10)"
                                                style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="frame14735-thq-frame14356-elm">
                                        <div className="frame14735-thq-frame14355-elm1">
                                            <div className="frame14735-thq-frame14338-elm11" onClick={onClose}>
                                                <span className="frame14735-thq-text-elm122">Annuler</span>
                                            </div>
                                            <div className="frame14735-thq-frame14339-elm2" onClick={handleSaveDraft}>
                                                <span className="frame14735-thq-text-elm123">Enregistrer le brouillon</span>
                                            </div>
                                        </div>
                                        <div className="frame14735-thq-frame14338-elm12" onClick={handleContinue}>
                                            <span className="frame14735-thq-text-elm124">Continuer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Packages & Prix */}
                {step === 'packages' && (
                    <div className="frame14735-thq-frame-elm2">
                        <img
                            src="/vector1371-mb1.svg"
                            alt=""
                            className="frame14735-thq-vector-elm2"
                        />
                        <div className="frame14735-thq-frame14398-elm1">
                            <div className="frame14735-thq-frame14586-elm">
                                <span className="frame14735-thq-text-elm125">Créer un service — Packages &amp; prix</span>
                                <img
                                    src="/frame145881381-9c4g.svg"
                                    alt=""
                                    className="frame14735-thq-frame14588-elm2"
                                />
                            </div>
                            <span className="frame14735-thq-text-elm126">Table des packages</span>
                            <div className="frame14735-thq-frame14397-elm">
                                <div className="frame14735-thq-frame14396-elm">
                                    <span className="frame14735-thq-text-elm127">Éléments</span>
                                    <span className="frame14735-thq-text-elm128">Nom du package</span>
                                    <span className="frame14735-thq-text-elm129">Description courte</span>
                                    <span className="frame14735-thq-text-elm130">Livrables (quantité)</span>
                                    <span className="frame14735-thq-text-elm131">Délai</span>
                                    <span className="frame14735-thq-text-elm132">Révisions incluses</span>
                                    <span className="frame14735-thq-text-elm133">Prix</span>
                                </div>
                                <div className="frame14735-thq-frame14386-elm">
                                    <div className="frame14735-thq-frame14385-elm">
                                        <span className="frame14735-thq-text-elm134">Basic</span>
                                        <span className="frame14735-thq-text-elm135">Standard</span>
                                        <span className="frame14735-thq-text-elm136">Premium</span>
                                    </div>
                                    <div className="frame14735-thq-frame14384-elm">
                                        {/* Basic column */}
                                        <div className="frame14735-thq-frame14375-elm">
                                            <div className="frame14735-thq-frame14363-elm">
                                                <span className="frame14735-thq-text-elm137">Starter</span>
                                            </div>
                                            <div className="frame14735-thq-frame14364-elm"></div>
                                            <div className="frame14735-thq-frame14365-elm">
                                                <span className="frame14735-thq-text-elm138">ex: 1 vidéo</span>
                                            </div>
                                            <div className="frame14735-thq-frame14366-elm">
                                                <span className="frame14735-thq-text-elm139">2 jours</span>
                                            </div>
                                            <div className="frame14735-thq-frame14367-elm"></div>
                                            <div className="frame14735-thq-frame14368-elm">
                                                <span className="frame14735-thq-text-elm140">€ 49</span>
                                            </div>
                                        </div>
                                        {/* Standard column */}
                                        <div className="frame14735-thq-frame14376-elm">
                                            <div className="frame14735-thq-frame14369-elm">
                                                <span className="frame14735-thq-text-elm141">Pro</span>
                                            </div>
                                            <div className="frame14735-thq-frame14370-elm"></div>
                                            <div className="frame14735-thq-frame14371-elm">
                                                <span className="frame14735-thq-text-elm142">ex: 3 vidéos</span>
                                            </div>
                                            <div className="frame14735-thq-frame14372-elm">
                                                <span className="frame14735-thq-text-elm143">4 jours</span>
                                            </div>
                                            <div className="frame14735-thq-frame14373-elm"></div>
                                            <div className="frame14735-thq-frame14374-elm">
                                                <span className="frame14735-thq-text-elm144">€ 129</span>
                                            </div>
                                        </div>
                                        {/* Premium column */}
                                        <div className="frame14735-thq-frame14383-elm">
                                            <div className="frame14735-thq-frame14377-elm">
                                                <span className="frame14735-thq-text-elm145">Elite</span>
                                            </div>
                                            <div className="frame14735-thq-frame14378-elm"></div>
                                            <div className="frame14735-thq-frame14379-elm">
                                                <span className="frame14735-thq-text-elm146">ex: 6</span>
                                            </div>
                                            <div className="frame14735-thq-frame14380-elm">
                                                <span className="frame14735-thq-text-elm147">7 j</span>
                                            </div>
                                            <div className="frame14735-thq-frame14381-elm"></div>
                                            <div className="frame14735-thq-frame14382-elm">
                                                <span className="frame14735-thq-text-elm148">€ 249</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="frame14735-thq-text-elm149">Options (extras)</span>
                            <div className="frame14735-thq-frame14395-elm">
                                <div className="frame14735-thq-frame14394-elm">
                                    <div className="frame14735-thq-frame14393-elm">
                                        <span className="frame14735-thq-text-elm150">+ Livraison express</span>
                                        <span className="frame14735-thq-text-elm151">(+€ / -jours)</span>
                                    </div>
                                    <span className="frame14735-thq-text-elm152">+ Révision supplémentaire</span>
                                </div>
                            </div>
                            <span className="frame14735-thq-text-elm158">
                                Conseil : garde Basic simple, Standard = meilleur rapport, Premium = "tout inclus".
                            </span>
                            <div className="frame14735-thq-frame14357-elm2">
                                <div className="frame14735-thq-frame14355-elm2">
                                    <div className="frame14735-thq-frame14338-elm13" onClick={onClose}>
                                        <span className="frame14735-thq-text-elm159">Annuler</span>
                                    </div>
                                    <div className="frame14735-thq-frame14339-elm3" onClick={handleSaveDraft}>
                                        <span className="frame14735-thq-text-elm160">Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14735-thq-frame14338-elm14" onClick={handleContinue}>
                                    <span className="frame14735-thq-text-elm161">Continuer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Process - Simplified placeholder */}
                {step === 'process' && (
                    <div className="frame14735-thq-frame-elm3">
                        <img src="/vector1371-9my.svg" alt="" className="frame14735-thq-vector-elm3" />
                        <div className="frame14735-thq-frame14425-elm1">
                            <div className="frame14735-thq-frame14423-elm">
                                <div className="frame14735-thq-frame14590-elm1">
                                    <div className="frame14735-thq-frame14422-elm">
                                        <span className="frame14735-thq-text-elm162">
                                            Créer un service — Process &amp; exigences
                                        </span>
                                        <span className="frame14735-thq-text-elm163">
                                            Définis le workflow, les infos demandées au client et les règles de révision.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="frame14735-thq-frame14424-elm">
                                <div className="frame14735-thq-frame14398-elm2">
                                    <div className="frame14735-thq-frame14355-elm3">
                                        <div className="frame14735-thq-frame14338-elm15" onClick={handleBack}>
                                            <span className="frame14735-thq-text-elm187">Retour</span>
                                        </div>
                                        <div className="frame14735-thq-frame14339-elm4" onClick={handleSaveDraft}>
                                            <span className="frame14735-thq-text-elm188">Enregistrer le brouillon</span>
                                        </div>
                                    </div>
                                    <div className="frame14735-thq-frame14338-elm16" onClick={handleContinue}>
                                        <span className="frame14735-thq-text-elm189">Continuer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Media - Simplified placeholder */}
                {step === 'media' && (
                    <div className="frame14735-thq-frame-elm4">
                        <img src="/vector1371-7cyy.svg" alt="" className="frame14735-thq-vector-elm4" />
                        <div className="frame14735-thq-frame14448-elm">
                            <div className="frame14735-thq-frame14592-elm">
                                <div className="frame14735-thq-frame14447-elm">
                                    <span className="frame14735-thq-text-elm190">
                                        Créer un service — Médias &amp; preuves
                                    </span>
                                    <span className="frame14735-thq-text-elm191">
                                        Images/vidéo, PDF, exemples avant/après, FAQ, conditions.
                                    </span>
                                </div>
                            </div>
                            <div className="frame14735-thq-frame14357-elm3">
                                <div className="frame14735-thq-frame14355-elm4">
                                    <div className="frame14735-thq-frame14338-elm17" onClick={handleBack}>
                                        <span className="frame14735-thq-text-elm212">Retour</span>
                                    </div>
                                    <div className="frame14735-thq-frame14339-elm5" onClick={handleSaveDraft}>
                                        <span className="frame14735-thq-text-elm213">Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14735-thq-frame14338-elm18" onClick={handleContinue}>
                                    <span className="frame14735-thq-text-elm214">Continuer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Affiliation */}
                {step === 'affiliation' && (
                    <div className="frame14735-thq-frame-elm5">
                        <img src="/vector1371-x0op.svg" alt="" className="frame14735-thq-vector-elm5" />
                        <div className="frame14735-thq-frame14478-elm">
                            <div className="frame14735-thq-frame14593-elm">
                                <div className="frame14735-thq-frame14474-elm">
                                    <span className="frame14735-thq-text-elm215">
                                        Créer un service — Affiliation &amp; codes
                                    </span>
                                    <span className="frame14735-thq-text-elm216">
                                        Active la promo par affiliés : commission + code client + règles d'attribution.
                                    </span>
                                </div>
                            </div>
                            <div className="frame14735-thq-frame14398-elm3">
                                <div className="frame14735-thq-frame14355-elm5">
                                    <div className="frame14735-thq-frame14338-elm19" onClick={handleBack}>
                                        <span>Retour</span>
                                    </div>
                                    <div className="frame14735-thq-frame14339-elm6" onClick={handleSaveDraft}>
                                        <span>Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14735-thq-frame14338-elm20" onClick={handleContinue}>
                                    <span>Publier le service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCreationModal;
