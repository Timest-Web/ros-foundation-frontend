// import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface AdditionalFormInfoLinkProps {
  text: string;
  linkText: string;
  href: string;
  className?: string;
}

export default function AdditionalFormInfoLink({
  href,
  text,
  linkText,
  className,
}: AdditionalFormInfoLinkProps) {
  return (
    <div
      className={cn(
        "font-plus_jakarta_sans text-sm px-2 flex space-x-2 justify-center mb-6",
        className
      )}
    >
      <p className="text-text-dark">{text}</p>
      <Link href={href} className="text-primary-100">
        {linkText}
      </Link>
    </div>
  );
}
