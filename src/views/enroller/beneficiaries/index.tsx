/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import EnrollerDashboardLayout from "../layout";
import { ColumnDefinition, CustomTable } from "@/components/table";
import MoreIcon from "@/components/icons/MoreIcon";
import { bankAccounts } from "@/views/beneficiary/account_payout/my_account/sample";

export default function EnrollerBeneficiariesView() {
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

  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase();
    return bankAccounts.filter((user) =>
      Object.values(user).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <EnrollerDashboardLayout>
      <div className="">
        <CustomTable
          columns={columns}
          data={filteredUsers}
          ariaLabel="Bank Accounts"
          onSearch={setQuery}
          showSearch={true}
        />
      </div>
    </EnrollerDashboardLayout>
  );
}
