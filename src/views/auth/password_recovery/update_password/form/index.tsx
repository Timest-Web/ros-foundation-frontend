import React from "react";
import AuthLayout from "@/views/auth/layout";
import mum_playing_with_kid from "../../../../../../public/images/mum_playing_with_daughter.jpg"
import UpdatePasswordForm from "./form";

export default function UpdatePasswordView() {
  return (
    <AuthLayout
      displayImage={mum_playing_with_kid}
      imageAlt="mum_playing_with_kid"
      headerDescription="Great!! setup new password"
      sectionForm={<UpdatePasswordForm />}
      footerQuestion="I already have an Account"
      footerDirective="Start by Logging in Here"
      pageLink="/"
    />
  );
}
