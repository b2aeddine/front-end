import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

const experienceData = [
  {
    id: 1,
    logo: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-3890.png",
    title: "Sr. Product Designer",
    company: "ShartTrip Inc.",
    location: "Dhaka, Bangladesh",
    period: "January 2022 to Present",
    description:
      "ShareTrip is the country's first and pioneer online travel aggregator (OTA). My goal was to craft a functional and delightful experience through web and mobile apps currently consisting of 1.2M+ & future billion users…",
  },
];

const educationData = [
  {
    id: 1,
    logo: "https://c.animaapp.com/mjs9uq4eaVmanC/img/rectangle-3890-1.png",
    institution: "California Institute of the Arts",
    course1: "UX Design Fundamentals",
    course2: "UX Design",
    grade: "Grade: A+",
    period: "2020 - 2021",
    description:
      "This hands-on course examines how content is organized and structured to create an experience for a user, and what role the designer plays in creating and shaping user experience. You will be led through a condensed…",
  },
];

const skillsData = [
  [
    { id: 1, name: "UX Design", level: "Expert" },
    { id: 2, name: "User Research", level: "Expert" },
  ],
  [
    { id: 3, name: "UI Design", level: "Expert" },
    { id: 4, name: "Design System", level: "Expert" },
  ],
];

const attachmentsData = [
  {
    id: 1,
    name: "Resume-AnamoulRouf.pdf",
    type: "Resume",
    size: "1.21 MB",
  },
  {
    id: 2,
    name: "CaseStudy-01.pdf",
    type: "Portfolio",
    size: "1.21 MB",
  },
];

export const ReviewsSection = (): JSX.Element => {
  return (
    <section className="flex items-center gap-2.5 py-0 relative w-full">
      <div className="flex flex-col w-full max-w-[745px] mx-auto items-center gap-[51px] relative">
        <header className="inline-flex flex-col items-center gap-2.5 p-2.5 relative">
          <h2 className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-[#222325] text-2xl tracking-[0] leading-8 whitespace-nowrap">
            Mon parcours
          </h2>

          <img
            className="relative w-[121.73px] h-[25.39px]"
            alt="Vector"
            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector.svg"
          />
        </header>

        <div className="flex flex-col items-start gap-4 relative w-full">
          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 relative w-full">
                <img
                  className="relative w-14 h-14"
                  alt="Color icon"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-experience.svg"
                />

                <div className="flex-col gap-1 flex-1 grow flex items-start relative">
                  <h3 className="relative self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Experiences
                  </h3>

                  <p className="relative self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Add experience to increase the chance of hiring
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-[#fea38e] bg-transparent hover:bg-[#fea38e]/10"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add Experience
                  </span>
                </Button>
              </div>

              <div className="flex flex-col items-start gap-2 relative w-full">
                {experienceData.map((experience) => (
                  <div key={experience.id} className="w-full">
                    <div className="flex flex-col items-start gap-4 px-0 py-4 rounded-lg w-full">
                      <div className="gap-4 w-full flex items-start relative">
                        <img
                          className="relative w-[72px] h-[72px] rounded-lg border-[0.25px] border-solid border-[#1c1c1e14]"
                          alt="Company logo"
                          src={experience.logo}
                        />

                        <div className="flex-1 grow flex flex-col items-start gap-2 relative">
                          <h4 className="relative self-stretch mt-[-1.00px] font-h5-medium font-[number:var(--h5-medium-font-weight)] text-lighttextprimary text-[length:var(--h5-medium-font-size)] tracking-[var(--h5-medium-letter-spacing)] leading-[var(--h5-medium-line-height)] [font-style:var(--h5-medium-font-style)]">
                            {experience.title}
                          </h4>

                          <div className="flex flex-col items-start relative self-stretch w-full">
                            <p className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextprimary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                              {experience.company}
                            </p>

                            <div className="flex items-start gap-3 relative self-stretch w-full">
                              <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {experience.location}
                              </span>

                              <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {experience.period}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 relative">
                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightactionactive/10"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-lightactionactive text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Delete
                            </span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-[#fea38e]/10"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Edit
                            </span>
                          </Button>
                        </div>
                      </div>

                      <p className="relative self-stretch [font-family:'Outfit',Helvetica] font-normal text-lighttextsecondary text-base leading-4">
                        <span className="text-[#1c1c1eb8] tracking-[0] leading-6">
                          {experience.description}
                        </span>

                        <span className="font-medium text-[#1c1c1eb8] tracking-[0] leading-6">
                          &nbsp;
                        </span>

                        <span className="font-semibold text-[#fea38e] text-sm tracking-[0.04px] leading-5">
                          See More
                        </span>
                      </p>
                    </div>

                    <Separator className="bg-lightothersdivider h-[2px]" />
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-[#fea38e]/10"
              >
                <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Show 2 More Experiences
                </span>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 relative w-full">
                <img
                  className="relative w-14 h-14"
                  alt="Color icon education"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-education.svg"
                />

                <div className="flex-col gap-1 flex-1 grow flex items-start relative">
                  <h3 className="relative self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Education &amp; Certifications
                  </h3>

                  <p className="relative self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Add education to increase the chance of hiring
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-[#fea38e] bg-transparent hover:bg-[#fea38e]/10"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add Education
                  </span>
                </Button>
              </div>

              <div className="inline-flex flex-col items-start gap-2 relative w-full">
                {educationData.map((education) => (
                  <div key={education.id} className="w-full">
                    <div className="flex flex-col items-start justify-center gap-4 px-0 py-4 relative rounded-lg w-full">
                      <div className="gap-4 w-full flex items-start relative">
                        <img
                          className="relative w-[72px] h-[72px] rounded-lg border-[0.25px] border-solid border-[#1c1c1e14]"
                          alt="Institution logo"
                          src={education.logo}
                        />

                        <div className="gap-2 flex-1 grow flex flex-col items-start relative">
                          <h4 className="relative self-stretch mt-[-1.00px] font-h5-medium font-[number:var(--h5-medium-font-weight)] text-lighttextprimary text-[length:var(--h5-medium-font-size)] tracking-[var(--h5-medium-letter-spacing)] leading-[var(--h5-medium-line-height)] [font-style:var(--h5-medium-font-style)]">
                            {education.institution}
                          </h4>

                          <div className="flex flex-col items-start relative self-stretch w-full">
                            <div className="flex items-start gap-3 relative self-stretch w-full">
                              <span className="w-fit font-[number:var(--p-body-s-regular-font-weight)] text-[length:var(--p-body-s-regular-font-size)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap relative mt-[-1.00px] font-p-body-s-regular text-lighttextprimary tracking-[var(--p-body-s-regular-letter-spacing)] [font-style:var(--p-body-s-regular-font-style)]">
                                {education.course1}
                              </span>

                              <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextprimary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {education.course2}
                              </span>
                            </div>

                            <div className="flex items-start gap-3 relative self-stretch w-full">
                              <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {education.grade}
                              </span>

                              <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {education.period}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 relative">
                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightactionactive/10"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-lightactionactive text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Delete
                            </span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-[#fea38e]/10"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Edit
                            </span>
                          </Button>
                        </div>
                      </div>

                      <p className="relative self-stretch [font-family:'Outfit',Helvetica] font-normal text-lighttextsecondary text-base leading-4">
                        <span className="text-[#1c1c1eb8] tracking-[0] leading-6">
                          {education.description}
                        </span>

                        <span className="font-medium text-[#1c1c1eb8] tracking-[0] leading-6">
                          &nbsp;
                        </span>

                        <span className="font-semibold text-[#fea38e] text-sm tracking-[0.04px] leading-5">
                          See More
                        </span>
                      </p>
                    </div>

                    <Separator className="bg-lightothersdivider h-[2px]" />
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lighttextsecondary/10"
              >
                <img
                  className="relative w-6 h-6"
                  alt="Icon arrow left"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-arrow-left.svg"
                />

                <span className="relative w-fit mt-[-1.00px] font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-lighttextsecondary text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] whitespace-nowrap [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Button
                </span>

                <img
                  className="relative w-6 h-6"
                  alt="Icon arrow right"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-arrow-right.svg"
                />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 relative w-full">
                <img
                  className="relative w-14 h-14"
                  alt="Color icon skills"
                  src="https://c.animaapp.com/mjs9uq4eaVmanC/img/color-icon-skills.svg"
                />

                <div className="flex-col gap-1 flex-1 grow flex items-start relative">
                  <h3 className="relative self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Skills
                  </h3>

                  <p className="relative self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Add skills to increase the chance of hiring
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-[#fea38e] bg-transparent hover:bg-[#fea38e]/10"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add Skills
                  </span>
                </Button>
              </div>

              <div className="gap-2 w-full flex items-start relative">
                {skillsData.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="flex flex-col items-start gap-2 relative flex-1 grow"
                  >
                    {column.map((skill) => (
                      <div
                        key={skill.id}
                        className="gap-4 p-4 w-full rounded-lg border border-solid border-[#f2f2f7] flex items-start relative"
                      >
                        <div className="flex-col gap-1 flex-1 grow flex items-start relative">
                          <h4 className="self-stretch font-[number:var(--h5-medium-font-weight)] text-[length:var(--h5-medium-font-size)] leading-[var(--h5-medium-line-height)] relative mt-[-1.00px] font-h5-medium text-lighttextprimary tracking-[var(--h5-medium-letter-spacing)] [font-style:var(--h5-medium-font-style)]">
                            {skill.name}
                          </h4>

                          <p className="relative self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                            {skill.level}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-0.5 relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-auto w-auto p-1"
                          >
                            <img
                              className="relative w-6 h-6"
                              alt="Icon trush square"
                              src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-trush-square.svg"
                            />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-auto w-auto p-1"
                          >
                            <img
                              className="relative w-6 h-6"
                              alt="Icon edit"
                              src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-edit.svg"
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-[#fea38e]/10"
              >
                <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Show 8 More Education
                </span>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#f8f5f0] border-0 w-full">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-4 relative w-full">
                <div className="flex-col gap-1 flex-1 grow flex items-start relative">
                  <h3 className="relative self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Attachments
                  </h3>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-[#fea38e] bg-transparent hover:bg-[#fea38e]/10"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add File
                  </span>
                </Button>
              </div>

              <div className="flex flex-col items-start gap-2 relative w-full">
                {attachmentsData.map((attachment, index) => (
                  <div key={attachment.id} className="w-full">
                    <div className="flex items-start gap-4 p-4 relative w-full rounded-lg">
                      <div className="p-2 bg-secondary-5-workdlight rounded-lg inline-flex items-start relative">
                        <img
                          className="relative w-8 h-8"
                          alt="Icon document text"
                          src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-document-text.svg"
                        />
                      </div>

                      <div className="flex flex-col items-start gap-0.5 relative flex-1 grow">
                        <h4 className="relative self-stretch mt-[-1.00px] font-p-body-m-medium font-[number:var(--p-body-m-medium-font-weight)] text-lighttextprimary text-[length:var(--p-body-m-medium-font-size)] tracking-[var(--p-body-m-medium-letter-spacing)] leading-[var(--p-body-m-medium-line-height)] [font-style:var(--p-body-m-medium-font-style)]">
                          {attachment.name}
                        </h4>

                        <div className="flex items-start gap-3 relative self-stretch w-full">
                          <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                            {attachment.type}
                          </span>

                          <span className="relative w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                            {attachment.size}
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-auto w-auto p-1"
                        >
                          <img
                            className="relative w-6 h-6"
                            alt="Icon trush square"
                            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-trush-square.svg"
                          />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-auto w-auto p-1"
                        >
                          <img
                            className="relative w-6 h-6"
                            alt="Eye"
                            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/eye.svg"
                          />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-auto w-auto p-1"
                        >
                          <img
                            className="relative w-6 h-6"
                            alt="Icon edit"
                            src="https://c.animaapp.com/mjs9uq4eaVmanC/img/icon-edit.svg"
                          />
                        </Button>
                      </div>
                    </div>

                    {index < attachmentsData.length - 1 && (
                      <Separator className="bg-lightothersdivider h-px" />
                    )}
                  </div>
                ))}

                <Separator className="bg-lightothersdivider h-px w-full" />
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-[#fea38e]/10"
              >
                <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Show 2 More Attchments
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <img
        className="absolute top-[682px] right-0 w-[594px] h-[725px] pointer-events-none"
        alt="Vector"
        src="https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-4.svg"
      />
    </section>
  );
};
