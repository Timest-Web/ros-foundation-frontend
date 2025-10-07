/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import AttachIcon from "../icons/AttachIcon";
import clsx from "clsx";

interface FileUploadPickerProps {
  headingText: string;
  subHeading: string;
  acceptedFileTypes: string[];
  onFileChange: (file: File | null) => void;
  isImage?: boolean;
  required?: boolean;
  maxFileSize?: number; // in bytes, e.g., 5 * 1024 * 1024 for 5MB
  formats?: string; // User-friendly string of formats, e.g., "PNG, JPG, GIF"
  isDisabled?: boolean;
  className?: string;
  initialImageUrl?: string; // For displaying an already uploaded image
  modalTrigger?: ReactNode; // Kept for additional functionality
  error?: string | null; // To display validation errors from the parent form
  fileName?: string;
}

export default function FileUploadPicker({
  headingText,
  subHeading,
  acceptedFileTypes,
  onFileChange,
  isImage,
  maxFileSize = 5 * 1024 * 1024,
  formats,
  isDisabled,
  className,
  initialImageUrl,
  modalTrigger,
  error,
  fileName,
}: FileUploadPickerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize) {
      return `File size must be less than ${(
        maxFileSize /
        (1024 * 1024)
      ).toFixed(1)}MB`;
    }
    if (!acceptedFileTypes.includes(file.type)) {
      const friendlyFormats = formats || acceptedFileTypes.join(", ");
      return `Unsupported file type. Please use: ${friendlyFormats}`;
    }
    return null;
  };

  const handleFileSelect = (fileList: FileList | null) => {
    const file = fileList?.[0] || null;
    setValidationError(null);

    if (!file) {
      onFileChange(null);
      setPreviewUrl(initialImageUrl || null);
      return;
    }

    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      onFileChange(null);
      if (previewUrl && !previewUrl.startsWith("blob:")) {
      } else {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(initialImageUrl || null);
      }
    } else {
      onFileChange(file);
      if (isImage) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const renderPreviewContent = () => {
    if (isImage && previewUrl) {
      return (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    return isImage ? <div className="flex justify-center items-center"><Camera /></div>  : <AttachIcon />;
  };

  const hasFile = !!previewUrl;
  const displayError = error || validationError;

  return (
    <div className={clsx("flex flex-col")}>
      <div
        className={clsx(
          "border p-4 lg:w-72 rounded-md flex flex-col gap-3 text-text-dark transition-colors",
          !className?.includes("h-") && "h-[14rem]",
          displayError ? "border-red-400" : "border-neutral-300",
          className
        )}
      >
        <p className="font-righteous">{headingText}</p>
        <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>

        <div className="flex flex-col items-center justify-center flex-grow">
          <FileTrigger
            acceptedFileTypes={acceptedFileTypes}
            onSelect={handleFileSelect}
          >
            <Button
              isDisabled={isDisabled}
              className="flex flex-col items-center"
            >
              <div className="border border-neutral-300 w-20 h-20 rounded-full flex justify-center overflow-hidden relative">
                {renderPreviewContent()}
              </div>
              {isDisabled && (
                <div className="flex gap-1 justify-center mt-4">
                  <AttachIcon />
                  <p className="font-plus_jakarta_sans text-xs font-semibold  text-primary-100">
                    {fileName}
                  </p>
                </div>
              )}
              {!isDisabled && (
                <p className="font-plus_jakarta_sans font-semibold text-xs mt-4 text-primary-100">
                  {hasFile ? "Click to Change" : "Click to Add"}
                </p>
              )}
            </Button>
          </FileTrigger>
        </div>
        {modalTrigger}
        {displayError && (
          <p className="font-plus_jakarta_sans text-xs text-red-600 text-center -mb-2">
            {displayError}
          </p>
        )}
      </div>

      {!isDisabled && formats && (
        <div className="flex justify-center w-full lg:w-72">
          <p className="font-plus_jakarta_sans text-xs font-semibold text-text-dark mt-2">
            File format: {formats}
          </p>
        </div>
      )}
    </div>
  );
}
