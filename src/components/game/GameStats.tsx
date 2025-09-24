import { Heart, Coins, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WAVES } from '@/data/game-data';

interface GameStatsProps {
  lives: number;
  money: number;
  wave: number;
}

export const GameStats = ({ lives, money, wave }: GameStatsProps) => {
  return (
    <Card className="bg-black/20 backdrop-blur-md border-slate-500/30 text-white">
      <CardContent className="flex justify-around items-center text-xl font-bold p-4">
        <div className="flex items-center gap-3" title="Lives">
          <Heart className="h-7 w-7 text-red-400" />
          <span className="text-2xl">{lives}</span>
        </div>
        <div className="flex items-center gap-3" title="Money">
          <Coins className="h-7 w-7 text-yellow-400" />
          <span className="text-2xl">{money}</span>
        </div>
        <div className="flex items-center gap-3" title="Wave">
          <Waves className="h-7 w-7 text-blue-400" />
          <span className="text-2xl">{wave} / {WAVES.length}</span>
        </div>
      </CardContent>
    </Card>
  );
};