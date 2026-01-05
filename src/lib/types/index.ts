/**
 * Types centralisés pour l'API CollabMarket V40
 * Conformes au schéma backend marketplacev40.sql
 */

// ============================================================================
// ENUMS (conformes au backend V40)
// ============================================================================

/**
 * Statuts de commande - State Machine
 * IMPORTANT: Utiliser 'payment_authorized' (pas 'payment_pending')
 */
export type OrderStatus =
  | 'pending'
  | 'payment_authorized'
  | 'accepted'
  | 'in_progress'
  | 'delivered'
  | 'revision_requested'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'disputed';

/**
 * Statuts de service
 */
export type ServiceStatus =
  | 'draft'
  | 'pending_review'
  | 'active'
  | 'paused'
  | 'rejected'
  | 'deleted';

/**
 * Rôles utilisateur (table user_roles)
 */
export type UserRole = 'influencer' | 'freelance' | 'merchant' | 'agent';

/**
 * Noms de packages service
 */
export type PackageName = 'basic' | 'standard' | 'premium';

/**
 * Types de médias service
 */
export type MediaType = 'image' | 'video' | 'audio' | 'document';

/**
 * Statuts de retrait
 */
export type WithdrawalStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

/**
 * Statuts de revenu seller
 */
export type RevenueStatus = 'pending' | 'available' | 'withdrawn' | 'refunded';

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
  order_number: string;
  checkout_url: string;
  client_secret?: string;
}

// --- capture-payment (seller accepte la commande) ---
export interface CapturePaymentRequest {
  order_id: string;
}

export interface CapturePaymentResponse {
  success: boolean;
  order_status: OrderStatus;
  message?: string;
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
  delivered_at: string;
}

// --- confirm-delivery (buyer confirme) ---
export interface ConfirmDeliveryRequest {
  order_id: string;
}

export interface ConfirmDeliveryResponse {
  success: boolean;
  order_status: OrderStatus;
  completed_at: string;
}

// --- complete-order (alias de confirm-delivery) ---
export type CompleteOrderRequest = ConfirmDeliveryRequest;
export type CompleteOrderResponse = ConfirmDeliveryResponse;

// --- cancel-order-and-refund ---
export interface CancelOrderRequest {
  order_id: string;
  reason: string;
}

export interface CancelOrderResponse {
  success: boolean;
  order_status: OrderStatus;
  refund_id?: string;
  refund_amount?: number;
}

// --- process-withdrawal ---
export interface ProcessWithdrawalRequest {
  amount: number; // En euros
}

export interface ProcessWithdrawalResponse {
  success: boolean;
  withdrawal_id: string;
  payout_id?: string;
  status: WithdrawalStatus;
}

// --- create-stripe-connect-account ---
export interface CreateStripeConnectRequest {
  // Pas de body requis, utilise auth.uid()
}

export interface CreateStripeConnectResponse {
  success: boolean;
  account_id: string;
}

// --- create-onboarding-link ---
export interface CreateOnboardingLinkRequest {
  return_url?: string;
  refresh_url?: string;
}

export interface CreateOnboardingLinkResponse {
  url: string;
  expires_at?: string;
}

// --- sync-stripe-status ---
export interface SyncStripeStatusResponse {
  success: boolean;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
}

// --- track-affiliate-click ---
export interface TrackAffiliateRequest {
  code: string;
  source?: string;
  landing_page?: string;
}

export interface TrackAffiliateResponse {
  success: boolean;
  click_id?: string;
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
    avatar_url: string | null;
  };
  discount_percent?: number;
}

// --- ai-worker (si ai_enabled) ---
export interface AIWorkerRequest {
  job_type: 'generate_description' | 'generate_tags' | 'moderate_content';
  payload: Record<string, unknown>;
}

export interface AIWorkerResponse {
  success: boolean;
  result?: unknown;
  job_id?: string;
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
  description?: string;
  updated_at: string;
}

// ============================================================================
// DATABASE ENTITIES (pour les queries directes)
// ============================================================================

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  average_rating: number;
  total_reviews: number;
  completed_orders_count: number;
  kyc_status: 'none' | 'pending' | 'verified' | 'rejected';
  onboarding_completed: boolean;
  stripe_account_id: string | null;
  stripe_onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  seller_id: string;
  category_id: string | null;
  service_role: 'influencer' | 'freelance';
  title: string;
  slug: string;
  description: string;
  search_tags: string[];
  base_price: number;
  min_delivery_days: number;
  status: ServiceStatus;
  rejection_reason: string | null;
  rating_average: number;
  rating_count: number;
  total_orders: number;
  view_count: number;
  is_affiliable: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Relations (quand joinées)
  seller?: Profile;
  category?: Category;
  packages?: ServicePackage[];
  media?: ServiceMedia[];
}

export interface ServicePackage {
  id: string;
  service_id: string;
  name: PackageName;
  title: string | null;
  description: string | null;
  price: number;
  delivery_days: number;
  revisions: number;
  features: string[];
  is_active: boolean;
}

export interface ServiceMedia {
  id: string;
  service_id: string;
  media_type: MediaType;
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  buyer_id: string;
  seller_id: string;
  service_id: string;
  package_id: string | null;
  status: OrderStatus;
  amount: number;
  platform_fee: number;
  seller_amount: number;
  agent_commission: number | null;
  stripe_payment_intent_id: string | null;
  requirements_submitted: boolean;
  requirements_data: Record<string, unknown>;
  delivery_deadline: string | null;
  delivered_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  current_revision: number;
  max_revisions: number;
  created_at: string;
  updated_at: string;
  // Relations (quand joinées)
  buyer?: Profile;
  seller?: Profile;
  service?: Service;
  package?: ServicePackage;
}

export interface OrderMessage {
  id: string;
  order_id: string;
  sender_id: string;
  content: string;
  is_system: boolean;
  attachments: string[] | null;
  created_at: string;
  // Relations
  sender?: Profile;
}

export interface OrderFile {
  id: string;
  order_id: string;
  uploaded_by: string;
  file_type: 'deliverable' | 'revision' | 'requirement' | 'attachment';
  file_name: string;
  file_url: string;
  file_size: number;
  created_at: string;
}

export interface SellerRevenue {
  id: string;
  seller_id: string;
  order_id: string;
  gross_amount: number;
  platform_fee: number;
  net_amount: number;
  status: RevenueStatus;
  available_at: string | null;
  withdrawn_at: string | null;
  created_at: string;
}

export interface Withdrawal {
  id: string;
  seller_id: string;
  amount: number;
  fee: number;
  net_amount: number;
  status: WithdrawalStatus;
  stripe_payout_id: string | null;
  requested_at: string;
  processed_at: string | null;
  failed_reason: string | null;
}

// ============================================================================
// API RESPONSE WRAPPERS
// ============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// DASHBOARD STATS
// ============================================================================

export interface DashboardStats {
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  pendingRevenue: number;
  availableBalance: number;
  unreadMessages: number;
  totalServices: number;
  activeServices: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  inProgress: number;
  delivered: number;
  completed: number;
  cancelled: number;
}
