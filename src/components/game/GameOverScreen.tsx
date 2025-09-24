import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverScreenProps {
  status: 'game-over' | 'victory';
  wave: number;
}

export const GameOverScreen = ({ status, wave }: GameOverScreenProps) => {
  const isVictory = status === 'victory';

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-4">
      <h2 className={`text-6xl font-extrabold ${isVictory ? 'text-yellow-400' : 'text-red-500'}`}>
        {isVictory ? 'Victory!' : 'Game Over'}
      </h2>
      <p className="text-white text-2xl">
        {isVictory ? `You successfully defended all ${wave} waves!` : `You made it to wave ${wave}.`}
      </p>
      <Button onClick={handleRestart} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-xl px-10 py-6">
        Play Again
      </Button>
    </div>
  );
};