// src/app/auditor/batching/page.tsx (or similar path)
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GeneralSelect, SelectItem } from "@/components/form/select";
import { CustomSearchField } from "@/components/search";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { HiDotsVertical } from "react-icons/hi";
import {
  Button as AriaButton,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";

import { FormHeading } from "@/views/layout";
import AuditorDashboardLayout from "../layout";

import { CustomCheckbox } from "@/components/form/checkbox"; // Assuming path
import { Button } from "@/components/button"; // Assuming a general purpose button
import { ManualTabs } from "@/components/tabs/manual";

// --- Data structure and sample data (expanded for demonstration) ---
interface LoanRecord {
  id: number;
  rosfNo: string;
  amount: number;
  name: string;
  status: "Pending" | "Approved";
  loanType: "Personal Loan" | "Child Loan";
}

const sampleLoans: LoanRecord[] = [
  // ... (Using your sample data, but ensuring there are approved ones)
  {
    id: 1,
    rosfNo: "ROSF/2013/OLDA/0078",
    amount: 180000,
    name: "Boma Dave",
    status: "Approved",
    loanType: "Personal Loan",
  },
  {
    id: 2,
    rosfNo: "ROSF/2013/OLDA/0079",
    amount: 280000,
    name: "Marcus Lawal",
    status: "Approved",
    loanType: "Personal Loan",
  },
  {
    id: 3,
    rosfNo: "ROSF/2013/OLDA/0080",
    amount: 1280000,
    name: "Cynthia Paulus",
    status: "Approved",
    loanType: "Personal Loan",
  },
  {
    id: 4,
    rosfNo: "ROSF/2024/CHLD/0012",
    amount: 150000,
    name: "John Doe",
    status: "Pending", // This will be filtered out
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
    status: "Approved",
    loanType: "Personal Loan",
  },
];

const monthOptions = [
  { value: "all", label: "All Months" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
];

function ActionMenu({ loan }: { loan: LoanRecord }) {
  // ... (Using your provided ActionMenu component, no changes needed)
  return (
    <MenuTrigger>
      <AriaButton
        aria-label="Loan actions"
        className="p-1 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <HiDotsVertical size={20} />
      </AriaButton>
      <Popover className="min-w-[150px] bg-white shadow-lg rounded-md border border-gray-200">
        <Menu
          onAction={(key) => alert(`Action: ${key} on ${loan.name}`)}
          className="p-1 outline-none"
        >
          <MenuItem
            id="view"
            className="cursor-pointer rounded px-2 py-1.5 text-sm text-text-dark hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            View More
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

export default function BatchingPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [monthFilter, setMonthFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLoans, setSelectedLoans] = useState<Set<number>>(new Set());
  const itemsPerPage = 5;

  const tabs = [
    { id: "personal", label: "Personal Loans", content: null },
    { id: "children", label: "Children Loan (School Fees)", content: null },
  ];

  // 1. Filter for only approved loans initially
  const approvedLoans = useMemo(
    () => sampleLoans.filter((loan) => loan.status === "Approved"),
    []
  );

  // 2. Apply tab, search, and month filters
  const filteredData = useMemo(() => {
    return approvedLoans.filter((loan) => {
      const loanTypeMatch =
        activeTab === "personal"
          ? loan.loanType === "Personal Loan"
          : loan.loanType === "Child Loan";

      const searchMatch =
        searchKeyword === "" ||
        Object.values(loan).some((val) =>
          String(val).toLowerCase().includes(searchKeyword.toLowerCase())
        );

      // Note: Month filter logic would need a date field in the data.
      // This is a placeholder for now.
      const monthMatch = true;

      return loanTypeMatch && searchMatch && monthMatch;
    });
  }, [activeTab, searchKeyword, monthFilter]);

  // 3. Paginate the filtered data
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab, searchKeyword, monthFilter]);

  // --- Selection Logic ---
  const isAllSelected = useMemo(
    () =>
      currentData.length > 0 &&
      currentData.every((loan) => selectedLoans.has(loan.id)),
    [currentData, selectedLoans]
  );

  const handleSelectAll = () => {
    const currentIds = currentData.map((loan) => loan.id);
    if (isAllSelected) {
      // Deselect all on current page
      setSelectedLoans((prev) => {
        const newSet = new Set(prev);
        currentIds.forEach((id) => newSet.delete(id));
        return newSet;
      });
    } else {
      // Select all on current page
      setSelectedLoans((prev) => new Set([...prev, ...currentIds]));
    }
  };

  const handleSelectLoan = (loanId: number) => {
    setSelectedLoans((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(loanId)) {
        newSet.delete(loanId);
      } else {
        newSet.add(loanId);
      }
      return newSet;
    });
  };

  const columns: ColumnDefinition<LoanRecord>[] = [
    {
      key: "selection",
      label: "",
      render: (row) => (
        <CustomCheckbox
          isSelected={selectedLoans.has(row.id)}
          onChange={() => handleSelectLoan(row.id)}
        />
      ),
    },
    { key: "rosfNo", label: "ROSF No.", isRowHeader: true },
    {
      key: "amount",
      label: "(N)Amount Requested",
      render: (row) => row.amount.toLocaleString(),
    },
    { key: "name", label: "Name" },
    {
      key: "status",
      label: "Document Identification/Approval Status",
      render: (row) => (
        <span className="text-green-600 font-medium">{row.status}</span>
      ),
    },
    { key: "loanType", label: "Loan Type" },
    {
      key: "action",
      label: "Action",
      render: (row) => <ActionMenu loan={row} />,
    },
  ];

  return (
    <AuditorDashboardLayout>
      <FormHeading
        headerText="Batching"
        subHeading="Creating batching for approved loan payouts"
        rightSlot={
          <Button
            className="py-2 w-44"
            onClick={() => alert("Navigating to View Batches...")}
          >
            View Batches
          </Button>
        }
      />

      <div className="mt-8">
        <ManualTabs
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={(id) => setActiveTab(id)}
          rightSlot={
            <p className="text-xs text-text-dark font-semibold font-plus_jakarta_sans">
              Hint: All Beneficiary Document has been duly checked and Verified
            </p>
          }
        />
      </div>

      <div className="flex justify-between mb-4">
        <CustomCheckbox isSelected={isAllSelected} onChange={handleSelectAll}>
          <span className="text-sm font-semibold text-text-dark">
            {isAllSelected ? "Deselect All" : "Select All"}
          </span>
        </CustomCheckbox>
        <div className="flex gap-3 items-end">
          <CustomSearchField
            placeholder="Type any keyword"
            value={searchKeyword}
            onChange={setSearchKeyword}
          />
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
      </div>

      <CustomTable
        columns={columns}
        data={currentData}
        ariaLabel="Approved Loan Profiles for Batching"
        currentPage={currentPage}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
      />

      <div className="flex justify-end items-end mt-4">
        <Button
          isDisabled={selectedLoans.size === 0}
          onClick={() => alert(`${selectedLoans.size} items moved to batch.`)}
          className="w-44 py-2"
        >
          Move to Batch
        </Button>
      </div>
    </AuditorDashboardLayout>
  );
}
