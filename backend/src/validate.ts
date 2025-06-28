// src/validate.ts
import { z } from "zod";

export const smtpSchema = z.object({
  host: z.string().min(1),
  port: z.number().min(1),
  secure: z.boolean(),
  auth: z.object({
    user: z.string().min(1),
    pass: z.string().min(1),
  }),
  from: z.string().email().optional(),
  to: z.string().email().optional(),
});

export type SmtpPayload = z.infer<typeof smtpSchema>;
