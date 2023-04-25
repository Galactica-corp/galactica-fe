import { ReactComponent as LogoSvg } from "./galactica-logo.svg";

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <div className={className}>
      <LogoSvg />
    </div>
  );
};
