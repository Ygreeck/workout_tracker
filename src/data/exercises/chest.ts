import { Exercise } from '../../types';

export const chestExercises: Exercise[] = [
  {
    id: 'push-up',
    name: 'Push-up',
    muscleGroup: 'chest',
    primaryMuscle: 'pectoralis-major',
    secondaryMuscle: ['deltoids', 'triceps-brachii'],
    difficulty: 'beginner',
    description: 'Start in plank position, lower body until chest nearly touches ground, then push back up. Keep body straight throughout movement.',
    equipment: ['none'],
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80',
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    muscleGroup: 'chest',
    primaryMuscle: 'pectoralis-major',
    secondaryMuscle: ['deltoids', 'triceps-brachii'],
    difficulty: 'intermediate',
    description: 'Lie on bench, lower barbell to chest with controlled movement, press back up to starting position. Keep wrists straight and elbows at 45-degree angle.',
    equipment: ['barbell', 'bench'],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    muscleGroup: 'chest',
    primaryMuscle: 'pectoralis-major',
    secondaryMuscle: ['deltoids'],
    difficulty: 'intermediate',
    description: 'Lie on bench, hold dumbbells above chest, lower arms out to sides while maintaining slight elbow bend, then return to start.',
    equipment: ['dumbbells', 'bench'],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
  },
];