import React from "react";
import BeneficiaryDashboardLayout from "../../layout";
import BusinessProposalForm from "./form";
import { FormHeading } from "@/views/layout";

export default function BusinessProposalView() {
  return (
    <BeneficiaryDashboardLayout>
      <FormHeading
        isBackButton={true}
        headerText="Business Proposal"
        subHeading="Upload a business proposal if you have any Business, although its not compulsory"
      />
      <BusinessProposalForm />
    </BeneficiaryDashboardLayout>
  );
}
