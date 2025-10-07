import React from "react";
import AltAuthLayout from "@/views/alt_auth_layout";
import FounderSignInForm from "./form";

export default function FounderOneSignInView() {
  return (
    <AltAuthLayout
      header="Founder Signin"
      subHeader="Signing to your Account"
      form={<FounderSignInForm/>}
    />
  );
}
