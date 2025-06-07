
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  accuracy: number;
  total_exercises_completed: number;
  total_correct_answers: number;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    level: 1,
    streak: 0,
    accuracy: 0,
    total_exercises_completed: 0,
    total_correct_answers: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error);
        return;
      }

      if (data) {
        const accuracy = data.total_exercises_completed > 0 
          ? Math.round((data.total_correct_answers / data.total_exercises_completed) * 100)
          : 0;

        setProgress({
          xp: data.xp,
          level: data.level,
          streak: data.streak,
          accuracy,
          total_exercises_completed: data.total_exercises_completed,
          total_correct_answers: data.total_correct_answers
        });
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (xpGained: number, isCorrect: boolean) => {
    if (!user) return;

    try {
      // First, add the exercise record
      await supabase.from('exercises').insert({
        user_id: user.id,
        lesson_id: 1, // You can make this dynamic based on current lesson
        exercise_type: 'multiple-choice',
        is_correct: isCorrect,
        xp_gained: xpGained
      });

      // Then update user progress
      const newTotalExercises = progress.total_exercises_completed + 1;
      const newCorrectAnswers = progress.total_correct_answers + (isCorrect ? 1 : 0);
      const newXp = progress.xp + xpGained;
      const newLevel = Math.floor(newXp / 100) + 1; // Level up every 100 XP

      const { error } = await supabase
        .from('user_progress')
        .update({
          xp: newXp,
          level: newLevel,
          total_exercises_completed: newTotalExercises,
          total_correct_answers: newCorrectAnswers,
          last_activity_date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating progress:', error);
        return;
      }

      // Update local state
      const newAccuracy = Math.round((newCorrectAnswers / newTotalExercises) * 100);
      setProgress({
        xp: newXp,
        level: newLevel,
        streak: progress.streak, // Streak calculation can be done server-side later
        accuracy: newAccuracy,
        total_exercises_completed: newTotalExercises,
        total_correct_answers: newCorrectAnswers
      });

    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [user]);

  return { progress, loading, updateProgress, refetchProgress: fetchProgress };
};
