/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import CloudIcon from "@/components/icons/CloudIcon";

interface ProfileImageUploadProps {
  image: string | null;
  onImageChange: (fileList: FileList | null) => void;
  headingText: string
  subHeading: string
}

export default function ProfileImageUpload({
  image,
  onImageChange,
  headingText,
  subHeading
}: ProfileImageUploadProps) {
  return (
    <div>
      <div className="border border-neutral-300 p-4 w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark">
        <p className="font-righteous">{headingText}</p>
        <p className="font-plus_jakarta_sans text-xs">
          {subHeading}
        </p>
        <div className="flex flex-col items-center justify-center">
          <FileTrigger
            acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
            onSelect={onImageChange}
          >
            <Button className="flex flex-col items-center">
              <div className="border border-neutral-300 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden relative">
                {image ? (
                  <img
                    src={image}
                    alt="Selected profile picture preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Camera />
                )}
              </div>
              {!image && (
                <p className="font-plus_jakarta_sans font-semibold text-xs mt-4">
                  Click to Add
                </p>
              )}
            </Button>
          </FileTrigger>
        </div>
      </div>

      <FileTrigger
        acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
        onSelect={onImageChange}
      >
        <Button className="flex gap-3 items-center text-primary-100 text-xs justify-center border border-neutral-300 p-2 rounded-md w-72 font-plus_jakarta_sans mt-2 font-bold">
          <CloudIcon />
          Upload Image
        </Button>
      </FileTrigger>
    </div>
  );
}
