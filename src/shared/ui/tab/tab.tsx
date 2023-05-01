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
      onClick={onClick}
      className={`
        relative inline-block cursor-pointer text-[1.125rem]
        font-light hover:text-mineShaft
        ${isActive ? "text-mineShaft" : "text-naturalGray/80"}
      `}
    >
      {children}
      {isActive && (
        <div
          className="absolute bottom-[-0.4rem]  h-[0.125rem]
              w-full bg-gradient-to-r
              from-burntSienna to-sandyBrown"
        />
      )}
    </div>
  );
};
