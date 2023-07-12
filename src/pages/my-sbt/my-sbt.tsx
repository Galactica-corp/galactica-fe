import classNames from "classnames";
import { ChooseKycProviderCard } from "entities/kyc";
import { useLocalStorage } from "usehooks-ts";
import { GenerateSbtCard } from "features/generate-sbt";
import { CONTRACTS_ADDRESSES, LS_KEYS } from "shared/config/const";
import { useAllSbtsByUserQuery } from "shared/snap";
import { ZkCertsListItem } from "shared/snap/types";
import { LearnSbtCard } from "./ui/learn-sbt-card";
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
    }
  );

  const hasBasicProof = query.data?.some(
    (sbt) => sbt.dApp === CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST
  );

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className={classNames("grid grid-cols-2 gap-[1rem] pb-8")}>
        {zkCerts?.length === 0 && <ChooseKycProviderCard />}
        {!hasBasicProof && zkCerts?.length !== 0 && <GenerateSbtCard />}
        {query.data?.slice(0, 1).map((sbt, idx) => {
          return (
            <SbtCard
              title={
                sbt.dApp === CONTRACTS_ADDRESSES.REPEATABLE_ZK_KYC_TEST
                  ? "KYC Proof"
                  : "KYC Proof (Age > 18)"
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
    </div>
  );
};
