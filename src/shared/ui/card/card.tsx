import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";
import { ClassName } from "shared/types";
import { Desc } from "./desc";
import { Info } from "./info";
import { Title } from "./title";

type Props = {
  title?: ReactNode;
  desc?: ReactNode;
  style?: CSSProperties;
} & ClassName;

export const Card = ({
  className,
  title,
  desc,
  children,
  style,
}: PropsWithChildren<Props>) => {
  return (
    <div style={style} className={classNames(className, "card")}>
      {title && <Title>{title}</Title>}
      {desc && <Desc>{desc}</Desc>}
      {children}
    </div>
  );
};

Card.Desc = Desc;
Card.Title = Title;
Card.Info = Info;
