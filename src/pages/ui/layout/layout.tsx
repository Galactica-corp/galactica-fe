import { Navigate, Outlet } from "react-router-dom";
import { OnboardingProgress } from "entities/onboarding-progress";
import { useLocalStorage } from "usehooks-ts";
import { LS_KEYS } from "shared/config/const";
import { ZkCertsListItem } from "shared/snap/types";
import { Header } from "../header";

export const Layout = () => {
  const [zkCerts] = useLocalStorage<ZkCertsListItem[] | undefined>(
    LS_KEYS.zkCerts,
    []
  );

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
