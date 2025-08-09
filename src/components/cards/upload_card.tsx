"use client";

import React from "react";
import { Button, FileTrigger } from "react-aria-components";
import AttachIcon from "@/components/icons/AttachIcon";
import clsx from "clsx";

interface DocumentUploadCardProps {
  selectedFileName: string | null;
  onFileChange: (fileList: FileList | null) => void;
  headingText: string;
  subHeading: string;
  hintText?: string;
  selectField: React.ReactNode;
  footerText?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export default function DocumentUploadCard({
  selectedFileName,
  onFileChange,
  headingText,
  subHeading,
  hintText,
  selectField,
  footerText,
  isDisabled,
  className,
}: DocumentUploadCardProps) {
  return (
    <section>
      <div
        className={clsx(
          "border border-neutral-300 p-4 lg:w-72 rounded-md flex flex-col gap-3 text-text-dark",
          !className?.includes("h-") && "h-[14rem]", // default height if none passed
          className
        )}
      >
        <h3 className="font-righteous text-text-dark">{headingText}</h3>
        <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>
        {selectField}
        {!isDisabled && hintText && (
          <p className="font-plus_jakarta_sans text-xs">
            <span className="font-semibold">Hint:</span> {hintText}
          </p>
        )}
      </div>

      {!isDisabled && (
        <FileTrigger onSelect={onFileChange}>
          <Button
            isDisabled={isDisabled}
            className="flex gap-3 bg-white items-center text-primary-100 text-xs justify-center border border-neutral-300 p-2 rounded-md w-full lg:w-72 font-plus_jakarta_sans mt-2 font-bold"
          >
            <AttachIcon />
            {selectedFileName ? (
              <p className="text-xs overflow-hidden">{selectedFileName}</p>
            ) : (
              <p>Attach File</p>
            )}
          </Button>
        </FileTrigger>
      )}
      {!isDisabled && footerText && (
        <p className="font-plus_jakarta_sans text-xs font-semibold text-text-dark mt-2">
          File format: PNG, JPEG, PDF*
        </p>
      )}
    </section>
  );
}
