import React from "react";
import mother_and_child from "../../../../../public/images/mum_posing_with-daughter.jpg";
import { FiPhoneOutgoing } from "react-icons/fi";
import AuthLayout from "@/views/auth_layout";
import BeneficiaryOTPForm from "./form";
import OTPTimer from "@/components/extras/otp_timer";
import OTPInfo from "@/components/extras/otp_info";

export default function BeneficiaryOTPConfirmationView() {
  return (
    <AuthLayout
      displayImage={mother_and_child}
      imageAlt="mother_and_child"
      headerDescription="Enter OTP Code"
      otp={true}
      otpSubHeader={<OTPInfo />}
      sectionForm={<BeneficiaryOTPForm />}
      otpFooter={
        <main>
          <OTPTimer />
          <div className="flex justify-center mt-12">
            <section className="border border-neutral-300 rounded-sm flex space-x-4 p-4 w-[22rem]">
              <div className="border border-primary-100 bg-neutral-200 w-10 h-10 p-2 rounded-full flex justify-center items-center">
                <FiPhoneOutgoing className="text-primary-100" />
              </div>
              <div className="space-y-1">
                <p className="font-righteous text-text-dark">
                  Still can’t figure things out?
                </p>
                <p className="font-plus_jakarta_sans text-xs text-text-dark">
                  Call us for help on
                  <span className="text-primary-100"> +234 818 217 593 84</span>
                </p>
              </div>
            </section>
          </div>
        </main>
      }
      pageLink="/"
    />
  );
}
