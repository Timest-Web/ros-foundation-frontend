/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { ManualTabs } from "@/components/tabs/manual";
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import LoanView from "./loan";
import EnrollerApplyForLoanView from "./apply";
import { Button } from "@/components/button";
import { CustomSearchField } from "@/components/search";
import AddIcon from "@/components/icons/AddIcon";
import { GeneralSelect, SelectItem } from "@/components/form/select"; // Added import

const loanTypeOptions = [
  { value: "all", label: "All" },
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Child Loan", label: "Child Loan" },
];

const loanStatusOptions = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
];

const monthOptions = [
  { value: "all", label: "All" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
];

export default function EnrollerChildView() {
  const [activeTab, setActiveTab] = useState("loan");

  const [loanTypeFilter, setLoanTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const activeFilters = useMemo(() => {
    switch (activeTab) {
      case "loan":
        return (
          <div className="flex gap-4">
            <GeneralSelect
              label="Loans Type"
              placeholder="Select loan type"
              items={loanTypeOptions}
              selectedKey={loanTypeFilter}
              onSelectionChange={(key) => setLoanTypeFilter(key as string)}
            >
              {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
            </GeneralSelect>
            <GeneralSelect
              label="Filter Loans by"
              placeholder="Select status"
              items={loanStatusOptions}
              selectedKey={statusFilter}
              onSelectionChange={(key) => setStatusFilter(key as string)}
            >
              {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
            </GeneralSelect>
          </div>
        );
      case "track_payout":
        return (
          <GeneralSelect
            label="Filter Payout by"
            placeholder="Select month"
            items={monthOptions}
            selectedKey={monthFilter}
            onSelectionChange={(key) => setMonthFilter(key as string)}
            className="min-w-[200px]"
          >
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </GeneralSelect>
        );
      default:
        return null;
    }
  }, [activeTab, loanTypeFilter, statusFilter, monthFilter]);

  const tabData = [
    {
      id: "loan",
      label: "Loans",
      content: (
        <LoanView loanTypeFilter={loanTypeFilter} statusFilter={statusFilter} />
      ),
    },
    {
      id: "apply",
      label: "Apply for Loan",
      content: <EnrollerApplyForLoanView />,
    },
  ];

  return (
    <BeneficiaryDashboardLayout>
      <div>
        <FormHeading
          headerText="Children Loan Profile"
          subHeading={
            activeTab === "loan"
              ? "List of Beneficiaries"
              : "Apply for a new loan"
          }
          rightSlot={
            activeTab === "loan" ? (
              <div className="flex gap-2">
                <CustomSearchField
                  className="w-72"
                  placeholder="Type any keyword"
                />
                <Button className="w-[15rem] py-[0.5rem] text-sm flex justify-center items-center gap-2">
                  <AddIcon /> <span>Start a Loan Application</span>
                </Button>
              </div>
            ) : null
          }
        />
        <div className="mt-8">
          <ManualTabs
            tabs={tabData}
            activeTabId={activeTab}
            onTabChange={(id) => setActiveTab(id)}
            rightSlot={activeFilters}
          />
        </div>
      </div>
    </BeneficiaryDashboardLayout>
  );
}