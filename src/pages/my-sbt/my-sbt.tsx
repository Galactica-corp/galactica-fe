import { ChooseKycProviderCard } from "entities/kyc";
import { useLocalStorage } from "usehooks-ts";
import { GenerateSbtCard } from "features/generate-sbt";
import { CONTRACTS_ADDRESSES, LS_KEYS } from "shared/config/const";
import { useAllSbtsByUserQuery } from "shared/snap";
import { ZkCertsListItem } from "shared/snap/types";
import { LearnSbtCard } from "./ui/learn-sbt-card";
import { RepeatableSbtCard } from "./ui/repeatable-sbt-card";
import { SbtCard } from "./ui/sbt-card";

export const MySBT = () => {
  const [zkCerts] = useLocalStorage<ZkCertsListItem[] | undefined>(
    LS_KEYS.zkCerts,
    []
  );

  const query = useAllSbtsByUserQuery(
    {
      sbtSCAddress: CONTRACTS_ADDRESSES.VERIFICATION_SBT,
    },
    {
      select: ({ sbts }) => sbts,
      enabled: false,
    }
  );

  const hasAgeProof = query.data?.some(
    (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.EXAMPLE_DAPP
  );

  return (
    <div className="grid grid-cols-3 gap-[1rem] pb-8">
      {zkCerts?.length === 0 && <ChooseKycProviderCard />}
      {!hasAgeProof && zkCerts?.length !== 0 && <GenerateSbtCard />}
      <LearnSbtCard />
      {/* <RepeatableSbtCard /> */}
      {query.data?.map((sbt, idx) => {
        return (
          <SbtCard
            title={
              sbt.dApp === CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST
                ? "KYC Proof (Repeatable)"
                : "KYC Proof (Age > 18)"
            }
            key={idx}
            provider="Example"
            expiration={Date.now() + sbt.expirationTime}
            level={1}
          />
        );
      })}
    </div>
  );
};
