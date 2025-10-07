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
    href: "/founder/batching",
  },

  {
    icon: <UserIcon />,
    text: "My Profile",
    href: "/founder/profile",
  },
];

export default function FounderDashboardLayout({
  children,
}: FounderDashboardLayoutProps) {
  return <DashboardLayout menuItemList={menuItem}>{children}</DashboardLayout>;
}
