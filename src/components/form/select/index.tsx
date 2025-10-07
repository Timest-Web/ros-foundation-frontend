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
} from "react-aria-components";

import React from "react";
import { IoChevronDown } from "react-icons/io5";

interface GeneralSelectProps<T extends object>
  extends Omit<SelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  items?: Iterable<T>;
  children: (item: T) => React.ReactNode;
  placeholder?: string;
  labelClassName?: string; // New prop for label styles
  inputClassName?: string; // New prop for input/button styles
}

export function GeneralSelect<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  placeholder,
  labelClassName, 
  inputClassName, 
  ...selectProps
}: GeneralSelectProps<T>) {
  const isInvalid = !!errorMessage;

  return (
    <Select isInvalid={isInvalid} {...selectProps}>
      <div className="flex space-x-2">
        {label && (
          <Label
            className={`text-text-dark block font-medium text-xs pt-2 font-plus_jakarta_sans ${labelClassName}`}
          >
            {label}
          </Label>
        )}

        <Button
          className={`border rounded-sm px-2 py-2 text-text-dark focus:bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent flex justify-between items-center ${
            isInvalid ? "border-red-500" : "border-neutral-300"
          } ${inputClassName}`}
        >
          <SelectValue className="font-plus_jakarta_sans text-xs text-primary-100">
            {({ selectedText }) => selectedText || placeholder}
          </SelectValue>

          <IoChevronDown className="flex-shrink-0" />
        </Button>
      </div>
      {description && (
        <Text
          slot="description"
          className="text-xs text-gray-600 mt-1 font-plus_jakarta_sans"
        >
          {description}
        </Text>
      )}
      {errorMessage && (
        <FieldError className="text-xs font-plus_jakarta_sans font-medium text-red-500 mt-1">
          {errorMessage}
        </FieldError>
      )}

      <Popover className="bg-white rounded-md min-w-[--trigger-width] gap-2 p-4 shadow text-text-dark text-sm">
        <ListBox className="gap-2" items={items}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
}

// The SelectItem component doesn't need any changes.
export function SelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `cursor-pointer rounded px-2 py-1 font-plus_jakarta_sans text-sm ${
          isSelected
            ? "bg-primary-100 text-white font-medium"
            : isFocused
            ? "bg-gray-100"
            : "hover:bg-gray-50"
        }`
      }
    />
  );
}
