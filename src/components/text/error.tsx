import { FieldError, FieldErrorProps } from "react-aria-components";

interface CustomErrorProps extends Omit<FieldErrorProps, "children" | "style"> {
  message?: string;
}

export default function Error(props: FieldErrorProps) {
  return (
    <FieldError
      {...props}
      className="font-14 mt-[0.5rem] inline-block text-error-500"
    />
  );
}

export function CustomError({ message, ...rest }: CustomErrorProps) {
  return message ? (
    <div {...rest} className="font-14 mt-[0.5rem] inline-block text-error-500">
      {message}
    </div>
  ) : (
    <></>
  );
}
