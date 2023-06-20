import { ReactComponent as LinkIcon } from "shared/icons/link.svg";
import { ExternalLink } from "shared/ui/link";
import { SocialLink } from "shared/ui/social-link";

export type EcosystemKYCItemT = {
  name: string;
  logo?: string;
  bg?: string;
  link: string;
  social: Array<{ name: string; link: string }>;
  tag: string;
};

export function EcosystemKYCItem({
  name,
  // bg, TODO fix when api will be
  // logo, TODO fix when api will be
  tag,
  link,
  social,
}: EcosystemKYCItemT) {
  return (
    <div className="rounded-[0.5rem] border border-naturalGray/35 bg-alabaster p-[1rem] pb-[1.43rem]">
      <div
        className="relative mb-[3.75rem] h-[5.625rem] rounded-[0.312rem]"
        style={{
          // background: `url(${bg})`, TODO fix when api will be
          backgroundImage: `linear-gradient(90deg, rgba(191, 63, 149, 0.35) 0%, rgba(72, 21, 107, 0.35) 100.2%)`,
        }}
      >
        <div className="absolute right-[0.625rem] top-[0.625rem] rounded-[0.312rem] bg-white px-[0.5rem] py-[0.2rem]">
          {tag}
        </div>
        <div
          className="absolute bottom-[-2.45rem] left-1/2 h-[5.18rem] w-[5.18rem] -translate-x-1/2 rounded-full bg-naturalGray"
          style={{
            // background: `url(${logo})`, TODO fix when api will be
            backgroundImage: `linear-gradient(90deg, rgba(191, 63, 149, 0.35) 0%, rgba(72, 21, 107, 0.35) 100.2%)`,
          }}
        ></div>
      </div>
      <div className="mb-[0.3rem] text-center text-[1.56rem] font-medium tracking-tighter">
        {name}
      </div>
      <ExternalLink
        href={link}
        className="mb-[1.56rem] flex items-center justify-center"
      >
        {link.replace(/^https?:\/\//, "")}
        <LinkIcon className="relative top-[0.1rem] ml-[0.35rem]" />
      </ExternalLink>
      <div className="flex items-center justify-center space-x-[2.18rem]">
        {social.map((item) => {
          return (
            <SocialLink
              className="opacity-35 hover:opacity-100"
              key={item.name}
              url={item.link}
              icon={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
