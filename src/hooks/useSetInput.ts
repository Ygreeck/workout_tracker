import { useCallback } from 'react';
import { Set } from '../types';

export function useSetInput(
  set: Set,
  onUpdateSet: (field: keyof Set, value: number) => void
) {
  const handleInputChange = useCallback(
    (field: keyof Set, value: string) => {
      const numValue = value === '' ? 0 : parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onUpdateSet(field, numValue);
      }
    },
    [onUpdateSet]
  );

  const resetSet = useCallback(() => {
    onUpdateSet('weight', 0);
    onUpdateSet('reps', 0);
  }, [onUpdateSet]);

  return {
    handleInputChange,
    resetSet,
  };
}