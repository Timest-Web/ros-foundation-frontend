"use client";

import BackButton from "@/components/button/back";
import NotificationIcon from "@/components/icons/NotificationIcon";
import CustomPopover from "@/components/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import DashboardSkeleton from "@/components/skeleton/dashboard";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItemList: MenuItemProps[];
  isNotification?: boolean;
}

export default function DashboardLayout({
  children,
  menuItemList,
  isNotification,
}: DashboardLayoutProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <DashboardSkeleton />;
  }

  return (
    <div className="">
      <nav className="bg-neutral-100 px-6 lg:px-16 py-4 flex justify-end space-x-2 lg:space-x-5 border border-b border-neutral-300">
        {isNotification && (
          <Link
            href={"/notification"}
            className="border border-neutral-300 flex justify-between p-2 rounded-md w-[9.5rem] font-plus_jakarta_sans"
          >
            <NotificationIcon />
            <p className="text-accent-100 text-sm">Notification</p>
            <p className="text-black text-[0.56rem] font-bold border border-neutral-300 p-1 flex justify-center items-center rounded-full">
              20
            </p>
          </Link>
        )}
        <p className="w-10 h-10 p-1 rounded-full border border-neutral-300 text-black font-plus_jakarta_sans flex justify-center items-center">
          B
        </p>
        <div className="pt-2">
          <CustomPopover
            buttonContent={(isOpen) => (
              <div className="flex space-x-3 items-center cursor-pointer">
                <p className="text-black font-plus_jakarta_sans font-medium">
                  Hi, {session?.user?.name} 👋🏽
                </p>
                {isOpen ? (
                  <IoChevronUp className="text-black" />
                ) : (
                  <IoChevronDown className="text-black" />
                )}
              </div>
            )}
          >
            <div className="w-32 h-12 p-3 rounded-md bg-white shadow-lg">
              <button
                onClick={() => signOut()}
                className="text-black cursor-pointer"
              >
                Log out
              </button>
            </div>
          </CustomPopover>
        </div>
      </nav>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:bg-neutral-100 flex gap-4 px-6 lg:px-8 lg:py-6 lg:w-[18rem] lg:min-h-screen lg:flex-none lg:block">
          {menuItemList.map((menuItem, index) => (
            <div key={index}>
              <MenuItem
                icon={menuItem.icon}
                text={menuItem.text}
                href={menuItem.href}
              />
            </div>
          ))}
        </div>
        <hr className="lg:hidden bg-neutral-300"></hr>
        <div className="px-6 lg:px-12 py-6 lg:flex-1">{children}</div>
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
  const pathname = usePathname();
  const isActive = pathname === props.href || pathname.startsWith(props.href);

  return (
    <Link
      href={props.href}
      className={`group flex space-x-2 lg:space-x-4 py-4 cursor-pointer items-center 
        ${
          isActive
            ? "text-primary-100 font-extrabold"
            : "text-text-dark hover:text-primary-100"
        }`}
    >
      <div
        className={`[&>*]:group-hover:fill-primary-100 
        ${isActive ? "[&>*]:fill-primary-100" : ""}`}
      >
        {props.icon}
      </div>
      <p className="font-plus_jakarta_sans font-bold text-xs lg:text-base">
        {props.text}
      </p>
    </Link>
  );
}

interface FormHeadingProps {
  headerText: string;
  subHeading?: string;
  spanText?: string;
  isBackButton?: boolean;
}

export function FormHeading(props: FormHeadingProps) {
  return (
    <div className="mb-6">
      {props.isBackButton && <BackButton />}
      <h3 className="font-righteous text-2xl lg:text-4xl text-black">
        {props.headerText}
      </h3>
      <p className="font-ar-one-sans text-black mt-2 lg:mt-3">
        {props.subHeading}
        <span className="text-accent-100">{props.spanText}</span>
      </p>
    </div>
  );
}
