import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";

const experienceData = [
  {
    id: 1,
    logo: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-3890.png",
    title: "Sr. Product Designer",
    company: "ShareTrip Inc.",
    location: "Dhaka, Bangladesh",
    period: "Janvier 2022 - Présent",
    description:
      "ShareTrip est le premier agrégateur de voyages en ligne du pays. Mon objectif était de créer une expérience utilisateur fonctionnelle et agréable à travers les applications web et mobiles.",
  },
  {
    id: 2,
    logo: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-3890.png",
    title: "Product Designer",
    company: "Tech Solutions Ltd.",
    location: "Remote",
    period: "2020 - 2022",
    description:
      "Conception d'interfaces utilisateur pour des applications SaaS B2B, collaboration étroite avec les équipes produit et développement.",
  },
];

const educationData = [
  {
    id: 1,
    logo: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-3890-1.png",
    institution: "California Institute of the Arts",
    degree: "UX Design Fundamentals",
    period: "2020 - 2021",
  },
];

const skillsData = [
  { id: 1, name: "UX Design", level: "Expert" },
  { id: 2, name: "UI Design", level: "Expert" },
  { id: 3, name: "User Research", level: "Expert" },
  { id: 4, name: "Design System", level: "Expert" },
  { id: 5, name: "Figma", level: "Avancé" },
  { id: 6, name: "Prototypage", level: "Expert" },
];

export const ReviewsSection = (): JSX.Element => {
  return (
    <section className="flex items-center gap-2.5 py-0 relative w-full">
      <div className="flex flex-col w-full max-w-[800px] mx-auto items-center gap-8 relative">
        <header className="inline-flex flex-col items-center gap-2 p-2.5 relative">
          <h2 className="relative flex items-center justify-center w-fit [font-family:'Inter',Helvetica] font-bold text-[#222325] text-2xl tracking-[0] leading-8 whitespace-nowrap">
            Mon parcours
          </h2>

          <img
            className="relative w-[121.73px] h-[25.39px]"
            alt="Vector"
            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector.svg"
          />
        </header>

        <div className="flex flex-col items-start gap-6 relative w-full">
          {/* Expériences */}
          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-4 p-5">
              <div className="flex items-center gap-4">
                {/* Icône originale Experience */}
                <img
                  className="w-14 h-14"
                  alt="Color icon experience"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-experience.svg"
                />
                <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-lg">
                  Expériences
                </h3>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                {experienceData.map((experience, index) => (
                  <div key={experience.id} className="w-full">
                    <div className="flex items-start gap-4 py-3">
                      <img
                        className="w-[72px] h-[72px] rounded-lg border-[0.25px] border-solid border-[#1c1c1e14] object-cover flex-shrink-0"
                        alt={experience.company}
                        src={experience.logo}
                      />

                      <div className="flex-1 flex flex-col gap-1">
                        <h4 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base">
                          {experience.title}
                        </h4>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-[#222325] text-sm">
                          {experience.company}
                        </p>
                        <div className="flex items-center gap-2 text-[#74767e] text-xs">
                          <span>{experience.location}</span>
                          <span>•</span>
                          <span>{experience.period}</span>
                        </div>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-sm mt-2 line-clamp-2">
                          {experience.description}
                        </p>
                      </div>
                    </div>

                    {index < experienceData.length - 1 && (
                      <Separator className="bg-[#e4e5e7] mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Éducation */}
          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-4 p-5">
              <div className="flex items-center gap-4">
                {/* Icône originale Education */}
                <img
                  className="w-14 h-14"
                  alt="Color icon education"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-education.svg"
                />
                <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-lg">
                  Éducation & Certifications
                </h3>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                {educationData.map((education) => (
                  <div key={education.id} className="flex items-start gap-4 py-2">
                    <img
                      className="w-[72px] h-[72px] rounded-lg border-[0.25px] border-solid border-[#1c1c1e14] object-cover flex-shrink-0"
                      alt={education.institution}
                      src={education.logo}
                    />

                    <div className="flex-1 flex flex-col gap-1">
                      <h4 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-base">
                        {education.institution}
                      </h4>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-[#74767e] text-sm">
                        {education.degree}
                      </p>
                      <span className="text-[#74767e] text-xs">{education.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-4 p-5">
              <div className="flex items-center gap-4">
                {/* Icône originale Skills */}
                <img
                  className="w-14 h-14"
                  alt="Color icon skills"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-skills.svg"
                />
                <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#222325] text-lg">
                  Compétences
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full">
                {skillsData.map((skill) => (
                  <Badge
                    key={skill.id}
                    className="px-3 py-1.5 bg-[#f8f5f0] hover:bg-[#fea38e]/10 text-[#222325] border border-[#e4e5e7] rounded-full transition-colors cursor-default"
                  >
                    <span className="font-medium text-sm">{skill.name}</span>
                    <span className="ml-2 text-xs text-[#74767e]">{skill.level}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
