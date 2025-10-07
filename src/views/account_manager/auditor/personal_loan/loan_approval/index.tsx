"use client";

import React from "react";
import { Button } from "@/components/button";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ControlledInput } from "@/components/form/input/controlled";
import FormLayout from "@/views/form_layout";
import DocumentVerificationModal from "@/components/modal/document_modal";
import ScannerIcon from "@/components/icons/ScannerIcon";
import sampleNIN from "../../../../../../public/images/sample_nin.jpg";
import { FormHeading } from "@/views/layout";
import FileUploadPicker from "@/components/cards/profile_upload";
import DocumentUploadCard from "@/components/cards/upload_card";
import AuditorDashboardLayout from "../../layout";
const loanApplicationData = {
  applicantName: "Boma Dave",
  rosfNo: "ROSF/2013/OLDA/0078",
  accountNo: "#ER45DDDFFHEXKEY",
  firstName: "Boma",
  lastName: "Dave",
  phone: "+234 818 217 5835",
  email: "bomadave@gmail.com",
  dob: "20/04/1950",
  age: "74",
  stateOfOrigin: "Ondo",
  address: "12 street, unilag, Lagos",
  occupation: "Retired",
  profilePictureUrl: "/boma-dave-profile.jpg",
  profilePictureFilename: "Boma_de.png",
  documentType: "NIN",
  documentUrl: "/path/to/document.pdf",
  documentFilename: "Boma_de.pdf",
  loanAmount: 80000,
  applicationDate: "28/04/2025",
};

export default function AccountManagerLoanApprovalView() {
  const { control } = useForm({
    defaultValues: {
      ...loanApplicationData,
      loanAmount: loanApplicationData.loanAmount.toLocaleString(),
    },
  });

  const handleApprove = () => {
    alert(`Application for ${loanApplicationData.applicantName} approved!`);
  };

  const handleDecline = () => {
    alert(`Application for ${loanApplicationData.applicantName} declined.`);
  };

  return (
    <AuditorDashboardLayout>
      <FormHeading
        headerText="Boma Dave"
        subHeading="Document Verification/ Loan Approval "
        isBackButton
        rightSlot={
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-96">
              <Button
                className="bg-white flex justify-center gap-2 p-2 text-primary-100 border border-neutral-300"
                onPress={handleDecline}
              >
                <div className="flex justify-center items-center">
                  <IoClose />
                </div>
                Decline
              </Button>
              <Button className="p-2" onPress={handleApprove}>
                Approve Application
              </Button>
            </div>
            <div className="flex justify-end text-text-dark font-plus_jakarta_sans text-sm font-semibold mt-4">
              <div className="flex flex-col gap-1 text-right">
                <h3>ROSF No.</h3>
                <p>{loanApplicationData.rosfNo}</p>
              </div>
            </div>
          </div>
        }
      />

      <FormLayout
        heading="Account Bio data"
        subHeading="User profile information such as name, age, state of origin and more"
        rightSlot={
          <DocumentVerificationModal
            imageUrl={sampleNIN}
            onActionComplete={() => alert("Verification Action Complete")}
          >
            <Button className="bg-white py-0 space-y-3 font-bold text-xs text-primary-100">
              <div className="flex justify-center">
                <ScannerIcon />
              </div>
              <p>Open Verification Panel</p>
            </Button>
          </DocumentVerificationModal>
        }
      >
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 mt-6">
          <ControlledInput
            name="firstName"
            control={control}
            label="First name *"
            isDisabled
          />
          <ControlledInput
            name="lastName"
            control={control}
            label="Last name *"
            isDisabled
          />
          <ControlledInput
            name="phone"
            control={control}
            label="Phone number *"
            isDisabled
          />
          <ControlledInput
            name="email"
            control={control}
            label="Add an email address"
            isDisabled
          />
          <ControlledInput
            name="dob"
            control={control}
            label="Date of Birth *"
            isDisabled
          />
          <ControlledInput
            name="age"
            control={control}
            label="Age"
            isDisabled
          />
          <ControlledInput
            name="stateOfOrigin"
            control={control}
            label="State of Origin *"
            isDisabled
          />
          <ControlledInput
            name="address"
            control={control}
            label="Residential Address *"
            isDisabled
          />
          <ControlledInput
            name="occupation"
            control={control}
            label="Occupation"
            isDisabled
          />
        </div>
      </FormLayout>

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-text-dark mb-4">Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileUploadPicker
            headingText="Uploaded Passport photograph"
            subHeading="User's profile picture"
            isImage={true}
            initialImageUrl={loanApplicationData.profilePictureUrl}
            isDisabled={true}
            acceptedFileTypes={["image/png", "image/jpeg"]}
            onFileChange={() => {}}
            fileName={loanApplicationData.profilePictureFilename}
          />

          <DocumentUploadCard
            headingText="Document of Identification"
            subHeading="NIN, Int. Passport, Driver License or Voters card is accepted"
            selectedFileName={loanApplicationData.documentFilename}
            isDisabled={true}
            onFileChange={() => {}}
            selectField={
              <ControlledInput
                name="documentType"
                control={control}
                label=""
                isDisabled
              />
            }
          />

          <div className="lg:w-72 flex flex-col space-y-2">
            <div className="border p-4 lg:w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark transition-colors border-neutral-300">
              <p className="font-righteous">Requested Loan Amount</p>
              <p className="font-plus_jakarta_sans text-xs">
                How much Applicant needs
              </p>
              <ControlledInput
                name="loanAmount"
                control={control}
                label=""
                type="text"
                startAdornment="NGN"
              />
              <Button onPress={() => handleApprove()} type="submit">
                Approve Application
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="font-plus_jakarta_sans mt-8 text-sm text-text-dark flex flex-col gap-1.5">
        <p className="font-semibold">Application Date</p>
        <p className="font-medium ">{loanApplicationData.applicationDate}</p>
      </div>
    </AuditorDashboardLayout>
  );
}
