import React, { useState } from 'react';
import { Exercise, WorkoutExercise } from '../../types';
import { Trash2, ChevronRight, AlertCircle, Pencil } from 'lucide-react';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { formatSets } from '../../utils/formatting';

interface ExerciseHistoryEntryProps {
  exercise: Exercise;
  workoutExercise: WorkoutExercise;
  onDelete: () => void;
  onEdit: () => void;
  onSelect: () => void;
}

export function ExerciseHistoryEntry({
  exercise,
  workoutExercise,
  onDelete,
  onEdit,
  onSelect
}: ExerciseHistoryEntryProps): JSX.Element {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const totalVolume = workoutExercise.sets.reduce(
    (sum, set) => sum + set.weight * set.reps, 
    0
  );

  return (
    <>
      <div 
        onClick={onSelect}
        className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {exercise.name}
            </h4>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {formatSets(workoutExercise.sets)}
            </div>
            <div className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Total Volume: {totalVolume}kg
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              title="Edit exercise"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete exercise"
            >
              <Trash2 size={18} />
            </button>
            <ChevronRight 
              size={20} 
              className="text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors"
            />
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => {
          onDelete();
          setShowConfirmation(false);
        }}
        title="Delete Exercise"
        icon={<AlertCircle className="w-6 h-6 text-red-600" />}
      >
        <p>Are you sure you want to delete this exercise entry? This action cannot be undone.</p>
      </ConfirmationDialog>
    </>
  );
}