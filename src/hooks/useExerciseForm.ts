import { useState, useEffect } from 'react';
import { Exercise, Set, WorkoutExercise } from '../types';

const DEFAULT_SET = { weight: 0, reps: 0 };

export function useExerciseForm(initialExercises?: WorkoutExercise[]) {
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>(initialExercises || []);

  useEffect(() => {
    if (initialExercises) {
      setSelectedExercises(initialExercises);
    }
  }, [initialExercises]);

  const addExercise = (exercise: Exercise) => {
    if (!selectedExercises.some(e => e.exerciseId === exercise.id)) {
      setSelectedExercises(prev => [
        ...prev,
        {
          exerciseId: exercise.id,
          sets: [{ ...DEFAULT_SET }]
        }
      ]);
    }
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(prev => prev.filter(e => e.exerciseId !== exerciseId));
  };

  const addSet = (exerciseIndex: number) => {
    setSelectedExercises(prev => {
      const updated = [...prev];
      updated[exerciseIndex] = {
        ...updated[exerciseIndex],
        sets: [...updated[exerciseIndex].sets, { ...DEFAULT_SET }]
      };
      return updated;
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setSelectedExercises(prev => {
      const updated = [...prev];
      if (updated[exerciseIndex].sets.length > 1) {
        updated[exerciseIndex] = {
          ...updated[exerciseIndex],
          sets: updated[exerciseIndex].sets.filter((_, i) => i !== setIndex)
        };
      }
      return updated;
    });
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof Set,
    value: number
  ) => {
    setSelectedExercises(prev => {
      const updated = [...prev];
      updated[exerciseIndex] = {
        ...updated[exerciseIndex],
        sets: updated[exerciseIndex].sets.map((set, i) =>
          i === setIndex ? { ...set, [field]: value } : set
        )
      };
      return updated;
    });
  };

  const duplicateLastSet = (exerciseIndex: number) => {
    setSelectedExercises(prev => {
      const updated = [...prev];
      const exercise = updated[exerciseIndex];
      const lastSet = exercise.sets[exercise.sets.length - 1];
      
      if (lastSet) {
        updated[exerciseIndex] = {
          ...exercise,
          sets: [...exercise.sets, { ...lastSet }]
        };
      }
      
      return updated;
    });
  };

  const resetForm = () => {
    setSelectedExercises([]);
  };

  return {
    selectedExercises,
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    updateSet,
    duplicateLastSet,
    resetForm,
  };
}