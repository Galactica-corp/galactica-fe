import { BrowserRouter } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "./index.css";
import { RQProvider } from "./providers/rq";
import { WagmiProvider } from "./providers/wagmi";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <RQProvider>
      <WagmiProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </WagmiProvider>
    </RQProvider>
  );
}
