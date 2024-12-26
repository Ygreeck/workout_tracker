import React from 'react';
import { Exercise, Set } from '../types';
import { SetInput } from './SetInput';
import { Dumbbell, Trash2 } from 'lucide-react';

interface ExerciseSetManagerProps {
  exercise: Exercise;
  sets: Set[];
  onUpdateSet: (index: number, field: keyof Set, value: number) => void;
  onAddSet: () => void;
  onRemoveSet: (index: number) => void;
  onRemoveExercise: () => void;
  onDuplicateLastSet: () => void;
}

export function ExerciseSetManager({
  exercise,
  sets,
  onUpdateSet,
  onAddSet,
  onRemoveSet,
  onRemoveExercise,
  onDuplicateLastSet,
}: ExerciseSetManagerProps) {
  if (!exercise) {
    return null;
  }

  const totalVolume = sets.reduce((acc, set) => acc + set.weight * set.reps, 0);

  const formatMuscleGroup = (group: string): string => {
    return group.charAt(0).toUpperCase() + group.slice(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {exercise.name}
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                {formatMuscleGroup(exercise.muscleGroup)}
              </span>
              {exercise.secondaryMuscle.map(muscle => (
                <span 
                  key={muscle} 
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {formatMuscleGroup(muscle)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={onRemoveExercise}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Remove exercise"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="border-t dark:border-gray-700 pt-6">
        <SetInput
          sets={sets}
          onUpdateSet={onUpdateSet}
          onAddSet={onAddSet}
          onRemoveSet={onRemoveSet}
          onDuplicateLastSet={onDuplicateLastSet}
        />
      </div>

      <div className="border-t dark:border-gray-700 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Dumbbell size={20} />
            <span className="font-medium">Total Volume</span>
          </div>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {totalVolume} kg
          </span>
        </div>
      </div>
    </div>
  );
}