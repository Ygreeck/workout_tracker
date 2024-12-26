import { Exercise } from '../../types';
import { chestExercises } from './chest';
import { backExercises } from './back';
import { shoulderExercises } from './shoulders';
import { armExercises } from './arms';
import { legExercises } from './legs';
import { coreExercises } from './core';
import { sortExercises } from '../../utils/sorting';
import { filterByMuscleGroup, filterByDifficulty } from '../../utils/filtering';

export const exercises: Exercise[] = sortExercises([
  ...chestExercises,
  ...backExercises,
  ...shoulderExercises,
  ...armExercises,
  ...legExercises,
  ...coreExercises,
]);

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return sortExercises(filterByMuscleGroup(exercises, muscleGroup));
};

export const getExercisesByDifficulty = (difficulty: string): Exercise[] => {
  return filterByDifficulty(exercises, difficulty);
};

export * from './chest';
export * from './back';
export * from './shoulders';
export * from './arms';
export * from './legs';
export * from './core';