import classNames from "classnames";
import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { CONTRACTS_ADDRESSES, useSbtsQuery, useZkCerts } from "shared/snap";
import { SkeletonCard } from "shared/ui/card";

const DAPP_NAME = {
  [CONTRACTS_ADDRESSES.BASIC_KYC_EXAMPLE_DAPP]: "zkKYC Proof",
  [CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST]: "zkKYC Proof (Repeatable)",
};

export const MySbt = () => {
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

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className={classNames("grid grid-cols-3 gap-[1rem] pb-8")}>
        {zkCerts?.length === 0 && <ChooseKycProviderCard />}
        {query.isSuccess && !hasBasicProof && zkCerts?.length !== 0 && (
          <GenerationSbtCard>
            <GenerateSbtButton className="mt-auto" />
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
