import { useEffect, useRef } from "react";

export const useRefFn = <T>(cb: T) => {
  const ref = useRef<T>(cb);
  useEffect(() => {
    ref.current = cb;
  }, [cb]);

  return ref;
};
