import { openDB, IDBPDatabase } from 'idb';
import { WorkoutDBSchema, DB_VERSION, DB_NAME } from './schema';
import { Workout } from '../types';

let db: IDBPDatabase<WorkoutDBSchema>;

export async function initDatabase(): Promise<IDBPDatabase<WorkoutDBSchema>> {
  if (!db) {
    db = await openDB<WorkoutDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion) {
        if (oldVersion < 1) {
          const workoutStore = db.createObjectStore('workouts', { keyPath: 'id' });
          
          // Create indexes for efficient querying
          workoutStore.createIndex('by-date', 'date');
          workoutStore.createIndex('by-exercise', 'exercises.exerciseId', { multiEntry: true });
          workoutStore.createIndex('by-muscle-group', 'exercises.muscleGroup', { multiEntry: true });
          
          // Create backup store
          db.createObjectStore('backup', { keyPath: 'timestamp' });
        }
      },
      blocked() {
        console.error('Database upgrade blocked. Please close other tabs/windows.');
      },
      blocking() {
        db?.close();
      },
      terminated() {
        console.error('Database connection terminated unexpectedly.');
      },
    });
  }
  return db;
}