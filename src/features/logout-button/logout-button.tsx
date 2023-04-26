import { useAccount, useDisconnect } from "wagmi";
import { ReactComponent as LogoutIcon } from "shared/icons/logout.svg";
import { Button } from "shared/ui/button";

export function LogoutButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortAddress = address
    ? `${address.slice(0, 8)}...${address.slice(
        address.length - 6,
        address.length
      )}`
    : "";

  return (
    <Button
      onClick={() => disconnect()}
      type="primaryTransparent"
      className="space-x-[1.8rem] normal-case"
    >
      <span>{shortAddress}</span>
      <LogoutIcon className="relative top-[-0.1rem]" />
    </Button>
  );
}
