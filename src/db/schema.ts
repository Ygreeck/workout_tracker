import { DBSchema } from 'idb';
import { Workout, WorkoutExercise } from '../types';

export interface WorkoutDBSchema extends DBSchema {
  workouts: {
    key: string;
    value: Workout;
    indexes: {
      'by-date': string;
      'by-exercise': string[];
      'by-muscle-group': string;
    };
  };
  backup: {
    key: string;
    value: {
      timestamp: number;
      data: Workout[];
    };
  };
}

export const DB_VERSION = 1;
export const DB_NAME = 'workout-tracker';