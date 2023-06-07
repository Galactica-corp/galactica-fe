import classNames from "classnames";
import { useToggle } from "usehooks-ts";
import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";
import { SetupHoldingKeyModal } from "features/setup-holding-key";
import { ClassName } from "shared/types";
import binanceLogoPng from "./binance-logo.png";
import { Score } from "./score";

const mocks = [
  {
    number: 1,
    title: "Default",
    score: "9.9",
    totalDocs: "32,468",
    docsPerMonth: "4,324",
    avgTime: "~11 min",
  },
];

type RowProps = {
  number: number;
  title: string;
  score: string;
  totalDocs: string;
  docsPerMonth: string;
  avgTime: string;
  onStart: () => void;
};

const Row = ({ className, onStart, ...mock }: RowProps & ClassName) => {
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
        className="flex w-[147px] items-center justify-center rounded-md border border-grayNickel py-2 transition-colors hover:border-naturalGray"
        onClick={onStart}
      >
        Start KYC
      </button>
    </div>
  );
};

export const KYCProvidersPage = () => {
  const [isSetupHoldingKeyModalOpen, toggleSetupHoldingKeyModalOpen] =
    useToggle(false);
  const [
    isGenerateCommitmentHashModalOpen,
    toggleGenerateCommitmentHashModalOpen,
  ] = useToggle(false);

  return (
    <>
      {mocks.map((mock) => {
        return (
          <Row
            className="border-b border-mineShaft border-opacity-5"
            key={mock.number}
            onStart={() => {
              toggleSetupHoldingKeyModalOpen();
            }}
            {...mock}
          />
        );
      })}

      {isSetupHoldingKeyModalOpen && (
        <SetupHoldingKeyModal
          onClose={toggleSetupHoldingKeyModalOpen}
          onSuccess={() => {
            toggleSetupHoldingKeyModalOpen();
            toggleGenerateCommitmentHashModalOpen();
          }}
        />
      )}

      {isGenerateCommitmentHashModalOpen && (
        <GenerateCommitmentHashModal
          onClose={toggleGenerateCommitmentHashModalOpen}
          onSuccess={() => {
            toggleGenerateCommitmentHashModalOpen();
          }}
        />
      )}
    </>
  );
};
