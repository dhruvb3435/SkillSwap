import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  skillsTeach: z.array(z.string()).default([]),
  skillsLearn: z.array(z.string()).default([]),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().max(280).optional(),
  avatarUrl: z.string().url().optional(),
  timezone: z.string().optional(),
  skillsTeach: z.array(z.string()).optional(),
  skillsLearn: z.array(z.string()).optional(),
});

export const CreditTransferSchema = z.object({
  toUserId: z.string().min(1),
  amount: z.number().int().positive(),
});

export const MessageCreateSchema = z.object({
  content: z.string().min(1),
});

export const MatchQuerySchema = z.object({
  teach: z.string().optional(),
  learn: z.string().optional(),
});
