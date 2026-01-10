import React from 'react';

export const HowWeWorkSection1 = () => {
    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16 md:py-20 overflow-hidden">
            {/* Section Title - Responsive */}
            <h2 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 md:mb-16 px-4 leading-tight">
                Vendez vos services sans prospecter grace a l'affiliation
            </h2>

            {/* Illustration Container - Responsive */}
            <div className="relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
                {/* Background vectors - hidden on mobile */}
                <img
                    src="/vector25535-q15m.svg"
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block absolute -left-10 lg:left-0 top-1/4 w-20 lg:w-32 h-auto opacity-60"
                />
                <img
                    src="/vector35535-t2h.svg"
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block absolute right-0 bottom-0 w-32 lg:w-48 h-auto opacity-60"
                />

                {/* Central illustration group */}
                <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] mx-auto">
                    {/* Background rectangle */}
                    <img
                        src="/rectangle335535-od6c-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-auto rounded-2xl shadow-xl"
                    />

                    {/* Woman illustration overlay */}
                    <img
                        src="/woman15535-b98t-600h.png"
                        alt="Créatrice de contenu"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-[65%] h-auto z-10"
                    />

                    {/* Secondary rectangle - hidden on mobile */}
                    <img
                        src="/rectangle325535-e0a3-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden sm:block absolute -bottom-4 -right-4 md:-right-8 w-24 md:w-32 h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Floating Social Media Icons - Responsive grid on mobile, absolute on desktop */}
                <div className="flex flex-wrap justify-center gap-3 mt-6 md:mt-0 md:absolute md:inset-0 md:pointer-events-none">
                    {/* Facebook */}
                    <img
                        src="/fb1125535-sjfg-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:top-10 md:right-[15%] lg:right-[20%]"
                    />
                    <img
                        src="/fb1135536-tes3-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:bottom-20 md:left-[10%]"
                    />

                    {/* Instagram */}
                    <img
                        src="/inst1115536-9ygg-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:top-20 md:left-[20%]"
                    />
                    <img
                        src="/inst1145536-jrot-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:bottom-10 md:right-[25%]"
                    />
                    <img
                        src="/inst1125536-8diw-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:top-1/3 md:right-[5%] lg:right-[10%]"
                    />
                    <img
                        src="/inst1135536-za1-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:bottom-1/3 md:left-[5%]"
                    />

                    {/* YouTube */}
                    <img
                        src="/ytb1145536-5zse-200w.png"
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain md:absolute md:top-1/2 md:left-[2%]"
                    />
                    <img
                        src="/ytb1115536-kpbu-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden md:block w-12 h-12 object-contain absolute top-5 right-[8%]"
                    />
                    <img
                        src="/ytb1135536-xug8-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden md:block w-12 h-12 object-contain absolute bottom-10 left-[30%]"
                    />
                    <img
                        src="/ytb1125536-cse-200h.png"
                        alt=""
                        aria-hidden="true"
                        className="hidden lg:block w-12 h-12 object-contain absolute top-1/4 right-[30%]"
                    />
                </div>
            </div>
        </section>
    );
};
