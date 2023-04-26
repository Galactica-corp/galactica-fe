import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Layout } from "pages/ui";

export const Home = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <Layout>
      <div className="mt-4">
        {isConnected ? (
          <div>
            Connected to {address}
            <button
              onClick={() => disconnect()}
              className="bg-orange ml-2 rounded-md p-2"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect()}
            className="bg-orange rounded-md p-2"
          >
            HELLO Connect Wallet
          </button>
        )}
      </div>
    </Layout>
  );
};
