import React from 'react';
import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';

interface ViewControlsProps {
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'difficulty';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: () => void;
}

export function ViewControls({
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange
}: ViewControlsProps): JSX.Element {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'grid'
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
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
        onClick={onSortChange}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowUpDown size={16} />
        Sort by {sortBy === 'name' ? 'Name' : 'Difficulty'}
      </button>
    </div>
  );
}