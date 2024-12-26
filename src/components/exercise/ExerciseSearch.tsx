import React from 'react';
import { Search } from 'lucide-react';

interface ExerciseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ExerciseSearch({ searchQuery, onSearchChange }: ExerciseSearchProps): JSX.Element {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}