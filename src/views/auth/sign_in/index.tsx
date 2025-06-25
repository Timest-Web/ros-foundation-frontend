import React from "react";
import hijabiSisters from "../../../../public/images/three_women_in_hijab.jpg";
import SignInForm from "./form";
import AuthLayout from "../layout";

export default function SignInView() {
  return (
    <AuthLayout
      displayImage={hijabiSisters}
      imageAlt="hijabi_sisters"
      headerDescription="Login to your existing account"
      subHeader="Welcome back our prestige beneficiary."
      sectionForm={<SignInForm />}
      footerQuestion="I don’t have an account yet"
      footerDirective=" Create Account here"
      pageLink="/sign-up"
    />
  );
}
