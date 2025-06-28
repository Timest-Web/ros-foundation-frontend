"use client";
import BoxIcon from "@/components/icons/BoxIcon";
import FileUpload from "@/components/icons/FileUploadIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import PayoutIcon from "@/components/icons/PayoutIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import UserIcon from "@/components/icons/UserIcon";
import WomenIcon from "@/components/icons/WomenIcon";
import CustomPopover from "@/components/popover";
import React from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const menuListItem = [
  { icon: <BoxIcon />, text: "Onboarding" },
  { icon: <UserIcon />, text: "My Profile" },
  { icon: <FileUpload />, text: "Uploads" },
  { icon: <WomenIcon />, text: "Children Account" },
  { icon: <PayoutIcon />, text: "Account & Payout" },
  { icon: <SettingsIcon />, text: "Settings" },
];

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div>
      <nav className="bg-neutral-100 px-16 py-4 flex justify-end space-x-5 border border-b border-neutral-300">
        <div className="border border-neutral-300 flex justify-between p-2 rounded-md w-[9.5rem] font-plus_jakarta_sans">
          <NotificationIcon/>
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
                <p className="text-black font-plus_jakarta_sans">Hi, Boma 👋🏽</p>
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
        <ul className="h-screen bg-neutral-100 px-8 py-6 w-[30%]">
          {menuListItem.map((menuItem, index) => (
            <div key={index}>
              <MenuItem icon={menuItem.icon} text={menuItem.text} />
            </div>
          ))}
        </ul>
        <div className="px-16 py-6">{children}</div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
}

function MenuItem(props: MenuItemProps) {
  return (
    <li className="text-text-dark flex space-x-4 py-4 cursor-pointer hover:text-primary-100">
      <div className="[&>*]:group-hover:fill-primary-100">{props.icon}</div>
      <p className="font-plus_jakarta_sans font-bold">{props.text}</p>
    </li>
  );
}
