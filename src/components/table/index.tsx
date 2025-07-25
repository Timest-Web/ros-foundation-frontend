/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
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
  render?: (value: any, row?: T) => React.ReactNode;
  key: keyof T;
  label: string;
  isRowHeader?: boolean;
};

type CustomTableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  selectionMode?: "none" | "single" | "multiple";
  ariaLabel: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  itemsPerPage?: number;
};

export function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  selectionMode = "none",
  ariaLabel,
  showSearch = false,
  onSearch,
  itemsPerPage = 5,
}: CustomTableProps<T>) {
  const [localQuery, setLocalQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearch = (value: string) => {
    setLocalQuery(value);
    if (onSearch) onSearch(value);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const router = useRouter();

  return (
    <div className="">
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
                router.push("/enroller/beneficiaries/add-beneficiaries")
              }
              className="w-48 h-[2.8rem] flex items-center justify-center gap-1"
            >
              <IoMdAdd />
              Add a beneficiary
            </Button>
          </section>
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
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </Cell>
                ))}
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" w-full">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          onPageChange={(selected) => setCurrentPage(selected)}
        />
      </div>
    </div>
  );
}
