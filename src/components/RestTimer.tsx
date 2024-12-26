import { Timer, Pause, Play, RotateCcw } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

const PRESET_TIMES = [30, 60, 90, 120];

export function RestTimer() {
  const { time, isActive, startTimer, stopTimer } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rest Timer</h3>
      </div>

      <div className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        {formatTime(time)}
      </div>

      <div className="flex gap-2 mb-4">
        {PRESET_TIMES.map(preset => (
          <button
            key={preset}
            onClick={() => startTimer(preset)}
            className="flex-1 px-3 py-2 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800"
          >
            {preset}s
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {isActive ? (
          <button
            onClick={stopTimer}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Pause size={16} /> Stop
          </button>
        ) : (
          <button
            onClick={() => startTimer(60)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Play size={16} /> Start
          </button>
        )}
        <button
          onClick={() => time > 0 && startTimer(time)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}