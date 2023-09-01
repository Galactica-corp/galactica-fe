import { twMerge } from "tailwind-merge";

type Props = {
  value: number;
  className?: string;
};

export const Score = ({ value, className }: Props) => {
  return (
    <div
      className={twMerge(
        "inline-flex rounded-md px-[15px] py-[5px] text-white",
        value >= 8 && "bg-burntSienna",
        value >= 5 && value < 8 && "bg-grayNickel",
        className
      )}
    >
      {value}
    </div>
  );
};
