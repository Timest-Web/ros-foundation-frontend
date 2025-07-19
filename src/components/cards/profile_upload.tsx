/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import CloudIcon from "@/components/icons/CloudIcon";
import AttachIcon from "../icons/AttachIcon";

interface UploadFormData {
  file: FileList | null;
}

interface UploadCardProps {
  headingText: string;
  subHeading: string;
  acceptedFileTypes: string[];
  isImage?: boolean;
  footerText?: boolean;
  onUpload?: (file: File, formData?: UploadFormData) => Promise<void>;
  apiEndpoint?: string;
  name?: string; // Field name for react-hook-form
  required?: boolean;
  maxFileSize?: number; // in bytes
  onFormChange?: (formData: UploadFormData) => void;
}

export default function UploadCard({
  headingText,
  subHeading,
  acceptedFileTypes,
  isImage,
  footerText,
  onUpload,
  apiEndpoint,
  name = "file",
  required = false,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  onFormChange,
}: UploadCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<UploadFormData>({
    defaultValues: {
      file: null,
    },
  });

  const watchedFile = watch("file");

  // File validation function
  const validateFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      if (required) {
        return "File is required";
      }
      return true;
    }

    const file = fileList[0];

    // Check file size
    if (file.size > maxFileSize) {
      return `File size must be less than ${(maxFileSize / (1024 * 1024)).toFixed(1)}MB`;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedFileTypes.map(type => 
      type.startsWith('.') ? type.slice(1).toLowerCase() : type.toLowerCase()
    );

    if (!acceptedExtensions.includes(fileExtension || '')) {
      return `File type must be one of: ${acceptedFileTypes.join(', ')}`;
    }

    return true;
  };

  // Update preview when file changes
  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      
      if (isImage && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        // Cleanup previous URL
        return () => {
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
        };
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [watchedFile, isImage]);

  // Call onFormChange when form data changes
  useEffect(() => {
    if (onFormChange) {
      onFormChange({ file: watchedFile });
    }
  }, [watchedFile, onFormChange]);

  const handleFileChange = (fileList: FileList | null) => {
    setValue("file", fileList);
    clearErrors("file");
    setUploadError(null);
    setUploadSuccess(false);
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!data.file || data.file.length === 0) {
      setError("file", { message: "Please select a file" });
      return;
    }

    const file = data.file[0];
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      if (onUpload) {
        // Use custom upload handler
        await onUpload(file, data);
      } else if (apiEndpoint) {
        // Default upload implementation
        const formData = new FormData();
        formData.append('file', file);

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

  const selectedFile = watchedFile && watchedFile.length > 0 ? watchedFile[0] : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="border border-neutral-300 p-4 w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark">
          <p className="font-righteous">{headingText}</p>
          <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>

          <div className="flex flex-col items-center justify-center">
            <Controller
              name="file"
              control={control}
              rules={{
                validate: validateFile
              }}
              render={({ }) => (
                <FileTrigger
                  acceptedFileTypes={acceptedFileTypes}
                  onSelect={handleFileChange}
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
              )}
            />
          </div>

          {/* Display validation errors */}
          {errors.file && (
            <p className="font-plus_jakarta_sans text-xs text-red-600 text-center">
              {errors.file.message}
            </p>
          )}
        </div>

        <Button 
          type="submit"
          className={`flex gap-3 items-center text-xs justify-center border p-2 rounded-md w-72 font-plus_jakarta_sans mt-2 font-bold transition-colors ${
            isUploading 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
              : uploadSuccess
              ? 'bg-green-50 text-green-700 border-green-300'
              : uploadError
              ? 'bg-red-50 text-red-700 border-red-300'
              : 'text-primary-100 border-neutral-300 hover:bg-gray-50'
          }`}
          isDisabled={isUploading}
        >
          <CloudIcon />
          {isUploading 
            ? 'Uploading...' 
            : uploadSuccess 
            ? 'Uploaded!' 
            : uploadError 
            ? 'Upload Failed' 
            : (isImage ? "Upload Image" : "Upload Document")
          }
        </Button>

        {/* Display upload errors */}
        {uploadError && (
          <div className="flex justify-center w-72">
            <p className="font-plus_jakarta_sans text-xs text-red-600 text-center mt-1">
              {uploadError}
            </p>
          </div>
        )}

        {footerText && (
          <div className="flex justify-center w-72">
            <p className="font-plus_jakarta_sans text-xs font-semibold text-text-dark text-center mt-2">
              File format: PNG, JPEG, PDF*
            </p>
          </div>
        )}
      </div>
    </form>
  );
}