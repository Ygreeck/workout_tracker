import React from 'react';
import { Exercise } from '../../types';
import { TrainingCard } from './TrainingCard';

interface TrainingCardGridProps {
  exercises: Exercise[];
  selectedExercises: string[];
  onExerciseSelect: (exercise: Exercise) => void;
  personalRecords?: Record<string, boolean>;
}

export function TrainingCardGrid({ 
  exercises, 
  selectedExercises, 
  onExerciseSelect,
  personalRecords = {}
}: TrainingCardGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {exercises.map(exercise => (
        <TrainingCard
          key={exercise.id}
          exercise={exercise}
          onSelect={() => onExerciseSelect(exercise)}
          isSelected={selectedExercises.includes(exercise.id)}
          personalRecord={personalRecords[exercise.id]}
        />
      ))}
    </div>
  );
}