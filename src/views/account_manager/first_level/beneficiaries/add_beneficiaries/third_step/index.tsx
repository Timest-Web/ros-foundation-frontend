import ProfileCard from "@/views/beneficiary/children_account/profile_card";
import { FormHeading } from "@/views/layout";
import React from "react";
import { Button } from "@/components/button";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import AccountManagerAccountForm from "./form";

export default function AccountManagerThirdStepView() {
  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Third step,"
        subHeading="Add a default Account Number for Beneficiary"
        isBackButton={true}
      />
      <div className="my-4">
        <ProfileCard href="/" />
      </div>
      <div className="flex gap-4">
        <AccountManagerAccountForm />
        <section className="border border-neutral-300 rounded-md w-2/3 flex justify-center items-center">
          <p className="font-plus_jakarta_sans text-xs text-text-dark">
            No bank account has been added yet
          </p>
        </section>
      </div>
      <div className="flex justify-end mt-2">
        <Button className="py-3 mt-2 w-[10rem]" type="submit">
          Save and Continue
        </Button>
      </div>
    </AccountManagerDashboardLayout>
  );
}
