export interface DBWorkout {
  id: number;
  date: string;
  notes: string | null;
  created_at: string;
}

export interface DBWorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: string;
  order_index: number;
  created_at: string;
}

export interface DBExerciseSet {
  id: number;
  workout_exercise_id: number;
  weight: number;
  reps: number;
  set_index: number;
  created_at: string;
}