import { Button } from "shared/ui/button";

type Props = {
  onChooseKycProvider: () => void;
  onHaveKyc: () => void;
};

export const CheckKycStep = ({ onHaveKyc, onChooseKycProvider }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-60 bg-onboarding bg-cover bg-center font-light">
      <div className="mb-2.5 text-center text-[5.25rem] leading-[120%]">
        Do you already <span className="font-semibold ">have KYC?</span>
      </div>
      <p className="mb-7 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        To access most dApps on Galactica and access all the community features
        of the network, every Soul needs KYC.
      </p>
      <p className="mb-12 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        After you pass the KYC, it will be stored in the network using zero
        knowledge technology. No one will be able to read its contents, but you
        will be able to disclose needed information to particular dApps or other
        parties. You control your personal data.
      </p>
      <div className="flex gap-x-8">
        <Button onClick={onChooseKycProvider}>Choose KYC Provider</Button>
        <Button
          className="px-14"
          theme="primaryTransparent"
          onClick={onHaveKyc}
        >
          I already have a KYC
        </Button>
      </div>
    </div>
  );
};
