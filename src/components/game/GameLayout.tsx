import React from 'react';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';
import { TowerPanel } from './TowerPanel';
import { Button } from '@/components/ui/button';
import { INITIAL_GAME_STATE } from '@/data/game-data';
import { Tower } from '@/types/game';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Link } from '@tanstack/react-router';

export const GameLayout = () => {
  const [gameState, setGameState] = React.useState(INITIAL_GAME_STATE);

  const handleSelectTower = (tower: Tower) => {
    // Placeholder for tower selection logic
    console.log('Selected tower:', tower.name);
  };

  const handleStartWave = () => {
    // Placeholder for starting the next wave
    console.log('Starting wave...');
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Tower Defense</h1>
        <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
        </Button>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <GameStats lives={gameState.lives} money={gameState.money} wave={gameState.wave} />
          <GameBoard />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <TowerPanel onSelectTower={handleSelectTower} money={gameState.money} />
          <Button onClick={handleStartWave} className="w-full py-4 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-slate-900">
            Start Wave
          </Button>
        </div>
      </div>
      <MadeWithApplaa />
    </div>
  );
};