/**
 * Registration Modal - Multi-step signup wizard
 * Converted from frame14733.js
 */
import React, { useState } from 'react';
import './RegistrationModal.css';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (data: RegistrationData) => void;
}

interface RegistrationData {
    role: 'freelance' | 'influencer' | 'affiliate' | 'merchant' | null;
    email: string;
    password: string;
    phone?: string;
    displayName: string;
    username: string;
    bio: string;
    country: string;
    languages: string[];
}

type Step = 'role' | 'account' | 'profile' | 'role_details';

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState<Step>('role');
    const [selectedRole, setSelectedRole] = useState<RegistrationData['role']>(null);
    const [formData, setFormData] = useState<Partial<RegistrationData>>({});

    if (!isOpen) return null;

    const handleRoleSelect = (role: RegistrationData['role']) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        switch (step) {
            case 'role':
                if (selectedRole) setStep('account');
                break;
            case 'account':
                setStep('profile');
                break;
            case 'profile':
                setStep('role_details');
                break;
            case 'role_details':
                onComplete?.({ ...formData, role: selectedRole } as RegistrationData);
                onClose();
                break;
        }
    };

    const handleBack = () => {
        switch (step) {
            case 'account':
                setStep('role');
                break;
            case 'profile':
                setStep('account');
                break;
            case 'role_details':
                setStep('profile');
                break;
        }
    };

    return (
        <div className="frame14733-container1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="frame14733-thq-frame14733-elm">
                {/* Step 1: Role Selection */}
                {step === 'role' && (
                    <div className="frame14733-thq-inscription-elm1">
                        <img
                            src="/mainbg1064-wtcn-1500w.png"
                            alt="MainBg"
                            className="frame14733-thq-main-bg-elm1"
                        />
                        <div className="frame14733-thq-shape-elm1">
                            <img src="/oval1064-selz.svg" alt="" className="frame14733-thq-oval-elm1" />
                            <img src="/ovalcopy1064-6d4s.svg" alt="" className="frame14733-thq-oval-copy-elm1" />
                            <img src="/ovalcopy31064-5jae.svg" alt="" className="frame14733-thq-oval-copy3-elm1" />
                            <img src="/ovalcopy21064-a00a.svg" alt="" className="frame14733-thq-oval-copy2-elm1" />
                        </div>
                        <div className="frame14733-thq-frame14089-elm">
                            <div className="frame14733-thq-frame14080-elm1">
                                <div className="frame14733-thq-frame14078-elm1">
                                    <span className="frame14733-thq-text-elm100">Créer ton compte</span>
                                    <img
                                        src="/frame140771316-2bpj.svg"
                                        alt=""
                                        className="frame14733-thq-frame14077-elm1"
                                    />
                                    <span className="frame14733-thq-text-elm101">Tu viens pour quoi ?</span>
                                </div>
                                <span className="frame14733-thq-text-elm102">
                                    Choisis ce qui te ressemble le plus (tu peux cumuler ensuite).
                                </span>
                                <div className="frame14733-thq-frame14076-elm">
                                    <div
                                        className={`frame14733-thq-frame14069-elm ${selectedRole === 'freelance' ? 'selected' : ''}`}
                                        onClick={() => handleRoleSelect('freelance')}
                                    >
                                        <div className="frame14733-thq-frame14068-elm">
                                            <span className="frame14733-thq-text-elm103">Vendre mes services</span>
                                            <span className="frame14733-thq-text-elm104">
                                                Ex : montage, design, dev, SEO, rédaction…
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`frame14733-thq-frame14071-elm ${selectedRole === 'influencer' ? 'selected' : ''}`}
                                        onClick={() => handleRoleSelect('influencer')}
                                    >
                                        <div className="frame14733-thq-frame14070-elm">
                                            <span className="frame14733-thq-text-elm105">Monétiser mon contenu</span>
                                            <span className="frame14733-thq-text-elm106">
                                                Ex : TikTok, Insta, YouTube, Twitch, Blog…
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`frame14733-thq-frame14073-elm ${selectedRole === 'affiliate' ? 'selected' : ''}`}
                                        onClick={() => handleRoleSelect('affiliate')}
                                    >
                                        <div className="frame14733-thq-frame14072-elm">
                                            <span className="frame14733-thq-text-elm107">
                                                Recommander des services en indépendant
                                            </span>
                                            <span className="frame14733-thq-text-elm108">
                                                Ex : liens, codes, tracking, contenus sponsorisés…
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`frame14733-thq-frame14075-elm ${selectedRole === 'merchant' ? 'selected' : ''}`}
                                        onClick={() => handleRoleSelect('merchant')}
                                    >
                                        <div className="frame14733-thq-frame14074-elm">
                                            <span className="frame14733-thq-text-elm109">Développer ma marque</span>
                                            <span className="frame14733-thq-text-elm110">
                                                Ex : entreprise, agence, studio, boutique digitale…
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="frame14733-thq-frame14082-elm1">
                                    <div className="frame14733-thq-frame14081-elm" onClick={onClose}>
                                        <span className="frame14733-thq-text-elm111">J'ai déjà un compte</span>
                                    </div>
                                    <div
                                        className="frame14733-thq-frame14082-elm2"
                                        onClick={handleContinue}
                                        style={{ opacity: selectedRole ? 1 : 0.5, cursor: selectedRole ? 'pointer' : 'not-allowed' }}
                                    >
                                        <span className="frame14733-thq-text-elm112">Continuer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Account Info */}
                {step === 'account' && (
                    <div className="frame14733-thq-inscription-elm2">
                        <img
                            src="/mainbg1316-59gd-1500w.png"
                            alt="MainBg"
                            className="frame14733-thq-main-bg-elm2"
                        />
                        <div className="frame14733-thq-shape-elm2">
                            <img src="/oval1316-mn5k.svg" alt="" className="frame14733-thq-oval-elm2" />
                            <img src="/ovalcopy1316-wrj.svg" alt="" className="frame14733-thq-oval-copy-elm2" />
                            <img src="/ovalcopy31316-vcxs.svg" alt="" className="frame14733-thq-oval-copy3-elm2" />
                            <img src="/ovalcopy21316-3h3.svg" alt="" className="frame14733-thq-oval-copy2-elm2" />
                        </div>
                        <div className="frame14733-thq-frame14090-elm1">
                            <div className="frame14733-thq-frame14080-elm2">
                                <div className="frame14733-thq-frame14078-elm2">
                                    <span className="frame14733-thq-text-elm113">Créer ton compte</span>
                                    <div className="frame14733-thq-frame14083-elm">
                                        <img
                                            src="/frame140771317-7ufa.svg"
                                            alt=""
                                            className="frame14733-thq-frame14077-elm2"
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm114">Infos de compte</span>
                                </div>
                                <div className="frame14733-thq-frame14088-elm">
                                    <span className="frame14733-thq-text-elm115">Adresse e-mail</span>
                                    <div className="frame14733-thq-frame14084-elm">
                                        <input
                                            type="email"
                                            placeholder="ex: toi@mail.com"
                                            className="frame14733-thq-text-elm116"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                            value={formData.email || ''}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm117">Mot de passe</span>
                                    <div className="frame14733-thq-frame14085-elm">
                                        <input
                                            type="password"
                                            placeholder="12+ caractères, 1 chiffre, 1 symbole"
                                            className="frame14733-thq-text-elm118"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                            value={formData.password || ''}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                    <div className="frame14733-thq-frame14086-elm">
                                        <input
                                            type="password"
                                            placeholder="Confirmer le mot de passe"
                                            className="frame14733-thq-text-elm119"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm120">Téléphone (recommandé)</span>
                                    <div className="frame14733-thq-frame14087-elm">
                                        <input
                                            type="tel"
                                            placeholder="+33 6 12 34 56 78"
                                            className="frame14733-thq-text-elm121"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                            value={formData.phone || ''}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm122">
                                        Utilisé pour la sécurité, la récupération et les notifications importantes.
                                    </span>
                                </div>
                                <div className="frame14733-thq-frame14082-elm3">
                                    <div className="frame14733-thq-frame14147-elm1" onClick={handleBack}>
                                        <span className="frame14733-thq-text-elm123">Retour</span>
                                    </div>
                                    <div className="frame14733-thq-frame14147-elm2" onClick={handleContinue}>
                                        <span className="frame14733-thq-text-elm124">Continuer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Profile Setup */}
                {step === 'profile' && (
                    <div className="frame14733-thq-inscription-elm3">
                        <img
                            src="/mainbg1317-lbak-1500w.png"
                            alt="MainBg"
                            className="frame14733-thq-main-bg-elm3"
                        />
                        <div className="frame14733-thq-shape-elm3">
                            <img src="/oval1317-sd6.svg" alt="" className="frame14733-thq-oval-elm3" />
                            <img src="/ovalcopy1317-kpka.svg" alt="" className="frame14733-thq-oval-copy-elm3" />
                            <img src="/ovalcopy31317-l0o8.svg" alt="" className="frame14733-thq-oval-copy3-elm3" />
                            <img src="/ovalcopy21317-uzeq.svg" alt="" className="frame14733-thq-oval-copy2-elm3" />
                        </div>
                        <div className="frame14733-thq-frame14090-elm2">
                            <div className="frame14733-thq-frame14080-elm3">
                                <div className="frame14733-thq-frame14078-elm3">
                                    <span className="frame14733-thq-text-elm125">Créer ton compte</span>
                                    <img
                                        src="/frame140771317-wjsr.svg"
                                        alt=""
                                        className="frame14733-thq-frame14077-elm3"
                                    />
                                    <span className="frame14733-thq-text-elm126">Configurer votre profil</span>
                                </div>
                                <div className="frame14733-thq-frame14104-elm">
                                    <span className="frame14733-thq-text-elm127">Photo / logo</span>
                                    <div className="frame14733-thq-frame14093-elm1">
                                        <div className="frame14733-thq-background-elm">
                                            <div className="frame14733-thq-label-elm">
                                                <img
                                                    src="/gradienti134-2fb-200h.png"
                                                    alt=""
                                                    className="frame14733-thq-gradient-elm1"
                                                />
                                                <img
                                                    src="/gradienti134-fmkh-200h.png"
                                                    alt=""
                                                    className="frame14733-thq-gradient-elm2"
                                                />
                                                <div className="frame14733-thq-joschamayer-elm"></div>
                                                <div className="frame14733-thq-container-elm"></div>
                                            </div>
                                        </div>
                                        <div className="frame14733-thq-frame14092-elm1">
                                            <span className="frame14733-thq-text-elm128">Ajoute une image</span>
                                            <span className="frame14733-thq-text-elm129">PNG/JPG/SVG — 2 Mo max</span>
                                            <div className="frame14733-thq-frame14092-elm2">
                                                <span className="frame14733-thq-text-elm130">Importer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="frame14733-thq-text-elm131">Prénom affiché</span>
                                    <div className="frame14733-thq-frame14094-elm">
                                        <input
                                            type="text"
                                            placeholder="ex: Studio Nova / Sarah D."
                                            className="frame14733-thq-text-elm132"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                            value={formData.displayName || ''}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm133">Nom d'utilisateur</span>
                                    <div className="frame14733-thq-frame14095-elm">
                                        <input
                                            type="text"
                                            placeholder="@tonpseudo"
                                            className="frame14733-thq-text-elm134"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                            value={formData.username || ''}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm135">Pays / ville / langues</span>
                                    <div className="frame14733-thq-frame14102-elm">
                                        <div className="frame14733-thq-frame14096-elm">
                                            <span className="frame14733-thq-text-elm136">France</span>
                                        </div>
                                        <div className="frame14733-thq-frame14097-elm">
                                            <span className="frame14733-thq-text-elm137">Français</span>
                                        </div>
                                        <div className="frame14733-thq-frame14098-elm1">
                                            <span className="frame14733-thq-text-elm138">+ Ajouter</span>
                                        </div>
                                    </div>
                                    <span className="frame14733-thq-text-elm139">Bio courte</span>
                                    <div className="frame14733-thq-frame14098-elm2">
                                        <textarea
                                            placeholder="1–2 phrases : ce que tu fais + pour qui + résultat."
                                            className="frame14733-thq-text-elm140"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', resize: 'none', minHeight: '60px' }}
                                            value={formData.bio || ''}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="frame14733-thq-frame14082-elm4">
                                    <div className="frame14733-thq-frame14147-elm3" onClick={handleBack}>
                                        <span className="frame14733-thq-text-elm146">Retour</span>
                                    </div>
                                    <div className="frame14733-thq-frame14148-elm1" onClick={handleContinue}>
                                        <span className="frame14733-thq-text-elm147">Continuer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Role-specific details */}
                {step === 'role_details' && (
                    <div className="frame14733-thq-inscription-elm4">
                        <img
                            src="/mainbg1317-u437-1500w.png"
                            alt="MainBg"
                            className="frame14733-thq-main-bg-elm4"
                        />
                        <div className="frame14733-thq-shape-elm4">
                            <img src="/oval1317-tcja.svg" alt="" className="frame14733-thq-oval-elm4" />
                            <img src="/ovalcopy1317-2ybj.svg" alt="" className="frame14733-thq-oval-copy-elm4" />
                            <img src="/ovalcopy31317-e52.svg" alt="" className="frame14733-thq-oval-copy3-elm4" />
                            <img src="/ovalcopy21317-0phl.svg" alt="" className="frame14733-thq-oval-copy2-elm4" />
                        </div>
                        <div className="frame14733-thq-frame14090-elm3">
                            <div className="frame14733-thq-frame14080-elm4">
                                <div className="frame14733-thq-frame14078-elm4">
                                    <span className="frame14733-thq-text-elm148">Créer ton compte</span>
                                    <img
                                        src="/frame140771317-c68r.svg"
                                        alt=""
                                        className="frame14733-thq-frame14077-elm4"
                                    />
                                    <span className="frame14733-thq-text-elm149">
                                        {selectedRole === 'freelance' && 'Détails Freelance'}
                                        {selectedRole === 'influencer' && 'Détails Créateur'}
                                        {selectedRole === 'affiliate' && 'Détails Affilié'}
                                        {selectedRole === 'merchant' && 'Détails Marque'}
                                    </span>
                                </div>
                                <div className="frame14733-thq-frame14121-elm">
                                    <span className="frame14733-thq-text-elm150">Spécialité principale</span>
                                    <div className="frame14733-thq-frame14105-elm">
                                        <input
                                            type="text"
                                            placeholder="ex: Montage vidéo / UX Design / Dev Web…"
                                            className="frame14733-thq-text-elm151"
                                            style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none' }}
                                        />
                                    </div>
                                    <span className="frame14733-thq-text-elm152">Niveau &amp; expérience</span>
                                    <div className="frame14733-thq-frame14117-elm">
                                        <div className="frame14733-thq-frame14106-elm">
                                            <span className="frame14733-thq-text-elm153">Niveau</span>
                                        </div>
                                        <div className="frame14733-thq-frame14107-elm">
                                            <span className="frame14733-thq-text-elm154">Années</span>
                                        </div>
                                    </div>
                                    <span className="frame14733-thq-text-elm155">Tarification</span>
                                    <div className="frame14733-thq-frame14116-elm">
                                        <div className="frame14733-thq-frame14108-elm">
                                            <span className="frame14733-thq-text-elm156">À partir de (€)</span>
                                        </div>
                                        <div className="frame14733-thq-frame14109-elm">
                                            <span className="frame14733-thq-text-elm157">Délai min (jours)</span>
                                        </div>
                                    </div>
                                    <span className="frame14733-thq-text-elm158">
                                        Ça sert à pré-remplir tes offres et à filtrer les demandes.
                                    </span>
                                </div>
                                <div className="frame14733-thq-frame14082-elm5">
                                    <div className="frame14733-thq-frame14147-elm4" onClick={handleBack}>
                                        <span className="frame14733-thq-text-elm168">Retour</span>
                                    </div>
                                    <div className="frame14733-thq-frame14149-elm1" onClick={handleContinue}>
                                        <span className="frame14733-thq-text-elm169">Terminer</span>
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

export default RegistrationModal;
