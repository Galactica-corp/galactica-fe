import { ReactNode } from "react";
import { animated, useSpring } from "@react-spring/web";
import { twMerge } from "tailwind-merge";
import { useLockedBody } from "usehooks-ts";
import { ClassName } from "shared/types";
import { Portal } from "../portal";
import { Body } from "./body";
import { Description } from "./description";
import { Title } from "./title";

type Props = {
  delay?: number;
  children: ReactNode;
  onClose?: () => void;
} & ClassName;

export function Modal({ delay = 0, children, onClose, className }: Props) {
  useLockedBody(true);

  const springs = useSpring({
    delay,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Portal>
      <animated.div
        style={springs}
        className={twMerge("fixed inset-0 flex overflow-y-auto p-5", className)}
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
