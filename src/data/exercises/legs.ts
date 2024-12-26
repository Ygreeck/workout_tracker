import { Exercise } from '../../types';

export const legExercises: Exercise[] = [
  {
    id: 'bodyweight-squat',
    name: 'Bodyweight Squat',
    muscleGroup: 'legs',
    primaryMuscle: 'quadriceps',
    secondaryMuscle: ['hamstrings', 'gluteus-maximus'],
    difficulty: 'beginner',
    description: 'Stand with feet shoulder-width apart, lower body by bending knees and hips, keep chest up.',
    equipment: ['none'],
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&q=80',
  },
  {
    id: 'barbell-squat',
    name: 'Barbell Squat',
    muscleGroup: 'legs',
    primaryMuscle: 'quadriceps',
    secondaryMuscle: ['hamstrings', 'gluteus-maximus'],
    difficulty: 'intermediate',
    description: 'Place barbell on upper back, squat down keeping chest up and knees tracking over toes.',
    equipment: ['barbell', 'squat rack'],
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&q=80',
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    muscleGroup: 'legs',
    primaryMuscle: 'hamstrings',
    secondaryMuscle: ['gluteus-maximus', 'lower-back'],
    difficulty: 'advanced',
    description: 'Bend at hips and knees to grasp barbell, extend hips and knees to stand up with weight.',
    equipment: ['barbell'],
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&q=80',
  },
];