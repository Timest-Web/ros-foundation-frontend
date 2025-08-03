/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useMemo, useState } from "react";
import {
  FieldError,
  Input,
  Label,
  SearchField,
  Text,
  Table,
  TableHeader,
  TableBody,
  Row,
  Column,
  Cell,
} from "react-aria-components";
import { Button } from "../button";
import { IoMdAdd } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Pagination } from "./pagination";
import { useRouter } from "next/navigation";


export type ColumnDefinition<T> = {
  // The key can now be a generic string, as "action" is not a keyof the User object.
  key: string;
  label: string;
  isRowHeader?: boolean;
  // The render function simply receives the entire row object.
  render?: (row: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  selectionMode?: "none" | "single" | "multiple";
  ariaLabel: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  itemsPerPage?: number;
  filterTabs?: { key: string; label: string }[];
  filterKey?: keyof T;
  pageLink:string;
};

export function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  selectionMode = "none",
  ariaLabel,
  showSearch = false,
  onSearch,
  itemsPerPage = 5,
  filterTabs,
  filterKey,
  pageLink
}: CustomTableProps<T>) {
  const [localQuery, setLocalQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (value: string) => {
    setLocalQuery(value);
    if (onSearch) onSearch(value);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const queryMatch = Object.values(item).some((val) =>
        String(val).toLowerCase().includes(localQuery.toLowerCase())
      );

      const tabMatch =
        activeTab === "all" || (filterKey && item[filterKey] === activeTab);

      return queryMatch && tabMatch;
    });
  }, [data, localQuery, activeTab, filterKey]);

  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const router = useRouter();

  return (
    <div>
      {showSearch && (
        <div className="flex justify-between mb-4">
          <div className="flex flex-col gap-4">
            <h3 className="font-righteous text-2xl lg:text-4xl text-black">
              Beneficiaries
            </h3>
            <p className="font-ar-one-sans text-black">List of Beneficiaries</p>
          </div>

          <section className="flex gap-4 pt-4">
            <div className="relative w-80">
              <SearchField aria-label="Search" onChange={handleSearch}>
                <Input
                  placeholder="Search “Type any keyword”"
                  className="w-full border border-neutral-300 focus:outline-none px-10 py-3 rounded text-sm text-text-dark font-plus_jakarta_sans"
                />
                <FiSearch className="absolute left-3 top-[1.4rem] transform -translate-y-1/2 text-gray-500" />
                <FieldError />
              </SearchField>
            </div>

            <Button
              onPress={() =>
                router.push(pageLink)
              }
              className="w-48 h-[2.8rem] flex items-center justify-center gap-1"
            >
              <IoMdAdd />
              Add a beneficiary
            </Button>
          </section>
        </div>
      )}

      {filterTabs && (
        <div className="mb-4 flex gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(0);
              }}
              className={`px-4 py-2 text-sm rounded ${
                activeTab === tab.key
                  ? "font-plus_jakarta_sans cursor-pointer border border-neutral-300 shadow p-2 font-semibold text-sm text-primary-100 text-center rounded-md"
                  : "font-plus_jakarta_sans cursor-pointer text-text-dark font-semibold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="w-full h-[25rem] overflow-hidden font-plus_jakarta_sans space-y-4 border border-neutral-300 rounded-md">
        <Table
          aria-label={ariaLabel}
          selectionMode={selectionMode}
          className="w-full"
        >
          <TableHeader>
            {columns.map((col) => (
              <Column
                key={String(col.key)}
                isRowHeader={col.isRowHeader}
                className="px-6 py-4 text-left text-sm font-semibold text-text-dark"
              >
                {col.label}
              </Column>
            ))}
          </TableHeader>
          <TableBody>
            {currentData.map((row, rowIndex) => (
              <Row key={offset + rowIndex}>
                {columns.map((col) => (
                  <Cell
                    key={String(col.key)}
                    className="px-6 py-4 text-sm text-text-dark"
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </Cell>
                ))}
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={(selected) => setCurrentPage(selected)}
        />
      </div>
    </div>
  );
}
