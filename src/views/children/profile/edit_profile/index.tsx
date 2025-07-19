import UploadCard from "@/components/cards/profile_upload";
import React from "react";
import ChildrenDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import EditProfileForm from "./form";

export default function EditProfileView() {
  return (
    <ChildrenDashboardLayout>
      <FormHeading
        headerText="Edit Profile"
        subHeading="Edit your Profile"
        isBackButton={true}
      />
      <div className="mt-4 flex gap-4">
        <UploadCard
          headingText="Upload Passport photograph"
          subHeading="Clear and Precise in white or red background"
          acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
          isImage={true}
          footerText={true}
        />
        <EditProfileForm/>
      </div>
    </ChildrenDashboardLayout>
  );
}
