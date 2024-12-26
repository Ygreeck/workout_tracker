import { Exercise } from '../../types';

export const coreExercises: Exercise[] = [
  {
    id: 'plank',
    name: 'Plank',
    muscleGroup: 'core',
    primaryMuscle: 'rectus-abdominis',
    secondaryMuscle: ['obliques'],
    difficulty: 'beginner',
    description: 'Hold push-up position with forearms on ground, maintain straight body position.',
    equipment: ['none'],
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80',
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    muscleGroup: 'core',
    primaryMuscle: 'obliques',
    secondaryMuscle: ['rectus-abdominis'],
    difficulty: 'intermediate',
    description: 'Sit with knees bent and feet off ground, rotate torso side to side while holding weight.',
    equipment: ['weight plate or dumbbell (optional)'],
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80',
  },
];