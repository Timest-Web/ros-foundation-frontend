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

interface ControlledInputProps<T extends FieldValues>
  extends Omit<TextFieldProps, "children"> {
  label?: string;
  description?: string;
  name: Path<T>;
  control: Control<T>;
  type?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  rightSlot?: ReactNode;
}

export function ControlledInput<T extends FieldValues>({
  label,
  description,
  name,
  control,
  type = "text",
  wrapperClassName = "",
  inputClassName = "",
  rightSlot,
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
    <TextField {...props} className={`w-full ${wrapperClassName}`}>
      {label && (
        <div className="flex justify-between px-2 mb-2" >
          <Label className="mb-1 text-text-dark block font-medium text-sm font-plus_jakarta_sans">
            {label}
          </Label>
          {rightSlot && (
            <div className=" text-text-dark font-medium text-sm font-plus_jakarta_sans cursor-pointer">
              {rightSlot}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <Input
          type={type}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          className={`w-full border ${
            error ? "border-red-500" : "border-neutral-200"
          } rounded-sm px-4 py-4 pr-14 text-text-dark focus:bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent ${inputClassName}`}
        />
      </div>

      {description && (
        <Text slot="description" className="text-xs text-gray-500 mt-1">
          {description}
        </Text>
      )}

      {error?.message && (
        <Text slot="errorMessage" className="text-xs font-plus_jakarta_sans font-medium text-red-500 mt-1">
          {error.message}
        </Text>
      )}
    </TextField>
  );
}
