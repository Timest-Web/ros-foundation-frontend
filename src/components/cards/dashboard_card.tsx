"use client";

import { Button } from "@/components/button";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import EditIcon from "@/components/icons/EditIcon";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  headingText?: string;
  requirementText?: string;
  content: React.ReactNode;
  buttonText?: string;
  pageLink: string;
  buttonDisplay?: boolean;
  className?:string;
}

export function DashboardCard(props: DashboardCardProps) {
  const router = useRouter();
  return (
    <div className={`${props.className} border border-neutral-300 p-4 rounded-md flex flex-col justify-between min-h-[5rem]`}>
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
      {props.buttonDisplay && (
        <Button
          onPress={() => router.push(props.pageLink)}
          className="py-2 mt-4 text-xs"
        >
          {props.buttonText}
        </Button>
      )}
    </div>
  );
}

interface OnboardingCompletedCardProps {
  headingText: string;
  content: React.ReactNode;
  buttonText: string;
  pageLink: string;
  profilePicture?: StaticImageData;
}

export function OnboardingCompletedCard(props: OnboardingCompletedCardProps) {
  return (
    <div className="border border-neutral-300 p-4 rounded-md flex flex-col justify-between min-h-[5rem]">
      <div className="flex flex-col gap-4 grow">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {props.profilePicture && (
              <Image src={props.profilePicture} alt="profilePicture" />
            )}
            <h3 className="font-righteous text-text-dark">
              {props.headingText}
            </h3>
          </div>
          <CheckMarkIcon />
        </div>
        <div className="font-plus_jakarta_sans text-text-dark text-xs">
          {props.content}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <Button className="py-2">View</Button>
        <Button className="flex justify-center gap-2 py-2 border border-neutral-300 bg-white text-text-dark ">
          <div className="pt-1">
            <EditIcon />
          </div>
          Edit
        </Button>
      </div>
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
          className="w-4 h-4 rounded-full"
          src={props.beneficiaryImage}
          alt="beneficiary"
        />
      </div>
      <div className="text-text-dark">
        <p className="font-righteous text-xs">{props.beneficiaryName}</p>
        <p className="font-plus_jakarta_sans text-[0.62rem]">
          {props.approvalDate}
        </p>
      </div>
    </div>
  );
}
