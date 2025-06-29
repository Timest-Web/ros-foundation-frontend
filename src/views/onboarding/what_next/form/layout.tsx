"use client";

import React from "react";

interface OnboardingFormLayoutProps {
  heading: string;
  subHeading: string;
  children: React.ReactNode;
}

export default function OnboardingFormLayout(props: OnboardingFormLayoutProps) {
  return (
    <div className="border border-neutral-300 p-4 rounded-md w-[40rem]">
      <h3 className="font-righteous text-text-dark">{props.heading}</h3>
      <p className="font-plus_jakarta_sans text-xs text-text-dark my-3">
        {props.subHeading}
      </p>
      {props.children}
    </div>
  );
}
