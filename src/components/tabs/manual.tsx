"use client";

import React from "react";

// Define the shape of the data for each tab
interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

// Define the props for our new component
interface ManualTabsProps {
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  rightSlot?: React.ReactNode;
}

export function ManualTabs({
  tabs,
  activeTabId,
  onTabChange,
  rightSlot,
}: ManualTabsProps) {
  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content;

  // 1. Base styles that apply to ALL tabs, regardless of state.
  //    Note that text color and border are removed from here.
  const baseTabClasses =
    "font-plus_jakarta_sans cursor-pointer p-2 font-semibold text-sm text-center rounded-md transition-all";

  // 2. Styles that ONLY apply when the tab is active.
  const activeTabClasses = "border-neutral-300 shadow text-primary-100";

  // 3. Styles that ONLY apply when the tab is inactive.
  const inactiveTabClasses = "text-text-dark border-transparent";

  return (
    <div>
      <div className="flex justify-between ">
        <div role="tablist" className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTabId === tab.id}
              onClick={() => onTabChange(tab.id)}
              // 4. Apply the classes without conflict.
              //    All buttons get `baseTabClasses`.
              //    Then, they get EITHER `activeTabClasses` OR `inactiveTabClasses`.
              className={`${baseTabClasses} border ${
                // Added a common 'border' class here for consistency
                activeTabId === tab.id ? activeTabClasses : inactiveTabClasses
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {rightSlot && <div className="">{rightSlot}</div>}
      </div>

      <hr className="p-[0.001rem] bg-neutral-300 w-full mt-2 mb-6" />
      <div className="mt-6">{activeTabContent}</div>
    </div>
  );
}
