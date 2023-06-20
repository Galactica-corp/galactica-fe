import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount } from "wagmi";
import { invokeSnap } from "./api-sdk";

export const useSetupHoldingKeyMutation = () => {
  const { address } = useAccount();
  return useMutation({
    mutationFn: async () => {
      invariant(address, "useSetupHoldingKeyMutation. address is undefined");
      return invokeSnap({
        method: "setupHoldingKey",
        params: {
          holderAddr: address,
        },
      });
    },
  });
};
