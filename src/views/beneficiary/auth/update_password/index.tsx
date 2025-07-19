import React from "react";
import mum_playing_with_kid from "../../../../../public/images/mum_playing_with_daughter.jpg"
import AuthLayout from "@/views/auth_layout";
import BeneficiaryUpdatePasswordForm from "./form";

export default function BeneficiaryUpdatePasswordView() {
  return (
    <AuthLayout
      displayImage={mum_playing_with_kid}
      imageAlt="mum_playing_with_kid"
      headerDescription="Great!! setup new password"
      sectionForm={<BeneficiaryUpdatePasswordForm />}
      footerQuestion="I already have an Account"
      footerDirective="Start by Logging in Here"
      pageLink="/"
    />
  );
}
