export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroupId;
  primaryMuscle: MuscleId;
  secondaryMuscle: MuscleId[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export interface Set {
  weight: number;
  reps: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
}

export interface ExerciseStats {
  date: string;
  totalWeight: number;
  maxWeight: number;
  totalReps: number;
  totalSets: number;
}

export type MuscleGroupId = string;
export type MuscleId = string;

export interface Muscle {
  id: MuscleId;
  name: string;
  muscleGroups: MuscleGroupId[];
  description: string;
  imageUrl?: string;
}

export interface MuscleGroup {
  id: MuscleGroupId;
  name: string;
  description: string;
  color: string;
  imageUrl?: string;
}