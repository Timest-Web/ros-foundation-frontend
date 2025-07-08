/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DateField,
  DateSegment,
  DateInput,
  Label,
  FieldError,
  Text,
} from "react-aria-components";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { DateValue, ValidationResult } from "react-aria-components";
import React from "react";

interface CustomDateFieldProps<T extends DateValue> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  value: T | null;
  onChange: (value: any) => void;
}

function CustomDateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  value,
  onChange,
}: CustomDateFieldProps<T>) {
  return (
    <DateField value={value} onChange={onChange}>
      <Label className="mb-3 px-2 text-text-dark block font-medium text-sm font-plus_jakarta_sans">
        {label}
      </Label>
      <DateInput
        className={`w-full border border-neutral-300 rounded-sm px-4 py-4 pr-14 text-text-dark focus:bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent`}
      >
        {(segment) => <DateSegment className={"uppercase"} segment={segment} />}
      </DateInput>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </DateField>
  );
}

interface ControlledDateFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
}

export function ControlledDateField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  control,
  name,
  label,
  description,
}: ControlledDateFieldProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <CustomDateField
      label={label}
      description={description}
      errorMessage={error?.message}
      value={value ?? null}
      onChange={onChange}
    />
  );
}
