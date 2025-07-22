import React from "react";

interface AltAuthLayoutProps {
  header: string;
  subHeader?: string;
  OtpSubHeader?: React.ReactNode;
  form: React.ReactNode;
  className?: string;

}

export default function AltAuthLayout(props: AltAuthLayoutProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[30rem] pt-20">
        <section className={`flex flex-col gap-1 mb-4 px-2 ${props.className}`}>
          {props.OtpSubHeader}
          <header className="font-righteous text-[2.4rem] text-black">
            {props.header}
          </header>
          <h3 className="font-ar-one-sans text-black text-lg">
            {props.subHeader}
          </h3>
        </section>
        {props.form}
      </div>
    </div>
  );
}
