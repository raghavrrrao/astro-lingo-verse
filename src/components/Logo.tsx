
import React from 'react';

const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          className="animate-pulse-neon"
        >
          {/* Outer ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            className="animate-spin"
            style={{ animationDuration: '8s' }}
          />
          
          {/* Inner hexagon */}
          <polygon
            points="20,5 30,12 30,28 20,35 10,28 10,12"
            fill="url(#gradient2)"
            className="animate-pulse"
          />
          
          {/* Center brain/neural network */}
          <g transform="translate(20,20)">
            <circle cx="0" cy="-5" r="2" fill="#00ffff" />
            <circle cx="-4" cy="2" r="1.5" fill="#00ffff" />
            <circle cx="4" cy="2" r="1.5" fill="#00ffff" />
            <line x1="0" y1="-3" x2="-2" y2="1" stroke="#00ffff" strokeWidth="1" />
            <line x1="0" y1="-3" x2="2" y2="1" stroke="#00ffff" strokeWidth="1" />
            <line x1="-2" y1="2" x2="2" y2="2" stroke="#00ffff" strokeWidth="1" />
          </g>
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        NeuroLingo
      </span>
    </div>
  );
};

export default Logo;
