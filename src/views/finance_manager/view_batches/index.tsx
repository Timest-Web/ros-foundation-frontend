/* eslint-disable @typescript-eslint/no-unused-expressions */
// src/app/Founder/batching/view/page.tsx (or a similar path)
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GeneralSelect, SelectItem } from "@/components/form/select";
import { CustomSearchField } from "@/components/search";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { FormHeading } from "@/views/layout";
import FounderDashboardLayout from "../layout";
import { CustomCheckbox } from "@/components/form/checkbox";
import { Button } from "@/components/button";
import { ManualTabs } from "@/components/tabs/manual";

interface BatchedLoan {
  id: number;
  sNo: number;
  name: string;
  acNo: string;
  bank: string;
  amount: number;
  rosfNo: string;
}

// --- CHANGE 1: Restructure data to be hierarchical ---
const allBatchesData = {
  personal: {
    "batch-a": [
      {
        id: 101,
        sNo: 1,
        name: "Oluwarinu Ajisha",
        acNo: "1123412244",
        bank: "Fidelity",
        amount: 80000,
        rosfNo: "ROSF/2013/OLDA/0078",
      },
      {
        id: 102,
        sNo: 2,
        name: "Oluwarinu Ajisha",
        acNo: "1123412244",
        bank: "Fidelity",
        amount: 80000,
        rosfNo: "ROSF/2013/OLDA/0078",
      },
      {
        id: 103,
        sNo: 3,
        name: "Oluwarinu Ajisha",
        acNo: "1123412244",
        bank: "Fidelity",
        amount: 80000,
        rosfNo: "ROSF/2013/OLDA/0078",
      },
    ],
    "batch-b": [
      {
        id: 201,
        sNo: 1,
        name: "Marcus Lawal",
        acNo: "2298765432",
        bank: "GTBank",
        amount: 280000,
        rosfNo: "ROSF/2013/OLDA/0079",
      },
      {
        id: 202,
        sNo: 2,
        name: "Peter Jones",
        acNo: "3312345678",
        bank: "UBA",
        amount: 95000,
        rosfNo: "ROSF/2023/PERS/0150",
      },
    ],
    "batch-c": [],
    "batch-d": [],
    "batch-e": [],
  },
  children: {
    "batch-a": [
      {
        id: 301,
        sNo: 1,
        name: "Jane Smith (Child)",
        acNo: "4456781234",
        bank: "Access",
        amount: 320000,
        rosfNo: "ROSF/2024/CHLD/0013",
      },
    ],
    "batch-b": [],
    "batch-c": [],
  },
};

const yearOptions = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
];
const monthOptions = [
  { value: "all", label: "All Months" },
  { value: "8", label: "Aug" },
];

export default function ViewBatchesView() {
  // --- CHANGE 2: Add state for the new top-level tabs ---
  const [activeLoanType, setActiveLoanType] = useState("personal");

  const [activeBatch, setActiveBatch] = useState("batch-a");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [yearFilter, setYearFilter] = useState("2023");
  const [monthFilter, setMonthFilter] = useState("8");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [hasConsented, setHasConsented] = useState(false);
  const itemsPerPage = 5;

  const loanTypeTabs = [
    { id: "personal", label: "Personal Loans/Widows", content: null },
    { id: "children", label: "Children (School Fees)", content: null },
  ];

  // --- CHANGE 3: Dynamically generate batch tabs based on selected loan type ---
  const batchTabs = useMemo(() => {
    const batchesForType =
      allBatchesData[activeLoanType as keyof typeof allBatchesData] || {};
    return Object.keys(batchesForType).map((batchId) => ({
      id: batchId,
      label: `Batch ${batchId.split("-")[1].toUpperCase()}`, // e.g., "batch-a" -> "Batch A"
      content: null,
    }));
  }, [activeLoanType]);

  // --- CHANGE 4: Reset active batch when loan type changes ---
  useEffect(() => {
    const firstBatchForType = Object.keys(
      allBatchesData[activeLoanType as keyof typeof allBatchesData]
    )[0];
    if (firstBatchForType) {
      setActiveBatch(firstBatchForType);
    }
    setSelectedItems(new Set());
    setCurrentPage(0);
  }, [activeLoanType]);

  const currentBatchData = useMemo(() => {
    const batchesForType =
      allBatchesData[activeLoanType as keyof typeof allBatchesData] || {};
    return batchesForType[activeBatch as keyof typeof batchesForType] || [];
  }, [activeLoanType, activeBatch]);

  const filteredData = useMemo(() => {
    return currentBatchData.filter(
      (item) =>
        searchKeyword === "" ||
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchKeyword.toLowerCase())
        )
    );
  }, [currentBatchData, searchKeyword]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const batchTotal = useMemo(
    () => currentBatchData.reduce((acc, item) => acc + item.amount, 0),
    [currentBatchData]
  );
  const isAllSelected = useMemo(
    () =>
      currentData.length > 0 &&
      currentData.every((item) => selectedItems.has(item.id)),
    [currentData, selectedItems]
  );

  const handleSelectAll = () => {
    const currentIds = currentData.map((item) => item.id);
    if (isAllSelected) {
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        currentIds.forEach((id) => newSet.delete(id));
        return newSet;
      });
    } else {
      setSelectedItems((prev) => new Set([...prev, ...currentIds]));
    }
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  };

  const columns: ColumnDefinition<BatchedLoan>[] = [
    {
      key: "selection",
      label: "",
      render: (row) => (
        <CustomCheckbox
          isSelected={selectedItems.has(row.id)}
          onChange={() => handleSelectItem(row.id)}
        />
      ),
    },
    { key: "sNo", label: "S/No", isRowHeader: true },
    { key: "name", label: "Name" },
    { key: "acNo", label: "AC. No" },
    { key: "bank", label: "Bank" },
    {
      key: "amount",
      label: "Amount (NGN)",
      render: (row) => row.amount.toLocaleString(),
    },
    { key: "rosfNo", label: "ROSF No." },
    {
      key: "payment",
      label: "Payment Status",
      render: () => <span className="text-gray-400">---</span>,
    },
    {
      key: "status",
      label: "Approval Status",
      render: () => <span className="text-gray-400">---</span>,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <a href="#" className="text-red-600 text-sm font-medium">
          Remove
        </a>
      ),
    },
  ];

  return (
    <FounderDashboardLayout>
      <FormHeading
        isBackButton
        headerText="View Batches"
        rightSlot={
          <div className="flex gap-3 items-end">
            <GeneralSelect
              label="Select by Year"
              items={yearOptions}
              selectedKey={yearFilter}
              onSelectionChange={(key) => setYearFilter(key as string)}
              className="min-w-[150px]"
            >
              {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
            </GeneralSelect>
            <GeneralSelect
              label="Select by Month"
              items={monthOptions}
              selectedKey={monthFilter}
              onSelectionChange={(key) => setMonthFilter(key as string)}
              className="min-w-[150px]"
            >
              {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
            </GeneralSelect>
          </div>
        }
      />

      {/* --- CHANGE 5: Render the new top-level tabs --- */}
      <div className="mt-8">
        <ManualTabs
          tabs={loanTypeTabs}
          activeTabId={activeLoanType}
          onTabChange={(id) => setActiveLoanType(id)}
        />
      </div>

      <div className="mt-4">
        {batchTabs.length > 0 ? (
          <ManualTabs
            tabs={batchTabs}
            activeTabId={activeBatch}
            onTabChange={(id) => setActiveBatch(id)}
          />
        ) : (
          <p className="text-sm text-gray-500 py-4">
            No batches available for this loan type.
          </p>
        )}
      </div>

      <div className="flex justify-between items-center px-2 mb-4 mt-4">
        <div className="flex gap-4 items-center">
          <CustomCheckbox isSelected={isAllSelected} onChange={handleSelectAll}>
            <span className="text-sm font-semibold text-text-dark">
              {isAllSelected ? "Deselect All" : "Select All"}
            </span>
          </CustomCheckbox>
          <button
            disabled={selectedItems.size === 0}
            className="text-sm font-semibold text-red-600 disabled:text-gray-400"
          >
            Remove
          </button>
        </div>
        <CustomSearchField
          placeholder="Type any keyword"
          value={searchKeyword}
          onChange={setSearchKeyword}
        />
      </div>

      <CustomTable
        columns={columns}
        data={currentData}
        ariaLabel={`Items in ${activeBatch}`}
        currentPage={currentPage}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
      />

      <div className="flex pl-32 pt-3 pb-3 border-t border-b border-gray-200">
        <div className="flex items-center gap-28">
          <span className="text-sm text-primary-100 font-semibold font-plus_jakarta_sans">
            BATCH TOTAL AMOUNT
          </span>
          <span className="font-bold font-plus_jakarta_sans text-text-dark ">
            ₦{batchTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-4">
        <CustomCheckbox isSelected={hasConsented} onChange={setHasConsented}>
          <p className="text-text-dark font-plus_jakarta_sans text-xs max-w-xs">
            As Account Manager 3 (Audit), I consent that I have thoroughly
            reviewed this Batch A (August) 2025
          </p>
        </CustomCheckbox>
        <Button
          className="py-2 w-52"
          onClick={() => alert("Submitting...")}
        >
          Move Batch to Completed
        </Button>
      </div>
    </FounderDashboardLayout>
  );
}
