import React from "react";
import DashboardLayout from "../layout";
import UserIcon from "@/components/icons/UserIcon";
import WomenIcon from "@/components/icons/WomenIcon";

interface EnrollerDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [
  { icon: <UserIcon />, text: "Personal Loan Profile", href: "/enroller" },
  { icon: <WomenIcon />, text: "Child Loan Profile", href: "/enroller/children" },
  { icon: <UserIcon />, text: "Profile", href: "/enroller/profile" },
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
