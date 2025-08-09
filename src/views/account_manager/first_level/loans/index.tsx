/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { ActionMenu } from "@/components/table/action";
import AccountManagerDashboardLayout from "../../layout";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import {
  mockDocuments as sampleDocs,
  DocumentRow,
} from "../verify_documents/data";

const handleAction = (actionKey: React.Key, doc: DocumentRow) => {
  switch (actionKey) {
    case "approve":
      console.log("APPROVE action for user:", doc.firstName, doc.id);
      break;
    case "manage":
      console.log("MANAGE action for user:", doc.firstName, doc.id);
      break;
    default:
      console.warn("Unknown action:", actionKey);
  }
};

const columns: ColumnDefinition<DocumentRow>[] = [
  { key: "firstName", label: "First Name", isRowHeader: true },
  { key: "secondName", label: "Second Name" },
  { key: "documentType", label: "Document Type" },
  { key: "fileName", label: "File Name" },
  {
    key: "status",
    label: "Document Status Tier 1",
    render: (doc) => (
      <div className="flex gap-1">
        {doc.status == "Verified" ? (
          <CheckMarkIcon className="w-3 h-3 mt-1" />
        ) : (
          ""
        )}
        {doc.status}
      </div>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: (doc) => {
      const actionItems =
        doc.status === "Verified"
          ? [{ id: "manage", label: "Manage Approval" }]
          : [{ id: "approve", label: "Approve Beneficiary" }];

      return (
        <ActionMenu
          aria-label={`Actions for ${doc.firstName}`}
          items={actionItems}
          onAction={(key) => handleAction(key, doc)}
        />
      );
    },
  },
];

export default function AccountManagerLoanView() {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<DocumentRow[]>(sampleDocs);

  return (
    <AccountManagerDashboardLayout>
      <CustomTable
        columns={columns}
        data={documents}
        ariaLabel="Documents"
        onSearch={setQuery}
        showSearch={true}
        filterTabs={[
          { key: "Not Verified", label: "Awaiting Approval" },
          { key: "Verified", label: "Approved" },
        ]}
        filterKey="status"
        pageLink=""
        headerText="Loans"
        subHeading="Approve Grants and Loans to Beneficiaries"
      />
    </AccountManagerDashboardLayout>
  );
}