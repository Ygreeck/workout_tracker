import React from 'react';
import { Activity, TrendingUp, Calendar, Weight, Timer, Target } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { Workout } from '../../types';
import { exercises } from '../../data/exercises';

interface ProgressOverviewProps {
  workouts: Workout[];
}

export function ProgressOverview({ workouts }: ProgressOverviewProps): JSX.Element {
  const calculateStats = () => {
    const last30Days = subDays(new Date(), 30);
    const recentWorkouts = workouts.filter(w => new Date(w.date) >= last30Days);
    
    const totalVolume = recentWorkouts.reduce((acc, workout) => {
      return acc + workout.exercises.reduce((exerciseAcc, exercise) => {
        return exerciseAcc + exercise.sets.reduce((setAcc, set) => {
          return setAcc + (set.weight * set.reps);
        }, 0);
      }, 0);
    }, 0);

    const workoutFrequency = recentWorkouts.length;
    const avgVolumePerWorkout = workoutFrequency > 0 ? totalVolume / workoutFrequency : 0;
    
    const exerciseFrequency = new Map<string, number>();
    recentWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        exerciseFrequency.set(
          exercise.exerciseId,
          (exerciseFrequency.get(exercise.exerciseId) || 0) + 1
        );
      });
    });

    const mostFrequentExercise = Array.from(exerciseFrequency.entries())
      .sort((a, b) => b[1] - a[1])[0];

    const mostFrequentExerciseName = mostFrequentExercise
      ? exercises.find(e => e.id === mostFrequentExercise[0])?.name
      : 'None';

    return {
      totalVolume,
      workoutFrequency,
      avgVolumePerWorkout,
      mostFrequentExercise: mostFrequentExerciseName,
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workout Frequency</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.workoutFrequency}
          </span>
          <span className="text-gray-600 dark:text-gray-400">workouts</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Weight className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Volume</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(stats.totalVolume).toLocaleString()}
          </span>
          <span className="text-gray-600 dark:text-gray-400">kg</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Exercise</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most frequent</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {stats.mostFrequentExercise}
          </span>
        </div>
      </div>
    </div>
  );
}