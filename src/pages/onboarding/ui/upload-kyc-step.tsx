import { Button } from "shared/ui/button";

export const UploadKYCStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center font-light">
      <div className="mb-2.5 text-[5.25rem] leading-[120%]">
        Upload your<span className="font-semibold ">KYC secret file.</span>
      </div>
      <p className="mb-10 max-w-6xl text-center text-xl font-light text-mineShaft text-opacity-40">
        If you&apos;ve passed KYC on Galactica before and you have a secret
        file, you can upload it to the Metamask Snap here. After, you will be
        able to use Galactica.
      </p>
      <Button className="px-16" theme="primary">
        Upload secret file
      </Button>
    </div>
  );
};
