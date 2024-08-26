"use client";

import { createContext, ReactNode, useCallback, useState } from "react";
import { ethers } from "ethers";

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

interface AccountContextType {
  accountData: AccountType;
  _connectToMetaMask: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextType | null>(null);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [accountData, setAccountData] = useState<AccountType>({});

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    if (typeof ethereum !== "undefined") {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } catch (error: any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accountData,
        _connectToMetaMask,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
