import { PropsWithChildren, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";

type Props = {
  className?: string;
  portalElement?: HTMLElement | null;
};

export const Portal = ({
  className,
  portalElement = getDefaultPortalElement(),
  children,
}: PropsWithChildren<Props>) => {
  const el = useMemo(() => document.createElement("div"), []);
  const cls = cn("target", className);
  el.classList.add(...cls.split(" "));

  useEffect(() => {
    portalElement?.appendChild(el);
    portalElement?.classList.add("portal");

    return () => {
      portalElement?.removeChild(el);
    };
  }, [el, className, portalElement]);

  return portalElement ? createPortal(children, el) : null;
};

function getDefaultPortalElement() {
  const portalRoot = document.getElementById("portal-root");
  if (portalRoot) return portalRoot;

  const root = document.getElementById("root") ?? document.body;
  const fallbackPortal = document.createElement("div");
  fallbackPortal.id = "portal-root";
  root.appendChild(fallbackPortal);

  return fallbackPortal;
}
