import React, { useState, useMemo } from 'react';
import { Exercise } from '../../types';
import { ExerciseSearch } from './ExerciseSearch';
import { ExerciseFilters } from './ExerciseFilters';
import { ViewControls } from './ViewControls';
import { TrainingCardGrid } from '../cards/TrainingCardGrid';

interface ExerciseSelectorProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  selectedExerciseIds: string[];
}

export function ExerciseSelector({
  exercises,
  onSelectExercise,
  selectedExerciseIds
}: ExerciseSelectorProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'difficulty'>('name');

  const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const filteredAndSortedExercises = useMemo(() => {
    return exercises
      .filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMuscleGroup = selectedMuscleGroup === 'all' || exercise.muscleGroup === selectedMuscleGroup;
        const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
        return matchesSearch && matchesMuscleGroup && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
  }, [exercises, searchQuery, selectedMuscleGroup, selectedDifficulty, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <ExerciseSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ExerciseFilters
          selectedMuscleGroup={selectedMuscleGroup}
          selectedDifficulty={selectedDifficulty}
          onMuscleGroupChange={setSelectedMuscleGroup}
          onDifficultyChange={setSelectedDifficulty}
          muscleGroups={muscleGroups}
          difficulties={difficulties}
        />
      </div>

      <ViewControls
        viewMode={viewMode}
        sortBy={sortBy}
        onViewModeChange={setViewMode}
        onSortChange={() => setSortBy(sortBy === 'name' ? 'difficulty' : 'name')}
      />

      <TrainingCardGrid
        exercises={filteredAndSortedExercises}
        selectedExercises={selectedExerciseIds}
        onExerciseSelect={onSelectExercise}
      />
    </div>
  );
}