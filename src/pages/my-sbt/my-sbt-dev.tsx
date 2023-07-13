import classNames from "classnames";
import { ChooseKycProviderCard } from "entities/kyc";
import { GenerateSbtCard } from "features/generate-sbt";
import { CONTRACTS_ADDRESSES, useSbtsQuery, useZkCerts } from "shared/snap";
import { LearnSbtCard } from "./ui/learn-sbt-card";
import { SbtCard } from "./ui/sbt-card";

export const MySbtDev = () => {
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) => sbts,
  });

  return (
    <div className={classNames("grid grid-cols-3 gap-[1rem] pb-8")}>
      {zkCerts?.length === 0 && <ChooseKycProviderCard />}
      {zkCerts?.length > 0 && <GenerateSbtCard />}
      {query.data?.map((sbt, idx) => {
        return (
          <SbtCard
            title={
              sbt.dApp === CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST
                ? "zkKYC Proof"
                : "zkKYC Proof (Age > 18)"
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
