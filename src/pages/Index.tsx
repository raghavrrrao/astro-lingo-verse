
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import LevelCard from '@/components/LevelCard';
import ProgressStats from '@/components/ProgressStats';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Zap } from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸'
  });
  
  const [userStats, setUserStats] = useState({
    xp: 450,
    streak: 7,
    level: 3,
    accuracy: 87
  });

  const [unlockedLevels, setUnlockedLevels] = useState([1, 2, 3]);
  const [completedLevels, setCompletedLevels] = useState([1, 2]);

  // Handle lesson completion from navigation state
  useEffect(() => {
    if (location.state?.lessonCompleted) {
      const xpGained = location.state.xpGained || 0;
      setUserStats(prev => ({
        ...prev,
        xp: prev.xp + xpGained
      }));
      
      // Unlock next level if current level was completed
      if (!unlockedLevels.includes(4)) {
        setUnlockedLevels(prev => [...prev, 4]);
      }
    }
  }, [location.state]);

  const levels = [
    {
      level: 1,
      title: "Beginner Basics",
      description: "Learn essential greetings, introductions, and basic vocabulary",
      progress: 100
    },
    {
      level: 2,
      title: "Everyday Conversations",
      description: "Practice common phrases for shopping, dining, and directions",
      progress: 100
    },
    {
      level: 3,
      title: "Grammar Foundations",
      description: "Master verb conjugations, sentence structure, and tenses",
      progress: 65
    },
    {
      level: 4,
      title: "Intermediate Skills",
      description: "Express opinions, describe experiences, and tell stories",
      progress: 0
    },
    {
      level: 5,
      title: "Advanced Topics",
      description: "Discuss complex topics, culture, and idiomatic expressions",
      progress: 0
    },
    {
      level: 6,
      title: "Master Level",
      description: "Professional communication and native-like fluency",
      progress: 0
    }
  ];

  const handleLevelClick = (level: number) => {
    if (unlockedLevels.includes(level)) {
      navigate(`/lesson/${level}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size={50} />
            
            <div className="flex items-center space-x-4">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <Button className="glass-morphism cyber-border rounded-xl">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-float">
            Learn Languages
            <br />
            <span className="neon-text">The Future Way</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master new languages with AI-powered lessons, interactive exercises, and personalized learning paths.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-cyan-400">
              <BookOpen className="w-6 h-6" />
              <span>Interactive Lessons</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Zap className="w-6 h-6" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Users className="w-6 h-6" />
              <span>Community Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* Progress Stats */}
        <ProgressStats {...userStats} />

        {/* Learning Path */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold neon-text">Your Learning Path</h2>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span className="text-lg">{selectedLanguage.flag}</span>
              <span>{selectedLanguage.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((levelData) => (
              <LevelCard
                key={levelData.level}
                {...levelData}
                isUnlocked={unlockedLevels.includes(levelData.level)}
                isCompleted={completedLevels.includes(levelData.level)}
                onClick={() => handleLevelClick(levelData.level)}
              />
            ))}
          </div>
        </section>

        {/* Daily Challenge */}
        <section className="mt-16">
          <div className="glass-morphism cyber-border rounded-3xl p-8 text-center animate-pulse-neon">
            <h3 className="text-2xl font-bold mb-4 neon-text">Daily Challenge</h3>
            <p className="text-muted-foreground mb-6">
              Complete today's challenge to earn bonus XP and maintain your streak!
            </p>
            <Button
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-bold rounded-xl"
              onClick={() => navigate('/lesson/daily')}
            >
              Start Challenge
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
