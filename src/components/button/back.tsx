import React from "react";
import { Button } from ".";
import { GoArrowLeft } from "react-icons/go";

export default function BackButton() {
  return (
    <Button className="w-28 bg-white p-2 border border-neutral-300 flex items-center space-x-2 mb-4">
      <GoArrowLeft className="text-black text-[1.06rem]" />
      <p className="font-plus_jakarta_sans text-primary-100 text-sm font-bold">
        Go Back
      </p>
    </Button>
  );
}
