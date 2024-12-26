import React from 'react';
import { ExerciseStats } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Area, AreaChart } from 'recharts';
import { format } from 'date-fns';
import { TrendingUp, Calendar, Activity, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ProgressOverview } from './progress/ProgressOverview';
import { VolumeHeatmap } from './progress/VolumeHeatmap';
import { useWorkouts } from '../hooks/useWorkouts';

interface ProgressChartsProps {
  exerciseStats: ExerciseStats[];
  title: string;
  loading?: boolean;
}

export function ProgressCharts({ exerciseStats, title, loading = false }: ProgressChartsProps): JSX.Element {
  const { workouts } = useWorkouts();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!exerciseStats?.length) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <AlertCircle size={48} className="mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
        <p>Start logging workouts to see your progress!</p>
      </div>
    );
  }

  const data = exerciseStats.map(stat => ({
    ...stat,
    date: format(new Date(stat.date), 'MMM d'),
  }));

  return (
    <div className="space-y-6">
      <ProgressOverview workouts={workouts} />
      
      <VolumeHeatmap workouts={workouts} />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {title} Weight Progress
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="totalWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="maxWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="totalWeight"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#totalWeight)"
                name="Total Volume"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="maxWeight"
                stroke="#059669"
                fillOpacity={1}
                fill="url(#maxWeight)"
                name="Max Weight"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {title} Volume Distribution
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              <Bar
                dataKey="totalSets"
                name="Sets"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="totalReps"
                name="Total Reps"
                fill="#059669"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}