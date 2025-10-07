/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import TrackPayoutView from "./track_payout";
// import { CustomTabs } from "@/components/tabs"; // No longer needed
import BeneficiaryDashboardLayout from "../layout";
import { FormHeading } from "@/views/layout";
import LoanView from "./loan";
import { ManualTabs } from "@/components/tabs/manual";

const SimpleSelect = ({ label, options, ...props }: any) => (
  <div className="flex items-center gap-2">
    <label className="text-sm text-text-dark font-semibold whitespace-nowrap">
      {label}
    </label>
    <select
      {...props}
      className="w-40 border border-neutral-300 rounded-md px-3 py-2 text-sm text-text-dark focus:outline-none focus:ring-1 focus:ring-primary-100"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// --- Filter Options ---
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

export default function LoanAndTrackPayoutView() {
  const [activeTab, setActiveTab] = useState("loan");

  const [loanTypeFilter, setLoanTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const activeFilters = useMemo(() => {
    switch (activeTab) {
      case "loan":
        return (
          <div className="flex gap-4">
            <SimpleSelect
              label="Loans Type"
              options={loanTypeOptions}
              value={loanTypeFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setLoanTypeFilter(e.target.value)
              }
            />
            <SimpleSelect
              label="Filter Loans by"
              options={loanStatusOptions}
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value)
              }
            />
          </div>
        );
      case "track_payout":
        return (
          <SimpleSelect
            label="Filter Payout by"
            options={monthOptions}
            value={monthFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMonthFilter(e.target.value)
            }
          />
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
      id: "track_payout",
      label: "Track Payout",
      content: <TrackPayoutView monthFilter={monthFilter} />,
    },
  ];

  return (
    <BeneficiaryDashboardLayout>
      <div>
        <FormHeading
          headerText="Loans & Payouts"
          subHeading="Loans Application and Payout status"
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