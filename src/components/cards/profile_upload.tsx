/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import CloudIcon from "@/components/icons/CloudIcon";
import AttachIcon from "../icons/AttachIcon";
import clsx from "clsx";

interface UploadCardProps {
  headingText: string;
  subHeading: string;
  acceptedFileTypes: string[];
  isImage?: boolean;
  footerText?: boolean;
  onUpload?: (file: File) => Promise<void>;
  apiEndpoint?: string;
  required?: boolean;
  maxFileSize?: number;
  onFileChange?: (file: File | null) => void;
  formats?: string;
  isDisabled?: boolean;
  className?: string;
}

export default function UploadCard({
  headingText,
  subHeading,
  acceptedFileTypes,
  isImage,
  footerText,
  onUpload,
  apiEndpoint,
  required = false,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  onFileChange,
  formats,
  isDisabled,
  className,
}: UploadCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateFile = (file: File | null): string | null => {
    if (!file) {
      return required ? "File is required" : null;
    }

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

    setUploadError(null);
    setUploadSuccess(false);

    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } else {
      setValidationError(null);
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    let objectUrl: string | null = null;
    if (selectedFile && isImage && selectedFile.type.startsWith("image/")) {
      objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [selectedFile, isImage]);

  useEffect(() => {
    if (onFileChange) {
      onFileChange(selectedFile);
    }
  }, [selectedFile, onFileChange]);

  const handleUpload = async () => {
    if (!selectedFile) {
      setValidationError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      if (onUpload) {
        await onUpload(selectedFile);
      } else if (apiEndpoint) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Upload successful:", result);
      } else {
        throw new Error("No upload handler or API endpoint provided");
      }

      setUploadSuccess(true);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div>
        <div
          className={clsx(
            "border border-neutral-300 p-4 lg:w-72 rounded-md flex flex-col gap-3 text-text-dark",
            !className?.includes("h-") && "h-[14rem]",
            className
          )}
        >
          <p className="font-righteous">{headingText}</p>
          <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>

          <div className="flex flex-col items-center justify-center">
            <FileTrigger
              acceptedFileTypes={acceptedFileTypes}
              onSelect={handleFileSelect}
            >
              <Button
                isDisabled={isDisabled}
                className="flex flex-col items-center"
              >
                <div className="border border-neutral-300 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden relative">
                  {selectedFile ? (
                    isImage && previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <p className="text-xs text-center px-2 break-all">
                        {selectedFile.name}
                      </p>
                    )
                  ) : isImage ? (
                    <Camera />
                  ) : (
                    <AttachIcon />
                  )}
                </div>
                {!isDisabled && !selectedFile && (
                  <p className="font-plus_jakarta_sans font-semibold text-xs mt-4">
                    Click to Add
                  </p>
                )}
              </Button>
            </FileTrigger>
          </div>

          {validationError && (
            <p className="font-plus_jakarta_sans text-xs text-red-600 text-center">
              {validationError}
            </p>
          )}
        </div>

        {!isDisabled && (
          <Button
            type="button"
            onClick={handleUpload}
            className={`flex gap-3 items-center text-xs justify-center border p-2 rounded-md w-full lg:w-72 font-plus_jakarta_sans mt-2 font-bold transition-colors ${
              isUploading
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : uploadSuccess
                ? "bg-green-50 text-green-700 border-green-300"
                : uploadError || validationError
                ? "bg-red-50 text-red-700 border-red-300"
                : "text-primary-100 border-neutral-300 hover:bg-gray-50"
            }`}
            isDisabled={isUploading || !selectedFile || !!validationError}
          >
            <CloudIcon />
            {isUploading
              ? "Uploading..."
              : uploadSuccess
              ? "Uploaded!"
              : uploadError || validationError
              ? "Upload Failed"
              : isImage
              ? "Upload Image"
              : "Upload Document"}
          </Button>
        )}

        {uploadError && !validationError && (
          <div className="flex justify-center w-72">
            <p className="font-plus_jakarta_sans text-xs text-red-600 text-center mt-1">
              {uploadError}
            </p>
          </div>
        )}

        {!isDisabled && footerText && (
          <div className="flex justify-center w-72">
            <p className="font-plus_jakarta_sans text-xs font-semibold text-text-dark mt-2">
              File format: {formats}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
