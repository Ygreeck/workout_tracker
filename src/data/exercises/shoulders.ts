import { Exercise } from '../../types';

export const shoulderExercises: Exercise[] = [
  {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    muscleGroup: 'shoulders',
    primaryMuscle: 'deltoids',
    secondaryMuscle: ['trapezius'],
    difficulty: 'beginner',
    description: 'Stand with dumbbells at sides, raise arms out to sides until parallel with ground, lower with control.',
    equipment: ['dumbbells'],
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80',
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    muscleGroup: 'shoulders',
    primaryMuscle: 'deltoids',
    secondaryMuscle: ['triceps-brachii', 'trapezius'],
    difficulty: 'intermediate',
    description: 'Press barbell or dumbbells overhead from shoulder level, keeping core tight and back straight.',
    equipment: ['barbell or dumbbells'],
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80',
  },
];