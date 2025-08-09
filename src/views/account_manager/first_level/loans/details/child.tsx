"use client";

import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { CustomCheckbox } from "@/components/form/checkbox";
import { ControlledInput } from "@/components/form/input/controlled";
import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import Image from "next/image";
import avatar from "../../../../../../public/images/placeholder_beneficiary.jpg";
import DocumentVerificationModal from "@/components/modal/document_modal";
import ScannerIcon from "@/components/icons/ScannerIcon";
import sampleNIN from "../../../../../../public/images/sample_nin.jpg";
import { Input } from "react-aria-components";
import AttachIcon from "@/components/icons/AttachIcon";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";

type FormValues = {
  suggestedAmount: string;
};

export default function ChildLoanDetails() {
  const { control, handleSubmit } = useForm<FormValues>();
  const [hasConsented, setHasConsented] = useState(false);

  const onSubmit = (data: FormValues) => {
    if (!hasConsented) {
      alert("Please give your consent before submitting.");
      return;
    }

    console.log("Form submitted with:", data);
  };

  return (
    <div className="p-4">
      <ProfileCard href="" />
      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <PrefilledCard
          headerText="Uploaded Passport photograph"
          subheader="Clear and Precise in white or red background"
          content={
            <section>
              <div className="flex justify-center items-center">
                <div className="relative">
                  <Image
                    className="h-20 w-20 rounded-full"
                    src={avatar}
                    alt=""
                  />
                  <CheckMarkIcon className="absolute top-2 right-0 w-4 h-4" />
                </div>
              </div>
              <div>
                <DocumentVerificationModal
                  imageUrl={avatar}
                  onActionComplete={() => alert("Hey")}
                >
                  <Button className="bg-white space-y-4 font-bold text-xs text-primary-100 mt-2">
                    <div className="flex justify-center items-center">
                      <ScannerIcon />
                    </div>
                    <p>Open Verification Panel</p>
                  </Button>
                </DocumentVerificationModal>
              </div>
            </section>
          }
        />
        <PrefilledCard
          headerText="Uploaded Business Proposal"
          subheader="well written and curated business proposal"
          content={
            <section>
              <div className="flex justify-center items-center">
                <div className="relative">
                  <Image className="h-20 w-20" src={sampleNIN} alt="" />
                  <CheckMarkIcon className="absolute top-2 left-18 w-4 h-4" />
                </div>
              </div>
              <div>
                <DocumentVerificationModal
                  imageUrl={sampleNIN}
                  onActionComplete={() => alert("Hey")}
                >
                  <Button className="bg-white space-y-4 font-bold text-xs text-primary-100 mt-2">
                    <div className="flex justify-center items-center">
                      <ScannerIcon />
                    </div>
                    <p>Open Verification Panel</p>
                  </Button>
                </DocumentVerificationModal>
              </div>
            </section>
          }
        />
        <PrefilledCard
          headerText="Document of Identification"
          subheader="Selected Document"
          content={
            <section>
              <div className="flex flex-col gap-4">
                <Input
                  readOnly
                  className="border border-neutral-300 rounded-md p-3 text-text-dark text-sm"
                  value={"NIN"}
                />
                <div className="flex gap-2">
                  <AttachIcon />
                  <p className="text-xs text-primary-100 font-medium">
                    Boma_dave.pdf
                  </p>
                  <CheckMarkIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <DocumentVerificationModal
                  imageUrl={avatar}
                  onActionComplete={() => alert("Hey")}
                >
                  <Button className="bg-white space-y-2 font-bold text-xs text-primary-100 mt-2">
                    <div className="flex justify-center items-center">
                      <ScannerIcon />
                    </div>
                    <p>Open Verification Panel</p>
                  </Button>
                </DocumentVerificationModal>
              </div>
            </section>
          }
        />
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-neutral-300 rounded-md p-4 w-72 mt-4"
      >
        <h3 className="font-righteous font-semibold mb-2 text-text-dark">
          Business Cash Approval
        </h3>

        <ControlledInput
          name="suggestedAmount"
          control={control}
          type="text"
          label="Enter Suggested Amount"
          placeholder="e.g. ₦100,000"
        />

        <div className="flex gap-2 items-start mt-4 mb-4">
          <CustomCheckbox
            isSelected={hasConsented}
            onChange={setHasConsented}
          />
          <p className="text-xs font-plus_jakarta_sans text-text-dark w-72">
            As manager 1, I consent that I have reviewed and approved the above
            amount to be paid to the beneficiary
          </p>
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="w-48">
            Move for Approval
          </Button>
        </div>
      </form>
    </div>
  );
}

interface PrefillCardProps {
  headerText: string;
  subheader: string;
  content: ReactNode;
}

function PrefilledCard({ headerText, subheader, content }: PrefillCardProps) {
  return (
    <div className="w-72 border border-neutral-300 rounded-md p-4 flex flex-col gap-3">
      <h3 className="font-righteous text-text-dark">{headerText}</h3>
      <p className="font-plus_jakarta_sans text-text-dark text-xs">
        {subheader}
      </p>
      {content}
    </div>
  );
}
