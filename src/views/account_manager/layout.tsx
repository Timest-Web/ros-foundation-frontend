import React from "react";
import DashboardLayout from "../layout";
import UserIcon from "@/components/icons/UserIcon";
// import MoneyIcon from "@/components/icons/MoneyIcon";
// import SettingsIcon from "@/components/icons/SettingsIcon";
// import GrantIcon from "@/components/icons/GrantIcon";
// import VerifyIcon from "@/components/icons/VerifyIcon";
import DocIcon from "@/components/icons/DocIcon";
import WomenIcon from "@/components/icons/WomenIcon";

interface AccountManagerDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [
  {
    icon: <UserIcon />,
    text: "Personal Loan Profile",
    href: "/account-manager/first-level",
  },
  {
    icon: <WomenIcon />,
    text: "Children Loan Profile",
    href: "/account-manager/first-level/child-loan",
  },
  {
    icon: <DocIcon />,
    text: "Export Reports",
    href: "/account-manager/first-level/reports",
  },
  {
    icon: <UserIcon />,
    text: "My Profile",
    href: "/account-manager/first-level/profile",
  },
  
];

export default function AccountManagerDashboardLayout({
  children,
}: AccountManagerDashboardLayoutProps) {
  return <DashboardLayout menuItemList={menuItem}>{children}</DashboardLayout>;
}
