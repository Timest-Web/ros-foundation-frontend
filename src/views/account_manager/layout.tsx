import React from "react";
import DashboardLayout from "../layout";
import UserIcon from "@/components/icons/UserIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import GrantIcon from "@/components/icons/GrantIcon";
import VerifyIcon from "@/components/icons/VerifyIcon";
// import DocIcon from "@/components/icons/DocIcon";

interface AccountManagerDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [
  {
    icon: <MoneyIcon />,
    text: "Beneficiaries",
    href: "/account-manager/first-level/beneficiaries",
  },
  {
    icon: <UserIcon />,
    text: "My Profile",
    href: "/account-manager/first-level/profile",
  },
  {
    icon: <GrantIcon />,
    text: "Loans",
    href: "/account-manager/first-level/loans",
  },
  {
    icon: <VerifyIcon />,
    text: "Verify Documents",
    href: "/account-manager/first-level/verify-documents",
  },
  // {
  //   icon: <DocIcon />,
  //   text: "Export Reports",
  //   href: "/account-manager/first-level/reports",
  // },
  {
    icon: <SettingsIcon />,
    text: "Settings",
    href: "/account-manager/first-level/settings",
  },
];

export default function AccountManagerDashboardLayout({
  children,
}: AccountManagerDashboardLayoutProps) {
  return (
    <DashboardLayout isNotification={true} menuItemList={menuItem}>
      {children}
    </DashboardLayout>
  );
}
