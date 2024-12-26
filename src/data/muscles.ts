import { Muscle, MuscleGroup } from '../types';

export const muscleGroups: MuscleGroup[] = [
  {
    id: 'chest',
    name: 'Chest',
    description: 'The chest muscles, primarily the pectorals, are essential for pushing movements and arm control',
    color: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
  },
  {
    id: 'back',
    name: 'Back',
    description: 'The back muscles help maintain posture and are crucial for pulling movements',
    color: '#3B82F6',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&q=80',
  },
  {
    id: 'legs',
    name: 'Legs',
    description: 'The leg muscles provide stability and power for all lower body movements',
    color: '#10B981',
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&q=80',
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    description: 'The shoulder muscles enable arm movement and provide upper body stability',
    color: '#F59E0B',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80',
  },
  {
    id: 'arms',
    name: 'Arms',
    description: 'The arm muscles control elbow movement and assist in many upper body exercises',
    color: '#8B5CF6',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
  },
  {
    id: 'core',
    name: 'Core',
    description: 'The core muscles stabilize the spine and enable torso movement',
    color: '#EC4899',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80',
  },
];

export const muscles: Muscle[] = [
  {
    id: 'pectoralis-major',
    name: 'Chest (Pectorals)',
    muscleGroups: ['chest'],
    description: 'The main chest muscle for pushing movements',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
  },
  {
    id: 'latissimus-dorsi',
    name: 'Upper Back (Lats)',
    muscleGroups: ['back'],
    description: 'The largest back muscle, essential for pulling movements',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&q=80',
  },
  {
    id: 'quadriceps',
    name: 'Front Thighs (Quads)',
    muscleGroups: ['legs'],
    description: 'The front thigh muscles for leg extension',
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&q=80',
  },
  {
    id: 'deltoids',
    name: 'Shoulder Muscles',
    muscleGroups: ['shoulders'],
    description: 'The shoulder muscles for arm movement',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80',
  },
  {
    id: 'biceps-brachii',
    name: 'Upper Arm (Biceps)',
    muscleGroups: ['arms'],
    description: 'The front upper arm muscle for elbow bending',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
  },
  {
    id: 'triceps-brachii',
    name: 'Back of Arm (Triceps)',
    muscleGroups: ['arms'],
    description: 'The back upper arm muscle for arm extension',
    imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=400&q=80',
  },
  {
    id: 'rectus-abdominis',
    name: 'Abs',
    muscleGroups: ['core'],
    description: 'The front abdominal muscles',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80',
  },
  {
    id: 'trapezius',
    name: 'Upper Back (Traps)',
    muscleGroups: ['back', 'shoulders'],
    description: 'The upper back and neck muscle',
    imageUrl: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&q=80',
  },
  {
    id: 'hamstrings',
    name: 'Back of Thighs (Hamstrings)',
    muscleGroups: ['legs'],
    description: 'The back thigh muscles for leg flexion',
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&q=80',
  },
  {
    id: 'gastrocnemius',
    name: 'Calves',
    muscleGroups: ['legs'],
    description: 'The main calf muscle',
    imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80',
  },
];

export function getMusclesByGroup(groupId: string): Muscle[] {
  return muscles.filter(muscle => muscle.muscleGroups.includes(groupId));
}

export function getMuscleGroupById(id: string): MuscleGroup | undefined {
  return muscleGroups.find(group => group.id === id);
}

export function getMuscleById(id: string): Muscle | undefined {
  return muscles.find(muscle => muscle.id === id);
}

export function getMuscleGroups(muscleId: string): MuscleGroup[] {
  const muscle = getMuscleById(muscleId);
  if (!muscle) return [];
  return muscle.muscleGroups.map(groupId => getMuscleGroupById(groupId)!).filter(Boolean);
}