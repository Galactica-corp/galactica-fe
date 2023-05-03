import { Toaster } from "react-hot-toast";
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
        <Toaster position="top-right" reverseOrder={false} />
      </WagmiProvider>
    </RQProvider>
  );
}
