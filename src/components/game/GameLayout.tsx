import React from 'react';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';
import { TowerPanel } from './TowerPanel';
import { Button } from '@/components/ui/button';
import { Tower } from '@/types/game';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Link } from '@tanstack/react-router';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GameOverScreen } from './GameOverScreen';

export const GameLayout = () => {
  const { state, dispatch } = useGameEngine();

  const handleSelectTower = (tower: Tower) => {
    dispatch({ type: 'SELECT_TOWER', payload: tower });
  };

  const handleStartWave = () => {
    dispatch({ type: 'START_WAVE' });
  };

  const handlePlaceTower = (x: number, y: number) => {
    if (state.selectedTower) {
      dispatch({ type: 'PLACE_TOWER', payload: { x, y } });
    }
  };

  const getWaveButtonText = () => {
    if (state.status === 'victory') return 'You Won!';
    if (state.status === 'game-over') return 'Game Over';
    if (state.status === 'in-progress') return `Wave ${state.wave} in Progress...`;
    if (state.status === 'wave-cleared') return `Start Wave ${state.wave + 1}`;
    return `Start Wave ${state.wave + 1}`;
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 relative">
      {(state.status === 'game-over' || state.status === 'victory') && (
        <GameOverScreen status={state.status} wave={state.wave} />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Tower Defense</h1>
        <Button asChild variant="outline">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <GameStats lives={state.lives} money={state.money} wave={state.wave} />
          <GameBoard 
            onPlaceTower={handlePlaceTower}
            activeEnemies={state.activeEnemies}
            placedTowers={state.placedTowers}
            selectedTower={state.selectedTower}
          />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <TowerPanel onSelectTower={handleSelectTower} money={state.money} selectedTower={state.selectedTower} />
          <Button 
            onClick={handleStartWave} 
            className="w-full py-4 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-slate-900 disabled:bg-gray-500"
            disabled={state.status === 'in-progress' || state.status === 'game-over' || state.status === 'victory'}
          >
            {getWaveButtonText()}
          </Button>
        </div>
      </div>
      <MadeWithApplaa />
    </div>
  );
};