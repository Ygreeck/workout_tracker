import { useCallback } from 'react';
import { Exercise, WorkoutExercise } from '../types';

interface UseHistoryNavigationProps {
  onNavigateToExercise: (exerciseId: string) => void;
  onDeleteExercise: (exerciseId: string) => void;
}

export function useHistoryNavigation({
  onNavigateToExercise,
  onDeleteExercise
}: UseHistoryNavigationProps) {
  const handleExerciseSelect = useCallback((exerciseId: string) => {
    onNavigateToExercise(exerciseId);
  }, [onNavigateToExercise]);

  const handleExerciseDelete = useCallback((exerciseId: string) => {
    onDeleteExercise(exerciseId);
  }, [onDeleteExercise]);

  return {
    handleExerciseSelect,
    handleExerciseDelete
  };
}