import React from "react";
import EnrollerPasswordRecoveryForm from "./form";
import AltAuthLayout from "@/views/alt_auth_layout";

export default function EnrollerPasswordRecoveryView() {
  return (
    <AltAuthLayout
      header="Lost your password? Let’s help you get back in"
      form={<EnrollerPasswordRecoveryForm />}
    />
  );
}
