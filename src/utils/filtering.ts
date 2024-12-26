import { Exercise } from '../types';

export function filterByMuscleGroup(exercises: Exercise[], muscleGroup: string): Exercise[] {
  return exercises.filter(exercise => exercise.muscleGroup === muscleGroup);
}

export function filterByDifficulty(exercises: Exercise[], difficulty: string): Exercise[] {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
}

export function filterByEquipment(exercises: Exercise[], equipment: string): Exercise[] {
  return exercises.filter(exercise => exercise.equipment.includes(equipment));
}

export function searchExercises(exercises: Exercise[], query: string): Exercise[] {
  const searchTerm = query.toLowerCase().trim();
  return exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm) ||
    exercise.muscleGroup.toLowerCase().includes(searchTerm) ||
    exercise.description.toLowerCase().includes(searchTerm)
  );
}