import React from "react";

interface CheckMarkIconProps {
  className?: string;
}

export default function CheckMarkIcon({ className = "w-4 h-4" }: CheckMarkIconProps) {
  return (
    <svg
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="9.5" cy="9.5" r="9.5" fill="#00E57A" />
      <path
        d="M8.66667 12.9333L6 10.2666L6.93333 9.33329L8.66667 11.0666L13.0667 6.66663L14 7.59996L8.66667 12.9333Z"
        fill="black"
      />
    </svg>
  );
}
