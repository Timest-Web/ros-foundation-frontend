import React from "react";
import UserIcon from "@/components/icons/UserIcon";
import DashboardLayout from "@/views/layout";
import BatchIcon from "@/components/icons/BatchIcon";

interface FounderDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [

  {
    icon: <BatchIcon />,
    text: "Batching",
    href: "/finance-manager/batching",
  },

  {
    icon: <UserIcon />,
    text: "My Profile",
    href: "/finance-manager/profile",
  },
];

export default function FounderDashboardLayout({
  children,
}: FounderDashboardLayoutProps) {
  return <DashboardLayout menuItemList={menuItem}>{children}</DashboardLayout>;
}
