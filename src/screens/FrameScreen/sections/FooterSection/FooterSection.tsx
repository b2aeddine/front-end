import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";

const productLinks = [
  "Features",
  "Pricing",
  "Case studies",
  "Reviews",
  "Updates",
];

const companyLinks = ["About", "Contact us", "Careers", "Culture", "Blog"];

const supportLinks = [
  "Getting started",
  "Help center",
  "Server status",
  "Report a bug",
  "Chat support",
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-[#f8f5f0] py-16 md:py-[120px] px-4 md:px-8 lg:px-[99px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="border-t border-neutral-400 mb-12 md:mb-[120px]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-[100px]">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              <img
                className="w-9 h-[38px]"
                alt="Logo"
                src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/group-39512.png"
              />
              <div className="[font-family:'DM_Sans',Helvetica] font-bold text-neutral-800 text-[29.5px] leading-[31.1px]">
                Logo
              </div>
            </div>

            <p className="font-paragraph-default font-[number:var(--paragraph-default-font-weight)] text-neutral-600 text-[length:var(--paragraph-default-font-size)] tracking-[var(--paragraph-default-letter-spacing)] leading-[var(--paragraph-default-line-height)] [font-style:var(--paragraph-default-font-style)] max-w-[310px]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>

            <img
              className="w-fit"
              alt="Social media"
              src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/social-media-container.svg"
            />
          </div>

          <nav className="flex flex-col gap-10">
            <h3 className="font-text-single-300-bold font-[number:var(--text-single-300-bold-font-weight)] text-neutral-800 text-[length:var(--text-single-300-bold-font-size)] tracking-[var(--text-single-300-bold-letter-spacing)] leading-[var(--text-single-300-bold-line-height)] [font-style:var(--text-single-300-bold-font-style)]">
              Product
            </h3>

            <ul className="flex flex-col gap-[18px]">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="font-text-single-200-regular font-[number:var(--text-single-200-regular-font-weight)] text-neutral-600 text-[length:var(--text-single-200-regular-font-size)] tracking-[var(--text-single-200-regular-letter-spacing)] leading-[var(--text-single-200-regular-line-height)] [font-style:var(--text-single-200-regular-font-style)] hover:text-neutral-800 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-10">
            <h3 className="font-text-single-300-bold font-[number:var(--text-single-300-bold-font-weight)] text-neutral-800 text-[length:var(--text-single-300-bold-font-size)] tracking-[var(--text-single-300-bold-letter-spacing)] leading-[var(--text-single-300-bold-line-height)] [font-style:var(--text-single-300-bold-font-style)]">
              Company
            </h3>

            <ul className="flex flex-col gap-[18px]">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="font-text-single-200-regular font-[number:var(--text-single-200-regular-font-weight)] text-neutral-600 text-[length:var(--text-single-200-regular-font-size)] tracking-[var(--text-single-200-regular-letter-spacing)] leading-[var(--text-single-200-regular-line-height)] [font-style:var(--text-single-200-regular-font-style)] hover:text-neutral-800 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-10">
            <h3 className="font-text-single-300-bold font-[number:var(--text-single-300-bold-font-weight)] text-neutral-800 text-[length:var(--text-single-300-bold-font-size)] tracking-[var(--text-single-300-bold-letter-spacing)] leading-[var(--text-single-300-bold-line-height)] [font-style:var(--text-single-300-bold-font-style)]">
              Support
            </h3>

            <ul className="flex flex-col gap-[18px]">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="font-text-single-200-regular font-[number:var(--text-single-200-regular-font-weight)] text-neutral-600 text-[length:var(--text-single-200-regular-font-size)] tracking-[var(--text-single-200-regular-letter-spacing)] leading-[var(--text-single-200-regular-line-height)] [font-style:var(--text-single-200-regular-font-style)] hover:text-neutral-800 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-10">
            <h3 className="font-text-single-300-bold font-[number:var(--text-single-300-bold-font-weight)] text-neutral-800 text-[length:var(--text-single-300-bold-font-size)] tracking-[var(--text-single-300-bold-letter-spacing)] leading-[var(--text-single-300-bold-line-height)] [font-style:var(--text-single-300-bold-font-style)]">
              Contacts us
            </h3>

            <div className="flex flex-col gap-[22px]">
              <a
                href="mailto:contact@company.com"
                className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors"
              >
                <MailIcon className="w-5 h-5 text-neutral-600" />
                <span className="font-text-single-200-regular font-[number:var(--text-single-200-regular-font-weight)] text-neutral-600 text-[length:var(--text-single-200-regular-font-size)] tracking-[var(--text-single-200-regular-letter-spacing)] leading-[var(--text-single-200-regular-line-height)] [font-style:var(--text-single-200-regular-font-style)]">
                  contact@company.com
                </span>
              </a>

              <a
                href="tel:4146875892"
                className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors"
              >
                <PhoneIcon className="w-5 h-5 text-neutral-600" />
                <span className="font-text-single-200-regular font-[number:var(--text-single-200-regular-font-weight)] text-neutral-600 text-[length:var(--text-single-200-regular-font-size)] tracking-[var(--text-single-200-regular-letter-spacing)] leading-[var(--text-single-200-regular-line-height)] [font-style:var(--text-single-200-regular-font-style)]">
                  (414) 687 - 5892
                </span>
              </a>

              <div className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 text-neutral-600 mt-1.5 flex-shrink-0" />
                <address className="font-paragraph-default font-[number:var(--paragraph-default-font-weight)] text-neutral-600 text-[length:var(--paragraph-default-font-size)] tracking-[var(--paragraph-default-letter-spacing)] leading-[var(--paragraph-default-line-height)] [font-style:var(--paragraph-default-font-style)] not-italic">
                  794 Mcallister St
                  <br />
                  San Francisco, 94102
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-400 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-paragraph-default font-[number:var(--paragraph-default-font-weight)] text-neutral-600 text-[length:var(--paragraph-default-font-size)] tracking-[var(--paragraph-default-letter-spacing)] leading-[var(--paragraph-default-line-height)] [font-style:var(--paragraph-default-font-style)]">
            Copyright © 2022 BRIX Templates
          </p>

          <div className="font-paragraph-default font-[number:var(--paragraph-default-font-weight)] text-neutral-600 text-[length:var(--paragraph-default-font-size)] tracking-[var(--paragraph-default-letter-spacing)] leading-[var(--paragraph-default-line-height)] [font-style:var(--paragraph-default-font-style)]">
            <span>All Rights Reserved | </span>
            <a
              href="#"
              className="text-[#fea38e] underline hover:text-[#fe8e76] transition-colors"
            >
              Terms and Conditions
            </a>
            <span> | </span>
            <a
              href="#"
              className="text-[#fea38e] underline hover:text-[#fe8e76] transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
