/**
 * MaintenanceBanner
 * Affiche une bannière d'alerte quand le mode maintenance est activé
 */

import { useMaintenanceMode } from '../lib/featureFlags';

export function MaintenanceBanner(): JSX.Element | null {
  const { inMaintenance, loading } = useMaintenanceMode();

  // Ne rien afficher pendant le chargement ou si pas en maintenance
  if (loading || !inMaintenance) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-[#ff9f43] text-white py-3 px-4 text-center shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="text-xl">⚠️</span>
        <p className="[font-family:'DM_Sans',Helvetica] font-medium text-sm">
          Le site est actuellement en maintenance. Certaines fonctionnalités peuvent être temporairement indisponibles.
        </p>
      </div>
    </div>
  );
}
