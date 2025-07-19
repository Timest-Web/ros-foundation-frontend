import React from "react";
import ChildrenDashboardLayout from "../layout";
import { DashboardHeader } from "@/views/beneficiary/layout";
import { DashboardCard } from "@/components/cards/dashboard_card";
import avatar from "../../../../public/images/another_placeholder.jpg";
import Image from "next/image";
import AttachIcon from "@/components/icons/AttachIcon";

export default function ChildrenHomeView() {
  return (
    <ChildrenDashboardLayout>
      <DashboardHeader
        mainHeader="Welcome to your Portal"
        subHeader="Upload school fees receipts or Payment Invoice"
      />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 mt-8">
        <section className="flex flex-col gap-6 lg:gap-4">
          <DashboardCard
            headingText="Make an Upload"
            content="Upload your school fee receipts or payment invoice"
            buttonText="Get started"
            pageLink="/children/make-upload"
            buttonDisplay={true}
          />
          <DashboardCard
            headingText="My Profile"
            content={
              <div>
                <div className="flex gap-4">
                  <Image
                    className="w-12 h-12 rounded-full"
                    src={avatar}
                    alt=""
                  />
                  <section className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-righteous text-text-dark">
                        Urel Dave
                      </h3>
                      <p className="font-plus_jakarta_sans text-text-dark text-xs">
                        20 yrs
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-righteous text-text-dark">
                        Nationality
                      </h3>
                      <p className="font-plus_jakarta_sans text-text-dark text-xs">
                        Nigerian
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-righteous text-text-dark">School</h3>
                      <p className="font-plus_jakarta_sans text-text-dark text-xs">
                        University of Lagos
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            }
            buttonText="View Profile"
            pageLink="/onboarding/what-next"
            buttonDisplay={true}
          />
        </section>
        <DashboardCard
         className="lg:w-76"
          headingText="My Uploads"
          content={
            <div>
              <p className="font-plus_jakarta_sans text-xs text-text-dark">
                All Past and present upload Summary
              </p>
              <div className="flex justify-between mt-4">
                <div className="flex gap-2">
                  <AttachIcon />
                  <p className="text-primary-100 text-xs font-bold font-plus_jakarta_sans">
                    yct..1 semester.pdf
                  </p>
                </div>
                <p className="font-plus_jakarta_sans text-xs text-text-dark">
                  Now
                </p>
              </div>
            </div>
          }
          buttonText="Get started"
          pageLink="/onboarding/what-next"
          buttonDisplay={true}
        />
      </div>
    </ChildrenDashboardLayout>
  );
}
