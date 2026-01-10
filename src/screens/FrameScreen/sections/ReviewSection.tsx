import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../../lib/authModal';

interface Card {
    id: number;
    title: string;
    description: string;
    color: 'orange' | 'pink';
    role: string;
}

const cards: Card[] = [
    {
        id: 1,
        title: "Vendre des services",
        description: "Proposez vos compétences et services aux marques qui recherchent des créateurs talentueux. Développez votre activité et gagnez en visibilité.",
        color: 'orange',
        role: 'freelance',
    },
    {
        id: 2,
        title: "Trouver des créateurs",
        description: "Découvrez des créateurs de contenu qualifiés pour vos campagnes marketing. Collaborez avec les meilleurs talents du marché.",
        color: 'pink',
        role: 'brand',
    },
    {
        id: 3,
        title: "Monétiser son contenu",
        description: "Transformez votre audience en revenus. Connectez-vous avec des marques qui correspondent à vos valeurs et votre communauté.",
        color: 'orange',
        role: 'influencer',
    },
    {
        id: 4,
        title: "Lancer des campagnes",
        description: "Créez des campagnes d'influence impactantes. Atteignez votre audience cible grâce à nos créateurs partenaires.",
        color: 'pink',
        role: 'brand',
    },
];

export const ReviewSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { openAuthModal } = useAuthModal();

    const cardWidth = 380;
    const gap = 24;
    const visibleCards = 3;

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleSignup = (role: string) => {
        openAuthModal('signup');
    };

    // Auto-scroll every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    // Get visible cards with infinite loop effect
    const getVisibleCards = () => {
        const result = [];
        for (let i = 0; i < visibleCards + 1; i++) {
            const index = (currentIndex + i) % cards.length;
            result.push({ ...cards[index], position: i });
        }
        return result;
    };

    return (
        <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#f8f5f0] overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                        <span className="text-[#202224] text-2xl md:text-4xl font-bold [font-family:'DM_Sans',Helvetica]">
                            Rejoignez
                        </span>
                        <span className="text-[#fea38e] text-2xl md:text-4xl font-bold [font-family:'DM_Sans',Helvetica]">
                            les 3000 créateurs
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <img
                            src="/vector5527-3r4j.svg"
                            alt=""
                            className="w-8 h-8 hidden md:block"
                        />
                        <span className="text-[#202224] text-2xl md:text-4xl font-bold [font-family:'DM_Sans',Helvetica]">
                            qui
                        </span>
                        <span className="text-[#fea38e] text-2xl md:text-4xl font-bold [font-family:'DM_Sans',Helvetica]">
                            utilisent notre plateforme
                        </span>
                    </div>
                </div>

                {/* Subtitle */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#202224] [font-family:'DM_Sans',Helvetica] mb-2">
                        Commence dés maintenant !!!
                    </h2>
                    <svg className="mx-auto w-64 h-4" viewBox="0 0 256 16">
                        <path
                            d="M0 8 Q64 0 128 8 Q192 16 256 8"
                            stroke="#fea38e"
                            strokeWidth="4"
                            fill="none"
                        />
                    </svg>
                </div>

                {/* Carousel Header */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <p className="text-[#202224] text-lg md:text-xl font-semibold [font-family:'DM_Sans',Helvetica]">
                        Que voulez-vous faire sur CollaB Market :
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border-2 border-[#fea38e] flex items-center justify-center hover:bg-[#fea38e] group transition-all duration-200"
                            aria-label="Précédent"
                        >
                            <ChevronLeft className="w-6 h-6 text-[#fea38e] group-hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-[#fea38e] flex items-center justify-center hover:bg-[#fe8e76] transition-all duration-200"
                            aria-label="Suivant"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex gap-6 transition-transform duration-300 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
                        }}
                    >
                        {[...cards, ...cards].map((card, index) => (
                            <div
                                key={`${card.id}-${index}`}
                                className={`flex-shrink-0 w-[340px] md:w-[380px] rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-300 ${
                                    card.color === 'orange'
                                        ? 'bg-gradient-to-br from-[#fea38e] to-[#fea38e]/80'
                                        : 'bg-gradient-to-br from-[#e879f9] to-[#d946ef]'
                                }`}
                            >
                                <h3 className="text-white text-xl md:text-2xl font-bold [font-family:'DM_Sans',Helvetica] mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-white/90 text-sm md:text-base [font-family:'Nunito_Sans',Helvetica] leading-relaxed mb-6 flex-1">
                                    {card.description}
                                </p>
                                <button
                                    onClick={() => handleSignup(card.role)}
                                    className="self-start px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105 [font-family:'Nunito_Sans',Helvetica]"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                currentIndex === index
                                    ? 'bg-[#fea38e] w-8'
                                    : 'bg-[#fea38e]/30 hover:bg-[#fea38e]/50'
                            }`}
                            aria-label={`Aller à la carte ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
