/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import CloudIcon from "@/components/icons/CloudIcon";
import AttachIcon from "../icons/AttachIcon";

// Removed UploadFormData as it's no longer needed

interface UploadCardProps {
  headingText: string;
  subHeading: string;
  acceptedFileTypes: string[];
  isImage?: boolean;
  footerText?: boolean;
  onUpload?: (file: File) => Promise<void>;
  apiEndpoint?: string;
  required?: boolean;
  maxFileSize?: number; // in bytes
  // Renamed onFormChange to onFileChange for clarity
  onFileChange?: (file: File | null) => void;
  formats?:string;
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
  formats
}: UploadCardProps) {
  // State for component status
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // State for file management, replacing react-hook-form
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // File validation function (now takes a single File or null)
  const validateFile = (file: File | null): string | null => {
    if (!file) {
      return required ? "File is required" : null;
    }

    // Check file size
    if (file.size > maxFileSize) {
      return `File size must be less than ${(maxFileSize / (1024 * 1024)).toFixed(1)}MB`;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedFileTypes.map(type =>
      type.startsWith('.') ? type.slice(1).toLowerCase() : type.toLowerCase()
    );

    if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
        return `File type must be one of: ${acceptedFileTypes.join(', ')}`;
    }

    return null; // No error
  };

  // Handler for when a file is selected from the FileTrigger
  const handleFileSelect = (fileList: FileList | null) => {
    const file = fileList?.[0] || null;

    // Reset previous states
    setUploadError(null);
    setUploadSuccess(false);
    
    // Validate the new file
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      setSelectedFile(null); // Clear the file if it's invalid
    } else {
      setValidationError(null);
      setSelectedFile(file);
    }
  };

  // Update preview when file changes
  useEffect(() => {
    let objectUrl: string | null = null;
    if (selectedFile && isImage && selectedFile.type.startsWith('image/')) {
        objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
    } else {
        setPreviewUrl(null);
    }

    // Cleanup function to revoke the object URL
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [selectedFile, isImage]);

  // Call onFileChange when the selected file changes
  useEffect(() => {
    if (onFileChange) {
      onFileChange(selectedFile);
    }
  }, [selectedFile, onFileChange]);

  // Handler for the upload button click
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
        formData.append('file', selectedFile);

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Upload successful:', result);
      } else {
        throw new Error("No upload handler or API endpoint provided");
      }

      setUploadSuccess(true);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // Replaced <form> with a <div>
    <div>
      <div>
        <div className="border border-neutral-300 p-4 lg:w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark">
          <p className="font-righteous">{headingText}</p>
          <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>

          <div className="flex flex-col items-center justify-center">
            {/* Removed Controller wrapper */}
            <FileTrigger
              acceptedFileTypes={acceptedFileTypes}
              onSelect={handleFileSelect}
            >
              <Button className="flex flex-col items-center">
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
                {!selectedFile && (
                  <p className="font-plus_jakarta_sans font-semibold text-xs mt-4">
                    Click to Add
                  </p>
                )}
              </Button>
            </FileTrigger>
          </div>

          {/* Display validation errors from state */}
          {validationError && (
            <p className="font-plus_jakarta_sans text-xs text-red-600 text-center">
              {validationError}
            </p>
          )}
        </div>

        <Button
          type="button" // Changed from "submit" to "button"
          onClick={handleUpload} // Added onClick handler
          className={`flex gap-3 items-center text-xs justify-center border p-2 rounded-md w-full lg:w-72 font-plus_jakarta_sans mt-2 font-bold transition-colors ${
            isUploading
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : uploadSuccess
              ? 'bg-green-50 text-green-700 border-green-300'
              : uploadError || validationError
              ? 'bg-red-50 text-red-700 border-red-300'
              : 'text-primary-100 border-neutral-300 hover:bg-gray-50'
          }`}
          // Updated isDisabled logic
          isDisabled={isUploading || !selectedFile || !!validationError}
        >
          <CloudIcon />
          {isUploading
            ? 'Uploading...'
            : uploadSuccess
            ? 'Uploaded!'
            : uploadError || validationError
            ? 'Upload Failed'
            : (isImage ? "Upload Image" : "Upload Document")
          }
        </Button>

        {/* Display upload errors (separate from validation errors) */}
        {uploadError && !validationError && (
          <div className="flex justify-center w-72">
            <p className="font-plus_jakarta_sans text-xs text-red-600 text-center mt-1">
              {uploadError}
            </p>
          </div>
        )}

        {footerText && (
          <div className="flex justify-center w-72">
            <p className="font-plus_jakarta_sans text-xs font-semibold text-text-dark text-center mt-2">
              File format: {formats}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}