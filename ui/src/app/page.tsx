// pages/index.js
"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

// Code: https://github.com/mansour-qaderi/dapp-start
export default function Home() {
  const [accountData, setAccountData] = useState<AccountType>({});
  const [message, setMessage] = useState<string>("");

  const _sendMessageToMetaMask = useCallback(async () => {
    const ethereum = await window.ethereum;
    // Create an ethers.js provider using the injected provider from MetaMask
    // And get the signer (account) from the provider
    const signer = await new ethers.BrowserProvider(ethereum).getSigner();
    try {
      // Sign the message
      await signer.signMessage(message);
    } catch (error) {
      alert("User denied message signature.");
    }
  }, [message]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Get the network ID from MetaMask
        const network = await provider.getNetwork();
        // Update state with the results
        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);
  console.debug(`accountData: ${accountData}`);

  return (
    // <div className="flex min-h-screen bg-gray-100 justify-center items-center">
    //   <Head>
    //     <title>Wallet Connection</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className="flex space-x-4">
    //     <Button onClick={handleConnectToWallet}>Connect to wallet</Button>
    //     <Button variant={"destructive"} onClick={handleDisconnect}>
    //       Disconnect
    //     </Button>
    //   </main>
    // </div>
    <div
      className={`h-full flex flex-col before:from-white after:from-sky-200 py-2  `}
    >
      <Header {...accountData} />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="grid gap-4">
          <Image
            src="https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg"
            alt="MetaMask"
            width={320}
            height={140}
            priority
          />
          {accountData?.address ? (
            <>
              <input
                type="text"
                onChange={_onChange}
                className="border-black border-2 rounded-lg p-2"
              />
              <button
                onClick={_sendMessageToMetaMask}
                className="bg-black text-white p-4 rounded-lg"
              >
                Send Message
              </button>
            </>
          ) : (
            <button
              onClick={_connectToMetaMask}
              className="bg-black text-white p-4 rounded-lg"
            >
              Connect to MetaMask
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
