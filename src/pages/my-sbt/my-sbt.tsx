import { useEffect } from "react";
import classNames from "classnames";
import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import JSConfetti from "js-confetti";
import { useLocalStorage } from "usehooks-ts";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { LS_KEYS } from "shared/config/const";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { CONTRACTS_ADDRESSES, useSbtsQuery, useZkCerts } from "shared/snap";
import { SkeletonCard } from "shared/ui/card";

const jsConfetti = new JSConfetti();

const DAPP_NAME = {
  [CONTRACTS_ADDRESSES.BASIC_KYC_EXAMPLE_DAPP]: "KYC SBT",
  [CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST]: "KYC SBT (Repeatable)",
};

export const MySbt = () => {
  const [shouldCallConfetti, setShouldCallConfetti] = useLocalStorage(
    LS_KEYS.shouldCallConfetti,
    false
  );
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) =>
      sbts.filter(
        (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.BASIC_KYC_EXAMPLE_DAPP
      ),
  });

  const hasBasicProof = query.data?.some(
    (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.BASIC_KYC_EXAMPLE_DAPP
  );

  useEffect(() => {
    if (!shouldCallConfetti && query.data?.length === 1) return;
    jsConfetti.addConfetti();
    setShouldCallConfetti(false);
  }, [setShouldCallConfetti, shouldCallConfetti, query.data?.length]);

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className={classNames("grid grid-cols-3 gap-[1rem] pb-8")}>
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
                title={DAPP_NAME[sbt.dApp] ?? "Unknown Proof"}
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
