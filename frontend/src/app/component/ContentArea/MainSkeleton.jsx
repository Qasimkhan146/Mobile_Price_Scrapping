import React from 'react';

const MainSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Grid layout matching your structure: 5 columns on large screens, 2 on medium, 1 on small */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Repeat skeleton card 10 times to match your 2 rows of 5 items */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-100 shadow-sm">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-300 rounded-md animate-pulse relative overflow-hidden">
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
            </div>

            {/* Title placeholder */}
            <div className="mt-4 h-6 bg-gray-300 rounded w-3/4 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
            </div>

            {/* Price rows placeholder (5 rows to match your structure) */}
            <div className="mt-2 space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 rounded w-full animate-pulse relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSkeleton;