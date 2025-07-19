import React from "react";
import oldWoman from "../../../../../public/images/old_woman_laughing.jpg";
import AuthLayout from "@/views/auth_layout";
import BeneficiarySignUpForm from "./form";

export default function BeneficiarySignUpView() {
  return (
    <AuthLayout
      displayImage={oldWoman}
      imageAlt="old_woman"
      headerDescription="Create your Beneficiary account"
      subHeader="Become a beneficiary of The Rose of Sharon Foundation"
      sectionForm={<BeneficiarySignUpForm />}
      footerQuestion="I already have an Account"
      footerDirective="Start by Logging in Here"
      pageLink="/"
    />
  );
}
