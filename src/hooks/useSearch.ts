import { useState, useCallback } from 'react';
import { Workout } from '../types';
import { searchWorkouts, getWorkoutsByExercise, getWorkoutsByMuscleGroup } from '../db';

export function useSearch() {
  const [results, setResults] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchResults = await searchWorkouts(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByExercise = useCallback(async (exerciseId: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchResults = await getWorkoutsByExercise(exerciseId);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByMuscleGroup = useCallback(async (muscleGroup: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchResults = await getWorkoutsByMuscleGroup(muscleGroup);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    search,
    searchByExercise,
    searchByMuscleGroup,
  };
}