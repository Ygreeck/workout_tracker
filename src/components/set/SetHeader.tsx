import React from 'react';

export function SetHeader(): JSX.Element {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
      <div className="w-16">Set</div>
      <div>Weight (kg)</div>
      <div>Reps</div>
      <div className="w-24">Actions</div>
    </div>
  );
}