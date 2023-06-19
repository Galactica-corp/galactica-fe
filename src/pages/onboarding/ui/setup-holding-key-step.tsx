import { SetupHoldingKeyButton } from "features/setup-holding-key";

type Props = {
  onSetup: () => void;
};

export const SetupHoldingKeyStep = ({ onSetup }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-10 font-light">
      <div className="mb-2.5 text-center text-[5.25rem] leading-[120%]">
        To start using Galactica, you need to{" "}
        <span className="block font-semibold ">setup holding key</span>
      </div>
      <p className="mb-7 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        To access most dApps on Galactica and access all the community features
        of the network, every Soul needs KYC.
      </p>
      {/* <p className="mb-12 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        After you pass the KYC, it will be stored in the network using zero
        knowledge technology. No one will be able to read its contents, but you
        will be able to disclose needed information to particular dApps or other
        parties. You control your personal data.
      </p> */}
      <div className="flex gap-x-8">
        <SetupHoldingKeyButton onSuccess={onSetup}>
          Setup holding Key
        </SetupHoldingKeyButton>
      </div>
    </div>
  );
};
