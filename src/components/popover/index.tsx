"use client";

import {
  Button,
  Dialog,
  DialogTrigger,
  Popover,
  type PopoverProps,
} from "react-aria-components";
import { useState } from "react";

interface MyPopoverProps extends Omit<PopoverProps, "children"> {
  children: React.ReactNode;
  buttonContent: (isOpen: boolean) => React.ReactNode;
}

export default function CustomPopover({
  children,
  buttonContent,
  ...props
}: MyPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogTrigger onOpenChange={setIsOpen}>
      <Button>{buttonContent(isOpen)}</Button>
      <Popover className={'overflow-visible'} {...props}>
        <Dialog>{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}
