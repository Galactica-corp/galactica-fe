import classNames from "classnames";
import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { CONTRACTS_ADDRESSES, useSbtsQuery, useZkCerts } from "shared/snap";

export const MySbtDev = () => {
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) => sbts,
  });

  return (
    <div className={classNames("grid grid-cols-3 gap-[1rem] pb-8")}>
      {zkCerts?.length === 0 && <ChooseKycProviderCard />}
      {zkCerts?.length > 0 && (
        <GenerationSbtCard>
          <GenerateSbtButton className="mt-auto" />
        </GenerationSbtCard>
      )}
      {query.data?.map((sbt, idx) => {
        return (
          <SbtCard
            title={
              sbt.dApp === CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST
                ? "KYC SBT"
                : "KYC SBT (Age > 18)"
            }
            key={idx}
            provider="Example"
            expiration={Date.now() + sbt.expirationTime}
            level={1}
          />
        );
      })}

      <LearnSbtCard />
    </div>
  );
};
