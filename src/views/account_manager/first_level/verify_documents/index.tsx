/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { ColumnDefinition, CustomTable } from "@/components/table";
import { ActionMenu } from "@/components/table/action";
import AccountManagerDashboardLayout from "../../layout";

// Import the right mock data and types
import { mockDocuments as sampleDocs, DocumentRow } from "./data";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";

// Action items
const userActionItems = [
  { id: "view", label: "View Details" },
];

// Handle action menu
const handleAction = (actionKey: React.Key, doc: DocumentRow) => {
  switch (actionKey) {
    case "view":
      console.log("VIEW action for user:", doc.firstName, doc.id);
      break;
 
      break;
    default:
      console.warn("Unknown action:", actionKey);
  }
};

// Define correct columns
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
            <CheckMarkIcon />
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
    render: (doc) => (
      <ActionMenu
        aria-label={`Actions for ${doc.firstName}`}
        items={userActionItems}
        onAction={(key) => handleAction(key, doc)}
      />
    ),
  },
];

export default function AccountManagerVerifyDocumentsView() {
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
          { key: "all", label: "All Beneficiaries" },
          { key: "Verified", label: "Verified Beneficiaries" },
          { key: "Not Verified", label: "Non-Verified Beneficiaries" },
        ]}
        filterKey="status"
        pageLink="beneficiaries/add-beneficiaries"
        headerText="Verify Documents"
        subHeading="Screen and verify documents of Beneficiaries"
      />
    </AccountManagerDashboardLayout>
  );
}
