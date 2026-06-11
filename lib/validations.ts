import { z } from 'zod'

export const registerSchema = z.object({
  clinicName: z.string().min(2, 'Nom trop court').max(100, 'Nom trop long').trim(),
  sector: z.enum(['clinique','garage','immobilier','ecole','avocat','salon','hotel','restaurant','autre']),
  email: z.string().email('Email invalide').toLowerCase(),
  password: z.string().min(8, 'Min. 8 caractères').max(100),
})

export const loginSchema = z.object({
  email: z.string().email('Email invalide').toLowerCase(),
  password: z.string().min(1, 'Mot de passe requis'),
})

export const clientSchema = z.object({
  name: z.string().min(2, 'Nom requis').max(100).trim(),
  phone: z.string().max(20).optional().or(z.literal('')),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  status: z.enum(['LEAD','ACTIVE','INACTIVE']).optional().default('LEAD'),
  notes: z.string().max(2000).optional().or(z.literal('')),
})

export const appointmentSchema = z.object({
  patientName: z.string().min(2, 'Nom requis').max(100).trim(),
  phone: z.string().max(20).optional().or(z.literal('')),
  datetime: z.string().refine(v => !isNaN(Date.parse(v)), 'Date invalide'),
  type: z.string().min(1).max(50).default('Consultation'),
  status: z.enum(['PENDING','CONFIRMED','CANCELED','DONE','NO_SHOW']).optional().default('PENDING'),
  notes: z.string().max(2000).optional().or(z.literal('')),
  clientId: z.string().cuid().optional().or(z.literal('')),
})

export const clinicUpdateSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  sector: z.string().max(50),
  phone: z.string().max(20).optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().max(200).optional().or(z.literal('')),
  city: z.string().max(100),
  hours: z.string().max(200),
  price: z.string().max(100),
})

export const invoiceSchema = z.object({
  clientId: z.string().cuid().optional().or(z.literal('')),
  clientName: z.string().min(1).max(100),
  amount: z.number().positive('Montant invalide'),
  description: z.string().max(500),
  dueDate: z.string().optional(),
  status: z.enum(['DRAFT','SENT','PAID','OVERDUE']).default('DRAFT'),
})

export const teamMemberSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(['ADMIN','MANAGER','AGENT','VIEWER']).default('AGENT'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type ClientInput = z.infer<typeof clientSchema>
export type AppointmentInput = z.infer<typeof appointmentSchema>
export type ClinicUpdateInput = z.infer<typeof clinicUpdateSchema>
export type InvoiceInput = z.infer<typeof invoiceSchema>
export type TeamMemberInput = z.infer<typeof teamMemberSchema>
