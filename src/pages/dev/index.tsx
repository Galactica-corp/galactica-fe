import { useLocalStorage } from "usehooks-ts";

import { useInvokeSnapMutation } from "shared/snap/api/use-invoke-snap-mutation";
import { SNAP_LS_KEYS } from "shared/snap/const";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const mutation = useInvokeSnapMutation("clearStorage");
  const listZkCertsInvokeMutation = useInvokeSnapMutation("listZkCerts");
  const [_, setCerts] = useLocalStorage(SNAP_LS_KEYS.zkCerts, []);
  return (
    <>
      <Button
        isLoading={mutation.isPending}
        onClick={() =>
          mutation.mutate(
            { hello: "unknown" },
            {
              onSuccess: () => {
                setCerts([]);
              },
            }
          )
        }
      >
        Clear storage
      </Button>

      <Button
        isLoading={mutation.isPending}
        onClick={() =>
          listZkCertsInvokeMutation.mutate(
            {},
            {
              onSuccess: (data) => {
                console.log(data);
              },
            }
          )
        }
      >
        ListZkCerts
      </Button>
    </>
  );
};
