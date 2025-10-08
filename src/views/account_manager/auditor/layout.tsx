import React from "react";
import UserIcon from "@/components/icons/UserIcon";
import DocIcon from "@/components/icons/DocIcon";
import WomenIcon from "@/components/icons/WomenIcon";
import DashboardLayout from "@/views/layout";
import BatchIcon from "@/components/icons/BatchIcon";

interface AuditorDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [
  {
    icon: <UserIcon />,
    text: "Personal Loan Profile",
    href: "/account-manager/auditor",
  },
  {
    icon: <WomenIcon />,
    text: "Children Loan Profile",
    href: "/account-manager/auditor/child-loan",
  },
  {
    icon: <BatchIcon />,
    text: "Batching",
    href: "/account-manager/auditor/batching",
  },

  {
    icon: <DocIcon />,
    text: "Export Reports",
    href: "/account-manager/auditor/reports",
  },
  {
    icon: <UserIcon />,
    text: "My Profile",
    href: "/account-manager/auditor/profile",
  },
];

export default function AuditorDashboardLayout({
  children,
}: AuditorDashboardLayoutProps) {
  return <DashboardLayout menuItemList={menuItem}>{children}</DashboardLayout>;
}
