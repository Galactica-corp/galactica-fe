import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { OnboardingProgress } from "entities/onboarding-progress";
import { ConnectGuard } from "shared/providers/connect-guard";
import { MobileGuard } from "shared/providers/mobile-guard";
import { RqProvider } from "shared/providers/rq";
import { WagmiProvider } from "shared/providers/wagmi";

import { AppRoutes } from "./routes";

import "react-tooltip/dist/react-tooltip.css";

import "./index.css";

export function App() {
  return (
    <RqProvider>
      <WagmiProvider>
        <MobileGuard>
          <BrowserRouter>
            <ConnectGuard>
              <AppRoutes />
              {/* <OnboardingProgress /> */}
            </ConnectGuard>
            <Toaster position="top-right" reverseOrder={false} />
          </BrowserRouter>
        </MobileGuard>
      </WagmiProvider>
    </RqProvider>
  );
}
