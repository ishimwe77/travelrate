import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user type
interface User {
  id: string;
  username: string;
  email: string;
  vipLevel: number;
  tasksCompleted: number;
  taskBalance: number;
  profitBalance: number;
  totalAssets: number;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  resetPassword: async () => {}
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // In a real app, this would check for a valid token in localStorage
        // and make an API call to validate the session
        const savedUser = localStorage.getItem('travelrate_user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        // Clear any invalid session data
        localStorage.removeItem('travelrate_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to authenticate
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: '123456',
        username,
        email: `${username}@example.com`,
        vipLevel: 1,
        tasksCompleted: 0,
        taskBalance: 50.00,
        profitBalance: 0.00,
        totalAssets: 50.00
      };
      
      // Save user to localStorage (in a real app, you'd store a token)
      localStorage.setItem('travelrate_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
      throw new Error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to register
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: '123456',
        username,
        email,
        vipLevel: 1,
        tasksCompleted: 0,
        taskBalance: 50.00,
        profitBalance: 0.00,
        totalAssets: 50.00
      };
      
      // Save user to localStorage (in a real app, you'd store a token)
      localStorage.setItem('travelrate_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account');
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('travelrate_user');
    setUser(null);
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to send a reset email
      // For demo purposes, we'll just simulate success
      return;
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Failed to send reset email');
      throw new Error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
