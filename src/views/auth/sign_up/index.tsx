import Image from "next/image";
import React from "react";
import hijabiSisters from "../../../../public/images/three_women_in_hijab.jpg";
import SignInForm from "./form";
import Link from "next/link";

export default function SignInView() {
  return (
    <main className="flex">
      <div className="max-h-screen w-[35%]">
        <Image src={hijabiSisters} alt="hijabi_sisters" />
      </div>
      <div className="px-32 py-12 w-[65%]">
        <section>
          <h3 className="font-righteous text-black text-[45px] w-[29rem]">
            Login to your existing account
          </h3>
          <p className="font-ar-one-sans text-lg font-medium text-black">
            Welcome back our prestige beneficiary.
          </p>
        </section>
        <div className="w-[36rem] mt-8">
          <SignInForm />
        </div>
        <div className="flex space-x-2 justify-center mt-6">
          <p className="text-black font-ar-one-sans">
            I don’t have an account yet
          </p>
          <Link href={"/"} className="text-primary-100 font-plus_jakarta_sans">
            Create Account here
          </Link>
        </div>
      </div>
    </main>
  );
}
