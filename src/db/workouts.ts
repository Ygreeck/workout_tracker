import db from './index';
import { DBWorkout, DBWorkoutExercise, DBExerciseSet } from './types';
import { Workout, WorkoutExercise } from '../types';

export const workoutQueries = {
  // Create a new workout
  createWorkout: db.prepare(`
    INSERT INTO workouts (date, notes)
    VALUES (@date, @notes)
    RETURNING *
  `),

  // Add exercise to workout
  addWorkoutExercise: db.prepare(`
    INSERT INTO workout_exercises (workout_id, exercise_id, order_index)
    VALUES (@workout_id, @exercise_id, @order_index)
    RETURNING *
  `),

  // Add set to exercise
  addExerciseSet: db.prepare(`
    INSERT INTO exercise_sets (workout_exercise_id, weight, reps, set_index)
    VALUES (@workout_exercise_id, @weight, @reps, @set_index)
    RETURNING *
  `),

  // Get workout by ID with all related data
  getWorkoutById: db.prepare(`
    SELECT 
      w.*,
      json_group_array(
        json_object(
          'id', we.id,
          'exercise_id', we.exercise_id,
          'sets', (
            SELECT json_group_array(
              json_object(
                'weight', es.weight,
                'reps', es.reps,
                'set_index', es.set_index
              )
            )
            FROM exercise_sets es
            WHERE es.workout_exercise_id = we.id
            ORDER BY es.set_index
          )
        )
      ) as exercises
    FROM workouts w
    LEFT JOIN workout_exercises we ON we.workout_id = w.id
    WHERE w.id = ?
    GROUP BY w.id
  `),

  // Get all workouts with basic info
  getAllWorkouts: db.prepare(`
    SELECT * FROM workouts
    ORDER BY date DESC
  `),

  // Delete workout and all related data
  deleteWorkout: db.prepare(`
    DELETE FROM workouts WHERE id = ?
  `),

  // Update workout
  updateWorkout: db.prepare(`
    UPDATE workouts
    SET date = @date,
        notes = @notes
    WHERE id = @id
    RETURNING *
  `),

  // Get exercise stats
  getExerciseStats: db.prepare(`
    SELECT 
      w.date,
      SUM(es.weight * es.reps) as total_weight,
      MAX(es.weight) as max_weight,
      COUNT(es.id) as total_sets,
      SUM(es.reps) as total_reps
    FROM workouts w
    JOIN workout_exercises we ON we.workout_id = w.id
    JOIN exercise_sets es ON es.workout_exercise_id = we.id
    WHERE we.exercise_id = ?
    GROUP BY w.id
    ORDER BY w.date
  `)
};

export function createWorkout(workout: Workout): DBWorkout {
  const result = db.transaction(() => {
    // Create workout
    const dbWorkout = workoutQueries.createWorkout.get({
      date: workout.date,
      notes: null
    }) as DBWorkout;

    // Add exercises and sets
    workout.exercises.forEach((exercise, index) => {
      const dbExercise = workoutQueries.addWorkoutExercise.get({
        workout_id: dbWorkout.id,
        exercise_id: exercise.exerciseId,
        order_index: index
      }) as DBWorkoutExercise;

      exercise.sets.forEach((set, setIndex) => {
        workoutQueries.addExerciseSet.get({
          workout_exercise_id: dbExercise.id,
          weight: set.weight,
          reps: set.reps,
          set_index: setIndex
        });
      });
    });

    return dbWorkout;
  })();

  return result;
}

export function getWorkout(id: number): Workout | null {
  const result = workoutQueries.getWorkoutById.get(id);
  if (!result) return null;

  const exercises = JSON.parse(result.exercises);
  return {
    id: result.id.toString(),
    date: result.date,
    exercises: exercises.map((e: any) => ({
      exerciseId: e.exercise_id,
      sets: e.sets
    }))
  };
}

export function getAllWorkouts(): Workout[] {
  const workouts = workoutQueries.getAllWorkouts.all();
  return workouts.map(w => ({
    id: w.id.toString(),
    date: w.date,
    exercises: []
  }));
}

export function deleteWorkout(id: number): void {
  workoutQueries.deleteWorkout.run(id);
}

export function updateWorkout(workout: Workout & { id: number }): DBWorkout {
  return workoutQueries.updateWorkout.get({
    id: workout.id,
    date: workout.date,
    notes: null
  }) as DBWorkout;
}

export function getExerciseStats(exerciseId: string) {
  return workoutQueries.getExerciseStats.all(exerciseId);
}