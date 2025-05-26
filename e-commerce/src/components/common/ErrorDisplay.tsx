import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  className?: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Error',
  message,
  className = '',
  onRetry,
}) => {
  return (
    <div className={`rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-400">{title}</h3>
          <div className="mt-1 text-sm text-red-700 dark:text-red-300">{message}</div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-100 
                           dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};