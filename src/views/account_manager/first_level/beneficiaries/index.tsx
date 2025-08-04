/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useMemo, useState } from "react";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { ActionMenu } from "@/components/table/action";
import AccountManagerDashboardLayout from "../../layout";
import {
  users as sampleUsers,
  User,
} from "@/views/enroller/beneficiaries/sample";

const userActionItems = [
  { id: "view", label: "View More" },
  { id: "edit", label: "Edit" },
  { id: "verify-documents", label: "Verify Documents" },
  { id: "grant-loan", label: "Grant/Loan" },
  { id: "export-reports", label: "Export Reports" },
];

const handleAction = (actionKey: React.Key, user: User) => {
  switch (actionKey) {
    case "view":
      console.log("VIEW action for user:", user.firstName, user.id);
      break;
    case "edit":
      console.log("EDIT action for user:", user.firstName, user.id);
      break;
    case "verify-documents":
      console.log("VERIFY DOCUMENTS for user:", user.firstName, user.id);
      break;
    case "grant-loan":
      console.log("GRANT/LOAN to user:", user.firstName, user.id);
      break;
    case "export-reports":
      console.log("EXPORT REPORTS for user:", user.firstName, user.id);
      break;
    default:
      console.warn("Unknown action:", actionKey);
  }
};

const columns: ColumnDefinition<User>[] = [
  { key: "firstName", label: "First Name", isRowHeader: true },
  { key: "secondName", label: "Second Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  {
    key: "action",
    label: "Action",
    render: (user) => (
      <ActionMenu
        aria-label={`Actions for ${user.firstName}`}
        items={userActionItems}
        onAction={(key) => handleAction(key, user)}
      />
    ),
  },
];

export default function AccountManagerBeneficiariesView() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>(sampleUsers);

  return (
    <AccountManagerDashboardLayout>
      <CustomTable
        columns={columns}
        data={users}
        ariaLabel="Users"
        onSearch={setQuery}
        showSearch={true}
        filterTabs={[
          { key: "all", label: "All Beneficiaries" },
          { key: "verified", label: "Verified Beneficiaries" },
          { key: "unverified", label: "Non-Verified Beneficiaries" },
        ]}
        filterKey="status"
        pageLink="beneficiaries/add-beneficiaries"
        headerText="Beneficiaries"
        subHeading="List of Beneficiaries"
      />
    </AccountManagerDashboardLayout>
  );
}
