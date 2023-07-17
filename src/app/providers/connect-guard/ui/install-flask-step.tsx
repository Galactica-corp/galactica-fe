import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button, LinkButton } from "shared/ui/button";
import { Note } from "./note";

export const InstallFlaskStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-20 bg-onboarding bg-cover bg-center">
      <div className="mb-[2.125rem] text-[5.25rem] font-light leading-[120%]">
        Welcome to <span className="font-medium">Galactica.com</span>
      </div>
      <p className="mb-10 w-[1100px] text-center text-xl font-light text-mineShaft text-opacity-40">
        Galactica Network utilizes Snaps which is available only on MetaMask
        Flask. <br /> To proceed you need MetaMask Flask.
      </p>

      <div className="flex gap-x-3">
        <LinkButton
          className="flex items-center"
          target="_blank"
          to="https://metamask.io/flask/"
          rel="noreferrer"
        >
          <MetamaskIcon className="relative top-[-0.15rem] mr-3" />
          Install metamask flask
        </LinkButton>

        <Button
          theme="primaryTransparent"
          onClick={() => {
            window.location.reload();
          }}
        >
          I have MetaMask Flask
        </Button>
      </div>

      <Note className="mt-20" />
    </div>
  );
};
