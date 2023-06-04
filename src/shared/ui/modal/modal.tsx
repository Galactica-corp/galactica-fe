import { ReactNode } from "react";
import { animated, useSpring } from "@react-spring/web";
import classNames from "classnames";
import { useLockedBody } from "usehooks-ts";
import { ClassName } from "shared/types";
import { Portal } from "../portal";
import { Body } from "./body";

type Props = {
  children: ReactNode;
  onClose?: () => void;
} & ClassName;

export function Modal({ children, onClose, className }: Props) {
  useLockedBody(true);

  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Portal>
      <animated.div
        style={springs}
        onClick={onClose}
        className={classNames(
          className,
          "fixed inset-0 z-10 flex overflow-y-auto bg-mineShaft/70 p-5"
        )}
      >
        {children}
      </animated.div>
    </Portal>
  );
}

Modal.Body = Body;
