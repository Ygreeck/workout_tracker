// Split types into domain-specific files
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroupId;
  primaryMuscle: MuscleId;
  secondaryMuscle: MuscleId[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export type { MuscleGroupId, MuscleId } from './muscle';