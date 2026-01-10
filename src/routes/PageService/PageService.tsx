import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { PublicHeader } from "../../components/layout/PublicHeader";
import { HeroServiceSection } from "./screens/sections/HeroServiceSection";
import { ServiceGallery } from "./screens/sections/ServiceGallery";
import { ServicePackagesSection } from "./screens/sections/ServicePackagesSection";
import { AboutServiceSection } from "./screens/sections/AboutServiceSection";
import { CreatorMiniCard } from "./screens/sections/CreatorMiniCard";
import { UserCommentsSection } from "./screens/sections/UserCommentsSection";
import { CreatorProfileSection } from "./screens/sections/CreatorProfileSection";
import { fetchServiceBySlug, Service } from "../../lib/queries/services";

// Context to share service data with child components
interface ServiceContextType {
  service: Service | null;
  isLoading: boolean;
  error: string | null;
}

const ServiceContext = createContext<ServiceContextType>({
  service: null,
  isLoading: true,
  error: null,
});

export function useServiceContext() {
  return useContext(ServiceContext);
}

export const PageService = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadService() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await fetchServiceBySlug(slug);

        if (mounted) {
          if (fetchError) {
            setError(fetchError);
            console.error('[PageService] Failed to load service:', fetchError);
          } else {
            setService(data);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error('[PageService] Exception:', err);
        if (mounted) {
          setError('Erreur lors du chargement du service');
          setIsLoading(false);
        }
      }
    }

    loadService();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <ServiceContext.Provider value={{ service, isLoading, error }}>
      <div className="flex flex-col items-center relative bg-[#f8f5f0] w-full min-h-screen">
        <PublicHeader showSecondaryNav={true} />

        {/* 
          STRUCTURE OPTIMISÉE POUR LA CONVERSION
          =====================================
          Layout 2 colonnes: Infos à gauche | Packs sticky à droite
        */}

        {/* 1. Hero Service - Résultat + Micro-preuves (full width) */}
        <HeroServiceSection />

        {/* Main 2-Column Layout */}
        <div className="flex justify-center w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1200px]">

            {/* LEFT COLUMN - Service Information */}
            <div className="flex flex-col gap-8 w-full lg:w-[calc(100%-450px)]">
              {/* 2. Galerie médias - Avec contexte */}
              <ServiceGallery />

              {/* 3. Mini-card créateur (repositionné stratégiquement après galerie) */}
              <CreatorMiniCard />

              {/* 4. À propos du service (FAQ: process, livrables, délais) */}
              <AboutServiceSection />
            </div>

            {/* RIGHT COLUMN - Packages (Sticky) */}
            <div className="w-full lg:w-[420px] lg:flex-shrink-0">
              <div className="lg:sticky lg:top-6">
                <ServicePackagesSection />
              </div>
            </div>

          </div>
        </div>

        {/* Full Width Sections Below */}
        {/* 5. Avis clients */}
        <UserCommentsSection />

        {/* 6. Profil créateur complet (crédibilité) */}
        <CreatorProfileSection />
      </div>
    </ServiceContext.Provider>
  );
};
