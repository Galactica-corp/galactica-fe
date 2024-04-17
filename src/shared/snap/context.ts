import { createContext, useContext } from "react";

import invariant from "tiny-invariant";

import { Snap } from "shared/snap";

export const SnapContext = createContext<Snap | undefined>(undefined);

export const useSnap = () => {
  const ctx = useContext(SnapContext);
  invariant(ctx, "useSnap must be used inside SnapContext.Provider");

  return ctx;
};
