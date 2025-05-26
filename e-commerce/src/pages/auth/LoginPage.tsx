import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { ApiError } from '../../types/api';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear previous errors
    setErrors({});
    
    try {
      await login(email, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      const apiError = err as ApiError;
      
      if (apiError.errors) {
        // Handle field-specific errors
        const fieldErrors: Record<string, string> = {};
        
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          fieldErrors[field] = messages[0];
        });
        
        setErrors(fieldErrors);
      } else {
        // Handle general error
        setErrors({ general: apiError.message });
      }
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Log In
            </h1>
          </CardHeader>
          
          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/20">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  error={errors.email}
                  fullWidth
                />
                
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  fullWidth
                />
              </div>
              
              <div className="mt-6">
                <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                  Log In
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 font-medium">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};