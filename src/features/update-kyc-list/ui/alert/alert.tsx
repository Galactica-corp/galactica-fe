import { useUpdateKycList } from "features/update-kyc-list/hooks";

export const Alert = () => {
  const [isUpdateNeeded, mutation] = useUpdateKycList();

  if (!isUpdateNeeded) return null;

  return (
    <div className="flex w-full justify-center rounded-[10px] bg-oldLace py-3 text-naturalGray">
      Information is outdated! Please, approve an access request in Metamask to
      share the actual state of your KYC&apos;s to the application.
      <button
        className="ml-1 inline-flex border-none bg-none text-sandyBrown hover:underline"
        onClick={mutation.mutate}
      >
        Update now
      </button>
    </div>
  );
};
