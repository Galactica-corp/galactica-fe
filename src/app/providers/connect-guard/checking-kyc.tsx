import { Button, LinkButton } from "shared/ui/button";

export const CheckingKyc = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Do you already<span className="font-semibold ">have KYC?</span>
      </div>
      <p className="mb-10 text-xl font-light text-mineShaft text-opacity-40">
        To access most dApps on Galactica and access all the community features
        of the network, every Soul needs KYC. After you pass the KYC, it will be
        stored in the network using zero knowledge technology. No one will be
        able to read its contents, but you will be able to disclose needed
        information to particular dApps or other parties. You control your
        personal data.
      </p>
      <div className="flex gap-x-8">
        <LinkButton to="/kyc-providers">Choose KYC Provider</LinkButton>
        <Button theme="primaryTransparent">I already have a KYC</Button>
      </div>
    </div>
  );
};
