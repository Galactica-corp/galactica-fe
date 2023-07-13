import cn from "classnames";

type Props = {
  value: number;
  className?: string;
};

export const Score = ({ value, className }: Props) => {
  return (
    <div
      className={cn(
        value >= 8 && "bg-burntSienna",
        value >= 5 && value < 8 && "bg-grayNickel",
        "inline-flex rounded-md px-[15px] py-[5px] text-white",
        className
      )}
    >
      {value}
    </div>
  );
};
