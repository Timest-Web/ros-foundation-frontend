/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import CloudIcon from "@/components/icons/CloudIcon";
import AttachIcon from "../icons/AttachIcon";

interface UploadCardProps {
  file: string | null;
  onFileChange: (fileList: FileList | null) => void;
  headingText: string;
  subHeading: string;
  acceptedFileTypes: string[];
  isImage?: boolean;
  footerText?: boolean;
}

export default function UploadCard({
  file,
  onFileChange,
  headingText,
  subHeading,
  acceptedFileTypes,
  isImage,
  footerText,
}: UploadCardProps) {
  return (
    <div>
      <div className="border border-neutral-300 p-4 w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark">
        <p className="font-righteous">{headingText}</p>
        <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>

        <div className="flex flex-col items-center justify-center">
          <FileTrigger
            acceptedFileTypes={acceptedFileTypes}
            onSelect={onFileChange}
          >
            <Button className="flex flex-col items-center">
              <div className="border border-neutral-300 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden relative">
                {file ? (
                  isImage ? (
                    <img
                      src={file}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <p className="text-xs text-center px-2 break-all">
                      {file.split("/").pop()?.split("\\").pop()}
                    </p>
                  )
                ) : isImage ? (
                  <Camera />
                ) : (
                  <AttachIcon />
                )}
              </div>

              {!file && (
                <p className="font-plus_jakarta_sans font-semibold text-xs mt-4">
                  Click to Add
                </p>
              )}
            </Button>
          </FileTrigger>
        </div>
      </div>

      <FileTrigger
        acceptedFileTypes={acceptedFileTypes}
        onSelect={onFileChange}
      >
        <Button className="flex gap-3 items-center text-primary-100 text-xs justify-center border border-neutral-300 p-2 rounded-md w-72 font-plus_jakarta_sans mt-2 font-bold">
          <CloudIcon />
          {isImage ? "Upload Image" : "Upload Document"}
        </Button>
      </FileTrigger>
      {footerText && (
        <div className="flex justify-center w-72">
          <p className="font-plus_jakarta_sans text-xs font-semibold text-text-dark text-center mt-2">
            File format: PNG, JPEG, PDF*
          </p>
        </div>
      )}
    </div>
  );
}
