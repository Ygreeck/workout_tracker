import { Exercise } from '../types';

export const DIFFICULTY_ORDER = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
} as const;

export function sortByDifficulty(a: Exercise, b: Exercise): number {
  return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
}

export function sortByMuscleGroup(a: Exercise, b: Exercise): number {
  return a.muscleGroup.localeCompare(b.muscleGroup);
}

export function sortExercises(exercises: Exercise[]): Exercise[] {
  return [...exercises].sort((a, b) => {
    const diffCompare = sortByDifficulty(a, b);
    return diffCompare !== 0 ? diffCompare : sortByMuscleGroup(a, b);
  });
}