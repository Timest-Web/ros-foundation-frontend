/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  DateField,
  DateSegment,
  DateInput,
  Label,
  FieldError,
  Text,
  ValidationResult,
} from "react-aria-components";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import React, { useMemo } from "react";
// --- Import the necessary utilities and types ---
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// --- CustomDateField ---
// No major logic change, but let's be more specific with the types.
interface CustomDateFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  // It now specifically expects a CalendarDate from the controller
  value: CalendarDate | null;
  // It will also pass a CalendarDate back up
  onChange: (value: CalendarDate | null) => void;
  isDisabled?: boolean;
}

function CustomDateField({
  label,
  description,
  errorMessage,
  value,
  onChange,
  isDisabled,
}: CustomDateFieldProps) {
  return (
    // The DateField now receives the correctly formatted value
    <DateField
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      className="flex flex-col"
    >
      <Label className="px-2 mb-2 text-text-dark block font-medium text-xs lg:text-sm font-plus_jakarta_sans">
        {label}
      </Label>
      <DateInput
        className={`w-full border border-neutral-300 rounded-sm px-4 py-[1.08rem] pr-14 text-text-dark focus:bg-white text-xs lg:text-sm focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent data-[disabled]:bg-gray-200 data-[disabled]:cursor-not-allowed`}
      >
        {(segment) => <DateSegment className={"uppercase"} segment={segment} />}
      </DateInput>
      {description && <Text slot="description">{description}</Text>}
      <FieldError className="text-red-600 text-xs">{errorMessage}</FieldError>
    </DateField>
  );
}

// --- ControlledDateField (The "Bridge") ---
interface ControlledDateFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  isDisabled?: boolean; 
}

export function ControlledDateField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  control,
  name,
  label,
  description,
  isDisabled, 
}: ControlledDateFieldProps<TFieldValues, TName>) {
  const {
    field: { value, onChange }, 
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  // STEP 1: CONVERT INCOMING VALUE (JS Date -> CalendarDate)
  // useMemo will prevent re-calculating on every render
  const calendarDateValue = useMemo<CalendarDate | null>(() => {
    if (!value) return null;
    try {
      // Handles both JS Date objects and "YYYY-MM-DD" strings
      const date = new Date(value);
      return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1, // CalendarDate month is 1-based
        date.getDate()
      );
    } catch (e) {
      console.error("Invalid date value for ControlledDateField:", value);
      return null;
    }
  }, [value]);

  // STEP 2: CONVERT OUTGOING VALUE (CalendarDate -> JS Date)
  const handleDateChange = (newDate: CalendarDate | null) => {
    if (newDate) {
      // Convert the CalendarDate back to a JS Date for react-hook-form
      const jsDate = newDate.toDate(getLocalTimeZone());
      onChange(jsDate);
    } else {
      onChange(null);
    }
  };

  return (
    <CustomDateField
      label={label}
      description={description}
      errorMessage={error?.message}
      // Pass the converted value and change handler
      value={calendarDateValue}
      onChange={handleDateChange}
      isDisabled={isDisabled} // <-- Pass it down
    />
  );
}