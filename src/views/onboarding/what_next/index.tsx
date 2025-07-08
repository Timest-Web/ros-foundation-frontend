"use client";

import React from "react";
import DashboardLayout from "../../layout";
import BackButton from "@/components/button/back";
import WhatNextForm from "./form";

export default function WhatNextView() {
  return (
    <DashboardLayout>
      <FormHeading
        headerText="What is Next?"
        subHeading="Complete setup for your Beneficiary Account"
      />
      <WhatNextForm />
    </DashboardLayout>
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
