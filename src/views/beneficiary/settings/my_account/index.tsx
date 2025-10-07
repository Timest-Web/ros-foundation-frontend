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


  const ITEMS_PER_PAGE = 5;


  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = bankAccounts.length;
  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return bankAccounts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]); 


  return (
    <div className="flex gap-4">
      <MyAccountForm />
      <section className="w-2/3">
        <CustomTable
          columns={columns}
          data={currentTableData} 
          ariaLabel="Bank Accounts"
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