import React from 'react';

const AdvanceSkeleton = () => {
  return (
    <div className="p-4">
      {/* Total Results Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Product Card Skeleton - Repeated for 3 cards */}
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            {/* Image Skeleton */}
            <div className="w-24 h-32 bg-gray-200 animate-pulse rounded"></div>

            {/* Product Details Skeleton */}
            <div className="flex-1">
              <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-1"></div>
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="flex gap-4 mt-1">
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>

            {/* More Details Button Skeleton */}
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Price Comparison Skeleton */}
          <div className="flex justify-between mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvanceSkeleton;