// src/components/ActionMenu.tsx (or wherever you placed it)

import React from "react";
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  MenuItem,
} from "react-aria-components";
import MoreIcon from "@/components/icons/MoreIcon";

// Define the shape of a menu item object
interface ActionMenuItem {
  id: React.Key;
  label: string;
  className?: string;
  onAction?: () => void; // Optional specific action per item
}

// Define the props for our component
interface ActionMenuProps {
  items: ActionMenuItem[];
  onAction: (key: React.Key) => void;
  "aria-label"?: string;
}

export function ActionMenu({
  items,
  onAction,
  "aria-label": ariaLabel = "Actions",
}: ActionMenuProps) {
  return (
    <MenuTrigger>
      <Button
        aria-label={ariaLabel}
        className="p-2 hover:bg-gray-100 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <MoreIcon />
      </Button>
      <Popover className="bg-white shadow-lg rounded p-3 w-32 text-text-dark text-sm font-plus_jakarta_sans">
        {/*
          We now use the `items` prop to build the collection dynamically.
          This is the recommended pattern for abstractions.
        */}
        <Menu
          items={items}
          onAction={onAction}
          className="space-y-2 outline-none"
        >
          {(item) => (
            <MenuItem
              key={item.id}
              className={
                item.className ||
                "cursor-pointer outline-none focus-visible:bg-gray-100 p-1 rounded"
              }
            >
              {item.label}
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
