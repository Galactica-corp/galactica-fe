import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";
import { ClassName } from "shared/types";
import { Desc } from "./desc";
import { Info } from "./info";
import { Title } from "./title";

type Props = {
  title: ReactNode;
  desc: ReactNode;
} & ClassName;

export const Card = ({
  className,
  title,
  desc,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={classNames(className, "card")}>
      {typeof title === "string" ? <Title>{title}</Title> : title}
      {typeof desc === "string" ? <Desc>{desc}</Desc> : desc}
      {children}
    </div>
  );
};

Card.Desc = Desc;
Card.Title = Title;
Card.Info = Info;
