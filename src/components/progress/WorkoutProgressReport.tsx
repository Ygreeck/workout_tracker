import React from 'react';
import { Workout } from '../../types';
import { MuscleGroupProgress } from './MuscleGroupProgress';
import { MuscleProgress } from './MuscleProgress';
import { muscleGroups, muscles } from '../../data/muscles';

interface WorkoutProgressReportProps {
  workouts: Workout[];
}

export function WorkoutProgressReport({ workouts }: WorkoutProgressReportProps): JSX.Element {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = React.useState<string | null>(null);

  const relevantMuscles = React.useMemo(() => {
    if (!selectedMuscleGroup) return [];
    return muscles.filter(muscle => 
      muscle.muscleGroups.includes(selectedMuscleGroup)
    );
  }, [selectedMuscleGroup]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {muscleGroups.map(group => (
          <button
            key={group.id}
            onClick={() => setSelectedMuscleGroup(
              selectedMuscleGroup === group.id ? null : group.id
            )}
            className={`p-4 rounded-lg transition-colors ${
              selectedMuscleGroup === group.id
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {group.description}
            </p>
          </button>
        ))}
      </div>

      {selectedMuscleGroup && (
        <>
          <MuscleGroupProgress
            workouts={workouts}
            muscleGroup={selectedMuscleGroup}
          />

          <div className="space-y-6">
            {relevantMuscles.map(muscle => (
              <MuscleProgress
                key={muscle.id}
                workouts={workouts}
                muscleId={muscle.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}