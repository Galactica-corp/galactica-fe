import { importZkCert } from "@galactica-net/snap-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useMutation } from "wagmi";
import { z } from "zod";
import { toastError } from "shared/utils/toasts";
import { useZkCerts } from "./hooks/use-zk-certs";
import { snapsKeys } from "./keys";

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
  const [certs, setCertsList] = useZkCerts();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  return useMutation(
    async (objContent: unknown) => {
      const parsedJson = zkCertSchema.parse(objContent);
      return importZkCert({ encryptedZkCert: parsedJson, listZkCerts: true });
    },
    {
      onSuccess: async (data) => {
        console.log(data);
        if (Array.isArray(data.gip69)) {
          setCertsList(certs ? [...certs, ...data.gip69] : data.gip69);
        }

        if (typeof data === "string") {
          toastError("This zkCertificate has already been imported.");
        }

        await queryClient.invalidateQueries(
          snapsKeys.zkCertStorageHashes(address)
        );
      },
    }
  );
};
