import React from 'react';
import { ExerciseStats } from '../../types';
import { ExerciseProgressChart } from './ExerciseProgressChart';
import { ProgressOverview } from './ProgressOverview';
import { VolumeHeatmap } from './VolumeHeatmap';
import { useWorkouts } from '../../hooks/useWorkouts';
import { exercises } from '../../data/exercises';

interface ProgressChartsProps {
  exerciseStats: ExerciseStats[];
  title: string;
  loading?: boolean;
}

export function ProgressCharts({ exerciseStats, title, loading = false }: ProgressChartsProps): JSX.Element {
  const { workouts } = useWorkouts();
  const exercise = exercises.find(e => e.name === title);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return (
    <div className="space-y-6">
      <ProgressOverview workouts={workouts} />
      <VolumeHeatmap workouts={workouts} />
      <ExerciseProgressChart
        exercise={exercise}
        workouts={workouts}
        loading={loading}
      />
    </div>
  );
}