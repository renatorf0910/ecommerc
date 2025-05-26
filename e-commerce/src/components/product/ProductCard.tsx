import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Card, CardContent, CardFooter } from '../common/Card';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  return (
    <Card className={`h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}>
      <div className="relative pb-[56.25%] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Out of Stock
          </div>
        )}
      </div>
      
      <CardContent>
        <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {product.category}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Link 
          to={`/products/${product.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};