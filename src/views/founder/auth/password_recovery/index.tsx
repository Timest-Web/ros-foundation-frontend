import React from "react";
import AltAuthLayout from "@/views/alt_auth_layout";
import AccountManagerOnePasswordRecoveryForm from "./form";

export default function AccountManagerOnePasswordRecoveryView() {
  return (
    <AltAuthLayout
      header="Lost your password? Let’s help you get back in"
      form={<AccountManagerOnePasswordRecoveryForm />}
    />
  );
}
