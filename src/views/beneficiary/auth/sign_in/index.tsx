import React from "react";
import hijabiSisters from "../../../../../public/images/three_women_in_hijab.jpg";
import AuthLayout from "@/views/auth_layout";
import BeneficiarySignInForm from "./form";

export default function BeneficiarySignInView() {
  return (
    <AuthLayout
      displayImage={hijabiSisters}
      imageAlt="hijabi_sisters"
      headerDescription="Login to your existing account"
      subHeader="Welcome back our prestige beneficiary."
      sectionForm={<BeneficiarySignInForm />}
      footerQuestion="I don’t have an account yet"
      footerDirective=" Create Account here"
      pageLink="/sign-up"
    />
  );
}
