import React from "react";
import AltAuthLayout from "@/views/alt_auth_layout";
import AccountManagerOneSignInForm from "./form";

export default function AccountManagerOneSignInView() {
  return (
    <AltAuthLayout
      header="Account Manager Signin"
      subHeader="Signing to your Account"
      form={<AccountManagerOneSignInForm/>}
    />
  );
}
