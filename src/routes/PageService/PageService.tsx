import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { ExperienceAndSkillsSection } from "./screens/sections/ExperienceAndSkillsSection";
import { ProfileOverviewSection } from "./screens/sections/ProfileOverviewSection";
import { UserCommentsSection } from "./screens/sections/UserCommentsSection";
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
      <div className="flex flex-col items-start relative bg-[#f8f5f0] w-full">
        <ProfileOverviewSection />
        <ExperienceAndSkillsSection />
        <UserCommentsSection />
      </div>
    </ServiceContext.Provider>
  );
};
