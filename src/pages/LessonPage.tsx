
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Exercise from '@/components/Exercise';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';

const LessonPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const [xpGained, setXpGained] = useState(0);

  const exercises = [
    {
      question: "How do you say 'Hello' in Spanish?",
      type: 'multiple-choice' as const,
      options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
      correctAnswer: 'Hola'
    },
    {
      question: "Complete the sentence: 'Me ___ Juan'",
      type: 'fill-blank' as const,
      correctAnswer: 'llamo'
    },
    {
      question: "What does 'Gracias' mean?",
      type: 'multiple-choice' as const,
      options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      correctAnswer: 'Thank you'
    },
    {
      question: "Choose the correct translation for 'Good morning'",
      type: 'multiple-choice' as const,
      options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
      correctAnswer: 'Buenos días'
    }
  ];

  const handleExerciseComplete = async (isCorrect: boolean) => {
    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = isCorrect;
    setCompletedExercises(newCompleted);

    const earnedXp = isCorrect ? 10 : 0;
    setXpGained(prev => prev + earnedXp);

    // Update progress in database if user is logged in
    if (user) {
      await updateProgress(earnedXp, isCorrect);
    }

    if (currentExercise < exercises.length - 1) {
      setTimeout(() => {
        setCurrentExercise(prev => prev + 1);
      }, 2000);
    } else {
      // Lesson completed
      setTimeout(() => {
        navigate('/', { state: { lessonCompleted: true, xpGained } });
      }, 2000);
    }
  };

  const progress = ((currentExercise + (completedExercises[currentExercise] ? 1 : 0)) / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {currentExercise + 1} / {exercises.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted/30 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercise */}
      <div className="max-w-4xl mx-auto">
        {currentExercise < exercises.length ? (
          <Exercise
            key={currentExercise}
            {...exercises[currentExercise]}
            onComplete={handleExerciseComplete}
          />
        ) : (
          <div className="text-center glass-morphism cyber-border rounded-3xl p-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 neon-text">Lesson Complete!</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You earned {xpGained} XP!
            </p>
            <Button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-bold rounded-xl"
            >
              Continue Learning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
