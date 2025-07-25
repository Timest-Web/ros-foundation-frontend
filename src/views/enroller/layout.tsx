import React from "react";
import DashboardLayout from "../layout";
import UserIcon from "@/components/icons/UserIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";

interface EnrollerDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [
  { icon: <MoneyIcon />, text: "Home", href: "/enroller" },
  { icon: <UserIcon />, text: "My Profile", href: "/enroller/profile" },
  { icon: <SettingsIcon />, text: "Settings", href: "/enroller/settings" },
];

export default function EnrollerDashboardLayout({
  children,
}: EnrollerDashboardLayoutProps) {
  return (
    <DashboardLayout isNotification={true} menuItemList={menuItem}>
      {children}
    </DashboardLayout>
  );
}
