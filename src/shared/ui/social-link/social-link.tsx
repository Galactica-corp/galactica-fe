import { cloneElement, useMemo } from "react";

import { default as DiscordIcon } from "shared/icons/social/discord.svg?react";
import { default as MediumIcon } from "shared/icons/social/medium.svg?react";
import { default as TelegramIcon } from "shared/icons/social/telegram.svg?react";
import { default as TwitterIcon } from "shared/icons/social/twitter.svg?react";

export type SocialLinkIconType =
  | "discord"
  | "medium"
  | "telegram"
  | "twitter"
  | string;

export type SocialLinkProps = {
  className?: string;
  // name?: string
  icon?: SocialLinkIconType;
  url?: null | string;
  wrapClassName?: string;
};

export function SocialLink({
  url,
  // name,
  icon = "telegram",
  className,
  wrapClassName,
}: SocialLinkProps) {
  const iconComp = useMemo(() => {
    switch (icon) {
      case "telegram":
        return <TelegramIcon />;
      case "medium":
        return <MediumIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "discord":
        return <DiscordIcon />;
    }
  }, [icon]);

  if (!url) {
    return null;
  }
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`cursor-pointer ${wrapClassName}`} onClick={handleClick}>
      {iconComp
        ? cloneElement(iconComp, {
            className: `fill-current w-[1.125rem] ${className}`,
          })
        : null}
    </div>
  );
}
