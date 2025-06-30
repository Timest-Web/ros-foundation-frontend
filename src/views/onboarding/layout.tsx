"use client";
import BoxIcon from "@/components/icons/BoxIcon";
import FileUpload from "@/components/icons/FileUploadIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import PayoutIcon from "@/components/icons/PayoutIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import UserIcon from "@/components/icons/UserIcon";
import WomenIcon from "@/components/icons/WomenIcon";
import CustomPopover from "@/components/popover";
import Link from "next/link";
import React from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const menuListItem = [
  { icon: <BoxIcon />, text: "Onboarding", href: "/onboarding" },
  { icon: <UserIcon />, text: "My Profile", href: "/onboarding" },
  { icon: <FileUpload />, text: "Uploads", href: "/onboarding" },
  { icon: <WomenIcon />, text: "Children Account", href: "/onboarding" },
  { icon: <PayoutIcon />, text: "Account & Payout", href: "/onboarding" },
  { icon: <SettingsIcon />, text: "Settings", href: "/onboarding" },
];

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div>
      <nav className="bg-neutral-100 px-16 py-4 flex justify-end space-x-5 border border-b border-neutral-300">
        <div className="border border-neutral-300 flex justify-between p-2 rounded-md w-[9.5rem] font-plus_jakarta_sans">
          <NotificationIcon />
          <p className="text-accent-100 text-sm">Notification</p>
          <p className="text-black text-[0.56rem] font-bold border border-neutral-300 p-1 flex justify-center items-center rounded-full">
            20
          </p>
        </div>
        <p className="w-10 h-10 p-1 rounded-full border border-neutral-300 text-black font-plus_jakarta_sans flex justify-center items-center">
          B
        </p>
        <div className="pt-2">
          <CustomPopover
            buttonContent={(isOpen) => (
              <div className="flex space-x-3 items-center cursor-pointer">
                <p className="text-black font-plus_jakarta_sans font-medium">
                  Hi, Boma 👋🏽
                </p>
                {isOpen ? (
                  <IoChevronUp className="text-black" />
                ) : (
                  <IoChevronDown className="text-black" />
                )}
              </div>
            )}
          >
            <div className="w-16 h-16 p-2 bg-white shadow-2xl">
              <p className="text-black">Log out</p>
            </div>
          </CustomPopover>
        </div>
      </nav>
      <div className="flex">
        <div className="bg-neutral-100 px-8 py-6 w-[18rem] flex-none">
          {menuListItem.map((menuItem, index) => (
            <div key={index}>
              <MenuItem icon={menuItem.icon} text={menuItem.text} href={menuItem.href} />
            </div>
          ))}
        </div>
        <div className="px-12 py-6 flex-1">{children}</div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

function MenuItem(props: MenuItemProps) {
  return (
    <Link
      href={props.href}
      className="text-text-dark flex space-x-4 py-4 cursor-pointer hover:text-primary-100"
    >
      <div className="[&>*]:group-hover:fill-primary-100">{props.icon}</div>
      <p className="font-plus_jakarta_sans font-bold">{props.text}</p>
    </Link>
  );
}
