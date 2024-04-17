import { tw } from "shared/utils";

import { Theme } from "./types";

export const baseCls = tw`cursor-pointer leading-none relative font-publicoTextMono px-6 h-[40px] flex items-center justify-center rounded-md overflow-hidden`;
export const primaryCls = tw`buttonPrimary text-white uppercase`;
export const primaryTransparentCls = tw`buttonPrimaryTransparent text-mineShaft uppercase`;

export const THEME: Record<Theme, string> = {
  primary: primaryCls,
  primaryTransparent: primaryTransparentCls,
};
