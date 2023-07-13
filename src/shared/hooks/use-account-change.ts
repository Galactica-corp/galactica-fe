import { useEffect } from "react";
import { ConnectorData, useAccount } from "wagmi";
import { useRefFn } from "./use-ref-fn";

export const useAccountChange = (
  onChange: ({ account, chain }: ConnectorData) => void
) => {
  const { connector: activeConnector } = useAccount();

  const onChangeRef = useRefFn(onChange);

  useEffect(() => {
    if (!activeConnector) return;

    const handleChange = onChangeRef.current;

    if (activeConnector) {
      activeConnector.on("change", handleChange);
    }

    return () => {
      activeConnector.off("change", handleChange);
    };
  }, [activeConnector, onChangeRef]);
};
