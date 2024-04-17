import { twMerge } from "tailwind-merge";

import { useUpdateKycList } from "features/update-kyc-list/hooks";
import { ClassName } from "shared/types";

export const Alert = ({ className }: ClassName) => {
  const [isUpdateNeeded, mutation] = useUpdateKycList();

  if (!isUpdateNeeded) return null;

  return (
    <div
      className={twMerge(
        "flex w-full justify-center rounded-[10px] bg-oldLace py-3 text-naturalGray",
        className
      )}
    >
      Information is outdated! Please, approve an access request in MetaMask to
      share the actual state of your zkKYC&apos;s to the application.
      <button
        className="ml-1 inline-flex border-none bg-none text-sandyBrown hover:underline"
        onClick={mutation.mutate}
      >
        Update now
      </button>
    </div>
  );
};
