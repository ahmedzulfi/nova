import { pgTable, varchar, integer, decimal, boolean, timestamp, uuid, text, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const roleEnum = pgEnum('role', ['ADMIN']);

export const tierEnum = pgEnum('tier', ['adult', 'dog-owner', 'cat-owner']);

export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PAID', 'USED', 'CANCELLED']);

export const competitionTypeEnum = pgEnum('competition_type', [
  'dog-grooming',
  'dog-fashion-show',
  'cat-fashion-show',
  'dog-best-in-show',
  'cat-best-show',
  'cat-drawing-battle',
]);

export const registrationStatusEnum = pgEnum('registration_status', ['Pending', 'Completed', 'Rejected']);

export const petGenderEnum = pgEnum('pet_gender', ['Male', 'Female']);

export const experienceLevelEnum = pgEnum('experience_level', ['Beginner', 'Intermediate', 'Professional']);

// ─── Table: users (Admin Accounts Only) ───────────────────────────────────────

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: roleEnum('role').default('ADMIN').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Table: orders (Ticket Purchases) ─────────────────────────────────────────

export const orders = pgTable('orders', {
  id: varchar('id', { length: 20 }).primaryKey(), // e.g. #NPV-2026-X8Y1
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  tier: tierEnum('tier').notNull(),
  adultQty: integer('adult_qty').notNull().default(1),
  kidsQty: integer('kids_qty').notNull().default(0),
  petQty: integer('pet_qty').notNull().default(0),
  petName: varchar('pet_name', { length: 255 }),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').default('PENDING').notNull(),
  paymentMethod: varchar('payment_method', { length: 100 }),
  checkedIn: boolean('checked_in').default(false).notNull(),
  checkedInAt: timestamp('checked_in_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Table: pet_registrations (Competition Entries) ───────────────────────────

export const petRegistrations = pgTable('pet_registrations', {
  id: varchar('id', { length: 20 }).primaryKey(), // e.g. REG-001
  orderId: varchar('order_id', { length: 20 }).notNull().references(() => orders.id),
  competitionType: competitionTypeEnum('competition_type').notNull(),
  competitionName: varchar('competition_name', { length: 255 }).notNull(),
  ownerName: varchar('owner_name', { length: 255 }).notNull(),
  ownerPhone: varchar('owner_phone', { length: 50 }).notNull(),
  ownerEmail: varchar('owner_email', { length: 255 }),
  ownerAddress: text('owner_address'),
  petName: varchar('pet_name', { length: 255 }).notNull(),
  petBreed: varchar('pet_breed', { length: 255 }).notNull(),
  petGender: petGenderEnum('pet_gender').notNull(),
  experienceLevel: experienceLevelEnum('experience_level').notNull(),
  previousTitles: text('previous_titles'),
  drawingMaterials: text('drawing_materials'),
  outfitDescription: text('outfit_description'),
  passportUrl: text('passport_url'),
  vaccinationUrl: text('vaccination_url'),
  status: registrationStatusEnum('status').default('Pending').notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// ─── Table: check_in_logs (Gate Scan History) ─────────────────────────────────

export const checkInLogs = pgTable('check_in_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: varchar('order_id', { length: 20 }).notNull().references(() => orders.id),
  scannedBy: uuid('scanned_by').references(() => users.id),
  gate: varchar('gate', { length: 50 }),
  scannedAt: timestamp('scanned_at').defaultNow().notNull(),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const ordersRelations = relations(orders, ({ many }) => ({
  registrations: many(petRegistrations),
  checkInLogs: many(checkInLogs),
}));

export const petRegistrationsRelations = relations(petRegistrations, ({ one }) => ({
  order: one(orders, {
    fields: [petRegistrations.orderId],
    references: [orders.id],
  }),
}));

export const checkInLogsRelations = relations(checkInLogs, ({ one }) => ({
  order: one(orders, {
    fields: [checkInLogs.orderId],
    references: [orders.id],
  }),
  scanner: one(users, {
    fields: [checkInLogs.scannedBy],
    references: [users.id],
  }),
}));

// ─── Type Exports ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type PetRegistration = typeof petRegistrations.$inferSelect;
export type NewPetRegistration = typeof petRegistrations.$inferInsert;
export type CheckInLog = typeof checkInLogs.$inferSelect;
export type NewCheckInLog = typeof checkInLogs.$inferInsert;
