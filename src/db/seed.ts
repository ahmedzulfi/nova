import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { orders, petRegistrations, users } from './schema';
import bcryptjs from 'bcryptjs';

// Load env from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found. Create .env.local first.');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('🌱 Seeding database...');

  // ─── 1. Create Admin User ────────────────────────────────────────────
  const hashedPassword = await bcryptjs.hash('admin123', 10);
  await db.insert(users).values({
    email: 'admin@petfestival.com',
    password: hashedPassword,
    role: 'ADMIN',
  }).onConflictDoNothing();
  console.log('✅ Admin user created (admin@petfestival.com / admin123)');

  // ─── 2. Create Sample Orders ─────────────────────────────────────────
  const sampleOrders = [
    {
      id: '#NPV-2026-X8Y1',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+974 5555 1234',
      tier: 'dog-owner' as const,
      adultQty: 1,
      kidsQty: 1,
      petQty: 1,
      petName: 'Luna',
      total: '65.00',
      status: 'PAID' as const,
      paymentMethod: 'Visa ending in 4242',
    },
    {
      id: '#NPV-2026-A1B2',
      fullName: 'Michael Chen',
      email: 'm.chen@example.com',
      phone: '+974 5555 5678',
      tier: 'adult' as const,
      adultQty: 2,
      kidsQty: 0,
      petQty: 0,
      petName: null,
      total: '50.00',
      status: 'PAID' as const,
      paymentMethod: 'Mastercard ending in 8888',
    },
    {
      id: '#NPV-2026-C3D4',
      fullName: 'Emma Wilson',
      email: 'emma.w@example.com',
      phone: '+974 5555 9012',
      tier: 'cat-owner' as const,
      adultQty: 1,
      kidsQty: 2,
      petQty: 1,
      petName: 'Oliver',
      total: '80.00',
      status: 'PAID' as const,
      paymentMethod: 'Visa ending in 1234',
    },
    {
      id: '#NPV-2026-E5F6',
      fullName: 'David Rodriguez',
      email: 'd.rod@example.com',
      phone: '+974 5555 3456',
      tier: 'dog-owner' as const,
      adultQty: 2,
      kidsQty: 1,
      petQty: 2,
      petName: 'Cooper',
      total: '115.00',
      status: 'USED' as const,
      paymentMethod: 'Visa ending in 5678',
      checkedIn: true,
      checkedInAt: new Date('2026-01-15T10:45:00Z'),
    },
    {
      id: '#NPV-2026-G7H8',
      fullName: 'James Smith',
      email: 'j.smith@example.com',
      phone: '+974 5555 7890',
      tier: 'adult' as const,
      adultQty: 1,
      kidsQty: 0,
      petQty: 0,
      petName: null,
      total: '25.00',
      status: 'PAID' as const,
      paymentMethod: 'Apple Pay',
    },
  ];

  for (const order of sampleOrders) {
    await db.insert(orders).values(order).onConflictDoNothing();
  }
  console.log(`✅ ${sampleOrders.length} sample orders created`);

  // ─── 3. Create Sample Registrations ──────────────────────────────────
  const sampleRegistrations = [
    {
      id: 'REG-001',
      orderId: '#NPV-2026-X8Y1',
      competitionType: 'dog-grooming' as const,
      competitionName: 'Grooming Competition',
      ownerName: 'Sarah Johnson',
      ownerPhone: '+974 5555 1234',
      ownerEmail: 'sarah.j@example.com',
      ownerAddress: 'Al Waab St, Doha, Qatar',
      petName: 'Luna',
      petBreed: 'Golden Retriever',
      petGender: 'Female' as const,
      experienceLevel: 'Professional' as const,
      previousTitles: 'National Art Winner 2024',
      status: 'Completed' as const,
    },
    {
      id: 'REG-002',
      orderId: '#NPV-2026-C3D4',
      competitionType: 'cat-fashion-show' as const,
      competitionName: 'Cat Fashion Show',
      ownerName: 'Emma Wilson',
      ownerPhone: '+974 5555 9012',
      ownerEmail: 'emma.w@example.com',
      petName: 'Oliver',
      petBreed: 'Persian',
      petGender: 'Male' as const,
      experienceLevel: 'Intermediate' as const,
      outfitDescription: 'Royal purple cape with gold trim',
      status: 'Pending' as const,
    },
    {
      id: 'REG-003',
      orderId: '#NPV-2026-C3D4',
      competitionType: 'cat-best-show' as const,
      competitionName: 'Best Looking Cat Show',
      ownerName: 'Emma Wilson',
      ownerPhone: '+974 5555 9012',
      ownerEmail: 'emma.w@example.com',
      petName: 'Oliver',
      petBreed: 'Persian',
      petGender: 'Male' as const,
      experienceLevel: 'Beginner' as const,
      status: 'Completed' as const,
    },
    {
      id: 'REG-004',
      orderId: '#NPV-2026-E5F6',
      competitionType: 'dog-best-in-show' as const,
      competitionName: 'Best Looking Dog Show',
      ownerName: 'David Rodriguez',
      ownerPhone: '+974 5555 3456',
      ownerEmail: 'd.rod@example.com',
      petName: 'Cooper',
      petBreed: 'Labrador',
      petGender: 'Male' as const,
      experienceLevel: 'Professional' as const,
      previousTitles: 'Qatar Best Dog 2025',
      status: 'Pending' as const,
    },
    {
      id: 'REG-005',
      orderId: '#NPV-2026-X8Y1',
      competitionType: 'cat-drawing-battle' as const,
      competitionName: 'Drawing Cat Battle',
      ownerName: 'Sarah Johnson',
      ownerPhone: '+974 5555 1234',
      ownerEmail: 'sarah.j@example.com',
      petName: 'Luna',
      petBreed: 'Golden Retriever',
      petGender: 'Female' as const,
      experienceLevel: 'Professional' as const,
      drawingMaterials: 'Graphite pencils, Charcoal, Arches 300gsm Paper',
      status: 'Completed' as const,
    },
  ];

  for (const reg of sampleRegistrations) {
    await db.insert(petRegistrations).values(reg).onConflictDoNothing();
  }
  console.log(`✅ ${sampleRegistrations.length} sample registrations created`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Admin Login: admin@petfestival.com / admin123');
}

seed().catch(console.error);
