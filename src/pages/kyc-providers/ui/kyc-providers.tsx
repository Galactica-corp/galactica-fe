import classNames from "classnames";
import binanceLogoPng from "./binance-logo.png";
import { Score } from "./score";

const mocks = [
  {
    number: 1,
    title: "Binance",
    score: "9.9",
    totalDocs: "32,468",
    docsPerMonth: "4,324",
    avgTime: "~11 min",
  },
  {
    number: 2,
    title: "Binance",
    score: "9.9",
    totalDocs: "32,468",
    docsPerMonth: "4,324",
    avgTime: "~11 min",
  },
];

const Row = ({
  className,
  ...mock
}: (typeof mocks)[number] & { className?: string }) => {
  return (
    <div
      className={classNames(
        className,
        "grid grid-cols-[20px,2fr,2fr,100px,100px,100px,150px] items-center py-8 pl-5"
      )}
    >
      <div className="text-mineShaft">{mock.number}</div>
      <div className="inline-flex items-center gap-x-[10px] font-medium text-mineShaft">
        <img className="h-[26px] w-[26px]" src={binanceLogoPng} />
        {mock.title}
      </div>
      <Score className="justify-self-start" value={9.9} />
      <div>{mock.totalDocs}</div>
      <div>{mock.docsPerMonth}</div>
      <div>{mock.avgTime}</div>
      <button
        className="w-[9.1875rem] py-[0.5313rem]"
        onClick={() => {
          console.log("Hello");
        }}
      >
        Start KYC
      </button>
    </div>
  );
};

export const KYCProvidersPage = () => {
  return (
    <>
      {mocks.map((mock) => {
        return (
          <Row
            className="border-b border-mineShaft border-opacity-5"
            key={mock.number}
            {...mock}
          />
        );
      })}
    </>
  );
};
