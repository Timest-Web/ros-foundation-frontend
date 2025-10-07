/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import AccountManagerDashboardLayout from "../../layout";
import { FormHeading } from "@/views/layout";
import { GeneralSelect, SelectItem } from "@/components/form/select";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { Button } from "@/components/button";
import { CustomCheckbox } from "@/components/form/checkbox"; // 1. IMPORTED CustomCheckbox

// --- Data structure based on Figma design ---
interface ReportRecord {
  id: number;
  firstName: string;
  secondName: string;
  documentType: "NIN" | "Voters Card" | "Passport";
  maritalStatus: "Married" | "Single" | "Divorced";
  geoLocation: "South East" | "North Central" | "South West";
  status: "Out of service" | "Active";
  // NOTE FOR REAL IMPLEMENTATION:
  // For advanced query filtering to work, your data objects would need
  // corresponding boolean fields, like so:
  // hasChildInPrySchool?: boolean;
  // hasChildInSecSchool?: boolean;
  // isFemaleOnLoan?: boolean;
}

// --- Sample data matching the new structure ---
const sampleReportData: ReportRecord[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  firstName: "Boma",
  secondName: "Dave",
  documentType: "NIN",
  maritalStatus: i % 3 === 0 ? "Single" : "Married",
  geoLocation: i % 2 === 0 ? "South East" : "South West",
  status: i % 4 === 0 ? "Active" : "Out of service",
}));

// --- Options for filter dropdowns ---
const yearOptions = [{ value: "2025", label: "2025" }];
const monthOptions = [{ value: "Jul", label: "Jul" }];
const maritalStatusOptions = [
  { value: "all", label: "All" },
  { value: "Married", label: "Married" },
  { value: "Single", label: "Single" },
  { value: "Divorced", label: "Divorced" },
];
const locationOptions = [
  { value: "all", label: "All" },
  { value: "South East", label: "South East" },
  { value: "South West", label: "South West" },
  { value: "North Central", label: "North Central" },
];
const statusOptions = [
  { value: "all", label: "All" },
  { value: "Out of service", label: "Out of service" },
  { value: "Active", label: "Active" },
];
const fileFormatOptions = [{ value: "PDF", label: "PDF" }];

// 2. UPDATED data structure for advanced queries with unique IDs
const advancedQueryOptions = [
  { id: "prySchool", label: "Beneficiary with Children in Pry. school" },
  { id: "secSchool", label: "Beneficiary with Children in Sec. school" },
  { id: "college", label: "Beneficiary with Children in College" },
  { id: "onLoan", label: "Female Beneficiaries, Currently on a Loan facility" },
  { id: "noLoan", label: "Female Beneficiaries, without Loan Facility" },
];

// --- Sub-component for export controls ---
const ExportControls = () => {
  const [format, setFormat] = useState("PDF");
  const handleExport = () => alert(`Exporting report as ${format}...`);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-text-dark whitespace-nowrap font-semibold font-plus_jakarta_sans">
        Select file format to export
      </p>
      <div className="flex gap-2">
        <GeneralSelect
          aria-label="File format"
          items={fileFormatOptions}
          selectedKey={format}
          onSelectionChange={(key) => setFormat(key as string)}
        >
          {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
        </GeneralSelect>
        <Button
          className="bg-primary-100 text-white px-4 py-2"
          onPress={handleExport}
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function AccountManagerReportsView() {
  // State for standard filters
  const [yearFilter, setYearFilter] = useState("2025");
  const [monthFilter, setMonthFilter] = useState("Jul");
  const [maritalStatusFilter, setMaritalStatusFilter] = useState("Married");
  const [locationFilter, setLocationFilter] = useState("South East");
  const [statusFilter, setStatusFilter] = useState("Out of service");

  // 3. REPLACED single-string state with an object to track multiple checkboxes
  const [advancedQueries, setAdvancedQueries] = useState<
    Record<string, boolean>
  >({
    prySchool: true, // Set the first option to true by default, as in the design
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  // Handler to update the advanced query state object
  const handleQueryChange = (id: string, isSelected: boolean) => {
    setAdvancedQueries((prevState) => ({
      ...prevState,
      [id]: isSelected,
    }));
  };

  // Table column definitions
  const columns: ColumnDefinition<ReportRecord>[] = [
    { key: "firstName", label: "First name", isRowHeader: true },
    { key: "secondName", label: "Second name" },
    { key: "documentType", label: "Document type" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "geoLocation", label: "Geo Location" },
    { key: "status", label: "Status" },
  ];

  // Reset pagination when any filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    yearFilter,
    monthFilter,
    maritalStatusFilter,
    locationFilter,
    statusFilter,
    advancedQueries, // Added dependency
  ]);

  // Filtering logic
  const filteredData = useMemo(() => {
    const selectedQueryIds = Object.keys(advancedQueries).filter(
      (key) => advancedQueries[key]
    );

    return sampleReportData.filter((record) => {
      const maritalMatch =
        maritalStatusFilter === "all" ||
        record.maritalStatus === maritalStatusFilter;
      const locationMatch =
        locationFilter === "all" || record.geoLocation === locationFilter;
      const statusMatch =
        statusFilter === "all" || record.status === statusFilter;

      // 4. Placeholder logic for advanced query filtering
      if (selectedQueryIds.length > 0) {
        // In a real application, you would check the record's properties against
        // the selectedQueryIds array. For example:
        // const hasPrySchoolChild = record.hasChildInPrySchool && selectedQueryIds.includes('prySchool');
        // return maritalMatch && locationMatch && statusMatch && (hasPrySchoolChild || ...);
        // Since our sample data doesn't have these fields, we'll just let the record pass if any query is active.
      }

      // If no advanced queries are selected, all records match.
      return maritalMatch && locationMatch && statusMatch;
    });
  }, [maritalStatusFilter, locationFilter, statusFilter, advancedQueries]); // Added dependency

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <AccountManagerDashboardLayout>
      <FormHeading
        headerText="Export Reports"
        subHeading="Data Visualisation and Analysis"
        rightSlot={<ExportControls />}
      />

      {/* --- Standard Filters Section --- */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-4 items-center">
          <GeneralSelect
            label=""
            items={yearOptions}
            selectedKey={yearFilter}
            onSelectionChange={(key) => setYearFilter(key as string)}
            inputClassName="w-24"
          >
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </GeneralSelect>
          <GeneralSelect
            label=""
            items={monthOptions}
            selectedKey={monthFilter}
            onSelectionChange={(key) => setMonthFilter(key as string)}
            inputClassName="w-24"
          >
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </GeneralSelect>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <GeneralSelect
            label="Marital Status"
            items={maritalStatusOptions}
            selectedKey={maritalStatusFilter}
            onSelectionChange={(key) => setMaritalStatusFilter(key as string)}
          >
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </GeneralSelect>
          <GeneralSelect
            label="Geo. Location"
            items={locationOptions}
            selectedKey={locationFilter}
            onSelectionChange={(key) => setLocationFilter(key as string)}
          >
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </GeneralSelect>
          <GeneralSelect
            label="Status"
            items={statusOptions}
            selectedKey={statusFilter}
            onSelectionChange={(key) => setStatusFilter(key as string)}
          >
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </GeneralSelect>
        </div>
      </div>

      {/* --- 5. REWRITTEN Advanced Query Section using CustomCheckbox --- */}
      <div className="mb-6 flex gap-3">
        <h3 className="text-text-dark font-righteous">Advance Query</h3>
        <div className="flex flex-wrap gap-x-8 gap-y-4 border border-neutral-300 rounded-md p-4">
          {advancedQueryOptions.map((option) => (
            <CustomCheckbox
              key={option.id}
              isSelected={!!advancedQueries[option.id]}
              onChange={(isSelected) =>
                handleQueryChange(option.id, isSelected)
              }
            >
              <div className="font-plus_jakarta_sans text-text-dark text-xs">
                {option.label}
              </div>
            </CustomCheckbox>
          ))}
        </div>
      </div>

      {/* --- Data Table Section --- */}
      {currentData.length > 0 ? (
        <CustomTable
          columns={columns}
          data={currentData}
          ariaLabel="Beneficiary Reports"
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      ) : (
        <EmptyState />
      )}
    </AccountManagerDashboardLayout>
  );
}

// --- Sub-component for empty state ---
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[25rem] border border-dashed border-neutral-300 rounded-md bg-gray-50 text-center p-4">
    <h3 className="text-lg font-semibold text-gray-700">
      No Result to show yet.
    </h3>
    <p className="text-neutral-500 mt-2">Filter Query First Above.</p>
  </div>
);
