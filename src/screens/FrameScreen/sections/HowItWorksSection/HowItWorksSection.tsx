import React from "react";

const steps = [
  {
    number: "1#",
    title: "Vous recherchez des talents",
    description:
      "Our agency's research-driven approach involves gathering insights into our clients' industries, competitors, and target audiences to develop tailored strategies that deliver exceptional results. This deep understanding allows us to create innovative and effective campaigns that resonate with our clients' audiences.",
    image: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/illustration-1.svg",
    imagePosition: "right",
  },
  {
    number: "2#",
    title: "Monetiser votre audience:",
    description:
      "Based on the brief and research, the agency's creative team generates ideas for the campaign. These concepts are presented to the client for feedback and refinement.",
    image: "https://c.animaapp.com/mjqxqi8lTyFq6W/img/illustration.svg",
    imagePosition: "left",
  },
  {
    number: "3#",
    title: "Vendre des services? :",
    description:
      "Once the concept is approved, the agency's designers and developers  bring it to life. This includes creating visual assets, writing copy, and developing multimedia content.",
    imagePosition: "right",
    isSpecial: true,
  },
];

export const HowItWorksSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-16 px-4 md:px-16 lg:px-[245px] py-16 w-full">
      {steps.map((step, index) => (
        <article
          key={index}
          className={`flex flex-col ${
            step.imagePosition === "left"
              ? "lg:flex-row-reverse"
              : "lg:flex-row"
          } items-center gap-8 w-full max-w-[1000px] opacity-0 translate-y-[-1rem] animate-fade-in`}
          style={
            { "--animation-delay": `${index * 200}ms` } as React.CSSProperties
          }
        >
          <div className="flex flex-col items-start gap-4 flex-1">
            <h3 className="[font-family:'DM_Sans',Helvetica] font-bold text-[#1f392c] text-[32px] lg:text-[40px] tracking-[0] leading-normal">
              {step.number} {step.title}
            </h3>

            <p className="max-w-[396px] [font-family:'DM_Sans',Helvetica] font-normal text-[#1f392c] text-lg lg:text-xl tracking-[0] leading-8">
              {step.description}
            </p>
          </div>

          {step.isSpecial ? (
            <div className="relative w-full max-w-[518px] h-[400px] lg:h-[515px] overflow-hidden flex-shrink-0">
              <img
                className="absolute top-[29px] left-[38px] w-[80%] h-[90%] object-contain"
                alt="Vector"
                src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/vector-7.svg"
              />

              <img
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-full object-cover"
                alt="Image"
                src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/image.png"
              />

              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-[158px] bg-blend-lighten bg-[linear-gradient(180deg,rgba(248,245,240,0)_0%,rgba(248,245,240,1)_100%)]" />

              <img
                className="absolute top-[72px] left-[63px] w-[110px] h-32"
                alt="Group"
                src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/group-2.png"
              />
            </div>
          ) : (
            <img
              className="w-full max-w-[518px] h-auto flex-shrink-0"
              alt="Illustration"
              src={step.image}
            />
          )}
        </article>
      ))}
    </section>
  );
};
