// src/components/form/input/controlled.tsx (Your updated file)

"use client";

import {
  TextField,
  Input,
  Label,
  Text,
  type TextFieldProps,
} from "react-aria-components";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { ReactNode } from "react";
import clsx from "clsx"; // It's good practice to use clsx for conditional classes

// --- ADD startAdornment to the props ---
interface ControlledInputProps<T extends FieldValues>
  extends Omit<TextFieldProps, "children"> {
  label?: string;
  description?: string;
  name: Path<T>;
  control: Control<T>;
  type?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  startAdornment?: ReactNode;
  rightSlot?: ReactNode;
  placeholder?: string;
}

export function ControlledInput<T extends FieldValues>({
  label,
  description,
  name,
  control,
  type = "text",
  wrapperClassName = "",
  inputClassName = "",
  labelClassName,
  startAdornment,
  rightSlot,
  placeholder,
  ...props
}: ControlledInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField {...props} className={clsx("w-full", wrapperClassName)}>
      {label && (
        <div className="flex justify-between px-[0.15rem] lg:px-2 mb-2">
          <Label
            className={clsx(
              "text-text-dark block font-medium text-xs lg:text-sm font-plus_jakarta_sans",
              labelClassName
            )}
          >
            {label}
          </Label>
          {rightSlot && (
            <div className="text-text-dark font-medium text-xs lg:text-sm font-plus_jakarta_sans cursor-pointer">
              {rightSlot}
            </div>
          )}
        </div>
      )}
      <div
        className={clsx(
          "relative flex w-full items-center overflow-hidden rounded-sm border transition-colors",
          error ? "border-red-500" : "border-neutral-300",
          props.isDisabled ? "cursor-not-allowed bg-neutral-100" : "bg-white",
          "data-[focus-within]:ring-1 data-[focus-within]:ring-primary-100 data-[focus-within]:border-transparent"
        )}
      >
        {startAdornment && (
          <div className="flex h-full items-center justify-center font-plus_jakarta_sans font-semibold border-r border-neutral-300 py-4 px-3 text-sm text-text-dark">
            {startAdornment}
          </div>
        )}
        <Input
          type={type}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          placeholder={placeholder}
          className={clsx(
            "w-full flex-grow font-plus_jakarta_sans border-none bg-transparent text-sm text-text-dark placeholder:text-neutral-400 focus:outline-none focus:ring-0",
            props.isDisabled && "cursor-not-allowed text-text-dark",
            startAdornment ? "px-3 py-0" : "px-3 py-4",
            inputClassName
          )}
        />
      </div>

      {description && (
        <Text slot="description" className="text-xs text-gray-500 mt-1">
          {description}
        </Text>
      )}

      {error?.message && (
        <Text
          slot="errorMessage"
          className="text-xs font-plus_jakarta_sans font-medium text-red-500 mt-1"
        >
          {error.message}
        </Text>
      )}
    </TextField>
  );
}
