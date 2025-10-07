/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Text,
  FieldError,
  type ListBoxItemProps,
  type SelectProps,
  type ValidationResult,
} from "react-aria-components";

import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

interface GeneralSelectProps<
  T extends object,
  TFieldValues extends FieldValues = FieldValues
> extends Omit<
    SelectProps<T>,
    "children" | "selectedKey" | "defaultSelectedKey" | "onSelectionChange"
  > {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: (item: T) => React.ReactNode;
  placeholder?: string;
}

export function ControlledSelect<
  T extends object,
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  rules,
  label,
  description,
  items,
  children,
  placeholder,
  ...selectProps
}: GeneralSelectProps<T, TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Select
          selectedKey={field.value}
          onSelectionChange={field.onChange}
          isInvalid={!!error}
          {...selectProps}
        >
          {label && (
            <Label className="mb-3 text-text-dark block font-medium text-xs lg:text-sm font-plus_jakarta_sans">
              {label}
            </Label>
          )}

          <Button
            className={`w-full border border-neutral-300 rounded-sm px-4 py-4 text-text-dark focus:bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent flex justify-between items-center ${
              error ? "border-red-500" : "border-neutral-300"
            }`}
          >
            <SelectValue className="font-plus_jakarta_sans text-xs">
              {({ selectedText }) => selectedText || placeholder}
            </SelectValue>

            <IoChevronDown className="flex-shrink-0" />
          </Button>

          {description && (
            <Text
              slot="description"
              className="text-xs text-gray-600 mt-1 font-plus_jakarta_sans"
            >
              {description}
            </Text>
          )}

          <FieldError className="text-xs font-plus_jakarta_sans font-medium text-red-500 mt-1">
            {error?.message}
          </FieldError>

          <Popover className="bg-white rounded-md min-w-[--trigger-width] gap-2 p-4 shadow text-text-dark text-sm">
            <ListBox className="gap-2" items={items}>
              {children}
            </ListBox>
          </Popover>
        </Select>
      )}
    />
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `cursor-pointer rounded px-2 py-1 font-plus_jakarta_sans text-sm ${
          isSelected
            ? "bg-primary-100 text-primary-600 font-medium"
            : isFocused
            ? "bg-gray-100"
            : "hover:bg-gray-50"
        }`
      }
    />
  );
}
