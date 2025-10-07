import React from "react";

interface CheckMarkIconProps {
  className?: string;
}

export default function CheckMarkIcon({
  className = "w-4 h-4",
}: CheckMarkIconProps) {
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

export function PendingCheckMarkIcon({
  className = "w-4 h-4",
}: CheckMarkIconProps) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="4.98615" cy="4.98615" r="4.98615" fill="#FDA829" />
      <path
        d="M4.54879 6.78813L3.14917 5.38851L3.63904 4.89864L4.54879 5.8084L6.85816 3.49902L7.34803 3.98889L4.54879 6.78813Z"
        fill="black"
      />
    </svg>
  );
}
