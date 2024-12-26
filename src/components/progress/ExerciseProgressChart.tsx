import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { Exercise, Workout } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';
import { AlertCircle } from 'lucide-react';

interface ExerciseProgressChartProps {
  exercise: Exercise;
  workouts: Workout[];
  loading?: boolean;
}

export function ExerciseProgressChart({ exercise, workouts, loading = false }: ExerciseProgressChartProps): JSX.Element {
  const chartData = React.useMemo(() => {
    const relevantWorkouts = workouts
      .filter(workout => 
        workout.exercises.some(e => e.exerciseId === exercise.id)
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return relevantWorkouts.map(workout => {
      const exerciseData = workout.exercises.find(e => e.exerciseId === exercise.id)!;
      const totalVolume = exerciseData.sets.reduce((acc, set) => acc + (set.weight * set.reps), 0);
      const maxWeight = Math.max(...exerciseData.sets.map(set => set.weight));
      const avgWeight = exerciseData.sets.reduce((acc, set) => acc + set.weight, 0) / exerciseData.sets.length;

      return {
        date: format(new Date(workout.date), 'MMM d'),
        totalVolume,
        maxWeight,
        avgWeight: Math.round(avgWeight * 10) / 10,
        totalSets: exerciseData.sets.length,
        totalReps: exerciseData.sets.reduce((acc, set) => acc + set.reps, 0),
      };
    });
  }, [workouts, exercise.id]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <AlertCircle size={48} className="mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
        <p>Start logging this exercise to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
          Weight and Volume Progression
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis
                yAxisId="left"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                label={{
                  value: 'Weight (kg)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#6B7280' }
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                label={{
                  value: 'Volume (kg)',
                  angle: 90,
                  position: 'insideRight',
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
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="maxWeight"
                name="Max Weight"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="avgWeight"
                name="Avg Weight"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalVolume"
                name="Total Volume"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
          Sets and Reps Analysis
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSets"
                name="Total Sets"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: '#EF4444' }}
              />
              <Line
                type="monotone"
                dataKey="totalReps"
                name="Total Reps"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: '#F59E0B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}