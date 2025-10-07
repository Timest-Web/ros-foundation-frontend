/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react"; // Import useState and useMemo
import MyAccountForm from "./form";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { bankAccounts } from "./sample";
import MoreIcon from "@/components/icons/MoreIcon";

export default function MyAccountView() {
  const columns: ColumnDefinition<any>[] = [
    {
      key: "bankName",
      label: "Bank Name",
      isRowHeader: true,
    },
    {
      key: "accountNumber",
      label: "Account Number",
    },
    {
      key: "accountName",
      label: "Account Name",
    },
    {
      key: "action",
      label: "Action",
      render: () => <MoreIcon />,
    },
  ];

  // --- START: ADD PAGINATION LOGIC ---

  // 1. Define how many items to show per page
  const ITEMS_PER_PAGE = 5;

  // 2. Add state to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Calculate total items and pages
  const totalItems = bankAccounts.length;
  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 4. Create a handler to change the page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 5. Memoize the data for the current page to avoid re-calculating on every render
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return bankAccounts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]); // Only re-slice when the currentPage changes

  // --- END: ADD PAGINATION LOGIC ---

  return (
    <div className="flex gap-4">
      <MyAccountForm />
      <section className="w-2/3">
        {/* Pass the correct props to CustomTable */}
        <CustomTable
          columns={columns}
          data={currentTableData} // Pass the sliced data for the current page
          ariaLabel="Bank Accounts"
          
          // Pass all the required pagination props
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}