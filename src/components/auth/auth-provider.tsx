import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  signInWithEmail as firebaseSignInWithEmail,
  signUpWithEmail as firebaseSignUpWithEmail,
  signInWithGoogle as firebaseSignInWithGoogle,
  signInWithApple as firebaseSignInWithApple,
  logout as firebaseLogout,
  getErrorMessage
} from '@/lib/firebase-auth';

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithApple: () => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await firebaseSignInWithEmail(email, password);
    return { error: error ? { message: getErrorMessage(error) } : null };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await firebaseSignUpWithEmail(email, password);
    return { error: error ? { message: getErrorMessage(error) } : null };
  };

  const signInWithGoogle = async () => {
    const { error } = await firebaseSignInWithGoogle();
    return { error: error ? { message: getErrorMessage(error) } : null };
  };

  const signInWithApple = async () => {
    const { error } = await firebaseSignInWithApple();
    return { error: error ? { message: getErrorMessage(error) } : null };
  };

  const signOut = async () => {
    const { error } = await firebaseLogout();
    return { error: error ? { message: getErrorMessage(error) } : null };
  };

  const value = {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut,
    loading: loading || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};