import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { ReactComponent as MetamaskOutlineIcon } from "shared/icons/metamask-outline.svg";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";

export function ModalStartKYCProcedure() {
  return (
    <Modal className="flex flex-col items-center">
      <MetamaskOutlineIcon className="m-auto mb-[2rem] mt-[4rem]" />
      <div className="mb-[1rem] px-[4.5rem] font-antiqueLegacy text-[2rem] font-extralight leading-[120%] tracking-[-0.05em]">
        To start the KYC procedure, you need <br /> to generate Commitment Hash
      </div>
      <p className="mb-[1.875rem] text-[1.25rem] font-light text-mineShaft/40">
        The provider will not know your wallet address
      </p>
      <Button className="mb-[1.2rem] h-[2.56rem] w-[18.125rem] justify-between">
        Generate & start KYC
        <MetamaskIcon className="relative top-[-0.15rem]" />
      </Button>
      <a
        className="link"
        href="https://google.com"
        target="_blank"
        rel="noreferrer"
      >
        Learn More about KYC{" "}
        <InfoOrangeIcon className="relative ml-[0.31rem]" />
      </a>
    </Modal>
  );
}
