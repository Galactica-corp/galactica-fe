import { PropsWithChildren } from "react";
import { UpdateKycListModal } from "features/update-kyc-list";

export const ZkCertsProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <UpdateKycListModal />
    </>
  );
};
