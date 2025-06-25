import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  displayImage: StaticImageData;
  imageAlt: string;
  headerDescription: string;
  subHeader?: string | ReactNode;
  sectionForm: ReactNode;
  footerQuestion?: string;
  footerDirective?: string;
  otp?: boolean;
  otpSubHeader?:ReactNode
  otpFooter?:ReactNode
  pageLink:string
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen lg:flex-row flex-col">
      <div className="lg:w-[40%]">
        <Image
          className="object-cover w-full h-full"
          src={props.displayImage}
          alt={props.imageAlt}
        />
      </div>
      <div className=" px-16 py-6 lg:px-32 lg:pt-16 lg:w-[60%]">
        <section>
          {props.otp && (
            <div className="font-ar-one-sans text-lg font-medium text-black mb-4">
              {props.otpSubHeader}
            </div>
          )}
          <div className="font-righteous text-black lg:text-[2.4rem] lg:w-[29rem] leading-tight">
            {props.headerDescription}
          </div>
          <div className="font-ar-one-sans text-lg font-medium text-black mt-4">
            {props.subHeader}
          </div>
        </section>
        <section className="mt-8">
          {props.sectionForm}
          <div className="flex space-x-2 justify-center mt-6">
            <p className="text-black font-ar-one-sans">
              {props.footerQuestion}
            </p>
            <Link
              href={props.pageLink}
              className="text-primary-100 font-plus_jakarta_sans"
            >
              {props.footerDirective}
            </Link>
          </div>
          {props.otpFooter}
        </section>
      </div>
    </main>
  );
}
