import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  User,
  AuthError,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult
} from 'firebase/auth';
import { auth } from './firebase';

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure Apple provider
appleProvider.addScope('email');
appleProvider.addScope('name');

export interface AuthResult {
  user?: User | null;
  error?: AuthError | null;
}

export interface PhoneAuthResult {
  confirmationResult?: ConfirmationResult;
  error?: AuthError | null;
}

// Email/Password Authentication
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send email verification
    if (result.user) {
      await sendEmailVerification(result.user);
    }
    
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};

// Social Authentication
export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};

export const signInWithApple = async (): Promise<AuthResult> => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};

// Phone Authentication
export const initializeRecaptcha = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - will proceed with submit function
    }
  });
};

export const signInWithPhone = async (
  phoneNumber: string, 
  recaptchaVerifier: RecaptchaVerifier
): Promise<PhoneAuthResult> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return { confirmationResult, error: null };
  } catch (error) {
    return { confirmationResult: undefined, error: error as AuthError };
  }
};

export const verifyPhoneCode = async (
  confirmationResult: ConfirmationResult, 
  code: string
): Promise<AuthResult> => {
  try {
    const result = await confirmationResult.confirm(code);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};

// User Management
export const updateUserProfile = async (user: User, displayName?: string, photoURL?: string): Promise<{ error?: AuthError }> => {
  try {
    await updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL
    });
    return {};
  } catch (error) {
    return { error: error as AuthError };
  }
};

export const sendPasswordReset = async (email: string): Promise<{ error?: AuthError }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {};
  } catch (error) {
    return { error: error as AuthError };
  }
};

export const logout = async (): Promise<{ error?: AuthError }> => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    return { error: error as AuthError };
  }
};

// Utility functions
export const getErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code. Please try again.';
    case 'auth/invalid-phone-number':
      return 'Invalid phone number format.';
    default:
      return error.message || 'An error occurred during authentication.';
  }
};