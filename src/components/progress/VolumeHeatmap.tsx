import React from 'react';
import { format, eachDayOfInterval, subDays, isSameDay } from 'date-fns';
import { Workout } from '../../types';

interface VolumeHeatmapProps {
  workouts: Workout[];
  days?: number;
}

export function VolumeHeatmap({ workouts, days = 90 }: VolumeHeatmapProps): JSX.Element {
  const today = new Date();
  const startDate = subDays(today, days - 1);
  const dateRange = eachDayOfInterval({ start: startDate, end: today });

  const getVolumeForDate = (date: Date): number => {
    const workout = workouts.find(w => isSameDay(new Date(w.date), date));
    if (!workout) return 0;

    return workout.exercises.reduce((acc, exercise) => {
      return acc + exercise.sets.reduce((setAcc, set) => {
        return setAcc + (set.weight * set.reps);
      }, 0);
    }, 0);
  };

  const maxVolume = Math.max(...workouts.map(w => 
    w.exercises.reduce((acc, e) => 
      acc + e.sets.reduce((setAcc, set) => setAcc + (set.weight * set.reps), 0), 0)
  ));

  const getIntensityClass = (volume: number): string => {
    if (volume === 0) return 'bg-gray-100 dark:bg-gray-800';
    const intensity = (volume / maxVolume) * 100;
    if (intensity < 25) return 'bg-green-100 dark:bg-green-900/30';
    if (intensity < 50) return 'bg-green-200 dark:bg-green-800/40';
    if (intensity < 75) return 'bg-green-300 dark:bg-green-700/50';
    return 'bg-green-400 dark:bg-green-600/60';
  };

  const weeks = Math.ceil(dateRange.length / 7);

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Training Volume Heatmap
        </h3>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-gray-500 dark:text-gray-400">Less</span>
          <div className="flex gap-px h-2">
            <div className="w-2 rounded-sm bg-gray-100 dark:bg-gray-800" />
            <div className="w-2 rounded-sm bg-green-100 dark:bg-green-900/30" />
            <div className="w-2 rounded-sm bg-green-200 dark:bg-green-800/40" />
            <div className="w-2 rounded-sm bg-green-300 dark:bg-green-700/50" />
            <div className="w-2 rounded-sm bg-green-400 dark:bg-green-600/60" />
          </div>
          <span className="text-gray-500 dark:text-gray-400">More</span>
        </div>
      </div>

      <div className="flex text-center">
        <div className="w-6">
          {['M', 'W', 'F'].map(day => (
            <div key={day} className="h-3 text-[10px] text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-[repeat(13,1fr)] gap-px">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-px">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const date = dateRange[weekIndex * 7 + dayIndex];
                if (!date) return null;
                
                const volume = getVolumeForDate(date);
                return (
                  <div
                    key={dayIndex}
                    className={`h-3 w-3 ${getIntensityClass(volume)} rounded-sm`}
                    title={`${format(date, 'MMM d, yyyy')}: ${Math.round(volume)}kg`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}