import { useState, useEffect, useCallback, useRef } from 'react';
import { Workout, ExerciseStats } from '../types';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { createWorkout, getWorkouts, deleteWorkout } from '../db';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState<Record<string, boolean>>({});
  const [exerciseStats, setExerciseStats] = useState<Record<string, ExerciseStats[]>>({});
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    loadWorkouts();
    return () => {
      mounted.current = false;
    };
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getWorkouts();
      if (!mounted.current) return;
      
      setWorkouts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setError(null);
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to load workouts');
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  const addWorkout = async (workout: Omit<Workout, 'id'>) => {
    try {
      const newWorkout = {
        ...workout,
        id: crypto.randomUUID()
      };
      await createWorkout(newWorkout);
      if (!mounted.current) return;
      
      await loadWorkouts();
      workout.exercises.forEach(exercise => {
        delete exerciseStats[exercise.exerciseId];
      });
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to add workout');
    }
  };

  const updateWorkout = async (updatedWorkout: Workout) => {
    try {
      const workoutIndex = workouts.findIndex(w => w.id === updatedWorkout.id);
      if (workoutIndex === -1) return;

      const newWorkouts = [...workouts];
      newWorkouts[workoutIndex] = updatedWorkout;
      if (!mounted.current) return;
      
      setWorkouts(newWorkouts);
      await createWorkout(updatedWorkout);

      updatedWorkout.exercises.forEach(exercise => {
        delete exerciseStats[exercise.exerciseId];
      });
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to update workout');
    }
  };

  const removeWorkout = async (id: string) => {
    try {
      await deleteWorkout(id);
      if (!mounted.current) return;
      
      await loadWorkouts();
      setExerciseStats({});
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to delete workout');
    }
  };

  const getExerciseStats = useCallback(async (exerciseId: string): Promise<ExerciseStats[]> => {
    try {
      if (exerciseStats[exerciseId]) {
        return exerciseStats[exerciseId];
      }

      if (!mounted.current) return [];
      setStatsLoading(prev => ({ ...prev, [exerciseId]: true }));
      
      const relevantWorkouts = workouts
        .filter(workout => workout.exercises.some(e => e.exerciseId === exerciseId))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const stats = relevantWorkouts.map(workout => {
        const exercise = workout.exercises.find(e => e.exerciseId === exerciseId)!;
        const totalWeight = exercise.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
        const maxWeight = Math.max(...exercise.sets.map(set => set.weight));
        
        return {
          date: workout.date,
          totalWeight,
          maxWeight,
          totalSets: exercise.sets.length,
          totalReps: exercise.sets.reduce((sum, set) => sum + set.reps, 0)
        };
      });
      
      if (!mounted.current) return stats;
      setExerciseStats(prev => ({ ...prev, [exerciseId]: stats }));
      return stats;
    } catch (err) {
      if (!mounted.current) return [];
      setError(err instanceof Error ? err.message : 'Failed to get exercise stats');
      return [];
    } finally {
      if (mounted.current) {
        setStatsLoading(prev => ({ ...prev, [exerciseId]: false }));
      }
    }
  }, [workouts, exerciseStats]);

  const getWeeklyProgress = useCallback((muscleGroup: string) => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    return workouts
      .filter(workout => {
        const workoutDate = new Date(workout.date);
        return isWithinInterval(workoutDate, { start: weekStart, end: weekEnd });
      })
      .reduce((acc, workout) => {
        const totalWeight = workout.exercises.reduce((sum, exercise) => {
          return sum + exercise.sets.reduce((setSum, set) => setSum + (set.weight * set.reps), 0);
        }, 0);
        return acc + totalWeight;
      }, 0);
  }, [workouts]);

  return {
    workouts,
    loading,
    error,
    statsLoading,
    addWorkout,
    updateWorkout,
    removeWorkout,
    getExerciseStats,
    getWeeklyProgress,
  };
}