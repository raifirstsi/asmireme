import { pgTable, text, timestamp, boolean, integer, doublePrecision, jsonb, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: text("role").default("USER").notNull(), // USER, MEMBER, ADMIN
  referredByMemberId: uuid("referred_by_member_id"),
  referredAt: timestamp("referred_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const memberProfiles = pgTable("member_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  displayNamePublic: text("display_name_public"),
  showPublicName: boolean("show_public_name").default(false).notNull(),
  status: text("status").default("ACTIVE").notNull(), // ACTIVE, SUSPENDED, BANNED
  totalVisits: integer("total_visits").default(0).notNull(),
  totalCtaClicks: integer("total_cta_clicks").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plans = pgTable("plans", {
  id: text("id").primaryKey(), // STANDARD, PRO
  name: text("name").notNull(),
  priceUsd: doublePrecision("price_usd").notNull(),
  priceVnd: integer("price_vnd").notNull(),
  toolLimit: integer("tool_limit").notNull(), // 3 for Standard, 50 (or 9999) for Pro
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  planId: text("plan_id").references(() => plans.id).notNull(),
  status: text("status").default("ACTIVE").notNull(), // ACTIVE, PAST_DUE, CANCELED, EXPIRED
  currentPeriodStart: timestamp("current_period_start").defaultNow().notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  paymentMethod: text("payment_method").default("SEPAY").notNull(),
  orderReference: text("order_reference"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const activeToolSlots = pgTable("active_tool_slots", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  toolSlug: text("tool_slug").notNull(),
  slotIndex: integer("slot_index").notNull(), // 1, 2, 3 for Standard
  selectedAt: timestamp("selected_at").defaultNow().notNull(),
  lastSwappedAt: timestamp("last_swapped_at").defaultNow().notNull(),
});

export const memberAffiliateLinks = pgTable("member_affiliate_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  toolSlug: text("tool_slug").notNull(),
  affiliateUrl: text("affiliate_url").notNull(),
  network: text("network"),
  status: text("status").default("PENDING").notNull(), // PENDING, VALID, INVALID, DISABLED
  finalHost: text("final_host"),
  validatedAt: timestamp("validated_at"),
  lastCheckedAt: timestamp("last_checked_at"),
  disabledReason: text("disabled_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ownerAffiliateLinks = pgTable("owner_affiliate_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  toolSlug: text("tool_slug").notNull().unique(),
  defaultAffiliateUrl: text("default_affiliate_url").notNull(),
  network: text("network"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const referralVisits = pgTable("referral_visits", {
  id: uuid("id").defaultRandom().primaryKey(),
  referralCode: text("referral_code").notNull(),
  visitorHash: text("visitor_hash").notNull(),
  landingPath: text("landing_path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const referralAttributions = pgTable("referral_attributions", {
  id: uuid("id").defaultRandom().primaryKey(),
  visitorHash: text("visitor_hash").notNull().unique(),
  userId: uuid("user_id"),
  memberId: uuid("member_id").notNull(),
  firstSeenAt: timestamp("first_seen_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  source: text("source").default("COOKIE").notNull(), // COOKIE, ACCOUNT
});

export const referralClicks = pgTable("referral_clicks", {
  id: uuid("id").defaultRandom().primaryKey(),
  visitorHash: text("visitor_hash").notNull(),
  toolSlug: text("tool_slug").notNull(),
  pagePath: text("page_path").notNull(),
  attributedMemberId: uuid("attributed_member_id"),
  isFallback: boolean("is_fallback").default(false).notNull(),
  reasonCode: text("reason_code").notNull(),
  targetUrlHost: text("target_url_host").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paymentEvents = pgTable("payment_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  gateway: text("gateway").default("SEPAY").notNull(),
  externalTransactionId: text("external_transaction_id").notNull().unique(),
  amount: integer("amount").notNull(),
  currency: text("currency").default("VND").notNull(),
  orderCode: text("order_code").notNull(),
  rawPayload: jsonb("raw_payload"),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  orderCode: text("order_code").notNull().unique(),
  planId: text("plan_id").references(() => plans.id).notNull(),
  amountVnd: integer("amount_vnd").notNull(),
  status: text("status").default("PENDING").notNull(), // PENDING, PAID, REFUNDED, EXPIRED
  paymentDate: timestamp("payment_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: uuid("actor_id"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
