"use client";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { cn } from "@/lib/utils";
import { Loader } from "../loader";

interface MyButtonProps extends ButtonProps {
  isPending?: boolean;
  className?: string;
}

export function Button({
  children,
  isPending = false,
  className,
  ...props
}: MyButtonProps) {
  return (
    <AriaButton
      {...props}
      isDisabled={isPending || props.isDisabled}
      className={({ isPressed, isFocusVisible }) =>
        cn(
          "p-4 rounded-sm text-white text-sm w-full font-plus_jakarta_sans bg-primary-100 hover:opacity-70 transition cursor-pointer",
          isPressed && "scale-95",
          isFocusVisible && "outline outline-offset-2 outline-primary-100",
          className
        )
      }
    >
      {isPending ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        children
      )}
    </AriaButton>
  );
}
