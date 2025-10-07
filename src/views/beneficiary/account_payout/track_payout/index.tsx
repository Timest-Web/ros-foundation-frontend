"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { LoanRecord, sampleLoans } from "../sample";


// An empty state specific to this view
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[25rem] border border-neutral-300 rounded-md bg-white">
    <p className="text-neutral-500">No payouts to track for the selected period.</p>
  </div>
);

// Define the props it will receive from the page
interface TrackPayoutViewProps {
  monthFilter: string;
}

export default function TrackPayoutView({ monthFilter }: TrackPayoutViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Define columns specific to the Payout view, as seen in Figma
  const columns: ColumnDefinition<LoanRecord>[] = [
    { key: "rosfNo", label: "ROSF No.", isRowHeader: true },
    { key: "name", label: "Name" },
    {
      key: "amount",
      label: "Amount(NGN)",
      render: (row) => row.amount.toLocaleString()
    },
    {
      key: "payoutStatus",
      label: "Payment status",
      render: (row) => (
        <span
          className={
            row.payoutStatus === "Completed"
              ? "text-green-600 font-medium"
              : "text-orange-500 font-medium"
          }
        >
          {row.payoutStatus}
        </span>
      ),
    },
    { key: "loanType", label: "Loan Type" },
  ];

  // Reset pagination if the month filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [monthFilter]);

  // 1. First, create a memoized list of only approved loans.
  const approvedLoans = useMemo(() => {
    return sampleLoans.filter(loan => loan.status === 'Approved');
  }, []);

  // 2. Then, filter the approved loans by the selected month.
  const filteredData = useMemo(() => {
    if (monthFilter === 'all') {
      return approvedLoans; // If 'All' is selected, return all approved loans
    }
    return approvedLoans.filter(loan => {
      if (!loan.dateOfApproval) return false;
      // Get month from 'YYYY-MM-DD'. Note: getMonth() is 0-indexed (0=Jan), so we add 1.
      const loanMonth = new Date(loan.dateOfApproval).getMonth() + 1;
      return loanMonth === parseInt(monthFilter, 10);
    });
  }, [approvedLoans, monthFilter]);

  // Calculate pagination variables based on the final filtered data
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      {filteredData.length > 0 ? (
        <CustomTable
          columns={columns}
          data={currentData}
          ariaLabel="Payout History"
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}