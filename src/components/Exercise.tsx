
import React, { useState } from 'react';
import { Check, X, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExerciseProps {
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'audio';
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
  onComplete: (isCorrect: boolean) => void;
}

const Exercise: React.FC<ExerciseProps> = ({
  question,
  type,
  options,
  correctAnswer,
  audioUrl,
  onComplete
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSubmit = () => {
    const answer = type === 'fill-blank' ? userInput : selectedAnswer;
    const correct = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onComplete(correct);
      resetExercise();
    }, 2000);
  };

  const resetExercise = () => {
    setSelectedAnswer('');
    setUserInput('');
    setShowResult(false);
    setIsCorrect(false);
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(console.error);
    }
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {options?.map((option, index) => (
        <button
          key={index}
          className={`
            w-full p-4 rounded-xl text-left transition-all duration-200 border-2
            ${selectedAnswer === option
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-muted bg-card hover:border-primary/50'
            }
          `}
          onClick={() => setSelectedAnswer(option)}
          disabled={showResult}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const renderFillBlank = () => (
    <div className="space-y-4">
      <div className="text-lg text-center">
        {question.split('___').map((part, index) => (
          <span key={index}>
            {part}
            {index < question.split('___').length - 1 && (
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="mx-2 px-3 py-1 border-b-2 border-primary bg-transparent text-primary font-bold text-center min-w-[100px]"
                disabled={showResult}
                placeholder="..."
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );

  const renderAudio = () => (
    <div className="text-center space-y-6">
      <Button
        onClick={playAudio}
        className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300"
        disabled={!audioUrl}
      >
        <Volume2 className="w-8 h-8 text-black" />
      </Button>
      <p className="text-muted-foreground">Listen and select the correct translation</p>
      {renderMultipleChoice()}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 glass-morphism cyber-border rounded-3xl">
      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 neon-text">{question}</h2>
      </div>

      {/* Exercise content */}
      <div className="mb-8">
        {type === 'multiple-choice' && renderMultipleChoice()}
        {type === 'fill-blank' && renderFillBlank()}
        {type === 'audio' && renderAudio()}
      </div>

      {/* Submit button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={
            showResult || 
            (type === 'multiple-choice' && !selectedAnswer) ||
            (type === 'fill-blank' && !userInput.trim())
          }
          className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-bold rounded-xl"
        >
          Check Answer
        </Button>
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`
          mt-6 p-4 rounded-xl text-center font-bold flex items-center justify-center space-x-2
          ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
        `}>
          {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span>{isCorrect ? 'Correct! Well done!' : `Incorrect. The answer was: ${correctAnswer}`}</span>
        </div>
      )}
    </div>
  );
};

export default Exercise;
