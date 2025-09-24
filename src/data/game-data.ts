import { Tower, Enemy } from '@/types/game';
import { Castle, Zap, Crosshair, Shield, Rabbit, Turtle, Bird } from 'lucide-react';

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
    upgrades: [],
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
    upgrades: [],
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
    upgrades: [],
  },
];

export const ENEMIES: Record<string, Enemy> = {
  runner: {
    id: 'runner',
    name: 'Runner',
    health: 50,
    speed: 2,
    reward: 5,
    type: 'ground',
    icon: Rabbit,
  },
  brute: {
    id: 'brute',
    name: 'Brute',
    health: 200,
    speed: 1,
    reward: 10,
    type: 'ground',
    icon: Shield,
  },
  flyer: {
    id: 'flyer',
    name: 'Flyer',
    health: 75,
    speed: 1.5,
    reward: 8,
    type: 'air',
    icon: Bird,
  },
  slowpoke: {
    id: 'slowpoke',
    name: 'Slowpoke',
    health: 500,
    speed: 0.5,
    reward: 20,
    type: 'ground',
    icon: Turtle,
  }
};

export const WAVES: Array<Array<{ type: keyof typeof ENEMIES; count: number }>> = [
    [{ type: 'runner', count: 10 }],
    [{ type: 'runner', count: 15 }, { type: 'brute', count: 2 }],
    [{ type: 'brute', count: 10 }],
    [{ type: 'flyer', count: 10 }, { type: 'runner', count: 10 }],
    [{ type: 'runner', count: 20 }, { type: 'brute', count: 5 }, { type: 'flyer', count: 5 }],
    [{ type: 'slowpoke', count: 3 }],
    [{ type: 'slowpoke', count: 2 }, { type: 'flyer', count: 15 }],
];

export const INITIAL_GAME_STATE = {
    wave: 0,
    lives: 20,
    money: 500,
    status: 'waiting' as const,
};