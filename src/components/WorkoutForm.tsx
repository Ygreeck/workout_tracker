import React, { useState } from 'react';
import { Exercise, Workout } from '../types';
import { exercises } from '../data/exercises';
import { Save, Calendar } from 'lucide-react';
import { TrainingCardGrid } from './cards/TrainingCardGrid';
import { ExerciseSetManager } from './ExerciseSetManager';
import { useExerciseForm } from '../hooks/useExerciseForm';
import { format } from 'date-fns';

interface WorkoutFormProps {
  initialWorkout?: Workout;
  onSubmit: (workout: Omit<Workout, 'id'>) => void;
}

export function WorkoutForm({ initialWorkout, onSubmit }: WorkoutFormProps) {
  const [workoutDate, setWorkoutDate] = useState(
    initialWorkout ? format(new Date(initialWorkout.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  );
  const [showExerciseSelector, setShowExerciseSelector] = useState(!initialWorkout);
  const {
    selectedExercises,
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    updateSet,
    duplicateLastSet,
    resetForm,
    initializeExercises,
  } = useExerciseForm(initialWorkout?.exercises);

  const handleExerciseSelect = (exercise: Exercise) => {
    addExercise(exercise);
    setShowExerciseSelector(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExercises.length === 0) return;

    const workout = {
      date: new Date(workoutDate).toISOString(),
      exercises: selectedExercises,
    };
    onSubmit(workout);
    resetForm();
    setWorkoutDate(format(new Date(), 'yyyy-MM-dd'));
  };

  const isValidWorkout =
    selectedExercises.length > 0 &&
    selectedExercises.every(
      (exercise) =>
        exercise.sets.length > 0 &&
        exercise.sets.every((set) => set.weight > 0 && set.reps > 0)
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {initialWorkout ? 'Edit Workout' : 'Log Workout'}
          </h2>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500 dark:text-gray-400" size={20} />
            <input
              type="date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              max={format(new Date(), 'yyyy-MM-dd')}
              className="px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowExerciseSelector(!showExerciseSelector)}
          className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {showExerciseSelector ? 'Hide Exercise List' : 'Show Exercise List'}
        </button>

        {showExerciseSelector && (
          <div className="mt-4">
            <TrainingCardGrid
              exercises={exercises}
              selectedExercises={selectedExercises.map((e) => e.exerciseId)}
              onExerciseSelect={handleExerciseSelect}
            />
          </div>
        )}
      </div>

      {selectedExercises.map((exerciseData, index) => {
        const exerciseDetails = exercises.find(
          (e) => e.id === exerciseData.exerciseId
        )!;
        return (
          <ExerciseSetManager
            key={exerciseData.exerciseId}
            exercise={exerciseDetails}
            sets={exerciseData.sets}
            onUpdateSet={(setIndex, field, value) =>
              updateSet(index, setIndex, field, value)
            }
            onAddSet={() => addSet(index)}
            onRemoveSet={(setIndex) => removeSet(index, setIndex)}
            onRemoveExercise={() => removeExercise(exerciseData.exerciseId)}
            onDuplicateLastSet={() => duplicateLastSet(index)}
          />
        );
      })}

      {selectedExercises.length > 0 && (
        <button
          type="submit"
          disabled={!isValidWorkout}
          className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-lg
            ${
              isValidWorkout
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
        >
          <Save size={20} />
          {initialWorkout ? 'Update Workout' : 'Save Workout'}
        </button>
      )}
    </form>
  );
}