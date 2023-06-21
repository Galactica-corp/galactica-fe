import { useToggle } from "usehooks-ts";
import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";
import { Row } from "./row";

const mocks = [
  {
    number: 1,
    title: "Example Kyc Provider",
    score: "9.9",
    totalDocs: "32,468",
    docsPerMonth: "4,324",
    avgTime: "~11 min",
  },
  {
    number: 2,
    title: "Example Kyc Provider 2",
    score: "9.9",
    totalDocs: "32,468",
    docsPerMonth: "4,324",
    avgTime: "~11 min",
  },
];

export const KYCProvidersPage = () => {
  const [
    isGenerateCommitmentHashModalOpen,
    toggleGenerateCommitmentHashModalOpen,
  ] = useToggle(false);

  return (
    <>
      {mocks.map((mock, idx) => {
        return (
          <Row
            className="border-b border-mineShaft border-opacity-5"
            key={mock.number}
            onStart={() => {
              if (idx === 1) {
                const url = new URL(
                  "/",
                  import.meta.env.VITE_EXAMPLE_KYC_PROVIDER_ORIGIN ??
                    "https://develop.sample-provider-devnet-41233.galactica.com"
                );
                window.open(url.toString(), "_blank");
                return;
              }
              toggleGenerateCommitmentHashModalOpen();
            }}
            {...mock}
          />
        );
      })}

      {isGenerateCommitmentHashModalOpen && (
        <GenerateCommitmentHashModal
          onClose={toggleGenerateCommitmentHashModalOpen}
          onSuccess={(data) => {
            toggleGenerateCommitmentHashModalOpen();
            const url = new URL(
              "/",
              import.meta.env.VITE_EXAMPLE_KYC_PROVIDER_ORIGIN ??
                "https://develop.sample-provider-devnet-41233.galactica.com"
            );
            url.searchParams.append("commitmentHash", data);

            window.open(url.toString(), "_blank");
          }}
        />
      )}
    </>
  );
};
