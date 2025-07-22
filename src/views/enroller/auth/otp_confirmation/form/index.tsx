'use client'
import { Button } from "@/components/button";
import OTPTimer from "@/components/extras/otp_timer";
import { OTPInput } from "@/components/form/otp";
import { useForm } from "react-hook-form";


interface OTPFormValues {
    otpCode: string;
}
export default function EnrollerOTPForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otpCode: "",
    },
  });

const onSubmit = (data: OTPFormValues) => {
    console.log("OTP:", data.otpCode);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OTPInput
        name="otpCode"
        control={control}
        length={6}
      />
      <Button className="mt-8" type="submit">Confirm OTP Code</Button>
      <div className="px-4"><OTPTimer/></div>
    </form>
  );
}