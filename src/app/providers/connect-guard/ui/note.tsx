import classNames from "classnames";
import { ReactComponent as MetamaskFlaskSvg } from "shared/icons/metamask-flask.svg";
import { ReactComponent as MetamaskWithToggle } from "shared/icons/metamask-with-toggle.svg";
import { ReactComponent as RightArrow } from "shared/icons/right-arrow.svg";
import { ClassName } from "shared/types";

export const Note = ({ className }: ClassName) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-6 rounded-[10px] border border-sandyBrown p-6",
        className
      )}
    >
      <div className="inline-flex items-center justify-center gap-1.5">
        <MetamaskWithToggle />
        <RightArrow />
        <MetamaskFlaskSvg />
      </div>
      <p className="font-medium leading-6 text-mineShaft">
        <span className="text-sandyBrown">Note that</span> to use MetaMask Flask
        you need to disable the main <br /> MetaMask application through your
        browser Extensions settings.
      </p>
    </div>
  );
};
