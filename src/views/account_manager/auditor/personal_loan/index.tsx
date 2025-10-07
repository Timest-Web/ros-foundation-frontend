/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GeneralSelect, SelectItem } from "@/components/form/select";
import { CustomSearchField } from "@/components/search";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { HiDotsVertical } from "react-icons/hi";

// --- CHANGE 1: Import Menu components from react-aria-components ---
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";

import { FormHeading } from "@/views/layout";
import AuditorDashboardLayout from "../layout";

// --- Data structure and sample data remain the same ---
interface LoanRecord {
  id: number;
  rosfNo: string;
  amount: number;
  name: string;
  status: "Pending" | "Approved";
  loanType: "Personal Loan" | "Child Loan";
}

const sampleLoans: LoanRecord[] = [
  // ... (sample loan data is unchanged)
  {
    id: 1,
    rosfNo: "ROSF/2013/OLDA/0078",
    amount: 80000,
    name: "Boma Dave",
    status: "Pending",
    loanType: "Personal Loan",
  },
  {
    id: 2,
    rosfNo: "ROSF/2013/OLDA/0079",
    amount: 280000,
    name: "Boma Dave",
    status: "Approved",
    loanType: "Personal Loan",
  },
  {
    id: 3,
    rosfNo: "ROSF/2013/OLDA/0080",
    amount: 1280000,
    name: "Aisha Bello",
    status: "Approved",
    loanType: "Personal Loan",
  },
  {
    id: 4,
    rosfNo: "ROSF/2024/CHLD/0012",
    amount: 150000,
    name: "John Doe",
    status: "Pending",
    loanType: "Child Loan",
  },
  {
    id: 5,
    rosfNo: "ROSF/2024/CHLD/0013",
    amount: 320000,
    name: "Jane Smith",
    status: "Approved",
    loanType: "Child Loan",
  },
  {
    id: 6,
    rosfNo: "ROSF/2023/PERS/0150",
    amount: 95000,
    name: "Peter Jones",
    status: "Pending",
    loanType: "Personal Loan",
  },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
];

const monthOptions = [
  { value: "all", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
];

function ActionMenu({ loan }: { loan: LoanRecord }) {
  const handleAction = (key: React.Key) => {
    alert(`Action: ${key} on loan for ${loan.name}`);
    console.log(`Performing action "${key}" for loan ID: ${loan.id}`);
  };

  return (
    <MenuTrigger>
      <Button
        aria-label="Loan actions"
        className="p-1 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <HiDotsVertical size={20} />
      </Button>
      <Popover className="min-w-[150px] bg-white shadow-lg rounded-md border border-gray-200">
        <Menu onAction={handleAction} className="p-1 outline-none">
          <MenuItem
            id="view"
            className="cursor-pointer rounded px-2 py-1.5 text-sm text-text-dark hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            View More
          </MenuItem>
          <MenuItem
            id="approve"
            className="cursor-pointer rounded px-2 py-1.5 text-sm text-text-dark hover:bg-green-50 focus:outline-none focus:bg-green-50"
          >
            Approve
          </MenuItem>
          <MenuItem
            id="reject"
            className="cursor-pointer rounded px-2 py-1.5 text-sm text-text-dark hover:bg-red-50 focus:outline-none focus:bg-red-50"
          >
            Reject
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

export default function PersonalLoanProfileView() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const columns: ColumnDefinition<LoanRecord>[] = [
    { key: "rosfNo", label: "ROSF No.", isRowHeader: true },
    {
      key: "amount",
      label: "(N)Amount Requested",
      render: (row) => row.amount.toLocaleString(),
    },
    { key: "name", label: "Name" },
    {
      key: "status",
      label: "Document Verification/Approval status",
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
      ),
    },
    { key: "loanType", label: "Loan Type" },
    {
      key: "action",
      label: "Action",
      // Render the ActionMenu component for each row
      render: (row) => <ActionMenu loan={row} />,
    },
  ];

  useEffect(() => {
    setCurrentPage(0);
  }, [statusFilter, monthFilter, searchKeyword]);

  const filteredData = useMemo(() => {
    return sampleLoans.filter((loan) => {
      const statusMatch =
        statusFilter === "all" || loan.status === statusFilter;
      const searchMatch =
        searchKeyword === "" ||
        Object.values(loan).some((val) =>
          String(val).toLowerCase().includes(searchKeyword.toLowerCase())
        );
      return statusMatch && searchMatch;
    });
  }, [statusFilter, monthFilter, searchKeyword]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <AuditorDashboardLayout>
      <FormHeading
        headerText="Personal Loan Profiles"
        subHeading="List of Beneficiaries "
        rightSlot={
          <CustomSearchField
            placeholder="Type any keyword"
            className=""
            value={searchKeyword}
            onChange={setSearchKeyword}
          />
        }
      />
      <div className="flex gap-3 items-end justify-end mb-3">
        <GeneralSelect
          label="Document Verification status"
          items={statusOptions}
          selectedKey={statusFilter}
          onSelectionChange={(key) => setStatusFilter(key as string)}
          className="min-w-[180px]"
        >
          {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
        </GeneralSelect>
        <GeneralSelect
          label="Filter By Month"
          items={monthOptions}
          selectedKey={monthFilter}
          onSelectionChange={(key) => setMonthFilter(key as string)}
          className="min-w-[180px]"
        >
          {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
        </GeneralSelect>
      </div>

      {currentData.length > 0 ? (
        <CustomTable
          columns={columns}
          data={currentData}
          ariaLabel="Personal Loan Profiles"
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      ) : (
        <EmptyState />
      )}
    </AuditorDashboardLayout>
  );
}

const EmptyState = () => (
  // ... (EmptyState component is unchanged)
  <div className="flex flex-col items-center justify-center min-h-[25rem] border border-dashed border-neutral-300 rounded-md bg-gray-50 text-center p-4">
    <h3 className="text-lg font-semibold text-gray-700">
      No Loan Records Found
    </h3>
    <p className="text-neutral-500 mt-2">
      There are no records matching your current filters.
    </p>
  </div>
);
