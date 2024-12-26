import React from 'react';
import { formatMuscleGroup } from '../../utils/exerciseFormatting';

interface ExerciseFiltersProps {
  selectedMuscleGroup: string;
  selectedDifficulty: string;
  onMuscleGroupChange: (group: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  muscleGroups: string[];
  difficulties: string[];
}

export function ExerciseFilters({
  selectedMuscleGroup,
  selectedDifficulty,
  onMuscleGroupChange,
  onDifficultyChange,
  muscleGroups,
  difficulties
}: ExerciseFiltersProps): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        value={selectedMuscleGroup}
        onChange={(e) => onMuscleGroupChange(e.target.value)}
        className="px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="all">All Muscle Groups</option>
        {muscleGroups.map(group => (
          <option key={group} value={group}>
            {formatMuscleGroup(group)}
          </option>
        ))}
      </select>
      <select
        value={selectedDifficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="all">All Difficulties</option>
        {difficulties.map(difficulty => (
          <option key={difficulty} value={difficulty}>
            {formatMuscleGroup(difficulty)}
          </option>
        ))}
      </select>
    </div>
  );
}