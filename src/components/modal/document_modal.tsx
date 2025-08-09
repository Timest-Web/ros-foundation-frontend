"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Modal,
  Button as AriaButton, // Use alias to avoid naming conflict
} from "react-aria-components";
import Image, { StaticImageData } from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

import { Button } from "@/components/button";
import DocIcon from "@/components/icons/DocIcon";
import { CustomCheckbox } from "@/components/form/checkbox";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";


interface DocumentVerificationModalProps {
  documentId?: string;
  documentName?: string;
  documentType?: string;
  imageUrl: string | StaticImageData;
  onActionComplete?: (status: "accepted" | "declined") => void;
  children: React.ReactNode; 
}

export default function DocumentVerificationModal({
  documentId,
  documentName,
  documentType,
  imageUrl,
  onActionComplete,
  children,
}: DocumentVerificationModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  const handleAction = async (status: "accepted" | "declined") => {
    if (!hasConsented) {
      alert("You must consent before proceeding.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/documents/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          status,
          consent: hasConsented,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const result = await response.json();
      console.log(result);

      if (onActionComplete) {
        onActionComplete(status);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogTrigger>
      {children}
      <Modal className="fixed pb-16 inset-0 z-50 bg-black backdrop-blur" isDismissable>
        <Dialog>
          <div className="flex justify-between p-12">
            <section className="flex gap-2 items-center">
              <DocIcon className="text-white" />
              <p className="text-white text-sm font-semibold font-plus_jakarta_sans">
                Verification Panel
              </p>
            </section>
            <AriaButton
              slot="close"
              className="w-40 font-semibold text-sm bg-opacity-0 border border-neutral-300 flex gap-3 p-2 justify-center items-center text-white"
            >
              <IoArrowBack />
              <p>Exit Panel</p>
            </AriaButton>
          </div>

          <section className="flex flex-col gap-4 justify-center items-center">
            <div className="bg-white w-[45rem] h-[25rem] p-4 relative">
              <section className="flex justify-between mb-2">
                <p className="text-primary-100 text-sm font-plus_jakarta_sans font-semibold">
                  {documentName}
                </p>
                <p className="text-primary-100 text-sm font-plus_jakarta_sans font-semibold">
                  {documentType}
                </p>
              </section>
              <hr className="p-[0.01rem] mt-2 bg-neutral-300" />

              <button
                onClick={toggleZoom}
                className="absolute top-12 left-[51%] transform -translate-x-1/2 -translate-y-1/2 z-10 text-white bg-black/70 w-16 h-16 flex justify-center items-center p-2 rounded-full shadow-md hover:scale-110 transition"
              >
                {isZoomed ? <FiZoomOut size={20} /> : <FiZoomIn size={20} />}
              </button>

              <div
                className={`flex mt-4 gap-2 justify-center transition-transform duration-300 ${
                  isZoomed ? "scale-[1.8]" : "scale-100"
                }`}
              >
                <Image className="w-72 h-82" src={imageUrl} alt="Verification Document" />
                <Image className="w-72 h-82" src={imageUrl} alt="Verification Document" />
              </div>
            </div>

            <section className="bg-white w-[45rem] p-4 flex justify-between items-center">
              <div className="flex gap-4">
                <CustomCheckbox
                  isSelected={hasConsented}
                  onChange={setHasConsented}
                />
                <p className="text-xs font-plus_jakarta_sans text-text-dark w-72">
                  As manager 1, I consent that I have thoroughly reviewed the
                  uploaded verification document.
                </p>
              </div>
              <div className="flex gap-3 w-72 py-2">
                <Button
                  onPress={() => handleAction("declined")}
                  className="bg-white border flex justify-center gap-2 border-neutral-300 text-primary-100 h-12 w-full"
                  isDisabled={isSubmitting}
                >
                  <IoMdClose className="mt-[0.15rem]" />
                  <p>Decline</p>
                </Button>
                <Button
                  onPress={() => handleAction("accepted")}
                  className="h-12 w-full flex justify-center gap-2"
                  isDisabled={isSubmitting}
                >
                  <IoMdCheckmark className="mt-[0.15rem]" />
                  <p>Accept</p>
                </Button>
              </div>
            </section>
          </section>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}