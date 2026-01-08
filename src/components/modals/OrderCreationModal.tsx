/**
 * Order Creation Modal - 5-step order flow
 * Converted from frame14734.js
 */
import React, { useState } from 'react';
import './OrderCreationModal.css';

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
    note: string;
    country: string;
    usageRights: 'personal' | 'commercial' | 'resale';
    billingName: string;
    email: string;
    brief: string;
}

type Step = 'package' | 'billing' | 'payment' | 'brief' | 'confirmation';

export const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
    service,
}) => {
    const [step, setStep] = useState<Step>('package');
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [formData, setFormData] = useState<Partial<OrderData>>({
        usageRights: 'personal',
    });

    if (!isOpen) return null;

    const handleContinue = () => {
        switch (step) {
            case 'package':
                setStep('billing');
                break;
            case 'billing':
                setStep('payment');
                break;
            case 'payment':
                setStep('brief');
                break;
            case 'brief':
                setStep('confirmation');
                break;
            case 'confirmation':
                onComplete?.({
                    ...formData,
                    packageIndex: selectedPackage,
                    extras: selectedExtras,
                } as OrderData);
                onClose();
                break;
        }
    };

    const handleBack = () => {
        switch (step) {
            case 'billing':
                setStep('package');
                break;
            case 'payment':
                setStep('billing');
                break;
            case 'brief':
                setStep('payment');
                break;
            case 'confirmation':
                setStep('brief');
                break;
        }
    };

    const toggleExtra = (extra: string) => {
        setSelectedExtras((prev) =>
            prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
        );
    };

    return (
        <div className="frame14734-container1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="frame14734-thq-frame14734-elm">
                {/* Step 1: Package Selection */}
                {step === 'package' && (
                    <div className="frame14734-thq-frame-elm10">
                        <img src="/vector1301-5pre.svg" alt="" className="frame14734-thq-vector-elm10" />
                        <div className="frame14734-thq-frame14177-elm">
                            <div className="frame14734-thq-frame14176-elm">
                                <div className="frame14734-thq-frame14158-elm">
                                    <div className="frame14734-thq-frame14157-elm">
                                        <span className="frame14734-thq-text-elm100">Choisir l'offre</span>
                                        <span className="frame14734-thq-text-elm101">
                                            Étape 1/5 · Configure ton achat (package + extras)
                                        </span>
                                    </div>
                                    <img src="/frame145801381-xhn.svg" alt="" className="frame14734-thq-frame14580-elm" />
                                </div>
                                <img src="/vector1301-8xhh.svg" alt="" className="frame14734-thq-vector-elm11" />
                                <span className="frame14734-thq-text-elm102">Packages</span>
                                <div className="frame14734-thq-frame14175-elm">
                                    <div
                                        className={`frame14734-thq-group-elm10 ${selectedPackage === 0 ? 'selected' : ''}`}
                                        onClick={() => setSelectedPackage(0)}
                                    >
                                        <div className="frame14734-thq-frame14162-elm">
                                            <div className="frame14734-thq-frame14161-elm">
                                                <span className="frame14734-thq-text-elm103">Basic</span>
                                                <span className="frame14734-thq-text-elm104">1 livrable · 2 jours</span>
                                                <span className="frame14734-thq-text-elm105">€ 89</span>
                                                <div className="frame14734-thq-frame14160-elm">
                                                    <span className="frame14734-thq-text-elm106">Populaire</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`frame14734-thq-group-elm11 ${selectedPackage === 1 ? 'selected' : ''}`}
                                        onClick={() => setSelectedPackage(1)}
                                    >
                                        <div className="frame14734-thq-frame14165-elm">
                                            <div className="frame14734-thq-frame14164-elm">
                                                <div className="frame14734-thq-frame14163-elm">
                                                    <span className="frame14734-thq-text-elm107">Standard</span>
                                                </div>
                                                <span className="frame14734-thq-text-elm108">2 livrables · 3 jours</span>
                                                <span className="frame14734-thq-text-elm109">€ 149</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`frame14734-thq-group-elm12 ${selectedPackage === 2 ? 'selected' : ''}`}
                                        onClick={() => setSelectedPackage(2)}
                                    >
                                        <div className="frame14734-thq-frame14167-elm">
                                            <div className="frame14734-thq-frame14166-elm">
                                                <span className="frame14734-thq-text-elm110">Premium</span>
                                                <span className="frame14734-thq-text-elm111">4 livrables · 5 jours</span>
                                                <span className="frame14734-thq-text-elm112">€ 299</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="frame14734-thq-text-elm113">Extras</span>
                                <div className="frame14734-thq-group-elm13">
                                    <div className="frame14734-thq-frame14169-elm">
                                        <div className="frame14734-thq-frame14168-elm">
                                            <div
                                                className="frame14734-thq-frame-elm11"
                                                onClick={() => toggleExtra('express')}
                                                style={{ opacity: selectedExtras.includes('express') ? 1 : 0.7 }}
                                            >
                                                <img src="/vector1301-gsg.svg" alt="" className="frame14734-thq-vector-elm12" />
                                                <span className="frame14734-thq-text-elm114">Express (24h)</span>
                                                <span className="frame14734-thq-text-elm115">+€ 40</span>
                                            </div>
                                            <div
                                                className="frame14734-thq-frame-elm12"
                                                onClick={() => toggleExtra('sources')}
                                                style={{ opacity: selectedExtras.includes('sources') ? 1 : 0.7 }}
                                            >
                                                <img src="/vector1301-opz7.svg" alt="" className="frame14734-thq-vector-elm13" />
                                                <span className="frame14734-thq-text-elm116">Fichiers sources</span>
                                                <span className="frame14734-thq-text-elm117">+€ 25</span>
                                            </div>
                                            <div
                                                className="frame14734-thq-frame-elm13"
                                                onClick={() => toggleExtra('revisions')}
                                                style={{ opacity: selectedExtras.includes('revisions') ? 1 : 0.7 }}
                                            >
                                                <img src="/vector1301-gwvs.svg" alt="" className="frame14734-thq-vector-elm14" />
                                                <span className="frame14734-thq-text-elm118">Révisions supplémentaires (x2)</span>
                                                <span className="frame14734-thq-text-elm119">+€ 30</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="frame14734-thq-frame14321-elm">
                                    <span className="frame14734-thq-text-elm120">Note rapide (optionnel)</span>
                                    <div className="frame14734-thq-frame14173-elm">
                                        <input
                                            type="text"
                                            placeholder="Ex: style moderne, ton sérieux…"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                            value={formData.note || ''}
                                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="frame14734-thq-frame14172-elm">
                                    <div className="frame14734-thq-frame14150-elm1" onClick={onClose}>
                                        <span className="frame14734-thq-text-elm122">Retour</span>
                                    </div>
                                    <div className="frame14734-thq-frame14148-elm" onClick={handleContinue}>
                                        <span className="frame14734-thq-text-elm123">Continuer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Billing Info */}
                {step === 'billing' && (
                    <div className="frame14734-thq-frame-elm14">
                        <img src="/vector1301-uh7g.svg" alt="" className="frame14734-thq-vector-elm15" />
                        <div className="frame14734-thq-frame14194-elm">
                            <div className="frame14734-thq-frame14193-elm">
                                <div className="frame14734-thq-frame14191-elm">
                                    <div className="frame14734-thq-frame14190-elm">
                                        <span className="frame14734-thq-text-elm124">
                                            Infos digitales &amp; droits d'usage
                                        </span>
                                        <span className="frame14734-thq-text-elm125">
                                            Étape 2/5 · Infos réutilisables + NDA (si applicable)
                                        </span>
                                    </div>
                                </div>
                                <span className="frame14734-thq-text-elm126">Pays</span>
                                <div className="frame14734-thq-frame14178-elm">
                                    <span className="frame14734-thq-text-elm127">France</span>
                                </div>
                                <span className="frame14734-thq-text-elm128">Droits d'usage</span>
                                <div className="frame14734-thq-group-elm14">
                                    <div
                                        className="frame14734-thq-frame14179-elm"
                                        onClick={() => setFormData({ ...formData, usageRights: 'personal' })}
                                        style={{ opacity: formData.usageRights === 'personal' ? 1 : 0.6 }}
                                    >
                                        <span className="frame14734-thq-text-elm129">Personnel</span>
                                    </div>
                                    <div
                                        className="frame14734-thq-frame14180-elm"
                                        onClick={() => setFormData({ ...formData, usageRights: 'commercial' })}
                                        style={{ opacity: formData.usageRights === 'commercial' ? 1 : 0.6 }}
                                    >
                                        <span className="frame14734-thq-text-elm130">Commercial</span>
                                    </div>
                                    <div
                                        className="frame14734-thq-frame14181-elm"
                                        onClick={() => setFormData({ ...formData, usageRights: 'resale' })}
                                        style={{ opacity: formData.usageRights === 'resale' ? 1 : 0.6 }}
                                    >
                                        <span className="frame14734-thq-text-elm131">Revente</span>
                                    </div>
                                </div>
                                <span className="frame14734-thq-text-elm132">Nom de facturation</span>
                                <div className="frame14734-thq-frame14182-elm">
                                    <input
                                        type="text"
                                        placeholder="Société / Nom complet"
                                        style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                        value={formData.billingName || ''}
                                        onChange={(e) => setFormData({ ...formData, billingName: e.target.value })}
                                    />
                                </div>
                                <span className="frame14734-thq-text-elm134">Email de contact</span>
                                <div className="frame14734-thq-frame14183-elm">
                                    <input
                                        type="email"
                                        placeholder="exemple@mail.com"
                                        style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="frame14734-thq-frame14192-elm">
                                    <div className="frame14734-thq-frame14147-elm1" onClick={handleBack}>
                                        <span className="frame14734-thq-text-elm139">Retour</span>
                                    </div>
                                    <div className="frame14734-thq-frame14150-elm2" onClick={handleContinue}>
                                        <span className="frame14734-thq-text-elm140">Continuer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Payment */}
                {step === 'payment' && (
                    <div className="frame14734-thq-frame-elm15">
                        <img src="/vector1301-c8uca.svg" alt="" className="frame14734-thq-vector-elm17" />
                        <div className="frame14734-thq-frame14218-elm">
                            <div className="frame14734-thq-frame14196-elm">
                                <div className="frame14734-thq-frame14195-elm">
                                    <span className="frame14734-thq-text-elm141">Récap &amp; paiement</span>
                                    <span className="frame14734-thq-text-elm142">
                                        Étape 3/5 · Paiement rapide + conditions
                                    </span>
                                </div>
                            </div>
                            <div className="frame14734-thq-frame14217-elm">
                                <div className="frame14734-thq-group-elm16">
                                    <div className="frame14734-thq-frame14201-elm">
                                        <div className="frame14734-thq-frame14200-elm">
                                            <div className="frame14734-thq-frame14198-elm">
                                                <span className="frame14734-thq-text-elm143">Commande</span>
                                                <span className="frame14734-thq-text-elm144">
                                                    Package {selectedPackage === 0 ? 'Basic' : selectedPackage === 1 ? 'Standard' : 'Premium'}
                                                    {selectedExtras.length > 0 && ` + ${selectedExtras.join(', ')}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="frame14734-thq-group-elm17">
                                    <div className="frame14734-thq-frame14210-elm">
                                        <div className="frame14734-thq-frame14209-elm">
                                            <div className="frame14734-thq-frame14205-elm">
                                                <span className="frame14734-thq-text-elm152">Paiement</span>
                                                <div className="frame14734-thq-frame14202-elm">
                                                    <span className="frame14734-thq-text-elm153">Sous-total</span>
                                                    <span className="frame14734-thq-text-elm154">€ 149</span>
                                                </div>
                                                <div className="frame14734-thq-frame14203-elm">
                                                    <span className="frame14734-thq-text-elm155">Frais plateforme</span>
                                                    <span className="frame14734-thq-text-elm156">€ 7</span>
                                                </div>
                                                <div className="frame14734-thq-frame14204-elm">
                                                    <span className="frame14734-thq-text-elm157">TVA</span>
                                                    <span className="frame14734-thq-text-elm158">€ 0</span>
                                                </div>
                                            </div>
                                            <div className="frame14734-thq-frame14206-elm">
                                                <span className="frame14734-thq-text-elm159">Total</span>
                                                <span className="frame14734-thq-text-elm160">€ 156</span>
                                            </div>
                                            <div className="frame14734-thq-frame14208-elm">
                                                <span className="frame14734-thq-text-elm161">Méthode</span>
                                                <div className="frame14734-thq-frame14149-elm1" onClick={handleContinue}>
                                                    <span className="frame14734-thq-text-elm162">Payez et continuer</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame14734-thq-frame14216-elm">
                                <div className="frame14734-thq-frame14215-elm" onClick={handleBack}>
                                    <span className="frame14734-thq-text-elm165">Retour</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Brief */}
                {step === 'brief' && (
                    <div className="frame14734-thq-frame-elm17">
                        <img src="/vector1301-yr6c.svg" alt="" className="frame14734-thq-vector-elm26" />
                        <div className="frame14734-thq-frame14254-elm">
                            <div className="frame14734-thq-frame14253-elm">
                                <div className="frame14734-thq-frame14230-elm">
                                    <div className="frame14734-thq-frame14229-elm">
                                        <span className="frame14734-thq-text-elm177">Brief / Requirements</span>
                                        <span className="frame14734-thq-text-elm178">
                                            Étape 4/5 · Donne les infos pour démarrer
                                        </span>
                                    </div>
                                </div>
                                <div className="frame14734-thq-frame14249-elm">
                                    <div className="frame14734-thq-frame14239-elm">
                                        <span className="frame14734-thq-text-elm179">Résumé du besoin (obligatoire)</span>
                                        <div className="frame14734-thq-frame14231-elm">
                                            <textarea
                                                placeholder="Décris clairement l'objectif, le contexte, le style…"
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    width: '100%',
                                                    outline: 'none',
                                                    resize: 'none',
                                                    minHeight: '100px',
                                                    color: 'inherit'
                                                }}
                                                value={formData.brief || ''}
                                                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="frame14734-thq-frame14252-elm">
                                    <div className="frame14734-thq-frame14154-elm1" onClick={handleBack}>
                                        <span className="frame14734-thq-text-elm205">Retour</span>
                                    </div>
                                    <div className="frame14734-thq-frame14150-elm4" onClick={handleContinue}>
                                        <span className="frame14734-thq-text-elm206">Envoyer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Confirmation */}
                {step === 'confirmation' && (
                    <div className="frame14734-thq-frame-elm18">
                        <img src="/vector1301-wsqu.svg" alt="" className="frame14734-thq-vector-elm29" />
                        <div className="frame14734-thq-frame14263-elm">
                            <div className="frame14734-thq-frame14262-elm">
                                <div className="frame14734-thq-frame14260-elm">
                                    <div className="frame14734-thq-frame14259-elm">
                                        <span className="frame14734-thq-text-elm207">Commande créée ✅</span>
                                        <span className="frame14734-thq-text-elm208">
                                            Étape 5/5 · Le vendeur va valider ton brief
                                        </span>
                                    </div>
                                </div>
                                <div className="frame14734-thq-group-elm19">
                                    <div className="frame14734-thq-frame14256-elm">
                                        <div className="frame14734-thq-frame14255-elm">
                                            <span className="frame14734-thq-text-elm209">Statut</span>
                                            <span className="frame14734-thq-text-elm210">
                                                En attente de validation du brief par le vendeur
                                            </span>
                                            <span className="frame14734-thq-text-elm211">Temps de réponse attendu</span>
                                            <span className="frame14734-thq-text-elm212">Moins de 24h</span>
                                            <span className="frame14734-thq-text-elm213">
                                                Tu peux modifier le brief tant qu'il n'est pas accepté.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="frame14734-thq-frame14261-elm">
                                    <div className="frame14734-thq-frame14156-elm2" onClick={onClose}>
                                        <span className="frame14734-thq-text-elm215">Aller à l'espace de commande</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderCreationModal;
