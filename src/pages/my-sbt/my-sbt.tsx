import { useEffect } from "react";
import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import JSConfetti from "js-confetti";
import { twMerge } from "tailwind-merge";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { useAccount, useBlockNumber } from "wagmi";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { LS_KEYS } from "shared/config/const";
import { useChain } from "shared/config/hooks";
import { default as CheckIcon } from "shared/icons/check.svg?react";
import { useSbtsQuery, useZkCerts } from "shared/snap";
import { SNAP_LS_KEYS } from "shared/snap/const";
import { SbtDetails } from "shared/snap/types";
import { SkeletonCard } from "shared/ui/card";

const jsConfetti = new JSConfetti();

export const MySbt = () => {
  const chain = useChain();
  const contracts = sdkConfig.contracts[chain.id as unknown as ChainId];
  const dappName = {
    [contracts.exampleDapp]: "KYC SBT",
    [contracts.repeatableZkpTest]: "KYC SBT (Repeatable)",
  };
  const [shouldCallConfetti, setShouldCallConfetti] = useLocalStorage(
    LS_KEYS.shouldCallConfetti,
    false
  );
  const { address } = useAccount();

  const latestBlockChecked = useReadLocalStorage<string>(
    SNAP_LS_KEYS.latestBlockChecked(address)
  );

  const blockNumberQuery = useBlockNumber({ chainId: chain.id });
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

  const sbtDetails = useReadLocalStorage<SbtDetails>(
    SNAP_LS_KEYS.sbtDetails(address)
  );

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className={twMerge("grid grid-cols-3 gap-[1rem] pb-8")}>
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
        {query.isLoading && query.isInitialLoading && (
          <SkeletonCard
            title={`${
              latestBlockChecked || 0
            } from ${blockNumberQuery.data?.toString()}`}
          />
        )}
        {sbtDetails?.sbts.map((sbt, idx) => {
          return (
            <SbtCard
              title={dappName[sbt.dApp as unknown as number] ?? "Unknown Proof"}
              key={idx}
              provider="Example"
              expiration={Date.now() + sbt.expirationTime}
              level={1}
            />
          );
        })}

        <LearnSbtCard />
      </div>
    </>
  );
};
