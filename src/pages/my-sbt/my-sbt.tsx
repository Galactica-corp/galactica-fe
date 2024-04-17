import { useEffect } from "react";

import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import JSConfetti from "js-confetti";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";
import { useChainId } from "wagmi";

import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { LS_KEYS } from "shared/config/const";
import { default as CheckIcon } from "shared/icons/check.svg?react";
import { useSbtsQuery, useZkCerts } from "shared/snap";
import { SkeletonCard } from "shared/ui/card";

const jsConfetti = new JSConfetti();

export const MySbt = () => {
  const chainId = useChainId();
  const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
  const dappName = {
    [contracts.exampleDapp]: "KYC SBT",
    [contracts.repeatableZkpTest]: "KYC SBT (Repeatable)",
  };
  const [shouldCallConfetti, setShouldCallConfetti] = useLocalStorage(
    LS_KEYS.shouldCallConfetti,
    false
  );
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) =>
      sbts.filter((sbt) => {
        return import.meta.env.VITE_ACTIVE_KYC === "repeatable"
          ? sbt.dApp === contracts.repeatableZkpTest
          : sbt.dApp === contracts.exampleDapp;
      }),
  });

  const hasBasicProof = query.data?.some((sbt) => Boolean(sbt));

  useEffect(() => {
    if (!shouldCallConfetti || query.data?.length !== 1) return;
    jsConfetti.addConfetti();
    setShouldCallConfetti(false);
  }, [setShouldCallConfetti, shouldCallConfetti, query.data?.length]);

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className={twMerge("grid grid-cols-3 gap-4 pb-8")}>
        {zkCerts?.length === 0 && <ChooseKycProviderCard />}
        {query.isSuccess && !hasBasicProof && zkCerts?.length !== 0 && (
          <GenerationSbtCard>
            <div className="mb-6 mt-2.5 flex items-center justify-between">
              <div className="flex items-center text-sm text-mineShaft/50">
                KYC Guardian <CheckIcon className="ml-1 w-4" />
              </div>
              <div className="flex items-center text-sm text-mineShaft/50">
                KYC Level <CheckIcon className="ml-1 w-4" />
              </div>
              <div className="flex items-center text-sm text-mineShaft/50">
                Expiration Date <CheckIcon className="ml-1 w-4" />
              </div>
            </div>
            <GenerateSbtButton
              className="mt-auto"
              onSuccess={async () => {
                jsConfetti.addConfetti();
              }}
            />
          </GenerationSbtCard>
        )}
        {query.isLoading && query.isInitialLoading && <SkeletonCard />}
        {query.isSuccess &&
          query.data.map((sbt, idx) => {
            return (
              <SbtCard
                expiration={Date.now() + sbt.expirationTime}
                key={idx}
                level={1}
                provider="Example"
                title={dappName[sbt.dApp] ?? "Unknown Proof"}
              />
            );
          })}

        <LearnSbtCard />
      </div>
    </>
  );
};
