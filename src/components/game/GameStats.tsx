import { Heart, Coins, Waves } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WAVES } from '@/data/game-data';

interface GameStatsProps {
  lives: number;
  money: number;
  wave: number;
}

export const GameStats = ({ lives, money, wave }: GameStatsProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center">Game Status</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around items-center text-xl font-semibold">
        <div className="flex items-center gap-2" title="Lives">
          <Heart className="h-6 w-6 text-red-500" />
          <span>{lives}</span>
        </div>
        <div className="flex items-center gap-2" title="Money">
          <Coins className="h-6 w-6 text-yellow-500" />
          <span>{money}</span>
        </div>
        <div className="flex items-center gap-2" title="Wave">
          <Waves className="h-6 w-6 text-blue-500" />
          <span>{wave} / {WAVES.length}</span>
        </div>
      </CardContent>
    </Card>
  );
};