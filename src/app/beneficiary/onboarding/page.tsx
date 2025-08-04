import { authOptions } from "@/lib/authOptions";
import OnboardingView from "@/views/beneficiary/onboarding";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "beneficiary") {
    redirect("/beneficiary/sign-in");
  }
  return <OnboardingView/>;
}
