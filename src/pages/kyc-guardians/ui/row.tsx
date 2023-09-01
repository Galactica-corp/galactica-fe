import { twMerge } from "tailwind-merge";
import { ClassName } from "shared/types";
import { Score } from "./score";

type RowProps = {
  number: number;
  title: string;
  score: string;
  totalDocs: string;
  avgTime: string;
  onStart: () => void;
};

export const Row = ({ className, onStart, ...mock }: RowProps & ClassName) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-[1fr,3fr,2fr,2fr,2fr,2fr] items-center py-8 pl-5",
        className
      )}
    >
      <div className="text-mineShaft">{mock.number}</div>
      <div className="inline-flex items-center gap-x-[10px] justify-self-start font-medium text-mineShaft">
        {/* <img className="h-[26px] w-[26px]" src={binanceLogoPng} /> */}
        {mock.title}
      </div>
      <Score className="justify-self-center" value={9.9} />
      <div className="justify-self-center">{mock.totalDocs}</div>
      <div className="justify-self-center">{mock.avgTime}</div>
      <button
        className="buttonPrimary flex w-[147px] items-center justify-center justify-self-end rounded-md py-2 text-white transition-colors"
        onClick={onStart}
      >
        Start KYC
      </button>
    </div>
  );
};
