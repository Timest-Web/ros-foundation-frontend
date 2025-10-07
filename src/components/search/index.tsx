"use client";

import {
  SearchField,
  Input,
  Button,
  FieldError,
  type SearchFieldProps,
  type ValidationResult,
} from "react-aria-components";
import clsx from "clsx";
import { LuSearch, LuX } from "react-icons/lu";

interface CustomSearchFieldProps extends SearchFieldProps {
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  className?: string; 
}

export function CustomSearchField({
  errorMessage,
  placeholder,
  className,
  ...props
}: CustomSearchFieldProps) {
  return (
    <SearchField
      {...props}
      className={clsx(className)}
    >
      {({ isDisabled, isInvalid }) => (
        <>
          <div
            className={clsx(
              "relative w-72 flex items-center overflow-hidden rounded-md border bg-white transition-colors",
              "focus-within:ring-2 focus-within:ring-primary-100/50 focus-within:border-primary-100"
            )}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <LuSearch 
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>

            <Input
              placeholder={placeholder}
              className={clsx(
                "w-full border-none bg-transparent py-2.5 pl-11 pr-10 font-plus_jakarta_sans text-sm text-text-dark placeholder:text-neutral-500 focus:outline-none focus:ring-0",
                isDisabled && "cursor-not-allowed"
              )}
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Button className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200 data-[pressed]:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100">
                <LuX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {isInvalid && (
            <FieldError className="mt-1 text-xs font-medium text-red-500 font-plus_jakarta_sans">
              {errorMessage}
            </FieldError>
          )}
        </>
      )}
    </SearchField>
  );
}