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
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center">Towers</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {TOWERS.map((tower) => (
          <Tooltip key={tower.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                onClick={() => onSelectTower(tower)}
                disabled={money < tower.cost}
              >
                <tower.icon className="h-8 w-8" />
                <span className="font-bold">{tower.name}</span>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Coins className="h-4 w-4" />
                  <span>{tower.cost}</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tower.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
};