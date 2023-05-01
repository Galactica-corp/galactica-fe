import { cloneElement, useMemo } from "react";
import { ReactComponent as DiscordIcon } from "shared/icons/social/discord.svg";
import { ReactComponent as MediumIcon } from "shared/icons/social/medium.svg";
import { ReactComponent as TelegramIcon } from "shared/icons/social/telegram.svg";
import { ReactComponent as TwitterIcon } from "shared/icons/social/twitter.svg";

export type SocialLinkIconType =
  | "telegram"
  | "medium"
  | "twitter"
  | "discord"
  | string;

export type SocialLinkProps = {
  url?: string | null;
  // name?: string
  icon?: SocialLinkIconType;
  className?: string;
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
    <div onClick={handleClick} className={`cursor-pointer ${wrapClassName}`}>
      {iconComp
        ? cloneElement(iconComp, {
            className: `fill-current w-[1.125rem] ${className}`,
          })
        : null}
    </div>
  );
}
