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
    // {
    //   key: "payoutStatus",
    //   label: "Payout status",
    //   render: (value: PayoutRecord["payoutStatus"]) => (
    //     <span
    //       className={
    //         value === "Completed"
    //           ? "text-accent-200 font-medium"
    //           : "text-accent-100 font-medium"
    //       }
    //     >
    //       {value}
    //     </span>
    //   ),
    // },
    // {
    //   key: "receipt",
    //   label: "Receipt",
    //   render: (value: PayoutRecord["receipt"]) =>
    //     value === "Pending" ? (
    //       <span className="text-text-dark">Pending</span>
    //     ) : (
    //       <a
    //         href={`/${value}`}
    //         download
    //         className=""
    //       >
    //         {value}
    //       </a>
    //     ),
    // },
  ];

  return (
    <section className="border border-neutral-300 rounded-md p-4">
      <CustomTable
        columns={columns}
        data={payoutRecords}
        ariaLabel="Payout History"
      />
    </section>
  );
}
