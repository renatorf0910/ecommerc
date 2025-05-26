import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
        
        <div className="absolute text-4xl font-bold bg-white dark:bg-gray-900 px-2 text-gray-900 dark:text-white">
          Page Not Found
        </div>
        
        <p className="mt-16 text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};