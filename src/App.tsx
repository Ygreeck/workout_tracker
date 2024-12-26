import React, { useState, useEffect } from 'react';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutHistory } from './components/WorkoutHistory';
import { ProgressCharts } from './components/ProgressCharts';
import { RestTimer } from './components/RestTimer';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useWorkouts } from './hooks/useWorkouts';
import { useTheme } from './hooks/useTheme';
import { exercises } from './data/exercises';
import { Dumbbell, History, LineChart, Sun, Moon } from 'lucide-react';

function App() {
  const { workouts, addWorkout, getExerciseStats, statsLoading } = useWorkouts();
  const { darkMode, setDarkMode } = useTheme();
  const [selectedExercise, setSelectedExercise] = useState(exercises[0].id);
  const [activeTab, setActiveTab] = useState<'welcome' | 'workout' | 'history' | 'progress'>('welcome');
  const [exerciseStats, setExerciseStats] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'progress' && selectedExercise) {
      getExerciseStats(selectedExercise).then(setExerciseStats);
    }
  }, [activeTab, selectedExercise, getExerciseStats]);

  const handleStartWorkout = () => {
    setActiveTab('workout');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">
                Workout Tracker
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab !== 'welcome' && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('workout')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'workout'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Dumbbell size={16} />
              New Workout
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <History size={16} />
              History
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'progress'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <LineChart size={16} />
              Progress
            </button>
          </div>
        )}

        {activeTab === 'welcome' && <WelcomeScreen onStartWorkout={handleStartWorkout} />}

        {activeTab === 'workout' && (
          <div className="space-y-6">
            <WorkoutForm onSubmit={addWorkout} />
            <RestTimer />
          </div>
        )}

        {activeTab === 'history' && (
          <WorkoutHistory workouts={workouts} />
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Exercise
              </label>
              <select
                id="exercise-select"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {exercises.map(exercise => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            <ProgressCharts
              exerciseStats={exerciseStats}
              title={exercises.find(e => e.id === selectedExercise)?.name || ''}
              loading={statsLoading[selectedExercise]}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;