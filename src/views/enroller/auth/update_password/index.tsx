import AltAuthLayout from "@/views/alt_auth_layout";
import React from "react";
import EnrollerUpdatePasswordForm from "./form";

export default function EnrollerUpdatePasswordView() {
  return (
    <AltAuthLayout
      header="Great!! setup new password"
      form={<EnrollerUpdatePasswordForm />}
    />
  );
}
