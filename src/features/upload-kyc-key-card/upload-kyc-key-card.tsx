import { Button } from "shared/ui/button";

export function UploadKYCKeyCard() {
  const handler = () => {
    alert("TODO KYC-key");
  };

  return (
    <div
      className="
        flex h-[14.875rem] w-[23.75rem] flex-col items-center justify-center
        rounded-[0.625rem] border border-dashed border-naturalGray/30 
      "
    >
      <Button type="primaryTransparent" onClick={handler}>
        Upload KYC-key
      </Button>
      <div className="mt-[1.05rem] w-[15rem] text-center text-[0.875rem] text-mineShaft/50">
        If you already passed KYC but didn&apos;t upload its secret file to your
        wallet
      </div>
    </div>
  );
}
