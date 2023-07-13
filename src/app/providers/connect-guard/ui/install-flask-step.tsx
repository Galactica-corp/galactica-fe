import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button, LinkButton } from "shared/ui/button";

export const InstallFlaskStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-20 bg-onboarding bg-cover bg-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Welcome to Galactica.com
      </div>
      <p className="mb-10 w-[1100px] text-center text-xl font-light text-mineShaft text-opacity-40">
        Galactica Network utilizes Snaps which is available only on MetaMask
        Flask.
        <br />
        To proceed you need MetaMask Flask.
        <br />
        <span className="font-semibold">
          Note that to use MetaMask Flask you need to disable the main MetaMask
          application through your browser Extensions settings.
        </span>
      </p>

      <div className="flex gap-x-3">
        <LinkButton
          className="flex items-center"
          target="_blank"
          to="https://metamask.io/flask/"
          rel="noreferrer"
        >
          <MetamaskIcon className="relative top-[-0.15rem] mr-2" />
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
    </div>
  );
};
