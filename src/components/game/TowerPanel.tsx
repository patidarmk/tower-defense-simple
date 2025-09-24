import { TOWERS } from '@/data/game-data';
import { Tower } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TowerPanelProps {
  onSelectTower: (tower: Tower) => void;
  money: number;
}

export const TowerPanel = ({ onSelectTower, money }: TowerPanelProps) => {
  return (
    <Card className="bg-black/20 backdrop-blur-md border-slate-500/30 text-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Towers</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {TOWERS.map((tower) => (
          <Tooltip key={tower.id} delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-3 flex flex-col items-center justify-center gap-2 bg-slate-700/50 border-slate-500/50 hover:bg-slate-600/70 disabled:opacity-40 transition-all duration-200 transform hover:scale-105 active:scale-100"
                onClick={() => onSelectTower(tower)}
                disabled={money < tower.cost}
              >
                <tower.icon className="h-10 w-10" />
                <span className="font-bold text-lg">{tower.name}</span>
                <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <Coins className="h-5 w-5" />
                  <span>{tower.cost}</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 text-white border-slate-600">
              <p className="max-w-xs text-base">{tower.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
};