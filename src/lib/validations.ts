import { z } from 'zod';

// ─── Checkout / Order Validation ──────────────────────────────────────────────

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must be at least 8 characters'),
  tier: z.enum(['adult', 'dog-owner', 'cat-owner']),
  adultQty: z.number().int().min(1),
  kidsQty: z.number().int().min(0),
  petQty: z.number().int().min(0),
  petName: z.string().optional(),
}).refine((data) => {
  // Pet owners must have at least 1 pet
  if (data.tier !== 'adult' && data.petQty < 1) return false;
  // Adult tier must have 0 pets
  if (data.tier === 'adult' && data.petQty > 0) return false;
  // Dog owners: pets <= adults
  if (data.tier === 'dog-owner' && data.petQty > data.adultQty) return false;
  // Cat owners: pets <= 2
  if (data.tier === 'cat-owner' && data.petQty > 2) return false;
  return true;
}, { message: 'Invalid ticket configuration for selected tier' });

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// ─── Competition Registration Validation ──────────────────────────────────────

export const registrationSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  competitionType: z.enum([
    'dog-grooming',
    'dog-fashion-show',
    'cat-fashion-show',
    'dog-best-in-show',
    'cat-best-show',
    'cat-drawing-battle',
  ]),
  competitionName: z.string().min(1),
  ownerName: z.string().min(2),
  ownerPhone: z.string().min(8),
  ownerEmail: z.string().email().optional(),
  ownerAddress: z.string().optional(),
  petName: z.string().min(1, 'Pet name is required'),
  petBreed: z.string().min(1, 'Pet breed is required'),
  petGender: z.enum(['Male', 'Female']),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Professional']),
  previousTitles: z.string().optional(),
  drawingMaterials: z.string().optional(),
  outfitDescription: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

// ─── Admin Login Validation ───────────────────────────────────────────────────

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

// ─── Scanner Validation ──────────────────────────────────────────────────────

export const scanSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
});

export type ScanInput = z.infer<typeof scanSchema>;

// ─── Registration Status Update ──────────────────────────────────────────────

export const updateRegistrationStatusSchema = z.object({
  status: z.enum(['Completed', 'Rejected']),
});

export type UpdateRegistrationStatusInput = z.infer<typeof updateRegistrationStatusSchema>;

// ─── Pricing Constants ───────────────────────────────────────────────────────

export const PRICING = {
  ADULT_PRICE: 60,
  KID_PRICE: 45,
  PET_FEE: 60,
} as const;

export function calculateTotal(adultQty: number, kidsQty: number, petQty: number): number {
  return PRICING.ADULT_PRICE + 
    (adultQty - 1) * PRICING.ADULT_PRICE + 
    (petQty > 1 ? (petQty - 1) * PRICING.PET_FEE : 0) + 
    (kidsQty * PRICING.KID_PRICE);
}

// ─── Order ID Generator ──────────────────────────────────────────────────────

export function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `#NPV-2026-${result}`;
}

// ─── Registration ID Generator ───────────────────────────────────────────────

export function generateRegistrationId(): string {
  const num = Math.floor(Math.random() * 900) + 100;
  return `REG-${num}`;
}
