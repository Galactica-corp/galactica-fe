import { Navigate, Outlet } from "react-router-dom";
import { OnboardingProgress } from "entities/onboarding-progress";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { useZkCerts } from "shared/snap";
import { Header } from "../header";

export const Layout = () => {
  const [zkCerts] = useZkCerts();

  const [isOnboardingCompleted] = useLocalStorage<boolean>(
    LS_KEYS.isOnboardingCompleted,
    false
  );

  if (zkCerts?.length === 0 && !isOnboardingCompleted)
    return <Navigate to="/onboarding" />;

  return (
    <>
      <Header />
      <div className="mx-auto w-[300px] py-[3rem] ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        <Outlet />
      </div>
      <OnboardingProgress />
    </>
  );
};
