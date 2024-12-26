import { z } from 'zod';

export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  muscleGroup: z.string(),
  primaryMuscle: z.string(),
  secondaryMuscle: z.array(z.string()),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  imageUrl: z.string().url()
});

export type Exercise = z.infer<typeof exerciseSchema>;