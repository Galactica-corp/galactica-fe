import { ReactNode } from "react";

import { animated, useSpring } from "@react-spring/web";
import { twMerge } from "tailwind-merge";
import { useScrollLock } from "usehooks-ts";

import { ClassName } from "shared/types";

import { Portal } from "../portal";
import { Body } from "./body";
import { Description } from "./description";
import { Title } from "./title";

type Props = {
  children: ReactNode;
  delay?: number;
  onClose?: () => void;
} & ClassName;

export function Modal({ delay = 0, children, onClose, className }: Props) {
  useScrollLock();

  const springs = useSpring({
    delay,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Portal>
      <animated.div
        className={twMerge("fixed inset-0 flex overflow-y-auto p-5", className)}
        style={springs}
      >
        <div className="fixed inset-0 bg-mineShaft/70" onClick={onClose} />
        {children}
      </animated.div>
    </Portal>
  );
}

Modal.Body = Body;
Modal.Title = Title;
Modal.Description = Description;
