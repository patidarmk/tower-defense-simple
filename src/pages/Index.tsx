import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Shield, Zap, Castle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-700 text-white">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center container mx-auto px-4 py-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Shield className="h-16 w-16 text-blue-400" />
            <Castle className="h-20 w-20 text-yellow-400" />
            <Zap className="h-16 w-16 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Tower Defense Arena
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
            Strategically place your towers, upgrade your defenses, and withstand waves of relentless enemies. Can you survive the onslaught?
          </p>
          <Link to="/game">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-yellow-500/30 transition-transform transform hover:scale-105">
              Play Now
            </Button>
          </Link>
        </div>
      </main>
      <MadeWithApplaa />
    </div>
  );
};

export default Index;