import AltAuthLayout from "@/views/alt_auth_layout";
import React from "react";
import AccountManagerOneUpdatePasswordForm from "./form";

export default function AccountManagerOneUpdatePasswordView() {
  return (
    <AltAuthLayout
      header="Great!! setup new password"
      form={<AccountManagerOneUpdatePasswordForm/>}
    />
  );
}
