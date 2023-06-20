import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { Button } from "shared/ui/button";

export function ChooseKycProviderCard() {
  const handler = () => {
    alert("TODO: Choose KYC provider");
  };

  return (
    <div
      className={`
        card
        flex-col justify-between bg-cover bg-center bg-no-repeat shadow-cardRed
      `}
      // style={{ backgroundImage: `url(${ChooseKycProviderCardBgUrl})` }}
    >
      <div>
        <div className="text-[1.75rem] font-light">
          Your Don&apos;t have a KYC
        </div>
        <div className="mt-[0.8rem] text-[0.875rem] text-mineShaft/50">
          To access most dApps on Galactica and access all the community
          features of the network, every Soul needs KYC.
        </div>
        <div className="mt-[0.5rem] flex items-center justify-between">
          <div className="flex items-center text-[0.875rem] text-mineShaft/50">
            KYC issuer <CheckIcon className="ml-[0.5rem] w-[1rem]" />
          </div>
          <div className="flex items-center text-[0.875rem] text-mineShaft/50">
            KYC-level <CheckIcon className="ml-[0.5rem] w-[1rem]" />
          </div>
          <div className="flex items-center text-[0.875rem] text-mineShaft/50">
            Expiration date <CheckIcon className="ml-[0.5rem] w-[1rem]" />
          </div>
        </div>
      </div>
      <Button onClick={handler} className="w-full">
        Choose KYC provider
      </Button>
    </div>
  );
}
