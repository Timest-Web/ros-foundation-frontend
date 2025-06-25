import React from "react";
import AuthLayout from "../layout";
import mother_and_child from "../../../../public/images/mum_posing_with-daughter.jpg";
import OTPForm from "./form";
import Link from "next/link";
import { FiPhoneOutgoing } from "react-icons/fi";

export default function OTPConfirmationView() {
  return (
    <AuthLayout
      displayImage={mother_and_child}
      imageAlt="mother_and_child"
      headerDescription="Enter OTP Code"
      otp={true}
      otpSubHeader={
        <p>
          We sent a 6 digit sms otp code to
          <span className="text-primary-100">+234 818 248 494</span>
        </p>
      }
      sectionForm={<OTPForm />}
      otpFooter={
        <main>
          <div className="flex justify-between  mt-6">
            <div className="flex space-x-2">
              <p className="text-black font-ar-one-sans">6:00</p>
              <p className="text-black font-ar-one-sans">
                I didn’t receive OTP code
              </p>
            </div>
            <Link
              href={"/"}
              className="text-primary-100 font-plus_jakarta_sans items-end"
            >
              Resend Here
            </Link>
          </div>
          <div className="flex justify-center mt-12">
            <section className="border border-neutral-200 rounded-sm flex space-x-4 p-4 w-[22rem]">
              <div className="border border-primary-100 bg-neutral-100 w-10 h-10 p-2 rounded-full flex justify-center items-center">
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
