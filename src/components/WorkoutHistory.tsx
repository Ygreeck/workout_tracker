import React, { useState } from 'react';
import { format } from 'date-fns';
import { Workout, WorkoutExercise } from '../types';
import { exercises } from '../data/exercises';
import { Calendar, Trophy } from 'lucide-react';
import { ExerciseHistoryEntry } from './history/ExerciseHistoryEntry';
import { WorkoutForm } from './WorkoutForm';
import { useWorkouts } from '../hooks/useWorkouts';

interface WorkoutHistoryProps {
  workouts: Workout[];
}

export function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const { updateWorkout } = useWorkouts();
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  const getPersonalRecord = (exerciseId: string, workoutId: string) => {
    const exerciseWorkouts = workouts
      .filter(w => w.exercises.some(e => e.exerciseId === exerciseId))
      .flatMap(w => w.exercises.filter(e => e.exerciseId === exerciseId));

    const currentWorkout = workouts
      .find(w => w.id === workoutId)
      ?.exercises.find(e => e.exerciseId === exerciseId);

    if (!currentWorkout) return false;

    const maxWeight = Math.max(...currentWorkout.sets.map(s => s.weight));
    const previousMaxWeight = Math.max(
      ...exerciseWorkouts
        .filter(e => workouts.find(w => w.exercises.includes(e))?.id !== workoutId)
        .flatMap(e => e.sets.map(s => s.weight))
    );

    return maxWeight > previousMaxWeight;
  };

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
  };

  const handleUpdateWorkout = async (updatedWorkout: Omit<Workout, 'id'>) => {
    if (!editingWorkout) return;
    
    await updateWorkout({
      ...updatedWorkout,
      id: editingWorkout.id
    });
    
    setEditingWorkout(null);
  };

  if (editingWorkout) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setEditingWorkout(null)}
          className="text-indigo-600 dark:text-indigo-400 font-medium"
        >
          ← Back to History
        </button>
        <WorkoutForm
          initialWorkout={editingWorkout}
          onSubmit={handleUpdateWorkout}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map(workout => (
        <div key={workout.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(workout.date), 'PPP')}
              </span>
            </div>
            <button
              onClick={() => handleEditWorkout(workout)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Edit Workout
            </button>
          </div>
          
          <div className="space-y-4">
            {workout.exercises.map((workoutExercise) => {
              const exercise = exercises.find(e => e.id === workoutExercise.exerciseId)!;
              const isPR = getPersonalRecord(workoutExercise.exerciseId, workout.id);
              
              return (
                <ExerciseHistoryEntry
                  key={workoutExercise.exerciseId}
                  exercise={exercise}
                  workoutExercise={workoutExercise}
                  onDelete={() => {
                    // Implement delete logic
                    console.log('Delete exercise:', workoutExercise.exerciseId);
                  }}
                  onEdit={() => {
                    handleEditWorkout(workout);
                  }}
                  onSelect={() => {
                    // Implement selection logic
                    console.log('Select exercise:', workoutExercise.exerciseId);
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}