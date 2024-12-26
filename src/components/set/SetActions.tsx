import React from 'react';
import { RotateCcw, Minus } from 'lucide-react';

interface SetActionsProps {
  onReset: () => void;
  onRemove: () => void;
}

export function SetActions({ onReset, onRemove }: SetActionsProps): JSX.Element {
  return (
    <div className="flex gap-1 w-24">
      <button
        type="button"
        onClick={onReset}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title="Reset set"
      >
        <RotateCcw size={18} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        title="Remove set"
      >
        <Minus size={18} />
      </button>
    </div>
  );
}