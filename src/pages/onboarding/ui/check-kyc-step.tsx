import { Button } from "shared/ui/button";

type Props = {
  onChooseKycProvider: () => void;
  onHaveKyc: () => void;
};

export const CheckKycStep = ({ onHaveKyc, onChooseKycProvider }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-60 bg-onboarding bg-cover bg-center font-light">
      <div className="mb-2.5 text-center text-[5.25rem] leading-[120%]">
        Do you already <span className="font-semibold ">have zkKYC?</span>
      </div>
      <p className="mb-12 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        After you pass zkKYC, a validation hash will be stored on-chain. No one
        will be able to access its contents. You will be able to prove certain
        information to dApps and other parties that require it. Only you control
        your personal data.
      </p>
      <div className="flex gap-x-8">
        <Button className="w-[200px]" onClick={onChooseKycProvider}>
          Get zkKYC
        </Button>
        <Button
          className="w-[200px] whitespace-nowrap px-14"
          onClick={onHaveKyc}
          theme="primaryTransparent"
        >
          I have zkKYC
        </Button>
      </div>
    </div>
  );
};
