import classNames from "classnames";
import { tw } from "shared/utils";
import { Theme } from "./types";

export const baseCls = tw`relative text-[1rem] font-publicoTextMono tracking-[-0.02em] px-[1.55rem] h-[2.5rem] flex items-center justify-center rounded-[0.3rem]`;
export const primaryCls = tw`buttonPrimary text-white uppercase`;
export const primaryTransparentCls = tw`buttonPrimaryTransparent text-mineShaft uppercase`;

export const getCls = (theme: Theme) =>
  classNames(baseCls, {
    [primaryCls]: theme === "primary",
    [primaryTransparentCls]: theme === "primaryTransparent",
  });
