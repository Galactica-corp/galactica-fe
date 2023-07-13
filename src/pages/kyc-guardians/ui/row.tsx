import classNames from "classnames";
import { ClassName } from "shared/types";
import { Score } from "./score";

type RowProps = {
  number: number;
  title: string;
  score: string;
  totalDocs: string;
  docsPerMonth: string;
  avgTime: string;
  onStart: () => void;
};

export const Row = ({ className, onStart, ...mock }: RowProps & ClassName) => {
  return (
    <div
      className={classNames(
        className,
        "grid grid-cols-[20px,2fr,2fr,100px,100px,100px,150px] items-center py-8 pl-5"
      )}
    >
      <div className="text-mineShaft">{mock.number}</div>
      <div className="inline-flex items-center gap-x-[10px] font-medium text-mineShaft">
        {/* <img className="h-[26px] w-[26px]" src={binanceLogoPng} /> */}
        {mock.title}
      </div>
      <Score className="justify-self-start" value={9.9} />
      <div>{mock.totalDocs}</div>
      <div>{mock.docsPerMonth}</div>
      <div>{mock.avgTime}</div>
      <button
        className="flex w-[147px] items-center justify-center rounded-md border border-grayNickel py-2 transition-colors hover:border-naturalGray"
        onClick={onStart}
      >
        Start KYC
      </button>
    </div>
  );
};
