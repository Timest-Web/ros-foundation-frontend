import React from "react";
import AuthLayout from "../layout";
import happyKid from "../../../../public/images/kid_making_sign_of_heart.jpg";
import PasswordRecoveryForm from "./form";

export default function PasswordRecoveryView() {
  return (
    <AuthLayout
      displayImage={happyKid}
      imageAlt="happy_kid"
      headerDescription="Lost your password? Let’s help you get back in"
      subHeader={
        <p>
          We’re here to help you, call for help{" "}
          <span className="text-primary-100">+234 818 248 494</span>
        </p>
      }
      sectionForm={<PasswordRecoveryForm />}
      footerQuestion="I already have an Account"
      footerDirective="Start by Logging in Here"
      pageLink="/"
    />
  );
}
