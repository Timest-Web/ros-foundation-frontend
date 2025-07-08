/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

export type ColumnDefinition<T> = {
  render?: any;
  key: keyof T;
  label: string;
  isRowHeader?: boolean;
};

type CustomTableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  selectionMode?: "none" | "single" | "multiple";
  ariaLabel: string;
};

export function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  selectionMode = "none",
  ariaLabel,
}: CustomTableProps<T>) {
  return (
    <div className="w-full  overflow-hidden font-plus_jakarta_sans">
      <Table
        aria-label={ariaLabel}
        selectionMode={selectionMode}
        className="w-full"
      >
        <TableHeader className="">
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
          {data.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {columns.map((col) => (
                <Cell
                  key={String(col.key)}
                  className="px-6 py-4 text-sm text-text-dark"
                >
                  {col.render ? col.render(row[col.key]) : row[col.key]}
                </Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
