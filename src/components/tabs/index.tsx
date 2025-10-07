"use client";

import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";

interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: TabData[];
  ariaLabel: string;
}

export function CustomTabs({ tabs, ariaLabel }: CustomTabsProps) {
  return (
    <Tabs>
      <TabList className={"flex gap-4"} aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <Tab
            className={
              "font-plus_jakarta_sans cursor-pointer data-[selected]:border data-[selected]:border-neutral-300 data-[selected]:shadow w-32 p-2 font-semibold text-sm text-text-dark data-[selected]:text-primary-100 text-center rounded-md"
            }
            key={tab.id}
            id={tab.id}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <hr className="p-[0.001rem] bg-neutral-300 w-full mt-2 mb-6"></hr>
      {tabs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}