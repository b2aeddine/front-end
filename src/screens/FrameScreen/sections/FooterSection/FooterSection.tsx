import { MailIcon, MapPinIcon, PhoneIcon, Send, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const productLinks = [
  { label: "Services", href: "/services" },
  { label: "Tarifs", href: "/pricing" },
  { label: "Créateurs", href: "/creators" },
  { label: "Marques", href: "/brands" },
  { label: "Comment ça marche", href: "/how-it-works" },
];

const companyLinks = [
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Carrières", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Presse", href: "/press" },
];

const supportLinks = [
  { label: "Centre d'aide", href: "/help" },
  { label: "FAQ", href: "/faq" },
  { label: "Communauté", href: "/community" },
  { label: "Signaler un problème", href: "/report" },
  { label: "Chat en direct", href: "/chat" },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: "https://c.animaapp.com/mjs9uq4eaVmanC/img/ic-baseline-facebook.svg",
    href: "https://facebook.com"
  },
  {
    name: "Twitter",
    icon: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-3.svg",
    href: "https://twitter.com"
  },
  {
    name: "Instagram",
    icon: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-8.svg",
    href: "https://instagram.com"
  },
  {
    name: "LinkedIn",
    icon: "https://c.animaapp.com/mjs9uq4eaVmanC/img/mdi-linkedin.svg",
    href: "https://linkedin.com"
  },
  {
    name: "YouTube",
    icon: "https://c.animaapp.com/mjs9uq4eaVmanC/img/vector-2.svg",
    href: "https://youtube.com"
  },
];

export const FooterSection = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-[#f8f5f0] pt-16 md:pt-20 px-4 md:px-8 lg:px-[99px]">
      <div className="max-w-[1440px] mx-auto">

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#fea38e]/10 to-[#fea38e]/5 rounded-2xl p-6 md:p-10 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[#202224] [font-family:'DM_Sans',Helvetica] mb-2">
                Restez informé
              </h3>
              <p className="text-[#606060] text-sm md:text-base [font-family:'Nunito_Sans',Helvetica]">
                Recevez nos dernières actualités et offres exclusives
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-72">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#fea38e] focus:ring-2 focus:ring-[#fea38e]/20 transition-all [font-family:'Nunito_Sans',Helvetica]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#fea38e] hover:bg-[#fe8e76] text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 [font-family:'Nunito_Sans',Helvetica] hover:shadow-lg hover:shadow-[#fea38e]/30"
              >
                {isSubscribed ? (
                  <span>Merci !</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">S'inscrire</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand Section */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <div className="flex items-center gap-2">
              <img
                className="w-9 h-[38px]"
                alt="Logo"
                src="https://c.animaapp.com/mjqxqi8lTyFq6W/img/group-39512.png"
              />
              <div className="[font-family:'DM_Sans',Helvetica] font-bold text-[#202224] text-2xl">
                CollaB Market
              </div>
            </div>

            <p className="text-[#606060] text-sm leading-relaxed [font-family:'Nunito_Sans',Helvetica] max-w-[280px]">
              La plateforme qui connecte les créateurs de contenu et les marques pour des collaborations authentiques et impactantes.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-[#fea38e] hover:border-[#fea38e] group transition-all duration-200 hover:shadow-md"
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <nav className="flex flex-col gap-6">
            <h3 className="font-bold text-[#202224] text-base [font-family:'DM_Sans',Helvetica]">
              Produit
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#606060] text-sm [font-family:'Nunito_Sans',Helvetica] hover:text-[#fea38e] transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200 -ml-5 group-hover:ml-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav className="flex flex-col gap-6">
            <h3 className="font-bold text-[#202224] text-base [font-family:'DM_Sans',Helvetica]">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#606060] text-sm [font-family:'Nunito_Sans',Helvetica] hover:text-[#fea38e] transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200 -ml-5 group-hover:ml-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support Links */}
          <nav className="flex flex-col gap-6">
            <h3 className="font-bold text-[#202224] text-base [font-family:'DM_Sans',Helvetica]">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#606060] text-sm [font-family:'Nunito_Sans',Helvetica] hover:text-[#fea38e] transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200 -ml-5 group-hover:ml-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-[#202224] text-base [font-family:'DM_Sans',Helvetica]">
              Contact
            </h3>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@collabmarket.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#fea38e]/10 flex items-center justify-center group-hover:bg-[#fea38e] transition-colors">
                  <MailIcon className="w-4 h-4 text-[#fea38e] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[#606060] text-sm [font-family:'Nunito_Sans',Helvetica] group-hover:text-[#fea38e] transition-colors">
                  contact@collabmarket.com
                </span>
              </a>

              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#fea38e]/10 flex items-center justify-center group-hover:bg-[#fea38e] transition-colors">
                  <PhoneIcon className="w-4 h-4 text-[#fea38e] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[#606060] text-sm [font-family:'Nunito_Sans',Helvetica] group-hover:text-[#fea38e] transition-colors">
                  +33 1 23 45 67 89
                </span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#fea38e]/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-4 h-4 text-[#fea38e]" />
                </div>
                <address className="text-[#606060] text-sm [font-family:'Nunito_Sans',Helvetica] not-italic leading-relaxed">
                  12 Rue de la Innovation<br />
                  75001 Paris, France
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#9ca3af] text-sm [font-family:'Nunito_Sans',Helvetica]">
              © {new Date().getFullYear()} CollaB Market. Tous droits réservés.
            </p>

            <div className="flex items-center gap-6 text-sm [font-family:'Nunito_Sans',Helvetica]">
              <a
                href="/terms"
                className="text-[#606060] hover:text-[#fea38e] transition-colors"
              >
                Conditions d'utilisation
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="/privacy"
                className="text-[#606060] hover:text-[#fea38e] transition-colors"
              >
                Politique de confidentialité
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="/cookies"
                className="text-[#606060] hover:text-[#fea38e] transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
