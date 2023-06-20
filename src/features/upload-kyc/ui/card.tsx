import { UploadKycButton } from "./button";

export function UploadKycCard() {
  return (
    <div className="card items-center justify-center">
      <UploadKycButton />
      <div className="mt-[1.05rem] w-[15rem] text-center text-[0.875rem] text-mineShaft/50">
        If you already passed KYC but didn&apos;t upload its secret file to your
        wallet
      </div>
    </div>
  );
}
