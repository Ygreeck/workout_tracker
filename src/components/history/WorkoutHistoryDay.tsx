import React from 'react';
import { format } from 'date-fns';
import { Workout } from '../../types';
import { WorkoutExerciseCard } from './WorkoutExerciseCard';
import { Calendar } from 'lucide-react';
import { exercises } from '../../data/exercises';

interface WorkoutHistoryDayProps {
  workout: Workout;
  onDeleteExercise: (exerciseId: string) => void;
  onEditExercise: (exerciseId: string) => void;
}

export function WorkoutHistoryDay({
  workout,
  onDeleteExercise,
  onEditExercise
}: WorkoutHistoryDayProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Calendar size={120} />
        <span className="text-sm">
          {format(new Date(workout.date), 'MMMM do, yyyy')}
        </span>
      </div>

      <div className="space-y-2">
        {workout.exercises.map((workoutExercise) => {
          const exercise = exercises.find(e => e.id === workoutExercise.exerciseId)!;
          return (
            <WorkoutExerciseCard
              key={workoutExercise.exerciseId}
              exercise={exercise}
              sets={workoutExercise.sets}
              onDelete={() => onDeleteExercise(workoutExercise.exerciseId)}
              onEdit={() => onEditExercise(workoutExercise.exerciseId)}
            />
          );
        })}
      </div>
    </div>
  );
}