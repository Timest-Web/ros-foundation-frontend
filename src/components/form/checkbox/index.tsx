"use client";

import { Checkbox, type CheckboxProps } from "react-aria-components";

export function CustomCheckbox({
  children,
  ...props
}: Omit<CheckboxProps, "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <Checkbox {...props}>
      {({ isSelected }) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 flex items-center justify-center border rounded
              ${
                isSelected
                  ? "bg-green-500 border-green-500"
                  : "bg-white border-gray-400"
              }
            `}
          >
            <svg
              viewBox="0 0 18 18"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              {isSelected ? (
                <polyline
                  points="1 9 7 14 15 4"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              ) : null}
            </svg>
          </div>

          {children && (
            <div className="select-none cursor-pointer">{children}</div>
          )}
        </div>
      )}
    </Checkbox>
  );
}
