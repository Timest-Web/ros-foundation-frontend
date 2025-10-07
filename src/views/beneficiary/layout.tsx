import React from "react";
import DashboardLayout from "../layout";
import WomenIcon from "@/components/icons/WomenIcon";
import PayoutIcon from "@/components/icons/PayoutIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import UserIcon from "@/components/icons/UserIcon";

interface BeneficiaryDashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    icon: <UserIcon />,
    text: "Personal Loan Profile",
    href: "/beneficiary/loan-profile",
  },
  // {
  //   icon: <UserIcon />,
  //   text: "My Profile",
  //   href: "/beneficiary/profile",
  // },
  // { icon: <FileUpload />, text: "Uploads", href: "/beneficiary/uploads" },
  {
    icon: <WomenIcon />,
    text: "Children Loan Profile",
    href: "/beneficiary/children-account",
  },
  {
    icon: <PayoutIcon />,
    text: "Loan & Payout",
    href: "/beneficiary/account-payout",
  },
  {
    icon: <SettingsIcon />,
    text: "Settings",
    href: "/beneficiary/settings",
  },
];

export default function BeneficiaryDashboardLayout({
  children,
}: BeneficiaryDashboardLayoutProps) {
  return (
    <DashboardLayout isNotification={true} menuItemList={menuItems}>
      {children}
    </DashboardLayout>
  );
}

interface DashboardHeaderProps {
  mainHeader?: string;
  subHeader?: string;
}

export function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <div>
      <header className="font-righteous text-3xl lg:text-4xl text-black">
        {props.mainHeader}
      </header>
      <p className="font-ar-one-sans text-sm lg:text-base text-black mt-3 lg:w-[52rem]">
        {props.subHeader}
      </p>
    </div>
  );
}
