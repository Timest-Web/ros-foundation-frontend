import React from "react";
import OnboardingLayout from "./layout";
import { Button } from "@/components/button";

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
        <section className="mt-6 grid gap-4 grid-cols-2 pr-32">
          <OnboardingCard
            headingText="What is Next?"
            content="Complete setup for your Beneficiary Account"
            buttonText="Get started"
          />
          <OnboardingCard
            headingText="What is Next?"
            content="Complete setup for your Beneficiary Account"
            buttonText="Get started"
          />
          <OnboardingCard
            headingText="What is Next?"
            content="Complete setup for your Beneficiary Account"
            buttonText="Get started"
          />
          <OnboardingCard
            headingText="What is Next?"
            content="Complete setup for your Beneficiary Account"
            buttonText="Get started"
          />
        </section>
      </div>
    </OnboardingLayout>
  );
}

interface OnboardingCardProps {
  headingText: string;
  content: string;
  buttonText: string;
}

function OnboardingCard(props: OnboardingCardProps) {
  return (
    <div className="border border-neutral-300 p-4 space-y-6 rounded-md">
      <div className="space-y-2">
        <h3 className="font-righteous text-text-dark">{props.headingText}</h3>
        <p className="font-plus_jakarta_sans text-text-dark text-xs">
          {props.content}
        </p>
      </div>
      <Button className="py-2">{props.buttonText}</Button>
    </div>
  );
}
