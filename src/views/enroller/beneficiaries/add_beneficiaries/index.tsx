import React from "react";
import EnrollerDashboardLayout from "../../layout";
import { FormHeading } from "@/views/layout";
import { DashboardCard } from "@/components/cards/dashboard_card";

export default function EnrollerAddBeneficiariesView() {
  return (
    <EnrollerDashboardLayout>
      <FormHeading
        headerText="Add a Beneficiary "
        subHeading="Add new Beneficiaries "
      />
      <div className="grid grid-cols-2 gap-4 w-[70%]">
        <DashboardCard
          headingText="Add a Parent Beneficiary"
          content={<p>Create Parent Account</p>}
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/"
        />
        <DashboardCard
          headingText="Second step"
          content={
            <p>
              Add Kids Account to Parent Beneficiary,
              <span className="text-accent-100"> Maximum of 2</span>
            </p>
          }
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/"
        />
        <DashboardCard
          headingText="Third step"
          content={<p>Add a Beneficiary Bank account</p>}
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/"
        />
        <DashboardCard
          headingText="Fourth Step"
          content={<p>But not required, Add a business Proposal for user if any</p>}
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/"
        />
        <DashboardCard
          headingText="Lastly,"
          content={<p>Capture Biometrics</p>}
          buttonDisplay={true}
          buttonText="Get started"
          pageLink="/"
        />
      </div>
    </EnrollerDashboardLayout>
  );
}
