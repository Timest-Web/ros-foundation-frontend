import React from "react";
import ChildrenDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout"
import MakeUploadForm from "./form";

export default function MakeUploadView() {
  return (
    <ChildrenDashboardLayout>
      <FormHeading
        headerText="Upload file"
        subHeading="Upload school fees receipts or Payment Invoice"
        isBackButton={true}
      />
      <p className="text-xs font-plus_jakarta_sans text-text-dark my-4">Hi Boma, upload all required document to be reviewed  for approval and grant payment</p>
      <MakeUploadForm/>
    </ChildrenDashboardLayout>
  );
}
