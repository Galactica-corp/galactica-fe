import { useEffect } from "react";

import JSConfetti from "js-confetti";
import { twMerge } from "tailwind-merge";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { useAccount, useBlockNumber } from "wagmi";

import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { LS_KEYS } from "shared/config/const";
import { default as CheckIcon } from "shared/icons/check.svg?react";
import { useZkCerts } from "shared/snap";
import { SNAP_LS_KEYS } from "shared/snap/const";
import { SkeletonCard } from "shared/ui/card";
import { useSBTsQuery } from "shared/api/use-sbts-query";

const jsConfetti = new JSConfetti();

export const MySbt = () => {
  const sbtInfoQuery = useSBTsQuery();

  const { address, chainId } = useAccount();

  const [shouldCallConfetti, setShouldCallConfetti] = useLocalStorage(
    LS_KEYS.shouldCallConfetti,
    false
  );

  const latestBlockChecked = useReadLocalStorage<string>(
    SNAP_LS_KEYS.latestBlockChecked(address)
  );

  const blockNumberQuery = useBlockNumber({ chainId });
  const [zkCerts] = useZkCerts();

  const hasBasicProof = sbtInfoQuery.data;

  useEffect(() => {
    if (!shouldCallConfetti || sbtInfoQuery.data) return;
    jsConfetti.addConfetti();
    setShouldCallConfetti(false);
  }, [setShouldCallConfetti, shouldCallConfetti, sbtInfoQuery.data]);

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className={twMerge("grid grid-cols-3 gap-4 pb-8")}>
        {zkCerts?.length === 0 && <ChooseKycProviderCard />}
        {sbtInfoQuery.isSuccess && !hasBasicProof && zkCerts?.length !== 0 && (
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
        {sbtInfoQuery.isPending && zkCerts && (
          <SkeletonCard
            title={`${
              latestBlockChecked || 0
            } from ${blockNumberQuery.data?.toString()}`}
          />
        )}
        {sbtInfoQuery.data && (
          <SbtCard
            level={1}
            description={sbtInfoQuery.data.description}
            expiration={sbtInfoQuery.data.expirationTime}
            provider="Example"
            title={"KYC SBT"}
          />
        )}

        <LearnSbtCard />
      </div>
    </>
  );
};
