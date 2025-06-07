
import React from 'react';
import { Lock, Star, Play } from 'lucide-react';

interface LevelCardProps {
  level: number;
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  description,
  isUnlocked,
  isCompleted,
  progress,
  onClick
}) => {
  return (
    <div
      className={`
        relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isUnlocked 
          ? 'glass-morphism cyber-border hover:neon-glow' 
          : 'bg-muted/20 border-muted/20 cursor-not-allowed'
        }
      `}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* Level number */}
      <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-black font-bold text-lg">
        {level}
      </div>

      {/* Lock/Status icon */}
      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-card flex items-center justify-center">
        {!isUnlocked ? (
          <Lock className="w-5 h-5 text-muted-foreground" />
        ) : isCompleted ? (
          <Star className="w-5 h-5 text-yellow-400" />
        ) : (
          <Play className="w-5 h-5 text-green-400" />
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
          {description}
        </p>

        {/* Progress bar */}
        {isUnlocked && (
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelCard;
