import { LabelProps, Label as RACLabel } from "react-aria-components";

export default function Label(props: LabelProps) {
  return (
    <RACLabel
      className="mb-[0.75rem] inline-block text-neutral-primary"
      {...props}
    />
  );
}
