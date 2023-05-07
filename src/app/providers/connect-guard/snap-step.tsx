import { InstallSnapButton } from "features/install-snap-button/install-snap-button";

export const SnapStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center font-light">
      <div className="mb-2.5 text-[5.25rem] leading-[120%]">
        Now let&apos;s{" "}
        <span className="font-semibold ">install the Extension</span>
      </div>
      <p className="mb-10 text-xl font-light text-mineShaft text-opacity-40">
        The extension is needed to access the main features of the network -
        zkKYC, Reputation and Governance.
      </p>
      <InstallSnapButton />
    </div>
  );
};
