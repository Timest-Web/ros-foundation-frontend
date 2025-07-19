import React from "react";
import ChildrenDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import AttachIcon from "@/components/icons/AttachIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

export default function ChildrenUploadsView() {
  return (
    <ChildrenDashboardLayout>
      <FormHeading
        headerText="My Uploads"
        subHeading="All Past and present upload Summary"
      />
      <div className="flex justify-between mt-8">
        <div className="flex gap-2">
          <AttachIcon />
          <p className="text-primary-100 text-xs font-bold font-plus_jakarta_sans">
            yct..1 semester.pdf
          </p>
          <div className="ml-8"><DeleteIcon/></div>
        </div>
        <p className="font-plus_jakarta_sans text-xs text-text-dark">Now</p>
      </div>
    </ChildrenDashboardLayout>
  );
}
