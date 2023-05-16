import { LinkButton } from "shared/ui/button";

export const InstallFlaskStep = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Welcome, <span className="font-semibold ">Citizen!</span>
      </div>
      <p className="mb-10 text-xl font-light text-mineShaft text-opacity-40">
        You need to install metamask flask to use the galactica
      </p>
      <LinkButton
        target="_blank"
        to="https://metamask.io/flask/"
        rel="noreferrer"
      >
        Install metamask flask
      </LinkButton>
    </div>
  );
};
