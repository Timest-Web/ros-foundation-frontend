import Link from "next/link";
import React from "react";




export default function OTPTimer() {
  return (
      <div className="flex justify-between mt-6">
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
  );
}
