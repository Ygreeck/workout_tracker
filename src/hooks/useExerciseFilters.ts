import { useState, useMemo } from 'react';
import { Exercise } from '../types';
import { filterByMuscleGroup, filterByDifficulty, searchExercises } from '../utils/filtering';
import { sortExercises } from '../utils/sorting';

interface UseExerciseFiltersProps {
  exercises: Exercise[];
}

export function useExerciseFilters({ exercises }: UseExerciseFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredExercises = useMemo(() => {
    let filtered = [...exercises];

    if (searchQuery) {
      filtered = searchExercises(filtered, searchQuery);
    }

    if (selectedMuscleGroup !== 'all') {
      filtered = filterByMuscleGroup(filtered, selectedMuscleGroup);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filterByDifficulty(filtered, selectedDifficulty);
    }

    return sortExercises(filtered);
  }, [exercises, searchQuery, selectedMuscleGroup, selectedDifficulty]);

  return {
    searchQuery,
    setSearchQuery,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredExercises,
  };
}