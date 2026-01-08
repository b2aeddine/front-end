/**
 * Appel d'Offres Modal - 4-step job posting wizard
 * Converted from frame14736.js
 */
import React, { useState } from 'react';
import './AppelOffresModal.css';

interface AppelOffresModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: AppelOffresData) => void;
}

interface AppelOffresData {
    title: string;
    category: string;
    skills: string[];
    description: string;
    projectSize: 'small' | 'medium' | 'large';
    duration: string;
    startDate: string;
    deliverables: string;
    budgetType: 'fixed' | 'hourly';
    budgetMin: number;
    budgetMax: number;
    currency: string;
    urgency: 'normal' | 'priority';
    visibility: 'public' | 'unlisted' | 'private';
}

type Step = 'description' | 'budget' | 'screening' | 'publication';

export const AppelOffresModal: React.FC<AppelOffresModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('description');
    const [formData, setFormData] = useState<Partial<AppelOffresData>>({
        budgetType: 'fixed',
        currency: 'EUR',
        urgency: 'normal',
        visibility: 'public',
    });

    if (!isOpen) return null;

    const handleContinue = () => {
        switch (step) {
            case 'description':
                setStep('budget');
                break;
            case 'budget':
                setStep('screening');
                break;
            case 'screening':
                setStep('publication');
                break;
            case 'publication':
                onComplete?.(formData as AppelOffresData);
                onClose();
                break;
        }
    };

    const handleBack = () => {
        switch (step) {
            case 'budget':
                setStep('description');
                break;
            case 'screening':
                setStep('budget');
                break;
            case 'publication':
                setStep('screening');
                break;
        }
    };

    const handleSaveDraft = () => {
        console.log('Saving draft:', formData);
        // TODO: Save to backend
    };

    return (
        <div className="frame14736-container1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="frame14736-thq-frame14736-elm">
                {/* Step 1: Description */}
                {step === 'description' && (
                    <div className="frame14736-thq-frame-elm1">
                        <img src="/vector1371-ctzg.svg" alt="" className="frame14736-thq-vector-elm1" />
                        <img src="/vector1371-awb.svg" alt="" className="frame14736-thq-vector-elm2" />
                        <div className="frame14736-thq-frame14517-elm1">
                            <div className="frame14736-thq-frame14595-elm">
                                <div className="frame14736-thq-frame14516-elm">
                                    <span className="frame14736-thq-text-elm100">Créer un appel d'offres</span>
                                    <span className="frame14736-thq-text-elm101">
                                        Style Upwork : brief clair + scope + skills + pièces jointes + screening.
                                    </span>
                                </div>
                                <img src="/group1381-0y3s.svg" alt="" className="frame14736-thq-group-elm1" />
                            </div>
                            <div className="frame14736-thq-frame14515-elm">
                                <span className="frame14736-thq-text-elm102">Titre</span>
                                <div className="frame14736-thq-frame14500-elm">
                                    <input
                                        type="text"
                                        placeholder='Ex : "Recherche monteur UGC pour 20 vidéos/mois (long terme)"'
                                        style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <span className="frame14736-thq-text-elm104">Catégorie &amp; compétences</span>
                                <div className="frame14736-thq-frame14509-elm">
                                    <div className="frame14736-thq-frame14501-elm">
                                        <select
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', cursor: 'pointer' }}
                                            value={formData.category || ''}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Catégorie</option>
                                            <option value="video">Vidéo</option>
                                            <option value="design">Design</option>
                                            <option value="dev">Développement</option>
                                            <option value="marketing">Marketing</option>
                                        </select>
                                    </div>
                                    <div className="frame14736-thq-frame14502-elm">
                                        <input
                                            type="text"
                                            placeholder="Skills (max 10) : Premiere, UGC, Ads…"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                        />
                                    </div>
                                </div>
                                <span className="frame14736-thq-text-elm107">Description détaillée</span>
                                <div className="frame14736-thq-frame14503-elm">
                                    <textarea
                                        placeholder="Inclure : contexte, objectifs, livrables, style attendu, deadlines, critères de réussite, exemples."
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            width: '100%',
                                            outline: 'none',
                                            resize: 'none',
                                            minHeight: '80px',
                                            color: 'inherit'
                                        }}
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="frame14736-thq-frame14514-elm">
                                <div className="frame14736-thq-frame14512-elm">
                                    <span className="frame14736-thq-text-elm110">Scope</span>
                                    <div className="frame14736-thq-frame14511-elm">
                                        <div className="frame14736-thq-frame14510-elm">
                                            <div className="frame14736-thq-frame14504-elm">
                                                <span className="frame14736-thq-text-elm111">Taille projet</span>
                                            </div>
                                            <div className="frame14736-thq-frame14505-elm">
                                                <span className="frame14736-thq-text-elm112">Durée</span>
                                            </div>
                                            <div className="frame14736-thq-frame14506-elm">
                                                <span className="frame14736-thq-text-elm113">Démarrage</span>
                                            </div>
                                        </div>
                                        <div className="frame14736-thq-frame14507-elm">
                                            <input
                                                type="text"
                                                placeholder="Livrables attendus (liste) + format + quantité"
                                                style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit' }}
                                                value={formData.deliverables || ''}
                                                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="frame14736-thq-frame14513-elm">
                                    <span className="frame14736-thq-text-elm115">Pièces jointes</span>
                                    <div className="frame14736-thq-frame14508-elm">
                                        <span className="frame14736-thq-text-elm116">
                                            Dépose un brief (PDF), charte, exemples
                                        </span>
                                        <span className="frame14736-thq-text-elm117">PDF/PNG/JPG/ZIP — optionnel</span>
                                    </div>
                                </div>
                            </div>
                            <div className="frame14736-thq-frame14357-elm">
                                <div className="frame14736-thq-frame14355-elm1">
                                    <div className="frame14736-thq-frame14338-elm1" onClick={onClose}>
                                        <span className="frame14736-thq-text-elm118">Annuler</span>
                                    </div>
                                    <div className="frame14736-thq-frame14339-elm1" onClick={handleSaveDraft}>
                                        <span className="frame14736-thq-text-elm119">Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14736-thq-frame14338-elm2" onClick={handleContinue}>
                                    <span className="frame14736-thq-text-elm120">Continuer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Budget & Contrat */}
                {step === 'budget' && (
                    <div className="frame14736-thq-frame-elm2">
                        <img src="/vector1371-a9q.svg" alt="" className="frame14736-thq-vector-elm3" />
                        <img src="/vector1371-kg39.svg" alt="" className="frame14736-thq-vector-elm4" />
                        <div className="frame14736-thq-frame14538-elm1">
                            <div className="frame14736-thq-frame14596-elm">
                                <div className="frame14736-thq-frame14537-elm">
                                    <span className="frame14736-thq-text-elm121">Appel d'offres — Budget &amp; contrat</span>
                                    <span className="frame14736-thq-text-elm122">
                                        Fixe / horaire, fourchettes, paiement sécurisé (jalons), conditions.
                                    </span>
                                </div>
                                <img src="/group1381-xb05.svg" alt="" className="frame14736-thq-group-elm2" />
                            </div>
                            <div className="frame14736-thq-frame14536-elm">
                                <div className="frame14736-thq-frame14527-elm">
                                    <span className="frame14736-thq-text-elm123">Type &amp; budget</span>
                                    <div className="frame14736-thq-frame14526-elm">
                                        <div className="frame14736-thq-frame14525-elm">
                                            <span className="frame14736-thq-text-elm124">Type de paiement</span>
                                            <span className="frame14736-thq-text-elm125">Budget (fourchette)</span>
                                            <span className="frame14736-thq-text-elm126">Devise</span>
                                            <span className="frame14736-thq-text-elm127">Urgence</span>
                                        </div>
                                        <div className="frame14736-thq-frame14524-elm">
                                            <div className="frame14736-thq-frame14518-elm">
                                                <select
                                                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', cursor: 'pointer' }}
                                                    value={formData.budgetType}
                                                    onChange={(e) => setFormData({ ...formData, budgetType: e.target.value as 'fixed' | 'hourly' })}
                                                >
                                                    <option value="fixed">Forfait</option>
                                                    <option value="hourly">Horaire</option>
                                                </select>
                                            </div>
                                            <div className="frame14736-thq-frame14523-elm">
                                                <div className="frame14736-thq-frame14519-elm">
                                                    <input
                                                        type="number"
                                                        placeholder="Min"
                                                        style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                                        value={formData.budgetMin || ''}
                                                        onChange={(e) => setFormData({ ...formData, budgetMin: Number(e.target.value) })}
                                                    />
                                                </div>
                                                <div className="frame14736-thq-frame14520-elm">
                                                    <input
                                                        type="number"
                                                        placeholder="Max"
                                                        style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                                        value={formData.budgetMax || ''}
                                                        onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="frame14736-thq-frame14521-elm">
                                                <span className="frame14736-thq-text-elm131">EUR / USD…</span>
                                            </div>
                                            <div className="frame14736-thq-frame14522-elm">
                                                <select
                                                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', cursor: 'pointer' }}
                                                    value={formData.urgency}
                                                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value as 'normal' | 'priority' })}
                                                >
                                                    <option value="normal">Normal</option>
                                                    <option value="priority">Prioritaire</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="frame14736-thq-text-elm133">
                                        Conseil : mets une fourchette réaliste pour attirer des bons profils.
                                    </span>
                                </div>
                            </div>
                            <div className="frame14736-thq-frame14517-elm2">
                                <div className="frame14736-thq-frame14355-elm2">
                                    <div className="frame14736-thq-frame14338-elm3" onClick={handleBack}>
                                        <span className="frame14736-thq-text-elm142">Retour</span>
                                    </div>
                                    <div className="frame14736-thq-frame14339-elm2" onClick={handleSaveDraft}>
                                        <span className="frame14736-thq-text-elm143">Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14736-thq-frame14338-elm4" onClick={handleContinue}>
                                    <span className="frame14736-thq-text-elm144">Continuer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Screening */}
                {step === 'screening' && (
                    <div className="frame14736-thq-frame-elm3">
                        <img src="/vector1371-eh7.svg" alt="" className="frame14736-thq-vector-elm5" />
                        <img src="/vector1371-glam.svg" alt="" className="frame14736-thq-vector-elm6" />
                        <div className="frame14736-thq-frame14560-elm">
                            <div className="frame14736-thq-frame14597-elm">
                                <div className="frame14736-thq-frame14559-elm">
                                    <span className="frame14736-thq-text-elm145">Appel d'offres — Screening &amp; filtres</span>
                                    <span className="frame14736-thq-text-elm146">
                                        Comme Upwork : questions, prérequis, pièces, critères de tri automatique.
                                    </span>
                                </div>
                                <img src="/group1381-m6pg.svg" alt="" className="frame14736-thq-group-elm3" />
                            </div>
                            <div className="frame14736-thq-frame14558-elm">
                                <div className="frame14736-thq-frame14550-elm">
                                    <span className="frame14736-thq-text-elm147">Questions de screening</span>
                                    <span className="frame14736-thq-text-elm148">
                                        Affichées dans la candidature (anti "candidats random").
                                    </span>
                                    <div className="frame14736-thq-frame14549-elm">
                                        <div className="frame14736-thq-frame14539-elm">
                                            <span className="frame14736-thq-text-elm149">
                                                Q1 — "Montre 2 exemples proches de ce style (lien)."
                                            </span>
                                            <span className="frame14736-thq-text-elm150">Type : lien / upload / texte</span>
                                        </div>
                                        <div className="frame14736-thq-frame14542-elm">
                                            <span className="frame14736-thq-text-elm153">
                                                Q2 — "Quel est ton délai réaliste pour le lot 1 ?"
                                            </span>
                                            <span className="frame14736-thq-text-elm154">Type : texte court / nombre</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame14736-thq-frame14538-elm2">
                                <div className="frame14736-thq-frame14355-elm3">
                                    <div className="frame14736-thq-frame14338-elm5" onClick={handleBack}>
                                        <span className="frame14736-thq-text-elm173">Retour</span>
                                    </div>
                                    <div className="frame14736-thq-frame14339-elm3" onClick={handleSaveDraft}>
                                        <span className="frame14736-thq-text-elm174">Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14736-thq-frame14338-elm6" onClick={handleContinue}>
                                    <span className="frame14736-thq-text-elm175">Continuer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Publication */}
                {step === 'publication' && (
                    <div className="frame14736-thq-frame-elm4">
                        <img src="/vector1371-5ipc.svg" alt="" className="frame14736-thq-vector-elm7" />
                        <img src="/vector1371-tu7u.svg" alt="" className="frame14736-thq-vector-elm8" />
                        <div className="frame14736-thq-frame14579-elm">
                            <div className="frame14736-thq-frame14598-elm">
                                <div className="frame14736-thq-frame14578-elm">
                                    <span className="frame14736-thq-text-elm176">Appel d'offres — Publication</span>
                                    <span className="frame14736-thq-text-elm177">
                                        Visibilité, invitations, deadline, gestion des candidatures, publication.
                                    </span>
                                </div>
                                <img src="/group1381-pi1l.svg" alt="" className="frame14736-thq-group-elm4" />
                            </div>
                            <div className="frame14736-thq-frame14577-elm">
                                <div className="frame14736-thq-frame14571-elm">
                                    <span className="frame14736-thq-text-elm178">Visibilité</span>
                                    <div className="frame14736-thq-frame14568-elm">
                                        <div className="frame14736-thq-frame14566-elm">
                                            <span className="frame14736-thq-text-elm179">Qui peut voir ?</span>
                                            <span className="frame14736-thq-text-elm180">Date limite candidatures</span>
                                            <span className="frame14736-thq-text-elm181">Notifications</span>
                                        </div>
                                        <div className="frame14736-thq-frame14567-elm">
                                            <div className="frame14736-thq-frame14561-elm">
                                                <select
                                                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', cursor: 'pointer' }}
                                                    value={formData.visibility}
                                                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value as 'public' | 'unlisted' | 'private' })}
                                                >
                                                    <option value="public">Public</option>
                                                    <option value="unlisted">Non listé</option>
                                                    <option value="private">Privé</option>
                                                </select>
                                            </div>
                                            <div className="frame14736-thq-frame14564-elm">
                                                <div className="frame14736-thq-frame14562-elm">
                                                    <input
                                                        type="date"
                                                        style={{ background: 'transparent', border: 'none', outline: 'none' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="frame14736-thq-frame14565-elm">
                                                <span className="frame14736-thq-text-elm185">Email + app</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame14736-thq-frame14517-elm3">
                                <div className="frame14736-thq-frame14355-elm4">
                                    <div className="frame14736-thq-frame14338-elm7" onClick={handleBack}>
                                        <span className="frame14736-thq-text-elm198">Retour</span>
                                    </div>
                                    <div className="frame14736-thq-frame14339-elm4" onClick={handleSaveDraft}>
                                        <span className="frame14736-thq-text-elm199">Enregistrer le brouillon</span>
                                    </div>
                                </div>
                                <div className="frame14736-thq-frame14338-elm8" onClick={handleContinue}>
                                    <span className="frame14736-thq-text-elm200">Publier</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppelOffresModal;
