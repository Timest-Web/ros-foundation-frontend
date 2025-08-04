"use client";

import React, { useState } from "react";
import { CustomTabs } from "@/components/tabs";
import { FormHeading } from "@/views/layout";
import AccountManagerDashboardLayout from "@/views/account_manager/layout";
import ParentEditForm from "./forms/parent";
import FirstChildEditForm from "./forms/first_child";
import SecondChildEditForm from "./forms/second_child";
import { Dialog, DialogTrigger, Modal } from "react-aria-components";
import { Button } from "@/components/button";
import DocIcon from "@/components/icons/DocIcon";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import sampleNIN from "../../../../../../public/images/sample_nin.jpg";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

export default function AccountManagerDocumentDetailsView() {
  //   const toggleEdit = () => setIsEditing((prev) => !prev);
  const [isZoomed, setIsZoomed] = useState(false);
  const toggleZoom = () => setIsZoomed((prev) => !prev);

  const tabData = [
    {
      id: "first_user",
      label: "Boma Dave",
      content: <ParentEditForm />,
    },
    {
      id: "second_user",
      label: "Urel Dave",
      content: <FirstChildEditForm />,
    },
    {
      id: "thrid_user",
      label: "Augustine Dave",
      content: <SecondChildEditForm />,
    },
  ];
  return (
    <AccountManagerDashboardLayout>
      <div className="flex justify-between">
        <FormHeading
          headerText="Boma Dave"
          subHeading="Beneficiary Account Details"
          isBackButton={true}
        />
        {/* <Button onPress={toggleEdit} className="w-44 h-12 mt-12">
          {isEditing ? (
            "Update & Save"
          ) : (
            <div className="flex gap-3">
              <EditIcon className="text-white" />
              <p>Edit User Details</p>
            </div>
          )}
        </Button> */}
      </div>

      <CustomTabs ariaLabel="Users tab" tabs={tabData} />
      <DialogTrigger>
        <Button>Open dialog</Button>
        <Modal className={"fixed inset-0 z-50 bg-black"} isDismissable>
          <Dialog>
            <div className="flex justify-between p-12">
              <section className="flex gap-2">
                <DocIcon className="text-white" />
                <p>Verification Panel</p>
              </section>
              <Button
                slot={"close"}
                className="w-40 bg-opacity-0 border border-neutral-300 flex gap-3 p-2 justify-center items-center"
              >
                <IoArrowBack />
                <p>Exit Panel</p>
              </Button>
            </div>
            <section className="flex justify-center items-center">
              <div className="bg-white w-[45rem] h-[30rem] p-4">
                <section className="flex justify-between">
                  <p className="text-primary-100 text-sm font-plus_jakarta_sans font-semibold">
                    Boma_dave.pdf
                  </p>
                  <p className="text-primary-100 text-sm font-plus_jakarta_sans font-semibold">
                    NIN
                  </p>
                </section>
                <hr className="p-[0.01rem] mt-4 bg-neutral-300"></hr>
                <button
                  onClick={toggleZoom}
                  className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white bg-black bg-opacity-70 p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  {isZoomed ? <FiZoomOut size={16} /> : <FiZoomIn size={16} />}
                </button>
                <div
                  className={`flex gap-2 justify-center ${
                    isZoomed ? "scale-180" : "scale-100"
                  }`}
                >
                  <Image src={sampleNIN} alt="sample_doc" />
                  <Image src={sampleNIN} alt="sample_doc" />
                </div>
              </div>
            </section>
          </Dialog>
        </Modal>
      </DialogTrigger>
    </AccountManagerDashboardLayout>
  );
}
