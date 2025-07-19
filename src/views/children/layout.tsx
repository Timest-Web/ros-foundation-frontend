import React from "react";
import DashboardLayout from "../layout";
import BoxIcon from "@/components/icons/BoxIcon";
import UserIcon from "@/components/icons/UserIcon";
import FileUpload from "@/components/icons/FileUploadIcon";

interface ChildrenDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItem = [
  { icon: <BoxIcon />, text: "Home", href: "/children" },
  { icon: <UserIcon />, text: "My Profile", href: "/children/profile" },
  { icon: <FileUpload />, text: "My Uploads", href: "/children/uploads" },
];

export default function ChildrenDashboardLayout({
  children,
}: ChildrenDashboardLayoutProps) {
  return (
    <DashboardLayout isNotification={false} menuItemList={menuItem}>
      {children}
    </DashboardLayout>
  );
}
