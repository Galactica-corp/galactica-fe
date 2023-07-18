import { UploadKycButton } from "features/upload-kyc";
import { Button } from "shared/ui/button";

type Props = {
  onChooseKycProvider: () => void;
  onUpload?: () => void;
};

export const UploadKycStep = ({ onUpload, onChooseKycProvider }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-70 bg-onboarding bg-cover bg-center font-light">
      <div className="mb-2.5 text-[5.25rem] leading-[120%]">
        Upload your <span className="font-semibold ">zkKYC secret file.</span>
      </div>
      <p className="mb-10 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        If you&apos;ve passed zkKYC on Galactica before and you have a secret
        file, you can upload it to the MetaMask Snap here. <br /> After, you
        will be able to use Galactica.
      </p>

      <div className="flex gap-8">
        <UploadKycButton
          className="w-[216px]"
          theme="primary"
          onSuccessUpload={(data) => {
            onUpload?.();
          }}
        >
          Upload secret file
        </UploadKycButton>
        <Button
          className="w-[216px]"
          theme="primaryTransparent"
          onClick={onChooseKycProvider}
        >
          Get zkKYC
        </Button>
      </div>
    </div>
  );
};
