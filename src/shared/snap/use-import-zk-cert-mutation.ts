import { useMutation } from "wagmi";
import { z } from "zod";
import { SNAP_ID } from "shared/config/const";

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
});

export type ZkCert = z.infer<typeof zkCertSchema>;

export const useImportZkCertMutation = () => {
  return useMutation(async (objContent: unknown) => {
    const parsedJson = zkCertSchema.parse(objContent);
    const response = await window.ethereum?.request({
      method: "wallet_invokeSnap",
      params: {
        snapId: SNAP_ID,
        request: {
          method: "importZkCert",
          params: {
            zkCert: parsedJson,
          },
        },
      },
    });

    console.log(response);
  });
};
