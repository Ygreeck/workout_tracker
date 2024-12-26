import { initDatabase } from './storage';
import { Workout } from '../types';

export async function createWorkout(workout: Workout): Promise<void> {
  const db = await initDatabase();
  const tx = db.transaction('workouts', 'readwrite');
  await tx.store.add(workout);
  await createBackup();
}

export async function getWorkouts(): Promise<Workout[]> {
  const db = await initDatabase();
  return db.getAllFromIndex('workouts', 'by-date');
}

export async function searchWorkouts(query: string): Promise<Workout[]> {
  const db = await initDatabase();
  const workouts = await db.getAllFromIndex('workouts', 'by-date');
  
  return workouts.filter(workout => {
    const searchStr = `${workout.id} ${workout.date} ${
      workout.exercises.map(e => e.exerciseId).join(' ')
    }`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });
}

export async function getWorkoutsByExercise(exerciseId: string): Promise<Workout[]> {
  const db = await initDatabase();
  return db.getAllFromIndex('workouts', 'by-exercise', exerciseId);
}

export async function getWorkoutsByMuscleGroup(muscleGroup: string): Promise<Workout[]> {
  const db = await initDatabase();
  return db.getAllFromIndex('workouts', 'by-muscle-group', muscleGroup);
}

export async function deleteWorkout(id: string): Promise<void> {
  const db = await initDatabase();
  const tx = db.transaction('workouts', 'readwrite');
  await tx.store.delete(id);
  await createBackup();
}

// Backup functionality
async function createBackup(): Promise<void> {
  const db = await initDatabase();
  const workouts = await getWorkouts();
  
  const tx = db.transaction('backup', 'readwrite');
  await tx.store.add({
    timestamp: Date.now(),
    data: workouts,
  });
  
  // Keep only last 5 backups
  const backups = await tx.store.getAllKeys();
  if (backups.length > 5) {
    const oldestBackups = backups.slice(0, backups.length - 5);
    await Promise.all(oldestBackups.map(key => tx.store.delete(key)));
  }
}

export async function restoreFromBackup(timestamp: number): Promise<void> {
  const db = await initDatabase();
  const backup = await db.get('backup', timestamp);
  
  if (!backup) {
    throw new Error('Backup not found');
  }
  
  const tx = db.transaction('workouts', 'readwrite');
  await tx.store.clear();
  await Promise.all(backup.data.map(workout => tx.store.add(workout)));
}