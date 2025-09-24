import { GameState, Tower, PlacedTower, ActiveEnemy } from '@/types/game';
import { WAVES, ENEMIES, GRID_WIDTH, GRID_HEIGHT, PATH, TOWERS } from '@/data/game-data';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

export type GameAction =
  | { type: 'START_WAVE' }
  | { type: 'SELECT_TOWER'; payload: Tower }
  | { type: 'PLACE_TOWER'; payload: { x: number; y: number } }
  | { type: 'GAME_TICK'; payload: { deltaTime: number } };

interface WaveEnemy {
  id: string;
  type: keyof typeof ENEMIES;
}

export interface FullGameState extends GameState {
  placedTowers: PlacedTower[];
  activeEnemies: ActiveEnemy[];
  selectedTower?: Tower;
  waveEnemies: WaveEnemy[];
  spawnCooldown: number;
}

const pathCoords = new Set(PATH.map(p => `${p.x},${p.y}`));

export const initialState: FullGameState = {
  wave: 0,
  lives: 20,
  money: 500,
  status: 'waiting',
  placedTowers: [],
  activeEnemies: [],
  waveEnemies: [],
  spawnCooldown: 0,
};

const getPixelCoords = (gridX: number, gridY: number) => {
    const cellWidth = 100 / GRID_WIDTH;
    const cellHeight = 100 / GRID_HEIGHT;
    return {
        x: gridX * cellWidth + cellWidth / 2,
        y: gridY * cellHeight + cellHeight / 2,
    }
}

export const gameReducer = produce((draft: FullGameState, action: GameAction) => {
  switch (action.type) {
    case 'START_WAVE': {
      if (draft.status === 'waiting' || draft.status === 'wave-cleared') {
        draft.status = 'in-progress';
        draft.wave += 1;
        const newWave = WAVES[draft.wave - 1];
        if (newWave) {
          draft.waveEnemies = newWave.flatMap(group => 
            Array.from({ length: group.count }, () => ({ id: uuidv4(), type: group.type }))
          );
          draft.spawnCooldown = 1; // Start spawning after 1 second
        }
      }
      break;
    }

    case 'SELECT_TOWER': {
      if (draft.money >= action.payload.cost) {
        draft.selectedTower = action.payload;
      }
      break;
    }

    case 'PLACE_TOWER': {
      const { x, y } = action.payload;
      if (draft.selectedTower && draft.money >= draft.selectedTower.cost && !pathCoords.has(`${x},${y}`)) {
        draft.money -= draft.selectedTower.cost;
        const newTower: PlacedTower = {
          ...draft.selectedTower,
          x,
          y,
          level: 1,
          cooldown: 0,
        };
        draft.placedTowers.push(newTower);
        draft.selectedTower = undefined;
      }
      break;
    }

    case 'GAME_TICK': {
      const { deltaTime } = action.payload;
      if (draft.status !== 'in-progress') break;

      // Enemy Spawning
      if (draft.waveEnemies.length > 0) {
        draft.spawnCooldown -= deltaTime;
        if (draft.spawnCooldown <= 0) {
          const enemyToSpawn = draft.waveEnemies.shift();
          if (enemyToSpawn) {
            const enemyData = ENEMIES[enemyToSpawn.type];
            const startPos = getPixelCoords(PATH[0].x, PATH[0].y);
            draft.activeEnemies.push({
              ...enemyData,
              id: enemyToSpawn.id,
              currentHealth: enemyData.health,
              pathIndex: 0,
              x: startPos.x,
              y: startPos.y,
            });
          }
          draft.spawnCooldown = 1; // 1 second between spawns
        }
      }

      // Enemy Movement
      draft.activeEnemies.forEach(enemy => {
        if (enemy.pathIndex >= PATH.length - 1) {
          // Enemy reached the end
          draft.lives -= 1;
          return; // Will be filtered out later
        }

        let distanceToMove = enemy.speed * 10 * deltaTime; // speed adjusted for percentage-based grid
        
        while (distanceToMove > 0 && enemy.pathIndex < PATH.length - 1) {
            const currentPoint = getPixelCoords(PATH[enemy.pathIndex].x, PATH[enemy.pathIndex].y);
            const nextPoint = getPixelCoords(PATH[enemy.pathIndex + 1].x, PATH[enemy.pathIndex + 1].y);

            const distanceToNextPoint = Math.hypot(nextPoint.x - enemy.x, nextPoint.y - enemy.y);

            if (distanceToMove >= distanceToNextPoint) {
                enemy.x = nextPoint.x;
                enemy.y = nextPoint.y;
                enemy.pathIndex += 1;
                distanceToMove -= distanceToNextPoint;
            } else {
                const angle = Math.atan2(nextPoint.y - enemy.y, nextPoint.x - enemy.x);
                enemy.x += Math.cos(angle) * distanceToMove;
                enemy.y += Math.sin(angle) * distanceToMove;
                distanceToMove = 0;
            }
        }
      });
      
      // Filter out enemies that reached the end
      const originalCount = draft.activeEnemies.length;
      draft.activeEnemies = draft.activeEnemies.filter(e => e.pathIndex < PATH.length - 1);

      // Check for game over
      if (draft.lives <= 0) {
        draft.status = 'game-over';
      }

      // Check for wave cleared
      if (draft.waveEnemies.length === 0 && draft.activeEnemies.length === 0 && draft.status === 'in-progress') {
        if (draft.wave >= WAVES.length) {
            draft.status = 'victory';
        } else {
            draft.status = 'wave-cleared';
        }
      }

      break;
    }
  }
});