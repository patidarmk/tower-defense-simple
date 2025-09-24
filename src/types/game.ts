import { LucideIcon } from 'lucide-react';

export interface Tower {
  id: string;
  name: string;
  cost: number;
  damage: number;
  range: number; // in grid units
  attackSpeed: number; // attacks per second
  type: 'archer' | 'cannon' | 'magic';
  description: string;
  icon: LucideIcon;
  projectile: {
    speed: number; // grid units per second
    visual: 'arrow' | 'cannonball' | 'magic-bolt';
  };
  upgrades: TowerUpgrade[];
}

export interface TowerUpgrade {
  level: number;
  cost: number;
  damage: number;
  range: number;
  attackSpeed: number;
}

export interface Enemy {
  id: string;
  name: string;
  health: number;
  speed: number; // grid units per second
  reward: number; // coins on defeat
  type: 'ground' | 'air';
  icon: LucideIcon;
}

export interface GameState {
  wave: number;
  lives: number;
  money: number;
  status: 'waiting' | 'in-progress' | 'wave-cleared' | 'game-over' | 'victory';
}

export interface PlacedTower extends Tower {
  x: number; // grid coordinate
  y: number; // grid coordinate
  level: number;
  targetId?: string; // id of the current enemy target
  cooldown: number; // time until next attack
}

export interface ActiveEnemy extends Enemy {
  pathIndex: number;
  currentHealth: number;
  x: number; // pixel coordinate
  y: number; // pixel coordinate
}