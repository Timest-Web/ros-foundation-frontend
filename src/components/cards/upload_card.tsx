/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button, FileTrigger } from "react-aria-components";
import AttachIcon from "@/components/icons/AttachIcon";

interface DocumentUploadCardProps {
  selectedFileName: string | null;
  onFileChange: (fileList: FileList | null) => void;
  headingText: string;
  subHeading: string;
  hintText?: string;
  selectField: React.ReactNode;
}

export default function DocumentUploadCard({
  selectedFileName,
  onFileChange,
  headingText,
  subHeading,
  hintText,
  selectField,
}: DocumentUploadCardProps) {
  return (
    <section>
      <div className="border border-neutral-300 p-4 w-72 h-[14rem] rounded-md flex flex-col gap-3 text-text-dark">
        <h3 className="font-righteous text-text-dark">{headingText}</h3>
        <p className="font-plus_jakarta_sans text-xs">{subHeading}</p>
        {selectField}
        {hintText && (
          <p className="font-plus_jakarta_sans text-xs">
            <span className="font-semibold">Hint:</span> {hintText}
          </p>
        )}
      </div>

      <FileTrigger onSelect={onFileChange}>
        <Button className="flex gap-3 bg-white items-center text-primary-100 text-xs justify-center border border-neutral-300 p-2 rounded-md w-72 font-plus_jakarta_sans mt-2 font-bold">
          <AttachIcon />
          {selectedFileName ? (
            <p className="text-xs overflow-hidden">{selectedFileName}</p>
          ) : (
            <p>Attach File</p>
          )}
        </Button>
      </FileTrigger>
    </section>
  );
}
