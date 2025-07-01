"use client";

import React, { useState } from "react";
import OnboardingLayout from "../layout";
import BackButton from "@/components/button/back";
import WhatNextForm from "./form";
import ProfileImageUpload from "@/components/cards/profile_upload";

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
      <FormHeading
        headerText="What is Next?"
        subHeading="Complete setup for your Beneficiary Account"
      />
      <section className="flex gap-4 mt-4">
        <section>
          <ProfileImageUpload
            image={profileImage}
            onImageChange={handleFileSelect}
            headingText="Add a Profile picture"
            subHeading="Add a Profile picture if you wish, else not so important"
          />
        </section>
        <WhatNextForm />
      </section>
    </OnboardingLayout>
  );
}

interface FormHeadingProps {
  headerText: string;
  subHeading: string;
  spanText?: string;
}

export function FormHeading(props: FormHeadingProps) {
  return (
    <div>
      <BackButton />
      <h3 className="font-righteous text-4xl text-black mt-4">
        {props.headerText}
      </h3>
      <p className="font-ar-one-sans text-black my-4">
        {props.subHeading}{" "}
        <span className="text-accent-100">{props.spanText}</span>
      </p>
    </div>
  );
}
