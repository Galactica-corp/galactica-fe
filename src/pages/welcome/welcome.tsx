import { ConnectButton } from "features/connect-button";

export const WelcomePage = () => {
  // const [isWelcomeShown, setIsWelcomeShown] = useLocalStorage(
  //   "isWelcomeShown",
  //   false
  // );

  // if (isWelcomeShown) return <Navigate to="/" />;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-[2.125rem] text-[5.25rem] leading-[120%]">
        Welcome, <span className="font-semibold ">Citizen!</span>
      </div>
      <ConnectButton />
    </div>
  );
};
