import { Tower, Enemy } from '@/types/game';
import { Castle, Zap, Crosshair, Shield, Rabbit, Turtle, Bird, Gem } from 'lucide-react';

export const TOWERS: Tower[] = [
  {
    id: 'archer',
    name: 'Archer Tower',
    cost: 100,
    damage: 10,
    range: 3,
    attackSpeed: 1.5,
    type: 'archer',
    description: 'Fast-firing tower, effective against single, unarmored targets.',
    icon: Crosshair,
    projectile: { speed: 10, visual: 'arrow' },
    upgrades: [
      { level: 2, cost: 150, damage: 15, range: 3.5, attackSpeed: 1.7 },
      { level: 3, cost: 250, damage: 25, range: 4, attackSpeed: 2.0 },
    ],
  },
  {
    id: 'cannon',
    name: 'Cannon Tower',
    cost: 250,
    damage: 50,
    range: 2.5,
    attackSpeed: 0.5,
    type: 'cannon',
    description: 'Deals area-of-effect damage, great for clustered enemies.',
    icon: Castle,
    projectile: { speed: 5, visual: 'cannonball' },
    upgrades: [
      { level: 2, cost: 300, damage: 75, range: 3, attackSpeed: 0.6 },
      { level: 3, cost: 450, damage: 110, range: 3, attackSpeed: 0.7 },
    ],
  },
  {
    id: 'magic',
    name: 'Magic Tower',
    cost: 200,
    damage: 25,
    range: 3.5,
    attackSpeed: 1,
    type: 'magic',
    description: 'Shoots homing projectiles that never miss. Effective against fast enemies.',
    icon: Zap,
    projectile: { speed: 8, visual: 'magic-bolt' },
    upgrades: [
      { level: 2, cost: 250, damage: 40, range: 4, attackSpeed: 1.2 },
      { level: 3, cost: 400, damage: 60, range: 4.5, attackSpeed: 1.5 },
    ],
  },
];

export const ENEMIES: Record<string, Enemy> = {
  runner: { id: 'runner', name: 'Runner', health: 50, speed: 2, reward: 5, type: 'ground', icon: Rabbit },
  brute: { id: 'brute', name: 'Brute', health: 200, speed: 1, reward: 10, type: 'ground', icon: Shield },
  flyer: { id: 'flyer', name: 'Flyer', health: 75, speed: 1.5, reward: 8, type: 'air', icon: Bird },
  slowpoke: { id: 'slowpoke', name: 'Slowpoke', health: 500, speed: 0.5, reward: 20, type: 'ground', icon: Turtle },
  boss: { id: 'boss', name: 'Boss', health: 2000, speed: 0.7, reward: 100, type: 'ground', icon: Gem },
};

export const WAVES: Array<Array<{ type: keyof typeof ENEMIES; count: number }>> = [
    [{ type: 'runner', count: 10 }],
    [{ type: 'runner', count: 15 }, { type: 'brute', count: 2 }],
    [{ type: 'brute', count: 10 }],
    [{ type: 'flyer', count: 10 }, { type: 'runner', count: 10 }],
    [{ type: 'runner', count: 20 }, { type: 'brute', count: 5 }, { type: 'flyer', count: 5 }],
    [{ type: 'slowpoke', count: 5 }],
    [{ type: 'slowpoke', count: 3 }, { type: 'flyer', count: 15 }],
    [{ type: 'brute', count: 15 }, { type: 'flyer', count: 10 }],
    [{ type: 'slowpoke', count: 8 }, { type: 'runner', count: 20 }],
    [{ type: 'boss', count: 1 }],
];

export const INITIAL_GAME_STATE = {
    wave: 0,
    lives: 20,
    money: 500,
    status: 'waiting' as const,
};

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 12;

export const PATH = [
  { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 },
  { x: 3, y: 4 }, { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 2 },
  { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 },
  { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
  { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 },
  { x: 11, y: 8 }, { x: 12, y: 8 }, { x: 12, y: 7 }, { x: 12, y: 6 },
  { x: 12, y: 5 }, { x: 12, y: 4 }, { x: 12, y: 3 }, { x: 13, y: 3 },
  { x: 14, y: 3 }, { x: 15, y: 3 }, { x: 16, y: 3 }, { x: 16, y: 4 },
  { x: 16, y: 5 }, { x: 16, y: 6 }, { x: 16, y: 7 }, { x: 16, y: 8 },
  { x: 16, y: 9 }, { x: 17, y: 9 }, { x: 18, y: 9 }, { x: 19, y: 9 },
];