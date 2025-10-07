"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { Button } from "@/components/button";
import { LoanRecord, sampleLoans } from "../sample";


// The rest of this component can stay almost exactly the same!
// ... (EmptyState component definition) ...

interface LoanViewProps {
  loanTypeFilter: string;
  statusFilter: string;
}

export default function LoanView({ loanTypeFilter, statusFilter }: LoanViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const columns: ColumnDefinition<LoanRecord>[] = [
    // ... (columns definition remains the same) ...
    { key: "rosfNo", label: "ROSF No.", isRowHeader: true },
    {
      key: "amount",
      label: "Amount(NGN)",
      render: (row) => row.amount.toLocaleString()
    },
    { key: "name", label: "Name" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={
            row.status === "Approved"
              ? "text-green-600 font-medium"
              : "text-orange-500 font-medium"
          }
        >
          {row.status}
        </span>
      )
    },
    { key: "returnedStatus", label: "Returned status" },
    { key: "loanType", label: "Loan Type" },
  ];

  useEffect(() => {
    setCurrentPage(0);
  }, [loanTypeFilter, statusFilter]);

  const filteredData = useMemo(() => {
    // The data source is now the imported `sampleLoans`
    return sampleLoans.filter(loan => {
      const typeMatch = loanTypeFilter === 'all' || loan.loanType === loanTypeFilter;
      const statusMatch = statusFilter === 'all' || loan.status === statusFilter;
      return typeMatch && statusMatch;
    });
  }, [loanTypeFilter, statusFilter]);

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
          ariaLabel="Loan History"
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

// A dedicated component for the empty state
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[25rem] border border-neutral-300 rounded-md bg-white">
    <p className="text-neutral-500 mb-6">Nothing here for now</p>
    <Button className="w-48">Apply for a Loan</Button>
  </div>
);