import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "./index.css";
import { ConnectGuard } from "./providers/connect-guard";
import { MobileGuard } from "./providers/mobile-guard";
import { RQProvider } from "./providers/rq";
import { WagmiProvider } from "./providers/wagmi";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <RQProvider>
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
    </RQProvider>
  );
}
