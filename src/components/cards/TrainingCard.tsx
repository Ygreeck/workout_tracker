import React from 'react';
import { Exercise } from '../../types';
import { ArrowUp, Trophy } from 'lucide-react';
import { formatMuscleGroup } from '../../utils/exerciseFormatting';
import { getDifficultyStars, getMuscleIcon } from '../../utils/exerciseIcons';

interface TrainingCardProps {
  exercise: Exercise;
  onSelect: () => void;
  isSelected?: boolean;
  personalRecord?: boolean;
}

export function TrainingCard({ 
  exercise, 
  onSelect, 
  isSelected = false,
  personalRecord = false 
}: TrainingCardProps): JSX.Element {
  const formattedMuscleGroup = formatMuscleGroup(exercise.muscleGroup);
  const difficultyStars = getDifficultyStars(exercise.difficulty);
  const muscleIcon = getMuscleIcon(exercise.muscleGroup);

  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-3 rounded-lg transition-all duration-200
        ${isSelected 
          ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {exercise.name}
            </h3>
            {personalRecord && (
              <Trophy size={14} className="text-yellow-500" />
            )}
          </div>

          <div className="mt-1 space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-0.5">
                {difficultyStars}
              </div>
              <span className="mx-1">·</span>
              {muscleIcon}
              <span>{formattedMuscleGroup}</span>
            </div>
          </div>
        </div>

        {isSelected && (
          <ArrowUp size={16} className="text-indigo-600 dark:text-indigo-400" />
        )}
      </div>
    </button>
  );
}