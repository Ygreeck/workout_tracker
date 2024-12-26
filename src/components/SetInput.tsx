import React from 'react';
import { Set } from '../types';
import { SetHeader } from './set/SetHeader';
import { SetRow } from './set/SetRow';
import { SetControls } from './set/SetControls';

interface SetInputProps {
  sets: Set[];
  onUpdateSet: (index: number, field: keyof Set, value: number) => void;
  onAddSet: () => void;
  onRemoveSet: (index: number) => void;
  onDuplicateLastSet: () => void;
}

export function SetInput({
  sets,
  onUpdateSet,
  onAddSet,
  onRemoveSet,
  onDuplicateLastSet,
}: SetInputProps): JSX.Element {
  return (
    <div className="space-y-3">
      <SetHeader />
      
      {sets.map((set, index) => (
        <SetRow
          key={`set-${index}`}
          index={index}
          set={set}
          onUpdateSet={(field, value) => onUpdateSet(index, field, value)}
          onRemoveSet={() => onRemoveSet(index)}
        />
      ))}

      <SetControls
        onAddSet={onAddSet}
        onDuplicateLastSet={onDuplicateLastSet}
        hasExistingSets={sets.length > 0}
      />
    </div>
  );
}