import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { productService } from '../../services/product.service';
import { Product } from '../../types/product';
import { ApiError } from '../../types/api';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await productService.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <MainLayout>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Products
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <ErrorDisplay
          title="Failed to load product"
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      ) : product ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover md:h-96"
              />
            </div>
            
            <div className="p-6 flex flex-col">
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {product.category}
                  </span>
                </div>
                
                <div className="mt-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.inStock ? (
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      In Stock
                    </span>
                  ) : (
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-6 text-gray-700 dark:text-gray-300 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p>{product.description}</p>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Product ID: {product.id}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Last updated: {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Product not found.
          </p>
          <Button 
            variant="primary" 
            className="mt-4"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </Button>
        </div>
      )}
    </MainLayout>
  );
};