import { Exercise } from '../../types';

export const backExercises: Exercise[] = [
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    muscleGroup: 'back',
    primaryMuscle: 'latissimus-dorsi',
    secondaryMuscle: ['biceps-brachii', 'rhomboids'],
    difficulty: 'beginner',
    description: 'Sit at machine, grasp bar with wide grip, pull down to upper chest while keeping chest up and back straight.',
    equipment: ['cable machine', 'lat pulldown bar'],
    imageUrl: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&q=80',
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    muscleGroup: 'back',
    primaryMuscle: 'latissimus-dorsi',
    secondaryMuscle: ['trapezius', 'rhomboids', 'biceps-brachii'],
    difficulty: 'intermediate',
    description: 'Bend at hips, keep back straight, pull barbell to lower chest while keeping elbows close to body.',
    equipment: ['barbell'],
    imageUrl: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&q=80',
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    muscleGroup: 'back',
    primaryMuscle: 'latissimus-dorsi',
    secondaryMuscle: ['biceps-brachii', 'trapezius'],
    difficulty: 'advanced',
    description: 'Hang from bar with overhand grip, pull body up until chin clears bar, lower with control.',
    equipment: ['pull-up bar'],
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80',
  },
];