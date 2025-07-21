
import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton ({ className }:SkeletonProps){
  return (
    <div
      className={clsx(
        "animate-pulse bg-neutral-200 dark:bg-neutral-500",
        "rounded-md",
        className
      )}
    />
  );
};


