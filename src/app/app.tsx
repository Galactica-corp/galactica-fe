import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { RqProvider } from "shared/providers/rq";
import { WagmiProvider } from "shared/providers/wagmi";

import { ConnectGuard } from "./providers/connect-guard";
import { MobileGuard } from "./providers/mobile-guard";
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
            </ConnectGuard>
            <Toaster position="top-right" reverseOrder={false} />
          </BrowserRouter>
        </MobileGuard>
      </WagmiProvider>
    </RqProvider>
  );
}
