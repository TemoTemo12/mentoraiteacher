
import { useState, useEffect } from 'react';

export interface UserPreferences {
  learningLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  favoriteSubjects: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  totalMessages: number;
  joinDate: Date;
  lastActivity: Date;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('mentorAI_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({
          ...userData,
          joinDate: new Date(userData.joinDate),
          lastActivity: new Date(userData.lastActivity),
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const saveUserData = async (userData: User) => {
    try {
      localStorage.setItem('mentorAI_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  const createUser = async (name: string, email: string, preferences: UserPreferences) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      preferences,
      totalMessages: 0,
      joinDate: new Date(),
      lastActivity: new Date(),
    };

    const success = await saveUserData(newUser);
    return success ? newUser : null;
  };

  const clearUser = () => {
    localStorage.removeItem('mentorAI_user');
    setUser(null);
  };

  return {
    user,
    isLoading,
    saveUserData,
    createUser,
    clearUser,
  };
};
