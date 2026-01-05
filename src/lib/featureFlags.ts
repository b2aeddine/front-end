/**
 * Feature Flags Hook
 * Gère la vérification des feature flags du backend V40
 * Avec cache pour éviter les requêtes répétées
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { FeatureFlagKey, FeatureFlag } from './types';

// ============================================================================
// Cache Global
// ============================================================================

interface FlagCache {
  flags: Map<FeatureFlagKey, boolean>;
  lastFetch: number;
  ttl: number; // Time-to-live in ms
}

const flagCache: FlagCache = {
  flags: new Map(),
  lastFetch: 0,
  ttl: 60000, // 1 minute cache
};

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Fetch all feature flags from database
 */
async function fetchAllFlags(): Promise<Map<FeatureFlagKey, boolean>> {
  if (!isSupabaseConfigured()) {
    // En mode démo, tout est activé sauf maintenance
    const demoFlags = new Map<FeatureFlagKey, boolean>();
    demoFlags.set('orders_enabled', true);
    demoFlags.set('payments_enabled', true);
    demoFlags.set('withdrawals_enabled', true);
    demoFlags.set('messaging_enabled', true);
    demoFlags.set('disputes_enabled', true);
    demoFlags.set('reviews_enabled', true);
    demoFlags.set('affiliates_enabled', true);
    demoFlags.set('ai_enabled', true);
    demoFlags.set('maintenance_mode', false);
    return demoFlags;
  }

  try {
    const { data, error } = await supabase
      .from('feature_flags')
      .select('key, enabled');

    if (error) {
      console.error('[FeatureFlags] Fetch error:', error.message);
      return flagCache.flags; // Retourne le cache actuel en cas d'erreur
    }

    const newFlags = new Map<FeatureFlagKey, boolean>();
    for (const flag of data || []) {
      newFlags.set(flag.key as FeatureFlagKey, flag.enabled);
    }

    // Mettre à jour le cache
    flagCache.flags = newFlags;
    flagCache.lastFetch = Date.now();

    return newFlags;
  } catch (err) {
    console.error('[FeatureFlags] Exception:', err);
    return flagCache.flags;
  }
}

/**
 * Get a single flag value (with cache)
 */
async function getFlag(key: FeatureFlagKey): Promise<boolean> {
  const now = Date.now();

  // Vérifier si le cache est encore valide
  if (now - flagCache.lastFetch < flagCache.ttl && flagCache.flags.has(key)) {
    return flagCache.flags.get(key) ?? true;
  }

  // Refresh le cache
  const flags = await fetchAllFlags();
  return flags.get(key) ?? true; // Par défaut activé
}

// ============================================================================
// React Hooks
// ============================================================================

/**
 * Hook pour vérifier un feature flag spécifique
 * @param key - Clé du feature flag
 * @returns { enabled, loading }
 */
export function useFeatureFlag(key: FeatureFlagKey): { enabled: boolean; loading: boolean } {
  const [enabled, setEnabled] = useState<boolean>(() => {
    // Valeur initiale depuis le cache si disponible
    return flagCache.flags.get(key) ?? true;
  });
  const [loading, setLoading] = useState<boolean>(!flagCache.flags.has(key));

  useEffect(() => {
    let mounted = true;

    async function checkFlag() {
      const value = await getFlag(key);
      if (mounted) {
        setEnabled(value);
        setLoading(false);
      }
    }

    checkFlag();

    return () => {
      mounted = false;
    };
  }, [key]);

  return { enabled, loading };
}

/**
 * Hook pour vérifier le mode maintenance
 * @returns true si le mode maintenance est activé
 */
export function useMaintenanceMode(): { inMaintenance: boolean; loading: boolean } {
  const { enabled, loading } = useFeatureFlag('maintenance_mode');
  return { inMaintenance: enabled, loading };
}

/**
 * Hook pour récupérer tous les feature flags
 */
export function useAllFeatureFlags(): {
  flags: Map<FeatureFlagKey, boolean>;
  loading: boolean;
  refresh: () => Promise<void>;
} {
  const [flags, setFlags] = useState<Map<FeatureFlagKey, boolean>>(flagCache.flags);
  const [loading, setLoading] = useState<boolean>(flagCache.flags.size === 0);

  const refresh = useCallback(async () => {
    setLoading(true);
    const newFlags = await fetchAllFlags();
    setFlags(newFlags);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Ne fetch que si le cache est vide ou expiré
    if (flagCache.flags.size === 0 || Date.now() - flagCache.lastFetch > flagCache.ttl) {
      refresh();
    }
  }, [refresh]);

  return { flags, loading, refresh };
}

// ============================================================================
// Guard Functions (pour utilisation impérative)
// ============================================================================

/**
 * Vérifie si une feature est activée (version impérative avec cache)
 * Utiliser dans les handlers d'événements plutôt que les hooks
 */
export async function isFeatureEnabled(key: FeatureFlagKey): Promise<boolean> {
  return getFlag(key);
}

/**
 * Vérifie si le système est en maintenance
 */
export async function isInMaintenance(): Promise<boolean> {
  return getFlag('maintenance_mode');
}

/**
 * Guard pour les actions de commande
 * Vérifie orders_enabled et maintenance_mode
 */
export async function canCreateOrder(): Promise<{ allowed: boolean; reason?: string }> {
  const [ordersEnabled, maintenance] = await Promise.all([
    getFlag('orders_enabled'),
    getFlag('maintenance_mode'),
  ]);

  if (maintenance) {
    return { allowed: false, reason: 'Le système est en maintenance. Veuillez réessayer plus tard.' };
  }

  if (!ordersEnabled) {
    return { allowed: false, reason: 'La création de commandes est temporairement désactivée.' };
  }

  return { allowed: true };
}

/**
 * Guard pour les paiements
 */
export async function canProcessPayment(): Promise<{ allowed: boolean; reason?: string }> {
  const [paymentsEnabled, maintenance] = await Promise.all([
    getFlag('payments_enabled'),
    getFlag('maintenance_mode'),
  ]);

  if (maintenance) {
    return { allowed: false, reason: 'Le système est en maintenance. Veuillez réessayer plus tard.' };
  }

  if (!paymentsEnabled) {
    return { allowed: false, reason: 'Les paiements sont temporairement désactivés.' };
  }

  return { allowed: true };
}

/**
 * Guard pour les retraits
 */
export async function canProcessWithdrawal(): Promise<{ allowed: boolean; reason?: string }> {
  const [withdrawalsEnabled, maintenance] = await Promise.all([
    getFlag('withdrawals_enabled'),
    getFlag('maintenance_mode'),
  ]);

  if (maintenance) {
    return { allowed: false, reason: 'Le système est en maintenance. Veuillez réessayer plus tard.' };
  }

  if (!withdrawalsEnabled) {
    return { allowed: false, reason: 'Les retraits sont temporairement désactivés.' };
  }

  return { allowed: true };
}

/**
 * Guard pour la messagerie
 */
export async function canSendMessage(): Promise<{ allowed: boolean; reason?: string }> {
  const [messagingEnabled, maintenance] = await Promise.all([
    getFlag('messaging_enabled'),
    getFlag('maintenance_mode'),
  ]);

  if (maintenance) {
    return { allowed: false, reason: 'Le système est en maintenance. Veuillez réessayer plus tard.' };
  }

  if (!messagingEnabled) {
    return { allowed: false, reason: 'La messagerie est temporairement désactivée.' };
  }

  return { allowed: true };
}

// ============================================================================
// Exports
// ============================================================================

export { flagCache };
