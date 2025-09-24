import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Shield, Zap, Castle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center container mx-auto px-4 py-16 relative">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="flex justify-center items-center gap-4 mb-6 relative z-10">
            <Shield className="h-16 w-16 text-blue-400 animate-pulse animation-delay-500" />
            <Castle className="h-20 w-20 text-yellow-400 animate-pulse" />
            <Zap className="h-16 w-16 text-purple-400 animate-pulse animation-delay-1000" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent relative z-10">
            Tower Defense Arena
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 relative z-10">
            Strategically place your towers, upgrade your defenses, and withstand waves of relentless enemies. Can you survive the onslaught?
          </p>
          <Link to="/game" className="relative z-10">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-xl px-10 py-6 rounded-full shadow-lg shadow-yellow-500/30 transition-transform transform hover:scale-105 active:scale-100">
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