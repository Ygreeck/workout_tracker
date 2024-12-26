import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Workout } from '../../types';
import { getMuscleById } from '../../data/muscles';
import { Target, TrendingUp } from 'lucide-react';

interface MuscleProgressProps {
  workouts: Workout[];
  muscleId: string;
}

export function MuscleProgress({ workouts, muscleId }: MuscleProgressProps): JSX.Element {
  const muscle = getMuscleById(muscleId);
  
  const stats = React.useMemo(() => {
    const relevantWorkouts = workouts.filter(workout =>
      workout.exercises.some(exercise => 
        exercise.primaryMuscle === muscleId || 
        exercise.secondaryMuscle.includes(muscleId)
      )
    );

    const exerciseFrequency = relevantWorkouts.length;

    const maxWeights = relevantWorkouts.map(workout => {
      const maxWeight = Math.max(...workout.exercises
        .filter(exercise => 
          exercise.primaryMuscle === muscleId || 
          exercise.secondaryMuscle.includes(muscleId)
        )
        .flatMap(exercise => exercise.sets.map(set => set.weight))
      );

      return {
        date: format(new Date(workout.date), 'MMM d'),
        weight: maxWeight,
      };
    });

    const volumeProgression = relevantWorkouts.map(workout => {
      const volume = workout.exercises
        .filter(exercise => 
          exercise.primaryMuscle === muscleId || 
          exercise.secondaryMuscle.includes(muscleId)
        )
        .reduce((acc, exercise) => 
          acc + exercise.sets.reduce((setAcc, set) => setAcc + (set.weight * set.reps), 0)
        , 0);

      return {
        date: format(new Date(workout.date), 'MMM d'),
        volume,
      };
    });

    return {
      exerciseFrequency,
      maxWeights,
      volumeProgression,
    };
  }, [workouts, muscleId]);

  if (!muscle) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {muscle.name}
        </h4>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Target size={16} />
          <span className="text-sm">
            Trained {stats.exerciseFrequency} times
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            Maximum Weight Progression
          </h5>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.maxWeights}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis
                  tick={{ fill: '#6B7280' }}
                  label={{ 
                    value: 'Weight (kg)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#6B7280' }
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            Volume Progression
          </h5>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.volumeProgression}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis
                  tick={{ fill: '#6B7280' }}
                  label={{ 
                    value: 'Volume (kg)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#6B7280' }
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}