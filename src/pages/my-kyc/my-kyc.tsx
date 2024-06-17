import { useNavigate, useSearchParams } from "react-router-dom";

import { ChainId, sdkConfig } from "@galactica-net/snap-api";
import { useLocalStorage } from "usehooks-ts";
import { useChainId } from "wagmi";

import { ChooseKycProviderCard, KycCard, KycNotFoundCard } from "entities/kyc";
import { GenerationSbtCard } from "entities/sbt";
import { GenerateSbtButton } from "features/generate-sbt";
import { UpdateKycListAlert } from "features/update-kyc-list";
import { UploadKycCard } from "features/upload-kyc";
import { useSBTsQuery } from "shared/api/use-sbts-query";
import { LS_KEYS } from "shared/config/const";
import { default as CheckIcon } from "shared/icons/check.svg?react";
import { useZkCerts } from "shared/snap";

export const MyKYC = () => {
  const chainId = useChainId();
  const contracts = sdkConfig.contracts[chainId as unknown as ChainId];
  const [_, setShouldCallConfetti] = useLocalStorage(
    LS_KEYS.shouldCallConfetti,
    false
  );
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const showWideUploading = searchParams.get("showWideUploading");
  const [zkCerts] = useZkCerts();

  const query = useSBTsQuery();

  const hasBasicProof = Boolean(query.data);

  if (showWideUploading) {
    return (
      <UploadKycCard
        btnClassName="w-[256px]"
        className="mb-16 grow border-2"
        onSuccessUpload={() => {
          navigate("/", { replace: true });
          searchParams.set("showWideUploading", "");
        }}
        theme="primary"
        title={
          <p className="w-80 text-center text-3xl font-light">
            Drag&Drop your zkKYC secret file here
          </p>
        }
      />
    );
  }

  return (
    <>
      <UpdateKycListAlert className="mb-10" />

      <div className="grid grid-cols-3 gap-8">
        <UploadKycCard />
        {zkCerts?.length === 0 && <ChooseKycProviderCard />}

        {zkCerts?.length > 0 ? (
          zkCerts?.map((cert, i) => {
            return (
              <KycCard
                expiration={cert.expirationDate}
                key={`${cert.expirationDate}-${i}`}
                level={cert.verificationLevel}
                type="example"
              />
            );
          })
        ) : (
          <KycNotFoundCard />
        )}

        {query.isSuccess && zkCerts.length !== 0 && !hasBasicProof && (
          <GenerationSbtCard
            desc="To use your KYC it is necessary to generate a zkProof (stored as an SBT) demonstrating its existence and disclosing the following data:"
            title={
              <div className="whitespace-nowrap text-[26px] font-light">
                KYC{" "}
                <span className="whitespace-nowrap text-scarlet">
                  Not Published
                </span>
              </div>
            }
          >
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
                setShouldCallConfetti(true);
                navigate("/my-sbt");
              }}
            />
          </GenerationSbtCard>
        )}
      </div>
    </>
  );
};
