import { InstallSnapButton } from "features/install-snap-button/install-snap-button";

type Props = {
  onInstall?: () => void;
};

export const SnapStep = ({ onInstall }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-20 bg-onboarding bg-cover bg-center font-light">
      <div className="mb-2.5 text-[5.25rem] leading-[120%] tracking-[-4.2px]">
        Now let&apos;s get the{" "}
        <span className="font-semibold ">Galactica Snap</span>
      </div>
      <p className="mb-10 text-center text-xl font-light tracking-[-0.4px] text-mineShaft text-opacity-40">
        <a
          className="link text-xl"
          target="_blank"
          href="https://metamask.io/snaps/"
          rel="noreferrer"
        >
          Galactica Snap
        </a>{" "}
        is required in order to access core features of Galactica Network such
        as <br /> zkCertificates, Protocol Governance, & Reputation.
      </p>
      <InstallSnapButton onInstall={onInstall} />
    </div>
  );
};
