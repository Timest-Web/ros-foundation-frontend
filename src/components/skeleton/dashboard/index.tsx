import React from "react";
import Skeleton from "..";

export default function DashboardSkeleton() {
  return (
    <div>
      <nav className="bg-neutral-100 px-6 lg:px-16 py-4 flex justify-end space-x-2 lg:space-x-5 border border-b border-neutral-300">
        <Skeleton className="w-[9.5rem] h-10" />
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-32 h-10 rounded" />
      </nav>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:bg-neutral-100 lg:min-h-screen px-6 lg:px-8 lg:py-6 lg:w-[18rem]">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10 mb-4" />
          ))}
        </div>
        <div className="px-6 lg:px-12 py-6 flex-1">
          <Skeleton className="w-full h-96" />
        </div>
      </div>
    </div>
  );
}
