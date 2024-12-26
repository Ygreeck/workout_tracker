import { Set } from '../types';

export function formatSets(sets: Set[]): string {
  return sets.map((set, index) => 
    `Set ${index + 1}: ${set.weight}kg × ${set.reps}`
  ).join(' | ');
}