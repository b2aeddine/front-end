import React from 'react';
import { Search } from 'lucide-react';

export const HeroContentSection = () => {
    return (
        <section className="relative w-full max-w-[1512px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 sm:py-16 md:py-20 lg:py-28 bg-[#f8f5f0] overflow-hidden">
            {/* Background decorative elements - hidden on mobile for cleaner look */}
            <img
                src="/vector5539-po0k.svg"
                alt=""
                aria-hidden="true"
                className="hidden lg:block absolute bottom-0 -left-24 w-64 xl:w-[427px] h-auto opacity-60"
            />

            {/* Decorative curved lines - hidden on mobile */}
            <div className="hidden md:block absolute top-20 left-10 lg:left-20">
                <img
                    src="/vector5537-8tno.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-32 lg:w-48 xl:w-64 h-auto"
                />
            </div>

            {/* Main hand image - Left side, hidden on mobile */}
            <img
                src="/hands25537-ss1n-500w.png"
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute top-10 lg:top-0 left-0 lg:-left-10 w-40 lg:w-64 xl:w-80 h-auto z-10"
            />

            {/* Secondary hand image - hidden on smaller screens */}
            <img
                src="/hands25537-kgh-300h.png"
                alt=""
                aria-hidden="true"
                className="hidden xl:block absolute top-40 left-32 w-48 h-auto"
            />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
                {/* Decorative line above title */}
                <img
                    src="/line5537-cjym.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-16 sm:w-20 md:w-24 h-auto mb-4 sm:mb-6"
                />

                {/* Main Headline - Responsive typography */}
                <h1 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight mb-4 sm:mb-6 px-2">
                    VENDEZ VOS SERVICES SANS PROSPECTER GRACE A L'AFFILIATION
                </h1>

                {/* Subtitle - Responsive text */}
                <p className="[font-family:'Inter',Helvetica] text-[#606060] text-sm sm:text-base md:text-lg max-w-xl lg:max-w-2xl mb-6 sm:mb-8 px-4 leading-relaxed">
                    Notre équipe combine stratégie, design et technologie pour donner vie à votre marque.
                    Collaborez avec nous pour laisser une impression durable sur votre audience.
                </p>

                {/* Search Input - Responsive */}
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
                    <div className="flex items-center bg-white rounded-full border border-[#e5e5e5] shadow-lg overflow-hidden h-12 sm:h-14 md:h-16">
                        <input
                            type="text"
                            placeholder="Que cherchez-vous ? Par exemple : story"
                            className="flex-1 px-4 sm:px-6 text-sm sm:text-base text-[#606060] placeholder:text-[#9ca3af] outline-none bg-transparent [font-family:'Inter',Helvetica]"
                        />
                        <button className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#fea38e] hover:bg-[#fe8e76] rounded-full m-1 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px]">
                            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right side decorative elements */}
            {/* Social media icons - positioned decoratively, hidden on mobile */}
            <img
                src="/fb1125538-yarm-200h.png"
                alt=""
                aria-hidden="true"
                className="hidden lg:block absolute top-20 right-20 xl:right-32 w-12 xl:w-16 h-auto animate-float"
            />

            <img
                src="/removebg15538-d6le-200w.png"
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute top-32 lg:top-40 right-4 sm:right-10 lg:right-16 w-16 lg:w-24 xl:w-32 h-auto"
            />

            {/* Bottom right decorative curved line */}
            <div className="hidden lg:block absolute bottom-20 right-10 xl:right-20">
                <img
                    src="/vector5539-cjhx.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-32 xl:w-48 h-auto"
                />
            </div>

            <img
                src="/removebg15539-xu1c-200w.png"
                alt=""
                aria-hidden="true"
                className="hidden xl:block absolute bottom-10 right-40 w-24 h-auto"
            />

            {/* Additional floating social icons */}
            <img
                src="/fb1115539-cciw-200h.png"
                alt=""
                aria-hidden="true"
                className="hidden lg:block absolute bottom-32 left-20 w-10 xl:w-14 h-auto animate-float [animation-delay:0.5s]"
            />

            <img
                src="/ytb1125539-t03n-200h.png"
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute top-1/2 right-8 lg:right-20 w-10 lg:w-12 xl:w-14 h-auto animate-float [animation-delay:1s]"
            />

            <img
                src="/inst1125539-x5l4-200h.png"
                alt=""
                aria-hidden="true"
                className="hidden lg:block absolute top-60 left-1/4 w-10 xl:w-12 h-auto animate-float [animation-delay:1.5s]"
            />
        </section>
    );
};
