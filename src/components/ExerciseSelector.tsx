import React, { useState, useMemo } from 'react';
import { Exercise } from '../types';
import { Search, LayoutGrid, List, ArrowUpDown, Target } from 'lucide-react';
import { getMuscleById } from '../data/muscles';

interface ExerciseSelectorProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  selectedExerciseIds: string[];
}

export function ExerciseSelector({ exercises, onSelectExercise, selectedExerciseIds }: ExerciseSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Exercise['difficulty'] | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'difficulty'>('name');

  const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
  const difficulties: Exercise['difficulty'][] = ['beginner', 'intermediate', 'advanced'];

  const formatMuscleGroup = (group: string): string => {
    if (!group) return '';
    return group.charAt(0).toUpperCase() + group.slice(1);
  };

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

  const renderListView = () => (
    <div className="space-y-2">
      {filteredAndSortedExercises.map((exercise) => {
        const isSelected = selectedExerciseIds.includes(exercise.id);
        const primaryMuscle = getMuscleById(exercise.primaryMuscle);
        const secondaryMuscles = exercise.secondaryMuscle.map(id => getMuscleById(id)).filter(Boolean);

        return (
          <div
            key={exercise.id}
            onClick={() => onSelectExercise(exercise)}
            className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center gap-4 cursor-pointer
              ${isSelected 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500' 
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">{exercise.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {formatMuscleGroup(exercise.muscleGroup)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${exercise.difficulty === 'beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    exercise.difficulty === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                  {formatMuscleGroup(exercise.difficulty)}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                  <Target size={14} />
                  <span className="font-medium">{primaryMuscle?.name}</span>
                </div>
                {secondaryMuscles.length > 0 && (
                  <div className="text-gray-600 dark:text-gray-400 mt-1">
                    + {secondaryMuscles.map(m => m?.name).join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredAndSortedExercises.map((exercise) => {
        const isSelected = selectedExerciseIds.includes(exercise.id);
        const primaryMuscle = getMuscleById(exercise.primaryMuscle);
        const secondaryMuscles = exercise.secondaryMuscle.map(id => getMuscleById(id)).filter(Boolean);

        return (
          <div
            key={exercise.id}
            onClick={() => onSelectExercise(exercise)}
            className={`group relative h-80 w-full overflow-hidden rounded-lg transition-all duration-200 cursor-pointer
              ${isSelected 
                ? 'ring-2 ring-indigo-500' 
                : 'hover:ring-2 hover:ring-indigo-500/50'}`}
          >
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-4 right-4">
              <div className={`w-6 h-6 rounded-full border-2 transition-colors
                ${isSelected 
                  ? 'border-indigo-500 bg-indigo-500' 
                  : 'border-white'}`}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{exercise.name}</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-black/40 text-sm font-medium text-white">
                    {formatMuscleGroup(exercise.muscleGroup)}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium text-white
                    ${exercise.difficulty === 'beginner' ? 'bg-green-500/80' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-500/80' :
                      'bg-red-500/80'}`}>
                    {formatMuscleGroup(exercise.difficulty)}
                  </span>
                </div>
                <div className="text-sm text-white/90">
                  <div className="flex items-center gap-1">
                    <Target size={14} />
                    <span className="font-medium">{primaryMuscle?.name}</span>
                  </div>
                  {secondaryMuscles.length > 0 && (
                    <div className="mt-1 text-white/70">
                      + {secondaryMuscles.map(m => m?.name).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedMuscleGroup}
            onChange={(e) => setSelectedMuscleGroup(e.target.value)}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Muscle Groups</option>
            {muscleGroups.map(group => (
              <option key={group} value={group}>
                {formatMuscleGroup(group)}
              </option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as Exercise['difficulty'] | 'all')}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {formatMuscleGroup(difficulty)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <List size={20} />
          </button>
        </div>
        <button
          onClick={() => setSortBy(sortBy === 'name' ? 'difficulty' : 'name')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowUpDown size={16} />
          Sort by {sortBy === 'name' ? 'Name' : 'Difficulty'}
        </button>
      </div>

      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </div>
  );
}