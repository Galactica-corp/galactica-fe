import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation } from "wagmi";
import { z } from "zod";
import { invokeSnap } from "./api-sdk";
import { snapsKeys } from "./keys";
import { useListZkCertsMutation } from "./use-list-zk-certs-mutation";

export const zkCertSchema = z.object({
  holderCommitment: z.string().nonempty(),
  leafHash: z.string().nonempty(),
  did: z.string().startsWith("did").includes("gip69"),
  zkCertStandard: z.enum(["gip69"]),
  content: z.object({
    surname: z.string().nonempty(),
    forename: z.string().nonempty(),
    middlename: z.string().nonempty(),
    yearOfBirth: z.number(),
    monthOfBirth: z.number(),
    dayOfBirth: z.number(),
    verificationLevel: z.string(),
    expirationDate: z.number(),
    streetAndNumber: z.string(),
    postcode: z.string(),
    town: z.string(),
    region: z.string(),
    country: z.string(),
    citizenship: z.string(),
    passportID: z.string(),
  }),
  providerData: z.record(z.string(), z.string().nonempty()),
  randomSalt: z.number(),
  merkleProof: z.object({
    root: z.string(),
    pathIndices: z.number(),
    pathElements: z.array(z.string()),
  }),
});

export type ZkCert = z.infer<typeof zkCertSchema>;

export const useImportZkCertMutation = () => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const listZkCertsMutation = useListZkCertsMutation();
  return useMutation(
    async (objContent: unknown) => {
      const parsedJson = zkCertSchema.parse(objContent);

      return invokeSnap({
        method: "importZkCert",
        params: { zkCert: parsedJson },
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          snapsKeys.zkCertStorageHashes(address)
        );
        await listZkCertsMutation.mutateAsync({});
      },
    }
  );
};
