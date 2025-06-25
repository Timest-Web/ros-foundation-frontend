"use client";
import { useState, useRef, useEffect } from "react";
import { TextField, Input, Label, Text } from "react-aria-components";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface OTPInputProps<T extends FieldValues> {
  label?: string;
  description?: string;
  name: Path<T>;
  control: Control<T>;
  length?: number;
  wrapperClassName?: string;
  inputClassName?: string;
}

export function OTPInput<T extends FieldValues>({
  label,
  description,
  name,
  control,
  length = 6,
  wrapperClassName = "",
  inputClassName = "",
}: OTPInputProps<T>) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // Update form field when OTP changes
  useEffect(() => {
    field.onChange(otp.join(""));
  }, [otp, field]);

  // Initialize OTP from field value
  useEffect(() => {
    if (field.value) {
      const digits = field.value.split("").slice(0, length);
      const paddedDigits = [...digits, ...new Array(length - digits.length).fill("")];
      setOtp(paddedDigits);
    }
  }, [field.value, length]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = pastedData.split("").slice(0, length);
    const newOtp = [...new Array(length).fill("")];
    
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(val => val === "");
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <Label className="mb-2 text-text-dark block font-medium text-sm font-plus_jakarta_sans">
          {label}
        </Label>
      )}

      <div className="flex gap-4 w-full">
        {otp.map((digit, index) => (
          <TextField key={index} className="flex-1">
            <Input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-full h-20 text-center text-text-dark font-plus_jakarta_sans border ${
                error ? "border-red-500" : "border-neutral-200"
              } rounded-sm text-lg font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-100 focus:border-transparent ${inputClassName}`}
            />
          </TextField>
        ))}
      </div>

      {description && (
        <Text className="text-xs text-gray-500 mt-2 text-center">
          {description}
        </Text>
      )}

      {error?.message && (
        <Text className="text-xs font-plus_jakarta_sans font-medium text-red-500 mt-2 text-center">
          {error.message}
        </Text>
      )}
    </div>
  );
}