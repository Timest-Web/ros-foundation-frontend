/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useMemo, useState } from "react";
import { MenuItem } from "react-aria-components";
import EnrollerDashboardLayout from "../layout";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { users as sampleUsers, User } from "./sample";
import { ActionMenu } from "@/components/table/action";

const userActionItems = [
  { id: "edit", label: "Edit" },
  { id: "view", label: "View" },
];

const handleAction = (actionKey: React.Key, user: User) => {
  switch (actionKey) {
    case "edit":
      console.log("EDIT action for user:", user.firstName, user.id);
      // Logic to open edit modal or navigate
      break;
    case "view":
      console.log("VIEW action for user:", user.firstName, user.id);
      // Logic to navigate to user detail page
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

export default function EnrollerBeneficiariesView() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>(sampleUsers);

  const filteredUsers = useMemo(() => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter((user) =>
      Object.values(user).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [query, users]);

  return (
    <EnrollerDashboardLayout>
      <div>
        <CustomTable
          columns={columns}
          data={filteredUsers}
          ariaLabel="Users"
          onSearch={setQuery}
          showSearch={true}
        />
      </div>
    </EnrollerDashboardLayout>
  );
}
