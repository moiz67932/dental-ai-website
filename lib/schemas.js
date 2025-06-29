import { z } from 'zod';

export const clinicProfileSchema = z.object({
  clinic_name: z.string().min(2, 'Clinic name must be at least 2 characters'),
  phone: z.string().regex(/^(\+?\d{10,15})$/, 'Please enter a valid phone number'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  time_zone: z.string().min(1, 'Time zone is required'),
  insurances: z.string().min(5, 'Please list at least a few insurance providers'),
});

export const integrationsSchema = z.object({
  gcal_refresh_token: z.string().optional(),
  gcal_id: z.string().optional(),
  send_whatsapp: z.boolean().default(false),
  wa_from: z.string().optional(),
});

export const reviewSchema = z.object({
  confirmed: z.boolean().refine(val => val === true, 'Please confirm to launch'),
  recording_consent: z.boolean().refine(val => val === true, 'You must consent to call recording for QA'),
});