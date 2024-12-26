import { Exercise } from '../../types';

export const armExercises: Exercise[] = [
  {
    id: 'dumbbell-curl',
    name: 'Dumbbell Curl',
    muscleGroup: 'arms',
    primaryMuscle: 'biceps-brachii',
    secondaryMuscle: [],
    difficulty: 'beginner',
    description: 'Curl dumbbells toward shoulders while keeping upper arms stationary, lower with control.',
    equipment: ['dumbbells'],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
  },
  {
    id: 'tricep-pushdown',
    name: 'Tricep Pushdown',
    muscleGroup: 'arms',
    primaryMuscle: 'triceps-brachii',
    secondaryMuscle: [],
    difficulty: 'beginner',
    description: 'Push cable attachment down while keeping upper arms at sides, control return to start position.',
    equipment: ['cable machine', 'rope or bar attachment'],
    imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=400&q=80',
  },
];