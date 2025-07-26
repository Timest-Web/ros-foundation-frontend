"use client";

import React from "react";

interface FormLayoutProps {
  heading: string;
  subHeading: string;
  children: React.ReactNode;
  className?:string;
}

export default function FormLayout(props: FormLayoutProps) {
  return (
    <div className={`${props.className} border border-neutral-300 p-4 rounded-md`}>
      <h3 className="font-righteous text-text-dark">{props.heading}</h3>
      <p className="font-plus_jakarta_sans text-xs text-text-dark my-3">
        {props.subHeading}
      </p>
      {props.children}
    </div>
  );
}
