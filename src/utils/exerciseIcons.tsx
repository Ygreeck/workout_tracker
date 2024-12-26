import React from 'react';
import { 
  Dumbbell, 
  HeartPulse, 
  Footprints, 
  Mountain, 
  Target, 
  Weight,
  Star
} from 'lucide-react';

export function getDifficultyStars(difficulty: string): JSX.Element[] {
  const count = difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 2 : 3;
  return Array(count).fill(0).map((_, i) => (
    <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
  ));
}

export function getMuscleIcon(muscleGroup: string): JSX.Element {
  const baseClass = "inline-block align-middle";
  
  switch (muscleGroup.toLowerCase()) {
    case 'arms':
      return <Dumbbell className={`${baseClass} text-purple-500`} size={18} />;
    case 'chest':
      return <HeartPulse className={`${baseClass} text-red-500`} size={18} />;
    case 'legs':
      return <Footprints className={`${baseClass} text-green-500`} size={18} />;
    case 'back':
      return <Mountain className={`${baseClass} text-blue-500`} size={18} />;
    case 'core':
      return <Target className={`${baseClass} text-orange-500`} size={18} />;
    case 'shoulders':
      return <Weight className={`${baseClass} text-indigo-500`} size={18} />;
    default:
      return <Dumbbell className={`${baseClass} text-gray-500`} size={18} />;
  }
}