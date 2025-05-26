import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { productService } from '../../services/product.service';
import { ProductCard } from '../../components/product/ProductCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Product } from '../../types/product';
import { PaginatedResponse } from '../../types/api';
import { Search, Filter } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchProducts = async (pageNum: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you would pass searchTerm and category to the API
      const response = await productService.getProducts(pageNum, 8);
      const data = response.data as PaginatedResponse<Product>;
      
      setProducts(data.data);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  // For demo purposes, we're using client-side filtering
  // In a real app, you would send these parameters to the API
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || product.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
            Products
          </h1>
          
          <div className="flex w-full sm:w-auto items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="whitespace-nowrap"
            >
              <Filter size={18} className="mr-1" />
              Filter
            </Button>
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 border border-gray-200 dark:border-gray-700 transition-all">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
                             dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => {
                  setSearchTerm('');
                  setCategory('');
                }}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorDisplay
            message={error}
            onRetry={() => fetchProducts(page)}
          />
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No products found matching your criteria.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setCategory('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => fetchProducts(page - 1)}
                  className="rounded-l-md rounded-r-none"
                >
                  Previous
                </Button>
                <div className="flex items-center justify-center bg-white dark:bg-gray-800 border-t border-b border-gray-300 dark:border-gray-700 px-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Page {page} of {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => fetchProducts(page + 1)}
                  className="rounded-r-md rounded-l-none"
                >
                  Next
                </Button>
              </nav>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};