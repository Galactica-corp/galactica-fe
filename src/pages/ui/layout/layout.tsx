import { Navigate, Outlet } from "react-router-dom";

import { useLocalStorage } from "usehooks-ts";

import { OnboardingProgress } from "entities/onboarding-progress";
import { LS_KEYS } from "shared/config/const";
import { useZkCerts } from "shared/snap";
import { useGetZkCertStorageHashesQuery } from "shared/snap/api";

import { Header } from "../header";

export const Layout = () => {
  const [zkCerts] = useZkCerts();

  const [isOnboardingCompleted] = useLocalStorage<boolean>(
    LS_KEYS.isOnboardingCompleted,
    false
  );

  const query = useGetZkCertStorageHashesQuery();

  if (
    query.isSuccess &&
    !query.data &&
    zkCerts?.length === 0 &&
    !isOnboardingCompleted
  )
    return <Navigate to="/onboarding" />;

  return (
    <div className="flex grow flex-col bg-page bg-right-bottom bg-no-repeat">
      <Header />
      <div className="mx-auto flex w-[300px] grow flex-col py-12 ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        <Outlet />
      </div>
      <OnboardingProgress />
    </div>
  );
};
