import { default as LogoSvg } from "./galactica-logo.svg?react";

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => <LogoSvg className={className} />;
