/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import OnboardingLayout from "../layout";
import BackButton from "@/components/button/back";
import { Button, FileTrigger } from "react-aria-components";
import Camera from "@/components/icons/Camera";
import WhatNextForm from "./form";
import CloudIcon from "@/components/icons/CloudIcon";

export default function WhatNextView() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFileSelect = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === "string") {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <OnboardingLayout>
      <BackButton />
      <h3 className="font-righteous text-4xl text-black mt-4">What is Next?</h3>
      <p className="font-ar-one-sans text-black my-4">
        Complete setup for your Beneficiary Account
      </p>
      <section className="flex gap-4 mt-4">
        <section>
          <div className="border border-neutral-300 p-4 w-68 h-60 rounded-md flex flex-col gap-3 text-text-dark">
            <p className="font-righteous">Add a Profile picture</p>
            <p className="font-plus_jakarta_sans text-xs">
              Add a Profile picture if you wish, else not so important
            </p>
            <div className="flex flex-col items-center justify-center">
              <FileTrigger
                acceptedFileTypes={[
                  "image/png",
                  "image/jpeg",
                  "image/jpg",
                  "image/gif",
                  "image/webp",
                  "image/bmp",
                  "image/tiff",
                  "image/svg+xml",
                  "image/avif",
                  "image/heic",
                  "image/heif",
                ]}
                onSelect={handleFileSelect}
              >
                <Button className="flex flex-col items-center">
                  <div className="border border-neutral-300 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden relative">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Selected profile picture preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Camera />
                    )}
                  </div>
                  {!profileImage && (
                    <p className="font-plus_jakarta_sans font-semibold text-xs mt-4">
                      Click to Add
                    </p>
                  )}
                </Button>
              </FileTrigger>
            </div>
          </div>
          <div>
            <FileTrigger
              acceptedFileTypes={[
                "image/png",
                "image/jpeg",
                "image/jpg",
                "image/gif",
                "image/webp",
                "image/bmp",
                "image/tiff",
                "image/svg+xml",
                "image/avif",
                "image/heic",
                "image/heif",
              ]}
              onSelect={handleFileSelect}
            >
              <Button className="flex gap-3 items-center text-primary-100 text-xs justify-center border border-neutral-300 p-2 rounded-md w-full font-plus_jakarta_sans mt-2 font-bold">
                <CloudIcon/>
                Upload Image
              </Button>
            </FileTrigger>
          </div>
        </section>
        <WhatNextForm />
      </section>
    </OnboardingLayout>
  );
}
