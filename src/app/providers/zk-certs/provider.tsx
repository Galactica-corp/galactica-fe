import { PropsWithChildren, useState } from "react";
import { useLocalStorage, useToggle } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import {
  useGetZkCertStorageHashesQuery,
  useListZkCertsMutation,
} from "shared/snap";
import { Button } from "shared/ui/button";
import { Modal } from "shared/ui/modal";
import { ReactComponent as LogoMetamask } from "./logo-metamask.svg";

type Cert = {
  expirationDate: string;
  verificationLevel: string;
  providerPubKey: {
    Ax: string;
    Ay: string;
  };
};

export const ZkCertsProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, toggleOpen] = useToggle(true);
  const [certsList, setCertsList] = useLocalStorage<Cert[]>(
    LS_KEYS.zkCerts,
    []
  );
  const [zkHash, setZkHash] = useLocalStorage(LS_KEYS.zkHash, "");
  const hashQuery = useGetZkCertStorageHashesQuery();
  const listZkCertsMutation = useListZkCertsMutation();

  console.log({ zkHash, fromSnap: hashQuery.data });

  // const showModal = Boolean(
  //   isOpen &&
  //     hashQuery.isSuccess &&
  //     hashQuery.data &&
  //     zkHash &&
  //     zkHash !== hashQuery.data.gip69
  // );

  return (
    <>
      {children}

      {isOpen && (
        <Modal onClose={toggleOpen} className="px-20">
          <Modal.Body className="w-[670px]" onClose={toggleOpen}>
            <LogoMetamask className="mx-auto mt-20" />
            <h3 className="mt-6 text-[32px] font-light">
              Your KYC&apos;s have changed
            </h3>
            <p className="mt-3 text-xl font-light text-opacity-40">
              We&apos;ve noticed that something has changed in your KYCs.
              Please, approve an access request in Metamask to share the actual
              state of your KYC&apos;s to the application.
            </p>

            <div className="mx-auto mt-8 flex gap-x-8">
              <Button>Approve</Button>
              <Button theme="primaryTransparent">Decline</Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
