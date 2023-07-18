import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button, LinkButton } from "shared/ui/button";
import { Note } from "./note";

export const InstallFlaskStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-20 bg-onboarding bg-cover bg-center">
      <div className="mb-2.5 text-[5.25rem] font-thin leading-[120%] tracking-[-4.2px]">
        Welcome to <span className="font-medium">Galactica.com</span>
      </div>
      <p className="mb-12 w-[1100px] text-center text-xl font-light tracking-[-0.4px] text-mineShaft text-opacity-40">
        Galactica Network utilizes Snaps which is available only on MetaMask
        Flask. <br /> To proceed you need MetaMask Flask.
      </p>

      <div className="flex gap-x-8">
        <LinkButton
          className="flex w-[300px] items-center"
          target="_blank"
          to="https://metamask.io/flask/"
          rel="noreferrer"
        >
          <MetamaskIcon className="relative top-[-0.15rem] mr-3" />
          Install metamask flask
        </LinkButton>

        <Button
          className="w-[300px]"
          theme="primaryTransparent"
          onClick={() => {
            window.location.reload();
          }}
        >
          I have MetaMask Flask
        </Button>
      </div>

      <Note className="mt-[88px]" />
    </div>
  );
};
