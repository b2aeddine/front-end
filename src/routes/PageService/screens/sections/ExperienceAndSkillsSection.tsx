import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const basicInfoFields = [
  { label: "Email Address", value: "anamoulrouf.bd@gmail.com", disabled: true },
  { label: "Phone Number", value: "+8801759693045", disabled: false },
  { label: "Website", value: "www.anamoulrouf.com", disabled: false },
];

const basicInfoFieldsRight = [
  { label: "Gender", value: "Male", disabled: false },
  { label: "Location", value: "Dhaka, Bangladesh", disabled: false },
];

const experiences = [
  {
    logo: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/rectangle-3890.png",
    title: "Sr. Product Designer",
    company: "ShartTrip Inc.",
    location: "Dhaka, Bangladesh",
    period: "January 2022 to Present",
    description:
      "ShareTrip is the country's first and pioneer online travel aggregator (OTA). My goal was to craft a functional and delightful experience through web and mobile apps currently consisting of 1.2M+ & future billion users… ",
  },
];

const educations = [
  {
    logo: "https://c.animaapp.com/mjsa8xj74uh4Dq/img/rectangle-3890-1.png",
    institution: "California Institute of the Arts",
    courses: ["UX Design Fundamentals", "UX Design"],
    grade: "Grade: A+",
    period: "2020 - 2021",
    description:
      "This hands-on course examines how content is organized and structured to create an experience for a user, and what role the designer plays in creating and shaping user experience. You will be led through a condensed… ",
  },
];

const skillsColumn1 = [
  { name: "UX Design", level: "Expert" },
  { name: "User Research", level: "Expert" },
];

const skillsColumn2 = [
  { name: "UI Design", level: "Expert" },
  { name: "Design System", level: "Expert" },
];

const attachments = [
  {
    name: "Resume-AnamoulRouf.pdf",
    type: "Resume",
    size: "1.21 MB",
  },
  {
    name: "CaseStudy-01.pdf",
    type: "Portfolio",
    size: "1.21 MB",
  },
];

export const ExperienceAndSkillsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center">
      <header className="flex flex-col w-[328px] h-[61px] items-center mb-6">
        <h2 className="flex items-center justify-center self-stretch h-8 mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-[#222325] text-[23.8px] tracking-[0] leading-8 whitespace-nowrap">
          A propos de PRENOM
        </h2>
        <img
          className="w-[121.73px] h-[25.39px]"
          alt="Vector"
          src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector.svg"
        />
      </header>

      <div className="flex items-center gap-2.5 px-[30px] py-0 w-full rounded-[14px] border border-solid border-[#74767e4c]">
        <div className="flex flex-col w-full items-start gap-4">
          <Card className="w-full bg-[#f8f5f0] border-0">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 w-full">
                <div className="inline-flex items-center gap-[6.4px] bg-white rounded-[51.2px]">
                  <div className="relative w-[102.4px] h-[102.4px]">
                    <div className="absolute top-[-5px] left-[-5px] w-[113px] h-[113px] rounded-[56.32px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />
                    <div className="absolute top-[-5px] left-[-5px] w-[113px] h-[113px] rounded-[56.32px] bg-[linear-gradient(225deg,rgba(254,163,142,1)_0%,rgba(254,163,142,1)_38%,rgba(254,163,142,0.5)_63%,rgba(254,163,142,0.3)_100%)]" />
                    <div className="absolute w-full h-full top-0 left-0 rounded-[51.2px] border-[1.28px] border-solid border-white bg-[url(https://c.animaapp.com/mjsa8xj74uh4Dq/img/joschamayer-1.png)] bg-cover bg-[50%_50%]" />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1 flex-1">
                  <h3 className="self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Basic Information
                  </h3>
                  <p className="self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Update profile information
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto w-[92px] px-4 py-2 rounded-[10px] border-2 border-solid border-[#fea38e] bg-transparent hover:bg-transparent"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Editer
                  </span>
                </Button>
              </div>

              <div className="flex items-start gap-4 w-full">
                <div className="flex flex-col items-start gap-4 flex-1">
                  {basicInfoFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start gap-1 w-full"
                    >
                      <label className="self-stretch mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                        {field.label}
                      </label>
                      <div
                        className={`self-stretch font-[number:var(--p-body-m-medium-font-weight)] ${
                          field.disabled
                            ? "text-lighttextdisabled"
                            : "text-lighttextprimary"
                        } text-[length:var(--p-body-m-medium-font-size)] leading-[var(--p-body-m-medium-line-height)] font-p-body-m-medium tracking-[var(--p-body-m-medium-letter-spacing)] [font-style:var(--p-body-m-medium-font-style)]`}
                      >
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-4 flex-1">
                  {basicInfoFieldsRight.map((field, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start gap-1 w-full"
                    >
                      <label className="self-stretch mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                        {field.label}
                      </label>
                      <div className="self-stretch font-p-body-m-medium font-[number:var(--p-body-m-medium-font-weight)] text-lighttextprimary text-[length:var(--p-body-m-medium-font-size)] tracking-[var(--p-body-m-medium-letter-spacing)] leading-[var(--p-body-m-medium-line-height)] [font-style:var(--p-body-m-medium-font-style)]">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-[#f8f5f0] border-0">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 w-full">
                <img
                  className="w-14 h-14"
                  alt="Color icon"
                  src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/color-icon-experience.svg"
                />

                <div className="flex flex-col items-start gap-1 flex-1">
                  <h3 className="self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Experiences
                  </h3>
                  <p className="self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Add experience to increase the chance of hiring
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-solid border-[#fea38e] bg-transparent hover:bg-transparent"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add Experience
                  </span>
                </Button>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-2 w-full"
                  >
                    <div className="flex flex-col items-start gap-4 px-0 py-4 rounded-lg w-full">
                      <div className="flex items-start gap-4 w-full">
                        <img
                          className="w-[72px] h-[72px] rounded-lg border-[0.25px] border-solid border-[#1c1c1e14]"
                          alt="Rectangle"
                          src={exp.logo}
                        />

                        <div className="flex-1 flex flex-col items-start gap-2">
                          <h4 className="self-stretch mt-[-1.00px] font-h5-medium font-[number:var(--h5-medium-font-weight)] text-lighttextprimary text-[length:var(--h5-medium-font-size)] tracking-[var(--h5-medium-letter-spacing)] leading-[var(--h5-medium-line-height)] [font-style:var(--h5-medium-font-style)]">
                            {exp.title}
                          </h4>

                          <div className="flex flex-col items-start w-full">
                            <div className="w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextprimary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                              {exp.company}
                            </div>

                            <div className="flex items-start gap-3 w-full">
                              <div className="w-fit mt-[-1.00px] font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap font-p-body-s-regular tracking-[var(--p-body-s-regular-letter-spacing)] [font-style:var(--p-body-s-regular-font-style)]">
                                {exp.location}
                              </div>

                              <div className="w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {exp.period}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1">
                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-lightactionactive text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Delete
                            </span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Edit
                            </span>
                          </Button>
                        </div>
                      </div>

                      <p className="self-stretch [font-family:'Outfit',Helvetica] font-normal text-lighttextsecondary text-base leading-4">
                        <span className="text-[#1c1c1eb8] tracking-[0] leading-6">
                          {exp.description}
                        </span>
                        <span className="font-medium text-[#1c1c1eb8] tracking-[0] leading-6">
                          &nbsp;
                        </span>
                        <span className="font-semibold text-[#fea38e] text-sm tracking-[0.04px] leading-5">
                          See More
                        </span>
                      </p>
                    </div>

                    <img
                      className="w-full h-[2.27px] mb-[-0.50px] object-cover"
                      alt="Vector"
                      src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector-1-2.svg"
                    />
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
              >
                <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Show 2 More Experiences
                </span>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full bg-[#f8f5f0] border-0">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 w-full">
                <img
                  className="w-14 h-14"
                  alt="Color icon education"
                  src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/color-icon-education.svg"
                />

                <div className="flex flex-col items-start gap-1 flex-1">
                  <h3 className="self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Education &amp; Certifications
                  </h3>
                  <p className="self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Add education to increase the chance of hiring
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-solid border-[#fea38e] bg-transparent hover:bg-transparent"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add Education
                  </span>
                </Button>
              </div>

              <div className="inline-flex flex-col items-start gap-2">
                {educations.map((edu, index) => (
                  <div key={index} className="flex flex-col items-start gap-2">
                    <div className="flex flex-col items-start justify-center gap-4 px-0 py-4 rounded-lg">
                      <div className="flex items-start gap-4 w-full">
                        <img
                          className="w-[72px] h-[72px] rounded-lg border-[0.25px] border-solid border-[#1c1c1e14]"
                          alt="Rectangle"
                          src={edu.logo}
                        />

                        <div className="gap-2 flex-1 flex flex-col items-start">
                          <h4 className="self-stretch mt-[-1.00px] font-h5-medium font-[number:var(--h5-medium-font-weight)] text-lighttextprimary text-[length:var(--h5-medium-font-size)] tracking-[var(--h5-medium-letter-spacing)] leading-[var(--h5-medium-line-height)] [font-style:var(--h5-medium-font-style)]">
                            {edu.institution}
                          </h4>

                          <div className="flex flex-col items-start w-full">
                            <div className="flex items-start gap-3 w-full">
                              {edu.courses.map((course, courseIndex) => (
                                <div
                                  key={courseIndex}
                                  className="w-fit font-[number:var(--p-body-s-regular-font-weight)] text-[length:var(--p-body-s-regular-font-size)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap mt-[-1.00px] font-p-body-s-regular text-lighttextprimary tracking-[var(--p-body-s-regular-letter-spacing)] [font-style:var(--p-body-s-regular-font-style)]"
                                >
                                  {course}
                                </div>
                              ))}
                            </div>

                            <div className="flex items-start gap-3 w-full">
                              <div className="w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {edu.grade}
                              </div>

                              <div className="w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                                {edu.period}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1">
                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-lightactionactive text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Delete
                            </span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
                          >
                            <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                              Edit
                            </span>
                          </Button>
                        </div>
                      </div>

                      <p className="self-stretch [font-family:'Outfit',Helvetica] font-normal text-lighttextsecondary text-base leading-4">
                        <span className="text-[#1c1c1eb8] tracking-[0] leading-6">
                          {edu.description}
                        </span>
                        <span className="font-medium text-[#1c1c1eb8] tracking-[0] leading-6">
                          &nbsp;
                        </span>
                        <span className="font-semibold text-[#fea38e] text-sm tracking-[0.04px] leading-5">
                          See More
                        </span>
                      </p>
                    </div>

                    <img
                      className="w-full h-[2.27px] mb-[-0.50px] object-cover"
                      alt="Vector"
                      src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector-1-2.svg"
                    />
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
              >
                <div className="inline-flex items-center justify-center gap-2">
                  <img
                    className="w-6 h-6"
                    alt="Icon arrow left"
                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-arrow-left.svg"
                  />
                  <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-lighttextsecondary text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                    Button
                  </span>
                  <img
                    className="w-6 h-6"
                    alt="Icon arrow right"
                    src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-arrow-right.svg"
                  />
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full bg-[#f8f5f0] border-0">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-6 w-full">
                <img
                  className="w-14 h-14"
                  alt="Color icon skills"
                  src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/color-icon-skills.svg"
                />

                <div className="flex flex-col items-start gap-1 flex-1">
                  <h3 className="self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Skills
                  </h3>
                  <p className="self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                    Add skills to increase the chance of hiring
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-solid border-[#fea38e] bg-transparent hover:bg-transparent"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add Skills
                  </span>
                </Button>
              </div>

              <div className="flex items-start gap-2 w-full">
                <div className="flex flex-col items-start gap-2 flex-1">
                  {skillsColumn1.map((skill, index) => (
                    <div
                      key={index}
                      className="gap-4 p-4 w-full rounded-lg border border-solid border-[#f2f2f7] flex items-start"
                    >
                      <div className="flex-col gap-1 flex-1 flex items-start">
                        <div className="self-stretch font-[number:var(--h5-medium-font-weight)] text-[length:var(--h5-medium-font-size)] leading-[var(--h5-medium-line-height)] mt-[-1.00px] font-h5-medium text-lighttextprimary tracking-[var(--h5-medium-letter-spacing)] [font-style:var(--h5-medium-font-style)]">
                          {skill.name}
                        </div>
                        <div className="self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                          {skill.level}
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5">
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Icon trush square"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-trush-square.svg"
                          />
                        </button>
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Icon edit"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-edit.svg"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-2 flex-1">
                  {skillsColumn2.map((skill, index) => (
                    <div
                      key={index}
                      className="gap-4 p-4 w-full rounded-lg border border-solid border-[#f2f2f7] flex items-start"
                    >
                      <div className="flex-col gap-1 flex-1 flex items-start">
                        <div className="self-stretch font-[number:var(--h5-medium-font-weight)] text-[length:var(--h5-medium-font-size)] leading-[var(--h5-medium-line-height)] mt-[-1.00px] font-h5-medium text-lighttextprimary tracking-[var(--h5-medium-letter-spacing)] [font-style:var(--h5-medium-font-style)]">
                          {skill.name}
                        </div>
                        <div className="self-stretch font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] [font-style:var(--p-body-s-regular-font-style)]">
                          {skill.level}
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5">
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Icon trush square"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-trush-square.svg"
                          />
                        </button>
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Icon edit"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-edit.svg"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
              >
                <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Show 8 More Education
                </span>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full bg-[#f8f5f0] border-0">
            <CardContent className="flex flex-col items-start gap-6 p-6">
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="flex flex-col items-start gap-1 flex-1">
                  <h3 className="self-stretch mt-[-1.00px] font-h4-medium font-[number:var(--h4-medium-font-weight)] text-lighttextprimary text-[length:var(--h4-medium-font-size)] tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] [font-style:var(--h4-medium-font-style)]">
                    Attachments
                  </h3>
                </div>

                <Button
                  variant="outline"
                  className="h-auto px-5 py-2.5 rounded-[10px] border-2 border-solid border-[#fea38e] bg-transparent hover:bg-transparent"
                >
                  <span className="font-BTN-l-semi-bold font-[number:var(--BTN-l-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-l-semi-bold-font-size)] tracking-[var(--BTN-l-semi-bold-letter-spacing)] leading-[var(--BTN-l-semi-bold-line-height)] [font-style:var(--BTN-l-semi-bold-font-style)]">
                    Add File
                  </span>
                </Button>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-2 w-full"
                  >
                    <div className="flex items-start gap-4 p-4 w-full rounded-lg">
                      <div className="inline-flex items-start p-2 bg-secondary-5-workdlight rounded-lg">
                        <img
                          className="w-8 h-8"
                          alt="Icon document text"
                          src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-document-text.svg"
                        />
                      </div>

                      <div className="flex flex-col items-start gap-0.5 flex-1">
                        <div className="self-stretch mt-[-1.00px] font-p-body-m-medium font-[number:var(--p-body-m-medium-font-weight)] text-lighttextprimary text-[length:var(--p-body-m-medium-font-size)] tracking-[var(--p-body-m-medium-letter-spacing)] leading-[var(--p-body-m-medium-line-height)] [font-style:var(--p-body-m-medium-font-style)]">
                          {attachment.name}
                        </div>

                        <div className="flex items-start gap-3 w-full">
                          <div className="w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                            {attachment.type}
                          </div>

                          <div className="w-fit mt-[-1.00px] font-p-body-s-regular font-[number:var(--p-body-s-regular-font-weight)] text-lighttextsecondary text-[length:var(--p-body-s-regular-font-size)] tracking-[var(--p-body-s-regular-letter-spacing)] leading-[var(--p-body-s-regular-line-height)] whitespace-nowrap [font-style:var(--p-body-s-regular-font-style)]">
                            {attachment.size}
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-0.5">
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Icon trush square"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-trush-square.svg"
                          />
                        </button>
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Eye"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/eye.svg"
                          />
                        </button>
                        <button className="inline-flex items-start p-1">
                          <img
                            className="w-6 h-6"
                            alt="Icon edit"
                            src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/icon-edit.svg"
                          />
                        </button>
                      </div>
                    </div>

                    {index < attachments.length - 1 && (
                      <img
                        className="w-full h-px object-cover"
                        alt="Vector"
                        src="https://c.animaapp.com/mjsa8xj74uh4Dq/img/vector-1.svg"
                      />
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="h-auto px-4 py-2 rounded-lg bg-lightbackgroundtransparent hover:bg-lightbackgroundtransparent"
              >
                <span className="font-BTN-m-semi-bold font-[number:var(--BTN-m-semi-bold-font-weight)] text-[#fea38e] text-[length:var(--BTN-m-semi-bold-font-size)] tracking-[var(--BTN-m-semi-bold-letter-spacing)] leading-[var(--BTN-m-semi-bold-line-height)] [font-style:var(--BTN-m-semi-bold-font-style)]">
                  Show 2 More Attchments
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
