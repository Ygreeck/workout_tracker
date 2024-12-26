import React from 'react';
import {
  Dumbbell,
  ChevronRight,
  Target,
  Calendar,
  LineChart,
} from 'lucide-react';

interface WelcomeScreenProps {
  onStartWorkout: () => void;
}

export function WelcomeScreen({ onStartWorkout }: WelcomeScreenProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white font-serif">
            Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track workouts, monitor progress, achieve goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4 mx-auto">
              <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif">
              Track Exercises
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Log your workouts with detailed exercise tracking
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4 mx-auto">
              <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif">View History</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Review past workouts and track your journey
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4 mx-auto">
              <LineChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-serif">
              Monitor Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize your improvements with detailed charts
            </p>
          </div>
        </div>

        <button
          onClick={onStartWorkout}
          className="mt-12 inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium group"
        >
          <Dumbbell className="mr-2" />
          Start Your Workout
          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
