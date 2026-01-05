# CollabMarket Frontend-Backend Integration Plan

> **Version**: V40 Compatible
> **Date**: Janvier 2025
> **Objectif**: Rendre le frontend React/Vite/TS parfaitement fonctionnel avec le backend Supabase V40

---

## A) AUDIT DE COMPATIBILITÉ FRONT ↔ BACKEND

### 1. État Actuel du Frontend

#### Routes & Pages
| Route | Composant | Auth Required | État |
|-------|-----------|---------------|------|
| `/` | FrameScreen | Non | ✅ UI complète |
| `/dashboard` | Dashboard | Oui (ProtectedRoute) | ⚠️ Mock data |
| `/public` | PagePublic | Non | ⚠️ Mock data |
| `/service` | PageService | Non | ⚠️ Mock data |
| `/service/:slug` | PageService | Non | ⚠️ Mock data |

#### Composants avec Actions à Connecter

| Composant | Action | Backend Target | État |
|-----------|--------|----------------|------|
| `authModal.tsx` | Login | `supabase.auth.signInWithPassword` | ✅ Implémenté |
| `authModal.tsx` | Signup | `supabase.auth.signUp` | ✅ Implémenté |
| `authModal.tsx` | Forgot Password | `supabase.auth.resetPasswordForEmail` | ❌ Non implémenté |
| `HeroSection` | Bouton S'inscrire | `openModal('signup')` | ✅ À vérifier |
| `DashboardContentSection` | Fetch orders | `fetchMyOrders()` | ✅ Implémenté |
| `DashboardContentSection` | Stats revenus | Query seller_revenues | ❌ Non implémenté |
| `DashboardContentSection` | Stats messages | Query order_messages | ❌ Non implémenté |
| `OrderListSection` | Liste orders | Direct Supabase query | ❌ Mock data |
| `ProfileOverviewSection` | Commander service | Edge Function `create-order` | ❌ Non implémenté |
| `ProfileOverviewSection` | Sélection package | State management | ❌ Non implémenté |

### 2. Mapping Actions → Backend

#### Lectures (via Supabase Client + RLS)
| Action Frontend | Table/Vue | Query |
|-----------------|-----------|-------|
| Lister services publics | `services` | `status = 'active'` |
| Détails service | `services` + joins | `slug = ?` |
| Mes commandes (buyer) | `orders` | `buyer_id = auth.uid()` |
| Mes commandes (seller) | `orders` | `seller_id = auth.uid()` |
| Messages d'une commande | `order_messages` | `order_id = ?` |
| Catégories | `categories` | `is_active = true` |
| Mon profil | `profiles` | `id = auth.uid()` |
| Mes rôles | `user_roles` | `user_id = auth.uid()` |

#### Écritures via Edge Functions (Actions Sensibles)
| Action | Edge Function | Payload | Permissions |
|--------|---------------|---------|-------------|
| Créer commande | `create-order` | `{service_id, package_name, affiliate_code?, requirements?}` | Authenticated |
| Capturer paiement | `capture-payment` | `{order_id}` | Seller only |
| Livrer commande | `deliver-order` | `{order_id, files?}` | Seller only |
| Confirmer livraison | `confirm-delivery` | `{order_id}` | Buyer only |
| Annuler/Rembourser | `cancel-order-and-refund` | `{order_id, reason}` | Buyer/Seller/Admin |
| Demander retrait | `process-withdrawal` | `{amount}` | Seller only |
| Créer compte Stripe | `create-stripe-connect-account` | `{}` | Seller only |
| Lien onboarding | `create-onboarding-link` | `{}` | Seller only |
| Track affiliate | `track-affiliate-click` | `{code, source?}` | Anon OK |
| Résoudre code créateur | `resolve-creator-code` | `{code}` | Anon OK |

### 3. Mismatches Identifiés (P0 Bloquants)

#### ❌ CRITIQUE: OrderStatus Mismatch
```typescript
// Frontend (orders.ts ligne 9)
export type OrderStatus = 'payment_pending' | ...

// Backend V40
type order_status = 'payment_authorized' | ... // PAS payment_pending!
```
**Action**: Renommer `payment_pending` → `payment_authorized` dans le frontend.

#### ❌ CRITIQUE: Edge Functions Manquantes
Le frontend n'a pas de wrappers pour:
- `capture-payment` (seller accepte)
- `deliver-order` (seller livre)
- `cancel-order-and-refund`
- `complete-order` (alias confirm-delivery)
- `process-withdrawal`
- `create-stripe-connect-account`
- `create-onboarding-link`
- `track-affiliate-click`
- `resolve-creator-code`

#### ❌ CRITIQUE: Feature Flags Non Gérés
Aucune vérification de `orders_enabled`, `payments_enabled`, `maintenance_mode` avant les actions.

#### ⚠️ MOYEN: Mock Data Partout
- `OrderListSection`: données statiques hardcodées
- `ProfileOverviewSection`: prix/packages mockés
- `DashboardContentSection`: stats mockées

#### ⚠️ MOYEN: Pages Manquantes
- Détail commande avec chat
- Création de service
- Paramètres profil seller
- Historique withdrawals

---

## B) PLAN D'IMPLÉMENTATION PAR PHASES

### Phase 0: Infrastructure Client

#### Fichiers à créer/modifier:

```
src/lib/
├── supabaseClient.ts     ✅ Existe (OK)
├── auth.tsx              ✅ Existe (OK)
├── api.ts                ✅ Existe (à enrichir)
├── featureFlags.ts       🆕 À créer
├── types/
│   ├── index.ts          🆕 Types centralisés
│   ├── orders.ts         🆕 Contrats API orders
│   ├── services.ts       🆕 Contrats API services
│   ├── payments.ts       🆕 Contrats API payments
│   └── affiliates.ts     🆕 Contrats API affiliates
└── queries/
    ├── orders.ts         ✅ Existe (à enrichir)
    ├── services.ts       ✅ Existe (OK)
    ├── dashboard.ts      🆕 Stats dashboard
    └── withdrawals.ts    🆕 Gestion retraits
```

#### Checklist Phase 0:
- [ ] Créer `src/lib/types/index.ts` avec types API centralisés
- [ ] Corriger OrderStatus: `payment_pending` → `payment_authorized`
- [ ] Créer `src/lib/featureFlags.ts` (hook + cache)
- [ ] Enrichir `api.ts` avec helpers pour toutes les Edge Functions
- [ ] Créer `src/lib/queries/dashboard.ts` pour stats
- [ ] Créer `src/lib/queries/withdrawals.ts`

### Phase 1: Auth End-to-End

**Objectif**: Login/Signup/Logout fonctionnels + session persistante

#### Déjà implémenté ✅:
- `signIn()` / `signUp()` dans AuthContext
- `ProtectedRoute` avec redirection
- Fetch profile + roles après auth
- Session persistence (`persistSession: true`)
- Auth state listener (`onAuthStateChange`)

#### À ajouter:
- [ ] `resetPassword()` dans AuthContext
- [ ] Handler pour forgot-password dans authModal
- [ ] Redirect si déjà connecté sur `/` → `/dashboard`
- [ ] Refresh token automatique (déjà géré par Supabase)

#### Tests manuels Phase 1:
1. Signup → vérifier création user + profile + redirect dashboard
2. Logout → vérifier clear session + redirect home
3. Login → vérifier session restore + profile fetch
4. Refresh page → vérifier session maintenue
5. Token expiré → vérifier auto-refresh

### Phase 2: Marketplace Listing + Service Details

**Objectif**: Remplacer mock data par data réelle

#### Actions:
- [ ] Connecter `MainContentSection` à `fetchServices()`
- [ ] Connecter `PageService` à `fetchServiceBySlug()`
- [ ] Implémenter pagination sur listing
- [ ] Ajouter filtres fonctionnels (catégorie, prix, search)
- [ ] Charger médias depuis Supabase Storage

#### Tests manuels Phase 2:
1. Page d'accueil → services réels affichés
2. Clic sur service → page détail avec vraies données
3. Filtre par catégorie → résultats filtrés
4. Search → résultats pertinents
5. Images → chargées depuis Storage

### Phase 3: Seller - Création Service + Upload

**Objectif**: Permettre aux sellers de créer des services

#### Pré-requis:
- User authentifié
- Rôle `influencer` ou `freelance` actif

#### Actions:
- [ ] Créer page `/dashboard/services/new`
- [ ] Form avec validation Zod (sans changer UI existante)
- [ ] Upload médias vers Supabase Storage
- [ ] Insert service + packages via Supabase client
- [ ] Redirection vers `/dashboard/services` après création

#### Tests manuels Phase 3:
1. Créer service minimal (titre, description, catégorie)
2. Ajouter 3 packages (basic, standard, premium)
3. Upload image principale
4. Vérifier statut `draft` en DB
5. Vérifier médias dans Storage

### Phase 4: Orders + Paiement Flow Complet

**Objectif**: Flow complet de commande jusqu'au paiement

#### State Machine Orders (Backend V40):
```
pending → payment_authorized → accepted → in_progress → delivered → completed
                                    ↓
                              cancelled/refunded
```

#### Actions:
- [ ] Implémenter sélection package dans `ProfileOverviewSection`
- [ ] Bouton "Commander" → appel `create-order`
- [ ] Redirect vers Stripe Checkout
- [ ] Page de retour post-paiement
- [ ] Implémenter `capture-payment` (seller accepte)
- [ ] Implémenter `deliver-order` (seller livre)
- [ ] Implémenter `confirm-delivery` (buyer confirme)
- [ ] Implémenter `cancel-order-and-refund`

#### Tests manuels Phase 4:
1. Buyer commande → redirect Stripe → paiement test
2. Webhook reçu → order `payment_authorized`
3. Seller accepte → order `accepted`
4. Seller livre → order `delivered`
5. Buyer confirme → order `completed` + commissions distribuées
6. Scénario annulation → refund Stripe + order `cancelled`

### Phase 5: Dashboard Buyer/Seller

**Objectif**: Tableaux de bord fonctionnels

#### Actions:
- [ ] Connecter `OrderListSection` à vraies données
- [ ] Filtres par statut fonctionnels
- [ ] Actions contextuelles selon statut:
  - `payment_authorized`: Seller peut Accept/Reject
  - `accepted`: Seller peut Start Work
  - `in_progress`: Seller peut Deliver
  - `delivered`: Buyer peut Confirm/Request Revision
- [ ] Stats temps réel (commandes actives, revenus, messages)
- [ ] Pagination

#### Tests manuels Phase 5:
1. Buyer voit ses commandes (pas celles des autres)
2. Seller voit ses commandes en tant que seller
3. Bouton Accept visible seulement pour seller sur `payment_authorized`
4. Bouton Confirm visible seulement pour buyer sur `delivered`
5. Stats correspondent aux vraies données

### Phase 6: Messaging

**Objectif**: Chat fonctionnel par commande

#### Actions:
- [ ] Créer composant chat (réutiliser design existant)
- [ ] Fetch messages avec `fetchOrderMessages()`
- [ ] Envoyer message avec `sendOrderMessage()`
- [ ] Messages système automatiques (transitions)
- [ ] Polling léger (ou Realtime si configuré)
- [ ] Pagination scroll

#### Tests manuels Phase 6:
1. Buyer envoie message → visible côté seller
2. Seller répond → visible côté buyer
3. Messages système affichés différemment
4. Scroll infini fonctionne
5. Permissions: seuls buyer/seller de la commande peuvent voir/écrire

### Phase 7: Withdrawals + Stripe Connect

**Objectif**: Sellers peuvent retirer leurs fonds

#### Actions:
- [ ] Page onboarding Stripe Connect pour sellers
- [ ] Appel `create-stripe-connect-account`
- [ ] Redirect vers `create-onboarding-link`
- [ ] Sync statut Connect via `sync-stripe-status`
- [ ] Liste revenus disponibles (`seller_revenues`)
- [ ] Bouton "Demander retrait" → `process-withdrawal`
- [ ] Historique retraits

#### Tests manuels Phase 7:
1. Seller sans compte Connect → voir bouton onboarding
2. Onboarding Stripe → retour avec compte actif
3. Revenus `available` visibles
4. Demande retrait → statut `pending`
5. Webhook payout.paid → statut `completed`

### Phase 8: Feature Flags + Maintenance Mode

**Objectif**: Respecter les feature flags du backend

#### Actions:
- [ ] Hook `useFeatureFlags()` avec cache
- [ ] Vérifier `orders_enabled` avant création commande
- [ ] Vérifier `payments_enabled` avant paiement
- [ ] Vérifier `withdrawals_enabled` avant retrait
- [ ] Vérifier `messaging_enabled` avant envoi message
- [ ] Gérer `maintenance_mode` globalement

#### Implémentation:
```typescript
// src/lib/featureFlags.ts
export function useFeatureFlag(key: string): { enabled: boolean; loading: boolean }
export function useMaintenanceMode(): boolean
```

#### Tests manuels Phase 8:
1. Désactiver `orders_enabled` → bouton Commander disabled
2. Activer `maintenance_mode` → message + actions bloquées
3. Désactiver `payments_enabled` → paiement impossible

---

## C) TYPES TYPESCRIPT (API CONTRACTS)

### Types Centralisés

```typescript
// src/lib/types/index.ts

// ============================================================================
// ENUMS (conformes au backend V40)
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'payment_authorized'  // ⚠️ PAS payment_pending
  | 'accepted'
  | 'in_progress'
  | 'delivered'
  | 'revision_requested'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'disputed';

export type ServiceStatus =
  | 'draft'
  | 'pending_review'
  | 'active'
  | 'paused'
  | 'rejected'
  | 'deleted';

export type UserRole = 'influencer' | 'freelance' | 'merchant' | 'agent';
export type PackageName = 'basic' | 'standard' | 'premium';

// ============================================================================
// EDGE FUNCTION CONTRACTS
// ============================================================================

// --- create-order ---
export interface CreateOrderRequest {
  service_id: string;
  package_name: PackageName;
  affiliate_code?: string;
  requirements?: Record<string, unknown>;
}

export interface CreateOrderResponse {
  order_id: string;
  checkout_url: string;
}

// --- capture-payment ---
export interface CapturePaymentRequest {
  order_id: string;
}

export interface CapturePaymentResponse {
  success: boolean;
  order_status: OrderStatus;
}

// --- deliver-order ---
export interface DeliverOrderRequest {
  order_id: string;
  message?: string;
  file_urls?: string[];
}

export interface DeliverOrderResponse {
  success: boolean;
  order_status: OrderStatus;
}

// --- confirm-delivery ---
export interface ConfirmDeliveryRequest {
  order_id: string;
}

export interface ConfirmDeliveryResponse {
  success: boolean;
  order_status: OrderStatus;
}

// --- cancel-order-and-refund ---
export interface CancelOrderRequest {
  order_id: string;
  reason: string;
}

export interface CancelOrderResponse {
  success: boolean;
  refund_id?: string;
  order_status: OrderStatus;
}

// --- process-withdrawal ---
export interface ProcessWithdrawalRequest {
  amount: number; // En euros, sera converti en centimes
}

export interface ProcessWithdrawalResponse {
  success: boolean;
  withdrawal_id: string;
  payout_id?: string;
}

// --- create-stripe-connect-account ---
export interface CreateStripeConnectResponse {
  success: boolean;
  account_id: string;
}

// --- create-onboarding-link ---
export interface CreateOnboardingLinkResponse {
  url: string;
}

// --- track-affiliate-click ---
export interface TrackAffiliateRequest {
  code: string;
  source?: string;
}

export interface TrackAffiliateResponse {
  success: boolean;
  creator_id?: string;
}

// --- resolve-creator-code ---
export interface ResolveCreatorCodeRequest {
  code: string;
}

export interface ResolveCreatorCodeResponse {
  valid: boolean;
  creator?: {
    id: string;
    display_name: string;
    avatar_url: string;
  };
  discount_percent?: number;
}

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export type FeatureFlagKey =
  | 'orders_enabled'
  | 'payments_enabled'
  | 'withdrawals_enabled'
  | 'messaging_enabled'
  | 'disputes_enabled'
  | 'reviews_enabled'
  | 'affiliates_enabled'
  | 'ai_enabled'
  | 'maintenance_mode';

export interface FeatureFlag {
  key: FeatureFlagKey;
  enabled: boolean;
  updated_at: string;
}
```

---

## D) TABLEAU UI ACTION → BACKEND

| UI Location | Action | Backend Endpoint | RLS/Permissions | Test |
|-------------|--------|------------------|-----------------|------|
| AuthModal | Login | `supabase.auth.signIn` | Public | ✅ |
| AuthModal | Signup | `supabase.auth.signUp` | Public | ✅ |
| AuthModal | Reset password | `supabase.auth.resetPassword` | Public | ⏳ |
| HeroSection | Voir services | Navigate `/service` | Public | ⏳ |
| MainContentSection | Lister services | `services` table | RLS: status='active' | ⏳ |
| PageService | Voir détails | `services` table + joins | RLS: active OR owner | ⏳ |
| PageService | Commander | `create-order` Edge Fn | Auth required | ⏳ |
| Dashboard | Mes commandes buyer | `orders` table | RLS: buyer_id=auth.uid() | ✅ |
| Dashboard | Mes commandes seller | `orders` table | RLS: seller_id=auth.uid() | ⏳ |
| Dashboard | Accepter commande | `capture-payment` Edge Fn | seller_id=auth.uid() | ⏳ |
| Dashboard | Livrer commande | `deliver-order` Edge Fn | seller_id=auth.uid() | ⏳ |
| Dashboard | Confirmer réception | `confirm-delivery` Edge Fn | buyer_id=auth.uid() | ⏳ |
| Dashboard | Annuler commande | `cancel-order-and-refund` | buyer/seller/admin | ⏳ |
| OrderDetail | Envoyer message | `order_messages` insert | RLS: buyer/seller | ⏳ |
| OrderDetail | Voir messages | `order_messages` select | RLS: buyer/seller | ⏳ |
| SellerDashboard | Créer service | `services` insert | RLS: auth.uid() | ⏳ |
| SellerDashboard | Upload média | Storage bucket | RLS: owner | ⏳ |
| SellerDashboard | Demander retrait | `process-withdrawal` | seller only | ⏳ |
| SellerDashboard | Onboarding Stripe | `create-stripe-connect` | seller only | ⏳ |

---

## E) ARBORESCENCE FICHIERS À CRÉER/MODIFIER

```
src/
├── lib/
│   ├── api.ts                    📝 Enrichir avec tous les Edge Function wrappers
│   ├── auth.tsx                  📝 Ajouter resetPassword
│   ├── featureFlags.ts           🆕 Hook pour feature flags
│   ├── types/
│   │   ├── index.ts              🆕 Types centralisés (contracts API)
│   │   └── database.ts           🆕 Types générés depuis Supabase (optionnel)
│   └── queries/
│       ├── orders.ts             📝 Corriger OrderStatus + ajouter actions
│       ├── services.ts           ✅ OK
│       ├── dashboard.ts          🆕 Stats dashboard
│       └── withdrawals.ts        🆕 Gestion retraits
│
├── routes/
│   ├── Dashboard/
│   │   └── screens/
│   │       ├── sections/
│   │       │   ├── DashboardContentSection.tsx  📝 Connecter stats réelles
│   │       │   └── OrderListSection.tsx         📝 Remplacer mock par fetch
│   │       ├── OrderDetailPage.tsx              🆕 Page détail commande + chat
│   │       └── WithdrawalsPage.tsx              🆕 Page retraits seller
│   │
│   ├── PageService/
│   │   └── screens/sections/
│   │       └── ProfileOverviewSection.tsx       📝 Ajouter logique commande
│   │
│   └── CreateService/                           🆕 Route création service
│       └── CreateServicePage.tsx
│
└── screens/
    └── FrameScreen/
        └── sections/
            └── MainContentSection/
                └── MainContentSection.tsx       📝 Connecter fetchServices
```

---

## F) DEBUG & BUGFIX PLAYBOOK

### 1. Vérification Session/Token

```typescript
// Dans la console du navigateur
const { data } = await supabase.auth.getSession();
console.log('Session:', data.session);
console.log('Token expires at:', new Date(data.session?.expires_at * 1000));
console.log('Is expired:', Date.now() > data.session?.expires_at * 1000);
```

**Problèmes courants:**
- Token null → User non connecté
- Token expiré → Forcer `supabase.auth.refreshSession()`

### 2. Vérification URL Edge Function

```bash
# Format attendu
https://YOUR_PROJECT.supabase.co/functions/v1/FUNCTION_NAME

# Vérifier la variable d'environnement
echo $VITE_SUPABASE_FUNCTIONS_URL

# Test direct avec curl
curl -X POST https://xxx.supabase.co/functions/v1/create-order \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"service_id": "uuid", "package_name": "basic"}'
```

### 3. Vérification Headers

```typescript
// Le wrapper api.ts doit ajouter:
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + accessToken
}
```

### 4. Diagnostic Erreurs RLS

| Code | Signification | Solution |
|------|---------------|----------|
| 401 | Token absent/invalide | Vérifier `Authorization` header |
| 403 | RLS policy refuse | Vérifier les policies sur la table |
| 404 | Route inexistante | Vérifier nom exact de la function |
| 500 | Erreur serveur | Voir logs Supabase Dashboard |

### 5. Commandes curl de Debug

```bash
# Test auth
curl -X POST https://xxx.supabase.co/auth/v1/token?grant_type=password \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "password": "test123"}'

# Test lecture orders
curl https://xxx.supabase.co/rest/v1/orders?select=* \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Test Edge Function
curl -X POST https://xxx.supabase.co/functions/v1/create-order \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"service_id": "uuid", "package_name": "basic"}'
```

### 6. Où Lire les Logs

| Source | Localisation |
|--------|--------------|
| Console navigateur | DevTools → Console |
| Supabase Dashboard | Project → Logs → Edge Functions |
| Table system_logs | `SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 50` |
| Webhooks | `SELECT * FROM processed_webhooks ORDER BY received_at DESC` |

### 7. Erreurs Fréquentes

| Erreur | Cause Probable | Solution |
|--------|----------------|----------|
| `401 Unauthorized` | Token absent/expiré | Vérifier session, refresh token |
| `403 Forbidden` | RLS bloque | Vérifier policy, vérifier user_id |
| `404 Not Found` | Mauvais endpoint | Vérifier nom exact Edge Function |
| `CORS error` | ALLOWED_ORIGIN | Ajouter domaine dans Edge Function |
| `buyer_id mismatch` | Mauvais user | Vérifier auth.uid() = buyer_id |
| `seller_id mismatch` | Pas le seller | Vérifier auth.uid() = seller_id |
| `Invalid status transition` | State machine | Vérifier statut actuel vs transition |
| `Feature disabled` | Feature flag OFF | Vérifier `feature_flags` table |

---

## G) CHECKLIST DE TESTS PAR PHASE

### Phase 0
- [ ] Types compilent sans erreur
- [ ] `import { OrderStatus } from '@/lib/types'` fonctionne
- [ ] `useFeatureFlag('orders_enabled')` retourne une valeur

### Phase 1
- [ ] Signup crée user + profile
- [ ] Login restaure session
- [ ] Logout clear session
- [ ] Refresh page maintient session
- [ ] ProtectedRoute redirige si non auth

### Phase 2
- [ ] Page accueil affiche services réels
- [ ] Page service affiche détails réels
- [ ] Filtres fonctionnent
- [ ] Images chargées depuis Storage

### Phase 3
- [ ] Seller peut créer service
- [ ] Upload média fonctionne
- [ ] Service visible en draft

### Phase 4
- [ ] Buyer peut commander
- [ ] Redirect Stripe fonctionne
- [ ] Après paiement → order payment_authorized
- [ ] Seller peut accepter
- [ ] Seller peut livrer
- [ ] Buyer peut confirmer
- [ ] Commissions distribuées

### Phase 5
- [ ] Dashboard affiche vraies commandes
- [ ] Filtres fonctionnent
- [ ] Actions contextuelles correctes
- [ ] Stats temps réel

### Phase 6
- [ ] Messages s'envoient
- [ ] Messages se reçoivent
- [ ] Messages système affichés
- [ ] Seuls buyer/seller voient

### Phase 7
- [ ] Onboarding Stripe fonctionne
- [ ] Revenus affichés
- [ ] Demande retrait fonctionne
- [ ] Historique affiché

### Phase 8
- [ ] Feature flags respectés
- [ ] Maintenance mode bloque actions
- [ ] Messages utilisateur appropriés

---

## H) PROCHAINES ÉTAPES

1. **Immédiat**: Corriger `OrderStatus` (payment_pending → payment_authorized)
2. **Ensuite**: Créer les types centralisés
3. **Puis**: Implémenter Phase par Phase

> **Note**: Ce plan respecte la contrainte ZERO UI CHANGES. Toutes les modifications sont dans la logique (fetch, state, validation, navigation).
