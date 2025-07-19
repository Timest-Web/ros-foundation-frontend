"use client";

import React from "react";
import BeneficiaryDashboardLayout from "../../layout";
import WhatNextForm from "./form";
import { FormHeading } from "@/views/layout";

export default function WhatNextView() {
  return (
    <BeneficiaryDashboardLayout>
      <FormHeading
        headerText="What is Next?"
        subHeading="Complete setup for your Beneficiary Account"
      />
      <WhatNextForm />
    </BeneficiaryDashboardLayout>
  );
}

