import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";

import { useUpdateKycList } from "features/update-kyc-list/hooks";
import { useInvokeSnapMutation } from "shared/snap2/rq";
import { ClassName } from "shared/types";

export const Alert = ({ className }: ClassName) => {
  const [isUpdateNeeded, mutation, isClearNeeded] = useUpdateKycList();
  const [oldZkCerts, setOldCerts] = useLocalStorage("zk-certs-list-v2", []);

  const clearStorageMutation = useInvokeSnapMutation("clearStorage");

  if (!isUpdateNeeded && !isClearNeeded) return null;

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
        onClick={() => {
          if (isClearNeeded) {
            clearStorageMutation.mutate(undefined, {
              onSuccess: () => {
                setOldCerts([]);
              },
            });

            return;
          }

          mutation.mutate({});
        }}
      >
        Update now
      </button>
    </div>
  );
};
