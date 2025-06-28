'use client'

import { Button } from "@/components/button";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface OnboardingCardProps {
  headingText: string;
  requirementText?: string;
  content: React.ReactNode;
  buttonText: string;
  pageLink: string;
}

export function OnboardingCard(props: OnboardingCardProps) {
  const router = useRouter();
  return (
    <div className="border border-neutral-300 p-4 rounded-md flex flex-col justify-between min-h-[5rem]">
      <div className="flex flex-col gap-4 grow">
        <div className="flex justify-between">
          <h3 className="font-righteous text-text-dark">{props.headingText}</h3>
          {props.requirementText && (
            <p className="font-plus_jakarta_sans text-xs text-primary-100">
              {props.requirementText}
            </p>
          )}
        </div>
        <div className="font-plus_jakarta_sans text-text-dark text-xs">
          {props.content}
        </div>
      </div>
      <Button onPress={() => router.push(props.pageLink)} className="py-2 mt-4">
        {props.buttonText}
      </Button>
    </div>
  );
}

interface BeneficiarySampleProps {
  beneficiaryName: string;
  beneficiaryImage: StaticImageData;
  approvalDate: string;
}

export function BeneficiarySample(props: BeneficiarySampleProps) {
  return (
    <div className="flex space-x-2">
      <div className="pt-[0.3rem]">
        <Image
          className="w-8 h-8 rounded-full"
          src={props.beneficiaryImage}
          alt="beneficiary"
        />
      </div>
      <div className="text-text-dark">
        <p className="font-righteous">{props.beneficiaryName}</p>
        <p className="font-plus_jakarta_sans text-xs">{props.approvalDate}</p>
      </div>
    </div>
  );
}
