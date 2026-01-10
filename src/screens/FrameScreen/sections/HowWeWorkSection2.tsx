import React from 'react';

export const HowWeWorkSection2 = () => {
    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16 md:py-20 overflow-hidden bg-[#f8f5f0]">
            {/* Background decorative vector - hidden on mobile */}
            <img
                src="/vector5534-cro2.svg"
                alt=""
                aria-hidden="true"
                className="hidden lg:block absolute -left-20 top-0 w-48 xl:w-64 h-auto opacity-50"
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Text Content - Left side */}
                <div className="flex-1 flex flex-col gap-4 sm:gap-6 text-center lg:text-left order-2 lg:order-1">
                    {/* Main Title */}
                    <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                        Difficulté à se développer sur n'importe quelle plateforme ?
                        <span className="text-[#fea38e]"> Nous le faisons pour vous.</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="[font-family:'Inter',Helvetica] text-[#606060] text-sm sm:text-base md:text-lg leading-relaxed">
                        Des créateurs et influenceurs promouvois vos services en échange
                        d'un pourcentage à l'achat
                    </p>

                    {/* Additional info */}
                    <p className="[font-family:'Inter',Helvetica] text-[#8e8e93] text-xs sm:text-sm md:text-base leading-relaxed">
                        L'affiliation est à titre optionnel comme pour le pourcentage qui
                        vous est réglable par vous même
                    </p>
                </div>

                {/* Illustration - Right side */}
                <div className="relative flex-1 flex items-center justify-center order-1 lg:order-2 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
                    {/* Main hands illustration */}
                    <img
                        src="/hands35534-dhri-500h.png"
                        alt="Illustration de collaboration"
                        className="relative z-10 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] h-auto"
                    />

                    {/* Secondary hands - hidden on mobile */}
                    <img
                        src="/hands35534-6s9g-400w.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden md:block absolute -bottom-10 -right-5 lg:right-0 w-32 lg:w-48 h-auto opacity-80"
                    />

                    {/* Decorative vector - bottom right */}
                    <img
                        src="/vector5534-h2td.svg"
                        alt=""
                        aria-hidden="true"
                        className="hidden lg:block absolute bottom-0 right-0 w-32 xl:w-40 h-auto opacity-60"
                    />

                    {/* Like icons floating */}
                    <img
                        src="/like1115534-hw2-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute top-5 right-10 sm:right-20 w-8 sm:w-10 md:w-12 h-auto"
                    />
                    <img
                        src="/like1125534-2lem-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-10 left-5 sm:left-10 w-8 sm:w-10 md:w-12 h-auto"
                    />
                </div>
            </div>
        </section>
    );
};
