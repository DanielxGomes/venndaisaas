import { createContext, useContext, useState, ReactNode } from 'react';
import { verifyCredentials, registerUser } from '../services/auth';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await verifyCredentials(email, password);
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Implement Google login logic here
      const googleUser = await window.open('http://localhost:5173/api/auth/google', '_blank');
      // Handle the response
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await registerUser(name, email, password);
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error('Erro ao criar conta');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        user, 
        login, 
        loginWithGoogle,
        register,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}