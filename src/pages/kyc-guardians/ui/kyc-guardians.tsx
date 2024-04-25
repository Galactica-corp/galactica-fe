import { useState } from "react";

import {
  GenerateCommitmentHashModal,
  Guardian,
} from "features/generate-commitment-hash";

import { Row } from "./row";
import { TableHeader } from "./table-header";

const mocks: Guardian[] = [
  {
    number: 1,
    title: "Swissborg KYC Guardian",
    score: "9.9",
    totalDocs: "63,482",
    avgTime: "~5 mins",
    link: "https://stage-swissborg.galactica.com",
  },
  {
    number: 2,
    title: "Test KYC Guardian 1",
    score: "9.9",
    totalDocs: "122,933",
    avgTime: "~6 mins",
    link: import.meta.env.VITE_EXAMPLE_KYC_PROVIDER_ORIGIN,
  },
];

export const KYCGuardiansPage = () => {
  const [guardian, setGuardian] = useState<Guardian>();

  console.log(guardian);

  return (
    <>
      <TableHeader />
      {mocks.map((mock) => {
        return (
          <Row
            className="border-t border-mineShaft/5 last:border-b "
            key={mock.number}
            onStart={() => {
              setGuardian(mock);
            }}
            {...mock}
          />
        );
      })}

      {guardian && (
        <GenerateCommitmentHashModal
          guardian={guardian}
          onClose={() => {
            setGuardian(undefined);
          }}
        />
      )}
    </>
  );
};
