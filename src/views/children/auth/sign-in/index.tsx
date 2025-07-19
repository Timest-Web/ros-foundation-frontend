import React from "react";
import hijabiSisters from "../../../../../public/images/three_women_in_hijab.jpg";
import ChildrenSignInForm from "./form";
import AuthLayout from "@/views/auth_layout";

export default function ChildrenSignInView() {
  return (
    <AuthLayout
      displayImage={hijabiSisters}
      imageAlt="hijabi_sisters"
      headerDescription="School fees receipt and Invoice upload Portal"
      subHeader="Login with your Mothers Phone number as well as your Name and surname"
      headerQuestion="Need Help?"
      headerDirective="Contact Support"
      sectionForm={<ChildrenSignInForm />}
      pageLink=""
    />
  );
}
