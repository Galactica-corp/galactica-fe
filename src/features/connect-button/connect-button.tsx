import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ReactComponent as MetamaskIcon } from "shared/icons/metamask.svg";
import { Button } from "shared/ui/button";

export function ConnectButton() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <Button
      onClick={() => connect()}
      type="primaryTransparent"
      className="w-[18.75rem] space-x-[0.9rem]"
    >
      <MetamaskIcon className="relative top-[-0.15rem]" />
      <span>Connect Metamask</span>
    </Button>
  );
}
