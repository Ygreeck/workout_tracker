import React from 'react';
import { Set } from '../../types';
import { SetActions } from './SetActions';
import { useSetInput } from '../../hooks/useSetInput';

interface SetRowProps {
  index: number;
  set: Set;
  onUpdateSet: (field: keyof Set, value: number) => void;
  onRemoveSet: () => void;
}

export function SetRow({ index, set, onUpdateSet, onRemoveSet }: SetRowProps): JSX.Element {
  const { handleInputChange, resetSet } = useSetInput(set, onUpdateSet);

  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center">
      <span className="w-16 text-sm font-medium text-gray-500 dark:text-gray-400">
        Set {index + 1}
      </span>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]*"
          value={set.weight === 0 ? '' : set.weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
          className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="0"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none">
          kg
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={set.reps === 0 ? '' : set.reps}
          onChange={(e) => handleInputChange('reps', e.target.value)}
          className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="0"
        />
      </div>
      <SetActions onReset={resetSet} onRemove={onRemoveSet} />
    </div>
  );
}