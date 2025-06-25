import React from "react";
import oldWoman from "../../../../public/images/old_woman_laughing.jpg";
import AuthLayout from "../layout";
import SignUpForm from "./form";

export default function SignUpView() {
  return (
    <AuthLayout
      displayImage={oldWoman}
      imageAlt="old_woman"
      headerDescription="Create your Beneficiary account"
      subHeader="Become a beneficiary of The Rose of Sharon Foundation"
      sectionForm={<SignUpForm />}
      footerQuestion="I already have an Account"
      footerDirective="Start by Logging in Here"
      pageLink="/"
    />
  );
}
