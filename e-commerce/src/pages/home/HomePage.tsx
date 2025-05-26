import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { MainLayout } from '../../components/layout/MainLayout';
import { productService } from '../../services/product.service';
import { ProductCard } from '../../components/product/ProductCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { Product } from '../../types/product';
import { ApiError } from '../../types/api';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productService.getProducts(1, 4);
        setFeaturedProducts(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err as ApiError);
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-blue-600 dark:text-blue-500">Modern</span> API
              <br />Integration
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              A beautifully designed interface that connects seamlessly with
              RESTful APIs. Perfect for your next web or mobile project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-sm font-mono text-gray-500 dark:text-gray-400">API Explorer</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 font-mono text-sm overflow-hidden">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 dark:text-gray-400">GET</span>
                <span className="text-green-600 dark:text-green-500">/api/products</span>
              </div>
              <div className="mt-4 text-gray-800 dark:text-gray-200 overflow-x-auto">
                {`{
  "data": [
    {
      "id": "1",
      "name": "Product One",
      "price": 99.99,
      ...
    },
    ...
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12" id="featured-products">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Products
          </h2>
          
          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner size="lg" className="mx-auto" />
            </div>
          ) : error ? (
            <ErrorDisplay
              title="Failed to load products"
              message={error.message}
              onRetry={() => window.location.reload()}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/products">
                  <Button variant="secondary">
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20" id="features">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast & Responsive</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized for both web and mobile platforms with a responsive design that adapts to any screen size.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure API Integration</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with security in mind, featuring token authentication, secure API calls, and proper error handling.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Beautiful Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Modern aesthetics with attention to detail, proper typography, and a carefully crafted user experience.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};