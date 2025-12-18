'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, LogIn, UserPlus, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        // Register
        if (!formData.displayName.trim()) {
          setError('Please enter your name');
          setIsSubmitting(false);
          return;
        }

        const success = await register(
          formData.email,
          formData.password,
          formData.displayName
        );

        if (success) {
          router.push('/');
        } else {
          setError('An account with this email already exists');
        }
      } else {
        // Login
        const success = await login(formData.email, formData.password);

        if (success) {
          router.push('/');
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setFormData({ email: '', password: '', displayName: '' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bible Steps</h1>
          <p className="text-foreground/60">
            {isRegisterMode ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display Name (Register only) */}
          {isRegisterMode && (
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required={isRegisterMode}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-primary"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
            {isRegisterMode && (
              <p className="text-xs text-foreground/60 mt-1">
                At least 6 characters
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              isSubmitting
                ? 'bg-muted text-foreground/40 cursor-not-allowed'
                : 'bg-primary text-primary-foreground active:scale-95'
            }`}
          >
            {isSubmitting ? (
              'Please wait...'
            ) : isRegisterMode ? (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            {isRegisterMode ? (
              <>
                Already have an account?{' '}
                <span className="font-medium text-primary">Sign in</span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span className="font-medium text-primary">Create one</span>
              </>
            )}
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-xs text-foreground/70 text-center">
            Your data is stored locally in your browser. No data is sent to external
            servers.
          </p>
        </div>
      </div>
    </div>
  );
}
