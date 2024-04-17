import { useToggle } from "usehooks-ts";

import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";

import { Row } from "./row";
import { TableHeader } from "./table-header";

const mocks = [
  {
    number: 1,
    title: "Test KYC Guardian 1",
    score: "9.9",
    totalDocs: "122,933",
    avgTime: "~6 mins",
  },
];

export const KYCGuardiansPage = () => {
  const [
    isGenerateCommitmentHashModalOpen,
    toggleGenerateCommitmentHashModalOpen,
  ] = useToggle(false);

  return (
    <>
      <TableHeader />
      {mocks.map((mock) => {
        return (
          <Row
            className="border-t border-mineShaft/50 last:border-b "
            key={mock.number}
            onStart={toggleGenerateCommitmentHashModalOpen}
            {...mock}
          />
        );
      })}

      {isGenerateCommitmentHashModalOpen && (
        <GenerateCommitmentHashModal
          onClose={toggleGenerateCommitmentHashModalOpen}
        />
      )}
    </>
  );
};
