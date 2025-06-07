
import React from 'react';
import { Flame, Zap, Trophy, Target } from 'lucide-react';

interface ProgressStatsProps {
  xp: number;
  streak: number;
  level: number;
  accuracy: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ xp, streak, level, accuracy }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* XP */}
      <div className="glass-morphism cyber-border rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="text-2xl font-bold text-yellow-400">{xp}</div>
        <div className="text-sm text-muted-foreground">XP</div>
      </div>

      {/* Streak */}
      <div className="glass-morphism cyber-border rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Flame className="w-6 h-6 text-orange-400" />
        </div>
        <div className="text-2xl font-bold text-orange-400">{streak}</div>
        <div className="text-sm text-muted-foreground">Day Streak</div>
      </div>

      {/* Level */}
      <div className="glass-morphism cyber-border rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="w-6 h-6 text-purple-400" />
        </div>
        <div className="text-2xl font-bold text-purple-400">{level}</div>
        <div className="text-sm text-muted-foreground">Level</div>
      </div>

      {/* Accuracy */}
      <div className="glass-morphism cyber-border rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Target className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-cyan-400">{accuracy}%</div>
        <div className="text-sm text-muted-foreground">Accuracy</div>
      </div>
    </div>
  );
};

export default ProgressStats;
