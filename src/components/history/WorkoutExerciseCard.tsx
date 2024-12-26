import React, { useState } from 'react';
import { Exercise, Set } from '../../types';
import { Pencil, Trash2, Trophy } from 'lucide-react';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';

interface WorkoutExerciseCardProps {
  exercise: Exercise;
  sets: Set[];
  isPR?: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export function WorkoutExerciseCard({
  exercise,
  sets,
  isPR = false,
  onDelete,
  onEdit
}: WorkoutExerciseCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const totalVolume = sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {exercise.name}
            </h3>
            {isPR && (
              <span className="flex items-center gap-1 text-yellow-500">
                <Trophy size={16} />
                <span className="text-sm font-medium">PR</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Edit exercise"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Delete exercise"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            {sets.map((set, idx) => (
              <div 
                key={idx}
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Set {idx + 1}: {set.weight}kg × {set.reps}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-end">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Volume
            </div>
            <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              {totalVolume}kg
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          onDelete();
          setShowDeleteDialog(false);
        }}
        title="Delete Exercise"
        icon={<Trash2 className="w-6 h-6 text-red-600" />}
      >
        <p>Are you sure you want to delete this exercise? This action cannot be undone.</p>
      </ConfirmationDialog>
    </div>
  );
}