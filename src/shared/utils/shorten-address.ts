import { ethers } from "ethers";

export const shortenAddress = (address: string | undefined | null) => {
  if (!address) return "";
  if (ethers.utils.isAddress(address)) {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  }

  return address;
};
