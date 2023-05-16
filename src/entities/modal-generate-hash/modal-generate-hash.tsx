import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { Link } from "shared/ui/link";
import { Modal } from "shared/ui/modal";

export function ModalGenerateHash() {
  return (
    <Modal withSpinner>
      <div className="mb-[1rem] px-[4.5rem] font-antiqueLegacy text-[2rem] font-extralight leading-[120%] tracking-[-0.05em]">
        Generating private Commitment Hash, please wait...
      </div>
      <p className="mb-[1.875rem] text-[1.25rem] font-light text-mineShaft/40">
        The provider will not know your wallet address
      </p>
      <Link href="https://google.com" target="_blank" rel="noreferrer">
        Learn More about KYC{" "}
        <InfoOrangeIcon className="relative ml-[0.31rem]" />
      </Link>
    </Modal>
  );
}