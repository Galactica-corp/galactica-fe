import { CSSProperties, PropsWithChildren, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { Desc } from "./desc";
import { Info } from "./info";
import { Title } from "./title";

type Props = {
  desc?: ReactNode;
  style?: CSSProperties;
  title?: ReactNode;
} & ClassName;

export const Card = ({
  className,
  title,
  desc,
  children,
  style,
}: PropsWithChildren<Props>) => {
  return (
    <div className={twMerge(className, "card")} style={style}>
      {title && <Title>{title}</Title>}
      {desc && <Desc className="mt-2.5">{desc}</Desc>}
      {children}
    </div>
  );
};

Card.Desc = Desc;
Card.Title = Title;
Card.Info = Info;
