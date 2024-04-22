import { PropsWithChildren } from "react";

type Props = {
  isActive?: boolean;
  onClick: () => void;
};

export const Tab = ({
  isActive,
  children,
  onClick,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={`
        relative inline-block cursor-pointer text-[1.125rem]
        font-light hover:text-mineShaft
        ${isActive ? "text-mineShaft" : "text-naturalGray/80"}
      `}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <div
          className="absolute bottom-[-0.4rem]  h-0.5
              w-full bg-gradient-to-r
              from-burntSienna to-sandyBrown"
        />
      )}
    </div>
  );
};
