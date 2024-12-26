import React from 'react';
import { Plus, Copy } from 'lucide-react';

interface SetControlsProps {
  onAddSet: () => void;
  onDuplicateLastSet: () => void;
  hasExistingSets: boolean;
}

export function SetControls({ onAddSet, onDuplicateLastSet, hasExistingSets }: SetControlsProps): JSX.Element {
  return (
    <div className="flex gap-2 pt-2">
      <button
        type="button"
        onClick={onAddSet}
        className="flex-1 py-2 px-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Set
      </button>
      {hasExistingSets && (
        <button
          type="button"
          onClick={onDuplicateLastSet}
          className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Copy size={18} />
          Duplicate Last Set
        </button>
      )}
    </div>
  );
}