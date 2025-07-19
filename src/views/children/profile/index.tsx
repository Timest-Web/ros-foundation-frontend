import React from "react";
import ChildrenDashboardLayout from "../layout";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import { FormHeading } from "@/views/layout";
import ProfileDocumentForm from "./document_upload/form";

export default function ChildrenProfileView() {
  return (
    <ChildrenDashboardLayout>
      <FormHeading headerText="My Profile" />
      <div className="mt-8 mb-4">
        <ProfileCard href="/children/profile/edit-profile" />
      </div>
      <ProfileDocumentForm/>
    </ChildrenDashboardLayout>
  );
}
