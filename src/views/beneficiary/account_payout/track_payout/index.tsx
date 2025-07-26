"use client";

import React from "react";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { payoutRecords } from "./sample";

type PayoutRecord = {
  payoutRef: string;
  status: "Approved" | "Pending" | "Rejected";
  beneficiary: string;
  dateOfApproval: string;
  payoutStatus: "Pending" | "Completed";
  receipt: string;
};

export default function TrackPayoutView() {
  const columns: ColumnDefinition<PayoutRecord>[] = [
    { key: "payoutRef", label: "Payout Ref.", isRowHeader: true },
    { key: "status", label: "Status" },
    { key: "beneficiary", label: "Beneficiary" },
    { key: "dateOfApproval", label: "Date of Approval" },
    {
      key: "payoutStatus",
      label: "Payout status",
      render: (row: PayoutRecord) => (
        <span
          className={
            row.payoutStatus === "Completed"
              ? "text-accent-200 font-medium"
              : "text-accent-100 font-medium"
          }
        >
          {row.payoutStatus}
        </span>
      ),
    },
    {
      key: "receipt",
      label: "Receipt",
      render: (row: PayoutRecord) =>
        row.receipt === "Pending" ? (
          <span className="text-text-dark">Pending</span>
        ) : (
          <a
            href={`/${row.receipt}`}
            download
            className="text-blue-600 hover:underline" 
          >
            {row.receipt}
          </a>
        ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={payoutRecords}
      ariaLabel="Payout History"
    />
  );
}