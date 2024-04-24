import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { twMerge } from "tailwind-merge";
import { useChainId } from "wagmi";

import { ChooseKycProviderCard } from "entities/kyc";
import { GenerationSbtCard, LearnSbtCard, SbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { useSbtsQuery, useZkCerts } from "shared/snap";

export const MySbtDev = () => {
  const chainId = useChainId();
  const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
  const [zkCerts] = useZkCerts();

  const query = useSbtsQuery({
    select: ({ sbts }) => sbts,
  });

  return (
    <div className={twMerge("grid grid-cols-3 gap-4 pb-8")}>
      {zkCerts?.length === 0 && <ChooseKycProviderCard />}
      {zkCerts?.length > 0 && (
        <GenerationSbtCard>
          <GenerateSbtButton className="mt-auto" />
        </GenerationSbtCard>
      )}
      {query.data?.map((sbt, idx) => {
        return (
          <SbtCard
            expiration={Date.now() + sbt.expirationTime}
            key={idx}
            level={1}
            provider="Example"
            title={
              sbt.dApp === contracts.repeatableZkpTest
                ? "KYC SBT"
                : "KYC SBT (Age > 18)"
            }
          />
        );
      })}

      <LearnSbtCard />
    </div>
  );
};
