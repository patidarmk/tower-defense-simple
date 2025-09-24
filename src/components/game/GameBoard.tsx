import React from 'react';
import { GRID_WIDTH, GRID_HEIGHT, PATH } from '@/data/game-data';
import { cn } from '@/lib/utils';
import { Target } from 'lucide-react';
import { ActiveEnemy, PlacedTower, Tower } from '@/types/game';

const grid = Array.from({ length: GRID_HEIGHT }, (_, y) =>
  Array.from({ length: GRID_WIDTH }, (_, x) => ({ x, y }))
);

const pathCoords = new Set(PATH.map(p => `${p.x},${p.y}`));

interface GameBoardProps {
    onPlaceTower: (x: number, y: number) => void;
    activeEnemies: ActiveEnemy[];
    placedTowers: PlacedTower[];
    selectedTower?: Tower;
}

export const GameBoard = ({ onPlaceTower, activeEnemies, placedTowers, selectedTower }: GameBoardProps) => {
  return (
    <div className="aspect-video w-full bg-slate-800/50 border-4 border-slate-900/80 rounded-lg shadow-inner overflow-hidden relative">
      <div 
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
        }}
      >
        {grid.flat().map(({ x, y }) => {
          const isPath = pathCoords.has(`${x},${y}`);
          const isStart = x === PATH[0].x && y === PATH[0].y;
          const isEnd = x === PATH[PATH.length - 1].x && y === PATH[PATH.length - 1].y;
          const canPlace = selectedTower && !isPath;

          return (
            <div
              key={`${x}-${y}`}
              onClick={() => onPlaceTower(x, y)}
              className={cn(
                'border-[0.5px] border-green-400/10 transition-colors duration-300 relative',
                isPath ? 'bg-green-800/40' : 'bg-green-900/30',
                canPlace && 'hover:bg-green-500/50 cursor-pointer',
                isStart && 'bg-blue-500/50',
                isEnd && 'bg-red-500/50'
              )}
            >
              {isEnd && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="h-2/3 w-2/3 text-red-300/70 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Render Placed Towers */}
      {placedTowers.map(tower => (
        <div
            key={tower.id}
            className="absolute flex items-center justify-center"
            style={{
                left: `${(tower.x / GRID_WIDTH) * 100}%`,
                top: `${(tower.y / GRID_HEIGHT) * 100}%`,
                width: `${100 / GRID_WIDTH}%`,
                height: `${100 / GRID_HEIGHT}%`,
            }}
        >
            <tower.icon className="h-2/3 w-2/3 text-white" />
        </div>
      ))}

      {/* Render Active Enemies */}
      {activeEnemies.map(enemy => (
        <div
            key={enemy.id}
            className="absolute flex items-center justify-center transition-all duration-100 linear"
            style={{
                left: `${enemy.x}%`,
                top: `${enemy.y}%`,
                width: `${100 / GRID_WIDTH}%`,
                height: `${100 / GRID_HEIGHT}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <enemy.icon className="h-full w-full text-red-400" />
        </div>
      ))}
    </div>
  );
};