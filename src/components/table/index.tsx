/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Table, TableHeader, TableBody, Row, Column, Cell } from "react-aria-components";
import { Pagination } from "./pagination"; 


export type ColumnDefinition<T> = {
  key: string;
  label: string;
  isRowHeader?: boolean;
  render?: (row: T) => React.ReactNode;
};


type CustomTableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[]; 
  ariaLabel: string;
  currentPage: number;
  pageCount: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};


export function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  ariaLabel,
  currentPage,
  pageCount,
  itemsPerPage,
  totalItems,
  onPageChange,
}: CustomTableProps<T>) {
  
  return (
    <div>
      <div className="w-full min-h-[25rem] font-plus_jakarta_sans border border-neutral-300 rounded-md">
        <Table aria-label={ariaLabel} className="w-full">
          <TableHeader>
            {columns.map((col) => (
              <Column
                key={String(col.key)}
                isRowHeader={col.isRowHeader}
                className="px-4 py-4 text-left text-[13px] font-semibold text-text-dark"
              >
                {col.label}
              </Column>
            ))}
          </TableHeader>
          {/* Use a ternary to handle empty data within the table body */}
          <TableBody>
            {data.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {columns.map((col) => (
                  <Cell key={String(col.key)} className="px-4 py-4 text-xs text-text-dark">
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </Cell>
                ))}
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination is always shown, but will be disabled if pageCount <= 1 */}
      <div className="w-full mt-4">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}