import { tw } from "shared/utils";
import { IconSize } from "../icon";

export const THEMES = {
  sandyBrown: tw`bg-sandyBrown text-white`,
  grayNickel: tw`bg-grayNickel text-white`,
} as const;

export const OUTLINE_THEMES: Record<Theme, string> = {
  sandyBrown: tw`border border-sandyBrown`,
  grayNickel: tw`border border-grayNickel`,
} as const;

export const SIZES = {
  "32": tw`py-[5px] px-6 text-sm rounded-[4px] font-light`,
  "42": tw`py-2 px-6 text-base rounded-md`,
} as const;

export const BUTTON_SIZE_TO_ICON_MAP: Record<Size, IconSize> = {
  "42": "20",
  "32": "20",
} as const;

export type Theme = keyof typeof THEMES;
export type Size = keyof typeof SIZES;
