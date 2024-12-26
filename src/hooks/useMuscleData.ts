import { useState, useMemo } from 'react';
import { Muscle, MuscleGroup, Exercise } from '../types';
import { muscles, muscleGroups, getMusclesByGroup, getMuscleGroups } from '../data/muscles';

export function useMuscleData() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const filteredMuscles = useMemo(() => {
    if (!selectedMuscleGroup) return muscles;
    return getMusclesByGroup(selectedMuscleGroup);
  }, [selectedMuscleGroup]);

  const muscleGroupsForMuscle = useMemo(() => {
    if (!selectedMuscle) return [];
    return getMuscleGroups(selectedMuscle);
  }, [selectedMuscle]);

  const getMuscleColor = (muscleId: string): string => {
    const muscle = muscles.find(m => m.id === muscleId);
    if (!muscle) return '#6B7280'; // Default gray color
    const primaryGroup = muscleGroups.find(g => g.id === muscle.muscleGroups[0]);
    return primaryGroup?.color || '#6B7280';
  };

  return {
    muscles,
    muscleGroups,
    selectedMuscleGroup,
    selectedMuscle,
    filteredMuscles,
    muscleGroupsForMuscle,
    setSelectedMuscleGroup,
    setSelectedMuscle,
    getMuscleColor,
  };
}