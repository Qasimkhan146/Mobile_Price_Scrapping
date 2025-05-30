"use client";

import { useState, useEffect } from "react";

export default function SkeletonLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate data loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="space-y-4">
          {/* Network Skeleton */}
          <div className="flex space-x-4">
            <div className="w-1/4">
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
            <div className="w-3/4 space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
              ))}
            </div>
          </div>

          {/* Memory Skeleton */}
          <div className="flex space-x-4">
            <div className="w-1/4">
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
            <div className="w-3/4 space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
              ))}
            </div>
          </div>

          {/* Features Skeleton */}
          <div className="flex space-x-4">
            <div className="w-1/4">
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
            <div className="w-3/4 space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
              ))}
            </div>
          </div>

          {/* Main Device Info Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-1/3">
              <div className="h-64 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
            <div className="w-2/3 space-y-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
          </div>

          {/* Prices Skeleton */}
          <div className="mt-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse shimmer w-1/2 mb-2"></div>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-300 rounded animate-pulse shimmer"></div>
              ))}
            </div>
          </div>

          {/* Network Technology Skeleton */}
          <div className="mt-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse shimmer w-1/4 mb-2"></div>
            <div className="h-16 bg-gray-300 rounded animate-pulse shimmer"></div>
          </div>

          {/* Launch Skeleton */}
          <div className="mt-4 flex space-x-4">
            <div className="w-1/4">
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
            <div className="w-3/4">
              <div className="h-4 bg-gray-300 rounded animate-pulse shimmer"></div>
            </div>
          </div>
        </div>
      ) : (
        // Placeholder for your actual content
        <div>Content loaded here</div>
      )}
    </div>
  );
}

