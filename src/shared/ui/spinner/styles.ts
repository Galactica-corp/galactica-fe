import { tw } from "shared/utils";

export const SIZES = {
  "12": tw`w-[12px] h-[12px] border`,
  "18": tw`w-[18px] h-[18px] border-2`,
  "66": tw`w-16 h-16 border-8`,
};

export const THEMES = {
  sandyBrown: tw`border-sandyBrown border-b-white`,
  sandyBrownTransparent: tw`border-sandyBrown border-b-transparent`,
};

export type Theme = keyof typeof THEMES;
export type Size = keyof typeof SIZES;
