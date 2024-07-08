import MetamaskIcon from "shared/icons/metamask.svg?react";
import { Button, LinkButton } from "shared/ui/button";

export const InstallMetamaskStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-20 bg-onboarding bg-cover bg-center">
      <div className="mb-2.5 text-[5.25rem] font-thin leading-[120%] tracking-[-4.2px]">
        Welcome to <span className="font-medium">Galactica.com</span>
      </div>
      <p className="mb-12 w-[1100px] text-center text-xl font-light tracking-[-0.4px] text-mineShaft text-opacity-40">
        Galactica Network utilizes Snaps which is available only on MetaMask.{" "}
        <br /> To proceed you need MetaMask.
      </p>

      <div className="flex gap-x-8">
        <LinkButton
          className="flex w-[300px] items-center"
          rel="noreferrer"
          target="_blank"
          to="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=google.com"
        >
          <MetamaskIcon className="relative top-[-0.15rem] mr-3" />
          Install metamask
        </LinkButton>

        <Button
          className="w-[300px]"
          onClick={() => {
            window.location.reload();
          }}
          theme="primaryTransparent"
        >
          I have MetaMask
        </Button>
      </div>

      {/* <Note className="mt-[88px]" /> */}
    </div>
  );
};
