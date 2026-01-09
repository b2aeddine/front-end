import { ContactHesitationSection } from "./screens/sections/ContactHesitationSection";
import { ExperienceSkillsSection } from "./screens/sections/ExperienceSkillsSection";
import { FinalCTASection } from "./screens/sections/FinalCTASection";
import { PortfolioSection } from "./screens/sections/PortfolioSection";
import { ProfileHeaderSection } from "./screens/sections/ProfileHeaderSection";
import { ProfileOverviewSection } from "./screens/sections/ProfileOverviewSection";
import { ReviewsSection } from "./screens/sections/ReviewsSection";
import { ServicesSection } from "./screens/sections/ServicesSection";
import { SocialProofSection } from "./screens/sections/SocialProofSection";
import { StickyCTA } from "./screens/sections/StickyCTA";

export const PagePublic = (): JSX.Element => {
  const creatorId = "karunarathne";
  const creatorName = "Karunarathne";

  const handleContact = () => {
    // Préparation future checkout/contact modal
    console.log("Opening contact modal for:", { creatorId, intent: "contact" });
    // TODO: Intégrer avec le système de modal existant
  };

  return (
    <div className="flex flex-col w-full relative bg-[#f8f5f0] overflow-x-hidden">
      {/* Header avec navigation */}
      <ProfileHeaderSection />

      {/* Hero avec CTA principal - Section clé */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <ProfileOverviewSection />
      </div>

      {/* Preuve sociale immédiate */}
      <SocialProofSection />

      {/* Services transactionnels - Section prioritaire */}
      <div className="px-4 md:px-8 lg:px-16 py-10">
        <PortfolioSection />
      </div>

      {/* Section hésitation / contact rapide */}
      <ContactHesitationSection
        creatorId={creatorId}
        onContact={handleContact}
      />

      {/* Portfolio avec résultats */}
      <div className="px-4 md:px-8 lg:px-16 py-10">
        <ServicesSection />
      </div>

      {/* Parcours (simplifié, sans boutons admin) */}
      <div className="px-4 md:px-8 lg:px-16 py-10">
        <ReviewsSection />
      </div>

      {/* Avis clients */}
      <div className="px-4 md:px-8 lg:px-16 py-10">
        <ExperienceSkillsSection />
      </div>

      {/* CTA final */}
      <FinalCTASection
        creatorName={creatorName}
        creatorId={creatorId}
        onContact={handleContact}
      />

      {/* CTA sticky mobile */}
      <StickyCTA
        creatorId={creatorId}
        onContact={handleContact}
      />
    </div>
  );
};
