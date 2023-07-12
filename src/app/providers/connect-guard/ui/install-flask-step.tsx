import { Button, LinkButton } from "shared/ui/button";

export const InstallFlaskStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-opacity-20 bg-onboarding bg-cover bg-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Welcome, <span className="font-semibold ">Citizen!</span>
      </div>
      <p className="mb-10 w-[1000px] text-center text-xl font-light text-mineShaft text-opacity-40">
        Galactica uses some features of Metamask that are not released yet.
        Please install Metamask Flask (dev build) and disable the main Metamask
        application for this website to start using Galactica.
      </p>

      <div className="flex gap-x-3">
        <LinkButton
          target="_blank"
          to="https://metamask.io/flask/"
          rel="noreferrer"
        >
          Install metamask flask
        </LinkButton>

        <Button
          theme="primaryTransparent"
          onClick={() => {
            window.location.reload();
          }}
        >
          I&apos;ve installed metamask flask
        </Button>
      </div>
    </div>
  );
};
