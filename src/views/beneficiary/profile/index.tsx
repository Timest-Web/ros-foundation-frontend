import React from "react";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import ProfileForm from "./form";
import UploadCard from "@/components/cards/profile_upload";

export default function ProfileView() {
  return (
    <BeneficiaryDashboardLayout>
      <FormHeading
        headerText="My Profile"
        subHeading="Update your Profile details, Update your account a Password"
      />
      <UploadCard
        apiEndpoint=""
        headingText="Add a Profile picture"
        subHeading="Add a Profile picture if you wish, else not so important"
        acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
        isImage={true}
      />
      <ProfileForm />
    </BeneficiaryDashboardLayout>
  );
}
