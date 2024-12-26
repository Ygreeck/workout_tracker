import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Workout } from '../../types';
import { formatMuscleGroup } from '../../utils/formatting';
import { Activity, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

interface MuscleGroupProgressProps {
  workouts: Workout[];
  muscleGroup: string;
}

export function MuscleGroupProgress({ workouts, muscleGroup }: MuscleGroupProgressProps): JSX.Element {
  const stats = React.useMemo(() => {
    const muscleGroupWorkouts = workouts.filter(workout =>
      workout.exercises.some(exercise => exercise.muscleGroup === muscleGroup)
    );

    const totalWeight = muscleGroupWorkouts.reduce((acc, workout) => {
      return acc + workout.exercises
        .filter(exercise => exercise.muscleGroup === muscleGroup)
        .reduce((exerciseAcc, exercise) => 
          exerciseAcc + exercise.sets.reduce((setAcc, set) => setAcc + (set.weight * set.reps), 0)
        , 0);
    }, 0);

    const exerciseCount = new Set(
      muscleGroupWorkouts.flatMap(w => 
        w.exercises
          .filter(e => e.muscleGroup === muscleGroup)
          .map(e => e.exerciseId)
      )
    ).size;

    const avgWeightPerExercise = exerciseCount > 0 ? totalWeight / exerciseCount : 0;

    // Calculate progress trend
    const sortedWorkouts = [...muscleGroupWorkouts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const chartData = sortedWorkouts.map(workout => {
      const dailyVolume = workout.exercises
        .filter(exercise => exercise.muscleGroup === muscleGroup)
        .reduce((acc, exercise) => 
          acc + exercise.sets.reduce((setAcc, set) => setAcc + (set.weight * set.reps), 0)
        , 0);

      return {
        date: format(new Date(workout.date), 'MMM d'),
        volume: dailyVolume,
      };
    });

    // Calculate progress percentage
    const firstVolume = chartData[0]?.volume || 0;
    const lastVolume = chartData[chartData.length - 1]?.volume || 0;
    const progressPercentage = firstVolume > 0 
      ? ((lastVolume - firstVolume) / firstVolume) * 100 
      : 0;

    return {
      totalWeight,
      exerciseCount,
      avgWeightPerExercise,
      progressPercentage,
      chartData,
    };
  }, [workouts, muscleGroup]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {formatMuscleGroup(muscleGroup)} Progress
        </h3>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-sm font-medium ${
            stats.progressPercentage >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {stats.progressPercentage >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {Math.abs(stats.progressPercentage).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Activity size={20} />
            <span>Total Volume</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {Math.round(stats.totalWeight).toLocaleString()} kg
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <TrendingUp size={20} />
            <span>Exercises</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {stats.exerciseCount}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Activity size={20} />
            <span>Avg Weight/Exercise</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {Math.round(stats.avgWeightPerExercise).toLocaleString()} kg
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${muscleGroup}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#4F46E5"
              fill={`url(#gradient-${muscleGroup})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}