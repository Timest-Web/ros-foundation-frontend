/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from "react";
import MyAccountForm from "./form";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { bankAccounts } from "./sample";
import MoreIcon from "@/components/icons/MoreIcon";

// type BankAccount = {
//   id: number;
//   bankName: string;
//   accountNumber: string;
//   accountName: string;
//   isDefault: boolean;
// };

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
    render: () => (
      <MoreIcon/>
    ),
  },
];



  return (
    <div className="flex gap-4">
      <MyAccountForm />
      {/* <section className="border border-neutral-300 rounded-md w-2/3 flex justify-center items-center">
        <p className="font-plus_jakarta_sans text-xs text-text-dark">
          No bank account has been added yet
        </p>
      </section> */}
      <section className=" w-2/3">
        <CustomTable
          columns={columns}
          data={bankAccounts}
          ariaLabel="Bank Accounts"
        />
      </section>
    </div>
  );
}
