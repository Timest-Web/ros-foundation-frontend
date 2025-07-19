import React from "react";
import FirstChildForm from "./first_child";
import SecondChildForm from "./second_child";

export default function SecondStepForm() {
  return (
      <div className="flex gap-2">
        <FirstChildForm />
        <SecondChildForm />
      </div>
  );
}
