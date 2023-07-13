import { useToggle } from "usehooks-ts";
import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";
import { Row } from "./row";

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
      {mocks.map((mock) => {
        return (
          <Row
            className="border-b border-mineShaft border-opacity-5"
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
