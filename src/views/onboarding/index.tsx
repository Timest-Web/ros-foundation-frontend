import React from "react";
import OnboardingLayout from "./layout";
import beneficiary from "../../../public/images/placeholder_beneficiary.jpg";
import {
  BeneficiarySample,
  OnboardingCard,
} from "./cards";

export default function OnboardingView() {
  return (
    <OnboardingLayout>
      <div>
        <header className="font-righteous text-4xl text-black">
          We’re pleased to have you onboard
        </header>
        <p className="font-ar-one-sans text-black mt-3 lg:w-[52rem]">
          To get started quickly & to start benefiting from{" "}
          <span className="text-primary-100 font-medium">
            The Rose of Sharon Foundation
          </span>
          , Quickly Complete and get your account verified before you can then
          setup your children&apos;s account. We accept maximum of 2 kids
        </p>
        <section className="mt-6 grid gap-4 grid-cols-2 pr-64">
          <OnboardingCard
            headingText="What is Next?"
            content="Complete setup for your Beneficiary Account"
            buttonText="Get started"
            pageLink="/onboarding/what-next"
          />
          {/* <OnboardingCompletedCard
            headingText="Boma Dave"
            content="Your Account step has been completed, you can edit here"
            buttonText="Get started"
            pageLink="/onboarding/what-next"
          /> */}
          <OnboardingCard
            headingText="Second step"
            content={
              <p>
                Create your Kids Account,{" "}
                <span className="text-accent-100">Maximum of 2</span>
              </p>
            }
            buttonText="Continue"
            pageLink="/onboarding/second-step"
          />
          <OnboardingCard
            headingText="Third Step?"
            content={
              <div className="space-y-3">
                <p>
                  Upload Documents/ Identification Cards for yourself and
                  Children
                </p>
                <p>Upload Passport Photograph for yourself and Children</p>
                <p>
                  Upload Required Invoices, Receipts and Documents for your
                  Children
                </p>
              </div>
            }
            buttonText="Submit for Approval"
            pageLink="/onboarding"
          />
          <OnboardingCard
            headingText="Business Proposal"
            requirementText="Not Required"
            content={
              <div className="space-y-3">
                <p>
                  Let’s help you achieve your dreams to financial freedom by
                  starting that business today.
                </p>
                <p>
                  Upload a Business proposal for approval and Financing, note
                  that these is not required unless you have a business in mind
                </p>
              </div>
            }
            buttonText="Submit for Approval"
            pageLink="/onboarding"
          />
        </section>
        <section className="border border-neutral-300 rounded-md px-4 py-8 mt-6">
          <h3 className="font-righteous text-text-dark">
            Recent Payout Approvals
          </h3>
          <p className="font-plus_jakarta_sans text-text-dark text-xs mt-2 mb-4">
            Isn’t it Amazing!! these users just benefited from{" "}
            <span className="text-primary-100">
              The Rose of Sharon Foundation
            </span>
          </p>
          <hr className="bg-neutral-300 w-full"></hr>
          <section className="mt-6 grid grid-cols-5 gap-4">
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
            <BeneficiarySample
              beneficiaryImage={beneficiary}
              beneficiaryName="Boma John"
              approvalDate="Approved Jan 2025"
            />
          </section>
        </section>
      </div>
    </OnboardingLayout>
  );
}
