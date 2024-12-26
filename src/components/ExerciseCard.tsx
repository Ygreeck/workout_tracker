import React from 'react';
import { Exercise } from '../types';
import { X, Target } from 'lucide-react';
import { getMuscleById } from '../data/muscles';

interface ExerciseCardProps {
  exercise: Exercise;
  onRemove: () => void;
}

export function ExerciseCard({ exercise, onRemove }: ExerciseCardProps) {
  const primaryMuscle = getMuscleById(exercise.primaryMuscle);
  const secondaryMuscles = exercise.secondaryMuscle
    .map((id) => getMuscleById(id))
    .filter(Boolean);

  return (
    <div className="flex items-center justify-between mb-6">
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
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                {exercise.muscleGroup.charAt(0).toUpperCase() +
                  exercise.muscleGroup.slice(1)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  exercise.difficulty === 'beginner'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : exercise.difficulty === 'intermediate'
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                }`}
              >
                {exercise.difficulty.charAt(0).toUpperCase() +
                  exercise.difficulty.slice(1)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
                <Target size={12} />
                <span className="font-medium">
                  Primary: {primaryMuscle?.name || exercise.primaryMuscle}
                </span>
              </div>
              {secondaryMuscles.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Secondary: {secondaryMuscles.map((m) => m?.name).join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
}
