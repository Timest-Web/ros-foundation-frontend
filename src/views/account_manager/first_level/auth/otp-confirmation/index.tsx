import React from "react";
import EnrollerOTPForm from "./form";
import AltAuthLayout from "@/views/alt_auth_layout";
import OTPInfo from "@/components/extras/otp_info";

export default function AccountManagerOneOTPView() {
  return (
    <AltAuthLayout
      header="Enter Otp code"
      form={<EnrollerOTPForm />}
      OtpSubHeader={<OTPInfo />}
    />
  );
}
