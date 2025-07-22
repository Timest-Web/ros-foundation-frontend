import React from "react";
import EnrollerSignInForm from "./form";
import AltAuthLayout from "@/views/alt_auth_layout";

export default function EnrollerSignInView() {
  return (
    <AltAuthLayout
      header="Remote Enrolee"
      subHeader="Signing to your Account"
      form={<EnrollerSignInForm />}
      className="text-center"
    />
  );
}
