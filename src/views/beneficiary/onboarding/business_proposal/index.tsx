import React from "react";
import BeneficiaryDashboardLayout from "../../layout";
import { FormHeading } from "../what_next";
import BusinessProposalForm from "./form";

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
