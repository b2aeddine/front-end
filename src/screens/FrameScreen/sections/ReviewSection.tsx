import React, { useState, useRef } from 'react';
import { useAuthModal } from '../../../lib/authModal';
import './frame14634.css';

const cards = [
    {
        id: 1,
        title: "Vendre des services",
        description: "Proposez vos compétences et services aux marques qui recherchent des créateurs talentueux pour leurs projets.",
        className: "frame14634-thq-review-card-elm1",
        buttonClassName: "frame14634-thq-frame14600-elm1",
    },
    {
        id: 2,
        title: "Trouver des créateurs",
        description: "Découvrez des créateurs de contenu qualifiés pour vos campagnes marketing et collaborez avec les meilleurs.",
        className: "frame14634-thq-review-card-elm2",
        buttonClassName: "frame14634-thq-frame14600-elm2",
    },
    {
        id: 3,
        title: "Monétiser son contenu",
        description: "Transformez votre audience en revenus. Connectez-vous avec des marques qui correspondent à vos valeurs.",
        className: "frame14634-thq-review-card-elm3",
        buttonClassName: "frame14634-thq-frame14601-elm",
    },
    {
        id: 4,
        title: "Lancer des campagnes",
        description: "Créez des campagnes d'influence impactantes et atteignez votre audience cible grâce à nos créateurs.",
        className: "frame14634-thq-review-card-elm4",
        buttonClassName: "frame14634-thq-frame14600-elm3",
    },
];

export const ReviewSection = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardsRef = useRef<HTMLDivElement>(null);
    const { openAuthModal } = useAuthModal();

    const handlePrev = () => {
        if (cardsRef.current) {
            const newPosition = Math.max(scrollPosition - 400, 0);
            cardsRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    const handleNext = () => {
        if (cardsRef.current) {
            const maxScroll = cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
            const newPosition = Math.min(scrollPosition + 400, maxScroll);
            cardsRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    const handleSignup = () => {
        openAuthModal('signup');
    };

    return (
        <div className="frame14634-thq-review-section-elm">
            <div className="frame14634-thq-title-elm2">
                <div className="frame14634-thq-frame31-elm1">
                    <span className="frame14634-thq-text-elm170">
                        Rejoignez
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                    <div className="frame14634-thq-frame30-elm1"></div>
                    <span className="frame14634-thq-text-elm171">
                        les 3000 createurs
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </div>
                <div className="frame14634-thq-frame32-elm">
                    <img
                        src="/vector5527-3r4j.svg"
                        alt="Vector5527"
                        className="frame14634-thq-vector-elm17"
                    />
                    <span className="frame14634-thq-text-elm172">qui</span>
                    <div className="frame14634-thq-frame30-elm2"></div>
                    <span className="frame14634-thq-text-elm173">
                        utilise notre plateforme
                    </span>
                    <div className="frame14634-thq-frame31-elm2"></div>
                </div>
            </div>
            <div className="frame14634-thq-frame14606-elm">
                <span className="frame14634-thq-text-elm174">
                    Commence dés maintenant !!!
                </span>
                <img
                    src="/vector5530-45a.svg"
                    alt="Vector5530"
                    className="frame14634-thq-vector-elm18"
                />
            </div>
            <div className="frame14634-thq-subtitle-icon-buttons-elm">
                <span className="frame14634-thq-text-elm175">
                    Que voulez-vous faire sur collabmarket :
                </span>
                <div className="frame14634-thq-icon-buttons-elm">
                    <button
                        className="frame14634-thq-icon-button-elm1"
                        onClick={handlePrev}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src="/arrownarrowleft5528-dt7d.svg"
                            alt="arrownarrowleft5528"
                            className="frame14634-thq-arrownarrowleft-elm"
                        />
                    </button>
                    <button
                        className="frame14634-thq-icon-button-elm2"
                        onClick={handleNext}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src="/arrownarrowright5528-jv7n.svg"
                            alt="arrownarrowright5528"
                            className="frame14634-thq-arrownarrowright-elm"
                        />
                    </button>
                </div>
            </div>
            <div className="frame14634-thq-cards-elm1">
                <div
                    className="frame14634-thq-cards-elm2"
                    ref={cardsRef}
                    style={{
                        scrollBehavior: 'smooth',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {cards.map((card) => (
                        <div key={card.id} className={card.className}>
                            <span className="frame14634-thq-text-elm176">
                                {card.title}
                            </span>
                            <span className="frame14634-thq-text-elm177">
                                {card.description}
                            </span>
                            <button
                                className={card.buttonClassName}
                                onClick={handleSignup}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="frame14634-thq-text-elm178">
                                    S'inscrire
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
